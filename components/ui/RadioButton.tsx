// RadioButton.tsx
import { ReactElement, cloneElement } from "react";
import {
  Pressable,
  View,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
  PressableProps,
  PixelRatio,
} from "react-native";
import { useTheme } from "../../context/ui/ThemeContext";

/**
 * Props for the RadioButton component.
 */
type RadioButtonProps = {
  /** The current state of the radio button (true for selected, false for unselected). */
  value: boolean;
  /** Optional icon to display inside the radio button */
  icon?: ReactElement;
  /** Callback function invoked when the radio button's state changes. */
  onValueChange: (value: boolean) => void;
  /** Optional label text displayed next to the radio button. */
  label?: string;
  /** If true, the radio button is disabled and cannot be interacted with. */
  disabled?: boolean;
  /** Custom color for the radio button (border and inner circle). Overrides theme color. */
  color?: string;
  /** Style for the outer container Pressable. */
  style?: StyleProp<ViewStyle>;
  /** Style for the label text. */
  labelStyle?: StyleProp<TextStyle>;
} & Omit<PressableProps, "onPress">;

// Helper function to scale sizes based on font size
const scaledSize = (baseSize: number) => {
  return Math.round(baseSize * PixelRatio.getFontScale());
};

// Helper function to render icons
const renderIcon = (icon: ReactElement<any, any>, color: string) => {
  return cloneElement(icon, {
    color: icon.props.color ?? color,
    size: (icon.props.size && scaledSize(icon.props.size)) ?? scaledSize(24),
  });
};

const RadioButton = ({
  value,
  icon,
  onValueChange,
  label,
  disabled = false,
  color: initialColor,
  style,
  labelStyle,
  ...pressableProps
}: RadioButtonProps) => {
  const { theme } = useTheme();

  const color = initialColor ?? theme.colors.primary;
  const disabledColor = theme.colors.onBackgroundDisabled;
  const finalColor = disabled ? disabledColor : color;

  const backGroundColor = disabled
    ? "transparent"
    : value
      ? theme.colors.primary
      : "transparent";

  const iconColor = disabled
    ? disabledColor
    : value
      ? theme.colors.onPrimary
      : theme.colors.primary;

  const handlePress = () => {
    if (!disabled) {
      onValueChange(!value);
    }
  };

  return (
    <Pressable
      style={[styles.container, style]}
      onPress={handlePress}
      disabled={disabled}
      accessibilityRole="radio"
      accessibilityState={{ checked: value, disabled }}
      {...pressableProps}
    >
      {
        <View
          style={[
            styles.radioOuter,
            { borderColor: finalColor },
            icon && { backgroundColor: backGroundColor },
          ]}
        >
          {icon
            ? renderIcon(icon, iconColor)
            : value && (
                <View
                  style={[styles.radioInner, { backgroundColor: finalColor }]}
                />
              )}
        </View>
      }
      {label && (
        <Text
          style={[
            { color: disabled ? disabledColor : theme.colors.onBackground },
            labelStyle,
          ]}
        >
          {label}
        </Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioOuter: {
    height: scaledSize(28),
    width: scaledSize(28),
    borderRadius: scaledSize(14),
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  radioInner: {
    height: scaledSize(16),
    width: scaledSize(16),
    borderRadius: scaledSize(8),
  },
});

RadioButton.displayName = "RadioButton";

export default RadioButton;
