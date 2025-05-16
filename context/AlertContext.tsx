import React, { createContext, useContext, useState, ReactNode } from "react";
import Alert from "../components/ui/Alert";
import { StyleProp, ViewStyle } from "react-native";

/**
 * Options for configuring the appearance and behavior of an alert.
 */
interface AlertOptions {
  /** Custom style for the alert container. */
  style?: StyleProp<ViewStyle>;
  /** Whether the alert can be dismissed by pressing the backdrop. Defaults to false. */
  dismissOnBackdropPress?: boolean;
}

/**
 * Parameters for displaying an alert.
 */
interface ShowAlertParams {
  content: ReactNode;
  options?: AlertOptions;
}

/**
 * Defines the shape of the Alert context.
 */
interface AlertContextType {
  /** Function to display an alert with the given content and options. */
  showAlert: (params: ShowAlertParams) => void;
  /** Function to hide the currently displayed alert. */
  hideAlert: () => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const AlertProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [alertContent, setAlertContent] = useState<ReactNode>(null);
  const [alertOptions, setAlertOptions] = useState<AlertOptions>({});

  const showAlert = ({ content, options = {} }: ShowAlertParams) => {
    setAlertContent(content);
    setAlertOptions(options);
    setIsVisible(true);
  };

  const hideAlert = () => {
    setIsVisible(false);
  };

  return (
    <AlertContext.Provider value={{ showAlert, hideAlert }}>
      {children}
      <Alert
        visible={isVisible}
        onDismiss={hideAlert}
        style={alertOptions.style}
        dismissOnBackdropPress={alertOptions.dismissOnBackdropPress}
      >
        {alertContent}
      </Alert>
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (context === undefined) {
    throw new Error("useAlert must be used within a AlertProvider");
  }
  return context;
};
