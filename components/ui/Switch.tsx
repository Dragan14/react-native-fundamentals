// Switch.tsx
import {
  Switch as RNSwitch,
  SwitchProps as RNSwitchProps,
  Platform,
} from "react-native";
import { useTheme } from "../../context/ThemeContext";

/**
 * Props for the Switch component.
 * Extends the standard React Native SwitchProps.
 */
type SwitchProps = {
  /** Predefined style variant for the switch. Affects track and thumb colors. Defaults to 'primary'. */
  variant?: "primary" | "secondary" | "tertiary" | "error" | "success";
} & RNSwitchProps;

const Switch = ({ variant, disabled = false, ...props }: SwitchProps) => {
  const { theme } = useTheme();

  // Calculated background color
  const onTrackColor = (() => {
    if (disabled) return theme.colors.backgroundDisabled;
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

  // Calculated background color
  const offTrackColor = (() => {
    if (disabled) return theme.colors.backgroundDisabled;
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
  })();

  // Thumb color
  const thumbColor = (() => {
    if (disabled) return theme.colors.onBackgroundDisabled;
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

  return (
    <RNSwitch
      trackColor={{ false: offTrackColor, true: onTrackColor }}
      thumbColor={thumbColor}
      ios_backgroundColor={offTrackColor}
      disabled={disabled}
      {...Platform.select({
        web: {
          activeThumbColor: thumbColor,
        },
      })}
      {...props}
    />
  );
};

Switch.displayName = "Switch";

export default Switch;
