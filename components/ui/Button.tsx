// Button.tsx
import {
  useState,
  cloneElement,
  forwardRef,
  ForwardedRef,
  ReactElement,
} from "react";
import {
  Pressable,
  PressableProps,
  View,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
  PixelRatio,
  LayoutChangeEvent,
  Platform,
} from "react-native";
import { useTheme } from "../../context/ThemeContext";

/**
 * Props for the Button component.
 */
type ButtonProps = {
  /** Text content of the button. */
  children?: string;
  /** Custom background color for the button. Overrides variant colors. */
  color?: string;
  /** Custom text color for the button. Overrides variant text colors. */
  textColor?: string;
  /** Icon element to display on the left side of the button text. */
  leftIcon?: ReactElement;
  /** Icon element to display on the right side of the button text. */
  rightIcon?: ReactElement;
  /** If true, displays an ActivityIndicator instead of the button content. */
  loading?: boolean;
  /** Style for the outer Pressable component. */
  style?: StyleProp<ViewStyle>;
  /** Style for the container view wrapping the text content. */
  textContainerStyle?: StyleProp<ViewStyle>;
  /** Style for the inner view wrapping all content (icons and text). */
  contentContainerStyle?: StyleProp<ViewStyle>;
  /** Style for the view wrapping the left icon. */
  leftIconContainerStyle?: StyleProp<ViewStyle>;
  /** Style for the view wrapping the right icon. */
  rightIconContainerStyle?: StyleProp<ViewStyle>;
  /** Style for the button text. */
  textStyle?: StyleProp<TextStyle>;
  /** If true, applies a circular border radius based on the button height. */
  rounded?: boolean;
  /** If true, applies an outline style with a transparent background and colored border. */
  outlined?: boolean;
  /** If true, applies an elevated style (often a lighter background based on the variant). */
  elevated?: boolean;
  /** Predefined style variant for the button. Affects background and text color. Defaults to 'primary'. */
  variant?: "primary" | "secondary" | "tertiary" | "success" | "error";
} & PressableProps;

// Helper function to scale sizes based on font size
const scaledSize = (baseSize: number) => {
  return Math.round(baseSize * PixelRatio.getFontScale());
};

// Helper function to render icons
const renderIcon = (icon: ReactElement, color: string) => {
  return cloneElement(icon, {
    color: icon.props.color ?? color,
    size: (icon.props.size && scaledSize(icon.props.size)) ?? scaledSize(24),
  });
};

// Button component
const Button = forwardRef(
  (
    {
      children,
      color: initialColor,
      textColor: initialTextColor,
      leftIcon,
      rightIcon,
      loading = false,
      style,
      contentContainerStyle,
      textContainerStyle,
      leftIconContainerStyle,
      rightIconContainerStyle,
      textStyle,
      disabled,
      rounded = false,
      elevated = false,
      outlined = false,
      variant,
      ...props
    }: ButtonProps,
    ref: ForwardedRef<View>,
  ) => {
    const { theme } = useTheme();
    const [isHovered, setIsHovered] = useState(false);
    const [height, setHeight] = useState(0);

    const onLayout = (event: LayoutChangeEvent) => {
      const { height: componentHeight } = event.nativeEvent.layout;
      setHeight(componentHeight);
    };

    // Calculated background color
    const color = (() => {
      if (disabled) return theme.colors.backgroundDisabled;
      if (initialColor) return initialColor;
      if (outlined && !elevated) return "transparent";
      if (!elevated) {
        switch (variant) {
          case "success":
            return theme.colors.success;
          case "error":
            return theme.colors.error;
          case "primary":
            return theme.colors.primary;
          case "secondary":
            return theme.colors.secondary;
          case "tertiary":
            return theme.colors.tertiary;
          default:
            return theme.colors.primary;
        }
      } else {
        switch (variant) {
          case "success":
            return theme.colors.elevatedSuccess;
          case "error":
            return theme.colors.elevatedError;
          case "primary":
            return theme.colors.elevatedPrimary;
          case "secondary":
            return theme.colors.elevatedSecondary;
          case "tertiary":
            return theme.colors.elevatedTertiary;
          default:
            return theme.colors.elevatedPrimary;
        }
      }
    })();

    // Calculated text color
    const textColor = (() => {
      if (disabled) return theme.colors.onBackgroundDisabled;
      if (initialTextColor) return initialTextColor;
      if (outlined || elevated) {
        switch (variant) {
          case "success":
            return theme.colors.success;
          case "error":
            return theme.colors.error;
          case "primary":
            return theme.colors.primary;
          case "secondary":
            return theme.colors.secondary;
          case "tertiary":
            return theme.colors.tertiary;
          default:
            return theme.colors.primary;
        }
      }
      switch (variant) {
        case "success":
          return theme.colors.onSuccess;
        case "error":
          return theme.colors.onError;
        case "primary":
          return theme.colors.onPrimary;
        case "secondary":
          return theme.colors.onSecondary;
        case "tertiary":
          return theme.colors.onTertiary;
        default:
          return theme.colors.onPrimary;
      }
    })();

    const borderRadius = rounded ? height / 2 : 5;
    const borderColor = (() => {
      switch (variant) {
        case "success":
          return theme.colors.success;
        case "error":
          return theme.colors.error;
        case "primary":
          return theme.colors.primary;
        case "secondary":
          return theme.colors.secondary;
        case "tertiary":
          return theme.colors.tertiary;
        default:
          return theme.colors.primary;
      }
    })();

    return (
      <Pressable
        ref={ref}
        onLayout={onLayout}
        style={({ pressed }) => [
          styles.button,
          { backgroundColor: color },
          { borderRadius: borderRadius },
          outlined && {
            borderWidth: 1,
            borderColor: borderColor,
          },
          !disabled && isHovered && styles.hovered,
          !disabled && pressed && styles.pressed,
          style,
        ]}
        disabled={disabled}
        onHoverIn={() => {
          if (!disabled) {
            setIsHovered(true);
          }
        }}
        onHoverOut={() => {
          setIsHovered(false);
        }}
        {...props}
      >
        <View style={[styles.contentContainer, contentContainerStyle]}>
          {loading ? (
            <ActivityIndicator size="small" color={textColor} />
          ) : (
            <>
              {leftIcon && (
                <View style={leftIconContainerStyle}>
                  {renderIcon(leftIcon, textColor)}
                </View>
              )}
              {children && (
                <View
                  style={[
                    styles.textContainer,
                    textContainerStyle,
                    !leftIcon && !rightIcon && { flex: 1 },
                  ]}
                >
                  <Text style={[styles.text, { color: textColor }, textStyle]}>
                    {children}
                  </Text>
                </View>
              )}
              {rightIcon && (
                <View style={rightIconContainerStyle}>
                  {renderIcon(rightIcon, textColor)}
                </View>
              )}
            </>
          )}
        </View>
      </Pressable>
    );
  },
);

Button.displayName = "Button";

export default Button;

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    width: "100%",
  },
  hovered: {
    opacity: 0.9,
  },
  pressed: {
    opacity: 0.8,
  },
  textContainer: {
    alignItems: "center",
    marginHorizontal: 4,
  },
  text: {
    fontWeight: "500",
    textAlign: "center",
    ...Platform.select({
      web: {
        wordBreak: "break-word",
      },
    }),
  },
});
