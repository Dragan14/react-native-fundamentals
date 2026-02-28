// Toast.tsx
import { ReactElement, cloneElement } from "react";
import {
  Text,
  Pressable,
  PixelRatio,
  StyleSheet,
  Platform,
  View,
  StyleProp,
  ViewStyle,
  TextStyle,
  PressableProps,
  useWindowDimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "../../context/ThemeContext";
import Animated, {
  runOnJS,
  SlideInDown,
  SlideInUp,
  SlideOutDown,
  SlideOutUp,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

/**
 * Props for the Toast component.
 * Extends the standard React Native PressableProps.
 */
export type ToastProps = {
  /** The message text to display in the toast. */
  message: string;
  /** Icon element to display on the left side of the toast message. */
  leftIcon?: ReactElement;
  /** Icon element to display on the right side of the toast message. */
  rightIcon?: ReactElement;
  /** Position where the toast appears ('top' or 'bottom'). Defaults to 'bottom'. */
  position?: "top" | "bottom";
  /** Style for the inner Pressable content container. */
  contentContainerStyle?: StyleProp<ViewStyle>;
  /** Style for the view wrapping the left icon. */
  leftIconContainerStyle?: StyleProp<ViewStyle>;
  /** Style for the outer Animated.View container. */
  style?: StyleProp<ViewStyle>;
  /** Style for the view wrapping the text message. */
  textContainerStyle?: StyleProp<ViewStyle>;
  /** Style for the message text. */
  textStyle?: StyleProp<TextStyle>;
  /** Style for the view wrapping the right icon. */
  rightIconContainerStyle?: StyleProp<ViewStyle>;
  /** If true, applies an elevated style (often a lighter background based on the variant). */
  elevated?: boolean;
  /** If true, applies an outline style with a background matching the screen and colored border. */
  outlined?: boolean;
  /** Custom background color for the toast. Overrides variant colors. */
  color?: string;
  /** Custom text color for the toast message. Overrides variant text colors. */
  textColor?: string;
  /** Predefined style variant for the toast. Affects background and text color. Defaults to 'primary'. */
  variant?: "primary" | "secondary" | "tertiary" | "success" | "error";
  /** Callback function invoked when the toast is dismissed (e.g., by swipe gesture or timeout). */
  onDismiss?: () => void;
} & PressableProps;

const scaledSize = (baseSize: number) => {
  return Math.round(baseSize * PixelRatio.getFontScale());
};

const renderIcon = (icon: ReactElement<any, any>, color: string) => {
  return cloneElement(icon, {
    color: icon.props.color ?? color,
    size: (icon.props.size && scaledSize(icon.props.size)) ?? scaledSize(24),
  });
};

const Toast = ({
  message,
  leftIcon,
  rightIcon,
  position = "bottom",
  contentContainerStyle,
  leftIconContainerStyle,
  style,
  textContainerStyle,
  textStyle,
  rightIconContainerStyle,
  elevated = false,
  outlined = false,
  color: initialColor,
  textColor: initialTextColor,
  variant = "primary",
  onDismiss,
  ...pressableProps
}: ToastProps) => {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const { width: screenWidth } = useWindowDimensions();
  const toastMargin = 20;
  const maxToastWidth = screenWidth - toastMargin * 2;

  const offset = Platform.OS === "web" ? 20 : 0;
  const basePositionStyle =
    position === "top"
      ? { top: insets.top + offset }
      : { bottom: insets.bottom + offset };

  const enteringAnimation =
    position === "top" ? SlideInUp.duration(700) : SlideInDown.duration(700);
  const exitingAnimation =
    position === "top" ? SlideOutUp.duration(700) : SlideOutDown.duration(700);

  // Calculated background color
  const color = (() => {
    if (initialColor) return initialColor;
    if (outlined && !elevated) return theme.colors.background;
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

  // Gesture handling for dismissing the toast
  const panGesture = Gesture.Pan().onEnd((event) => {
    const threshold = 5;
    if (position === "top" && event.translationY < -threshold && onDismiss) {
      runOnJS(onDismiss)();
    } else if (
      position === "bottom" &&
      event.translationY > threshold &&
      onDismiss
    ) {
      runOnJS(onDismiss)();
    }
  });

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View
        entering={enteringAnimation}
        exiting={exitingAnimation}
        style={[
          styles.container,
          { shadowColor: "black" },
          { backgroundColor: color },
          { borderRadius: 5 },
          outlined && {
            borderWidth: 1,
            borderColor: borderColor,
          },
          { width: maxToastWidth },
          { maxWidth: maxToastWidth },
          basePositionStyle,
          style,
        ]}
      >
        <Pressable
          style={[styles.pressableContent, contentContainerStyle]}
          {...pressableProps}
        >
          {leftIcon && (
            <View style={leftIconContainerStyle}>
              {renderIcon(leftIcon, textColor)}
            </View>
          )}
          <View
            style={[
              styles.textContainer,
              textContainerStyle,
              !leftIcon && !rightIcon && { flex: 1 },
            ]}
          >
            {message != null && (
              <Text style={[styles.text, { color: textColor }, textStyle]}>
                {message}
              </Text>
            )}
          </View>
          {rightIcon && (
            <View style={rightIconContainerStyle}>
              {renderIcon(rightIcon, textColor)}
            </View>
          )}
        </Pressable>
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    marginHorizontal: 20,
    elevation: 5,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  pressableContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 5,
    paddingVertical: 20,
    width: "100%",
  },
  textContainer: {
    alignItems: "center",
    marginHorizontal: 4,
  },
  text: {
    textAlign: "center",
    flexWrap: "wrap",
    ...Platform.select({
      web: {
        wordBreak: "break-word",
      },
    }),
  },
});

Toast.displayName = "Toast";

export default Toast;
