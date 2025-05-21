// SegmentedControl.tsx
import {
  Children,
  Fragment,
  cloneElement,
  isValidElement,
  ReactElement,
  useState,
} from "react";
import {
  View,
  Pressable,
  StyleSheet,
  Text,
  ViewStyle,
  StyleProp,
  TextStyle,
  PixelRatio,
  LayoutChangeEvent,
} from "react-native";
import { useTheme } from "../../context/ThemeContext";

/**
 * Props for the SegmentedControl component.
 */
interface SegmentedControlProps {
  /** An array of React elements (e.g., Text, Icon, or Fragments) representing the content of each segment/tab. */
  values: ReactElement[];
  /** An array of indices representing the currently selected segments. */
  selectedIndices: number[];
  /** Callback function invoked when a tab is pressed, receiving the index of the pressed tab. */
  onTabPress: (index: number) => void;
  /** Style for the outer container View. */
  style?: StyleProp<ViewStyle>;
  /** Style applied to each individual tab Pressable. */
  tabStyle?: StyleProp<ViewStyle>;
  /** Style applied specifically to the active/selected tabs, overriding parts of `tabStyle`. */
  activeTabStyle?: StyleProp<ViewStyle>;
  /** Style applied specifically to the inactive/unselected tabs, overriding parts of `tabStyle`. */
  inactiveTabStyle?: StyleProp<ViewStyle>;
  /** If true, applies a circular border radius based on the component height. Defaults to false (uses a fixed radius). */
  rounded?: boolean;
  /** If true, disables interaction with all tabs. */
  disabled?: boolean;
}

const scaledSize = (baseSize: number) => {
  return Math.round(baseSize * PixelRatio.getFontScale());
};

const renderElement = (
  element: ReactElement<any, any>,
  color: string,
): ReactElement<any, any> => {
  if (element.type === Fragment) {
    const children = Children.map(element.props.children, (child) =>
      isValidElement(child) ? renderElement(child, color) : child,
    );
    return (
      <View
        style={{
          gap: 5,
          flexWrap: "wrap",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {children}
      </View>
    );
  } else if (element.type === Text) {
    const originalStyle = StyleSheet.flatten(element.props.style) || {};
    return cloneElement(element, {
      style: [originalStyle, { color: color }] as StyleProp<TextStyle>,
    });
  } else {
    return cloneElement(element, {
      color: element.props.color ?? color,
      size:
        (element.props.size && scaledSize(element.props.size)) ??
        scaledSize(24),
    });
  }
};

const SegmentedControl = ({
  values,
  selectedIndices,
  onTabPress,
  style,
  tabStyle,
  activeTabStyle,
  inactiveTabStyle,
  rounded = false,
  disabled = false,
}: SegmentedControlProps) => {
  const { theme } = useTheme();
  const [height, setHeight] = useState(0);

  const borderRadius = rounded ? height / 2 : 5;

  const onLayout = (event: LayoutChangeEvent) => {
    const { height: componentHeight } = event.nativeEvent.layout;
    setHeight(componentHeight);
  };

  const colors = {
    selectedContent: disabled
      ? theme.colors.onBackgroundDisabled
      : theme.colors.primary,
    unselectedContent: disabled
      ? theme.colors.onBackgroundDisabled
      : theme.colors.onBackground,
    border: disabled ? theme.colors.onBackgroundDisabled : theme.colors.primary,
    activeTab: disabled
      ? theme.colors.backgroundDisabled
      : theme.colors.elevatedPrimary,
  };

  return (
    <View
      style={[{ borderRadius: borderRadius }, styles.container, style]}
      onLayout={onLayout}
    >
      {values.map((valueElement, index) => {
        const isSelected = selectedIndices.includes(index);
        const isFirstTab = index === 0;
        const isLastTab = index === values.length - 1;
        const currentTabBackgroundStyle = isSelected
          ? [{ backgroundColor: colors.activeTab }, activeTabStyle]
          : [styles.tabInactive, inactiveTabStyle];
        const tabBorderStyle = {
          borderRightWidth: isLastTab ? 1 : 0,
          borderTopLeftRadius: isFirstTab ? borderRadius : 0,
          borderBottomLeftRadius: isFirstTab ? borderRadius : 0,
          borderTopRightRadius: isLastTab ? borderRadius : 0,
          borderBottomRightRadius: isLastTab ? borderRadius : 0,
        };
        const contentColor = isSelected
          ? colors.selectedContent
          : colors.unselectedContent;
        const renderedContent = renderElement(valueElement, contentColor);
        return (
          <Pressable
            key={index}
            onPress={() => onTabPress(index)}
            style={[
              { borderColor: colors.border },
              styles.tabBase,
              tabStyle,
              tabBorderStyle,
              currentTabBackgroundStyle,
            ]}
            disabled={disabled}
          >
            {renderedContent}
          </Pressable>
        );
      })}
    </View>
  );
};

SegmentedControl.displayName = "SegmentedControl";

export default SegmentedControl;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "transparent",
  },
  tabBase: {
    flex: 1,
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRightWidth: 0,
  },
  tabInactive: {
    backgroundColor: "transparent",
  },
});
