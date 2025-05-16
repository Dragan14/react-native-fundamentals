// RadioButton.tsx
import React from "react";
import {
  Pressable,
  View,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
  PressableProps,
} from "react-native";
import { useTheme } from "../../context/ThemeContext";

/**
 * Props for the RadioButton component.
 */
type RadioButtonProps = {
  /** The current state of the radio button (true for selected, false for unselected). */
  value: boolean;
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

const RadioButton = ({
  value,
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
      <View style={[styles.radioOuter, { borderColor: finalColor }]}>
        {value && (
          <View style={[styles.radioInner, { backgroundColor: finalColor }]} />
        )}
      </View>
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
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  radioInner: {
    height: 12,
    width: 12,
    borderRadius: 6,
  },
});

RadioButton.displayName = "RadioButton";

export default RadioButton;
