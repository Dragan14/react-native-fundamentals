// View.tsx
import { View as RNView, ViewProps } from "react-native";
import { useTheme } from "../../context/ThemeContext";

const View = ({ style, ...props }: ViewProps) => {
  const { theme } = useTheme();
  const color = theme.colors.background;
  return <RNView {...props} style={[{ backgroundColor: color }, style]} />;
};

export default View;
