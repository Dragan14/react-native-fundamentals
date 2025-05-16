// Alert.tsx
import { ReactNode } from "react";
import {
  Modal,
  StyleSheet,
  StyleProp,
  ViewStyle,
  Pressable,
  View,
  Platform,
} from "react-native";
import { useTheme } from "../../context/ThemeContext";

/**
 * Props for the Alert component.
 */
export type AlertProps = {
  /** Whether the alert is visible. */
  visible: boolean;
  /** Function called when the alert is dismissed. */
  onDismiss: () => void;
  /** Content to display inside the alert. */
  children?: ReactNode;
  /** Custom style for the alert container. */
  style: StyleProp<ViewStyle>;
  /** Whether the alert can be dismissed by pressing the backdrop. Defaults to false. */
  dismissOnBackdropPress?: boolean;
};

const Alert = ({
  visible,
  onDismiss,
  children,
  style,
  dismissOnBackdropPress = false,
}: AlertProps) => {
  const { theme } = useTheme();

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onDismiss}
    >
      <View style={styles.backdrop}>
        {dismissOnBackdropPress && (
          <Pressable style={StyleSheet.absoluteFill} onPress={onDismiss} />
        )}
        <View
          style={[
            styles.alertContainer,
            { backgroundColor: theme.colors.background },
            style,
          ]}
        >
          {children}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  alertContainer: {
    ...(Platform.OS === "web" ? { width: "100%" } : { alignSelf: "stretch" }),
    marginHorizontal: 20,
    maxWidth: 500,
    maxHeight: "80%",
    borderRadius: 5,
    padding: 20,
    elevation: 5,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
  },
});

Alert.displayName = "Alert";

export default Alert;
