// Text.tsx
import { useState, ReactNode } from "react";
import {
  Text as RNText,
  TextProps as RNTextProps,
  StyleProp,
  TextStyle,
  Pressable,
} from "react-native";
import { useTheme } from "../../context/ThemeContext";

/**
 * Props for the Text component.
 * Extends the standard React Native TextProps.
 */
type TextProps = {
  /** The content to be rendered inside the Text component. */
  children: ReactNode;
  /** Custom style for the Text component. */
  style?: StyleProp<TextStyle>;
  /** Predefined color variant for the text. Affects text color. Defaults to 'default'. */
  variant?:
    | "default"
    | "primary"
    | "secondary"
    | "tertiary"
    | "error"
    | "success";
  /** Custom text color. Overrides variant colors. */
  color?: string;
  /** If true, renders the text as a Pressable with underline on hover/press. Requires `onPress`. */
  link?: boolean;
  /** If true, disables the text (and the Pressable if `link` is true). */
  disabled?: boolean;
} & RNTextProps;

// Text component
const Text = ({
  children,
  style,
  variant,
  color: initialColor,
  link,
  disabled,
  onPress,
  ...props
}: TextProps) => {
  const { theme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);

  // Calculate color
  const color = (() => {
    if (initialColor) return initialColor;
    switch (variant) {
      case "default":
        return theme.colors.onBackground;
      case "primary":
        return theme.colors.primary;
      case "secondary":
        return theme.colors.secondary;
      case "tertiary":
        return theme.colors.tertiary;
      case "error":
        return theme.colors.error;
      case "success":
        return theme.colors.success;
      default:
        return theme.colors.onBackground;
    }
  })();

  return link ? (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      onHoverIn={() => !disabled && setIsHovered(true)}
      onHoverOut={() => setIsHovered(false)}
    >
      {({ pressed }) => (
        <RNText
          disabled={disabled}
          style={[
            { color: color },
            !disabled && (pressed || isHovered)
              ? { textDecorationLine: "underline" }
              : {},
            style,
          ]}
          {...props}
        >
          {children}
        </RNText>
      )}
    </Pressable>
  ) : (
    <RNText disabled={disabled} style={[{ color: color }, style]} {...props}>
      {children}
    </RNText>
  );
};

Text.displayName = "Text";

export default Text;
