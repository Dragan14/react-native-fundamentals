# React Native Fundamental Components

A collection of essential, customizable React Native components that are **directly added to your codebase** - no package installation required.

### Why This Approach?

- **Full Customization** - All component code lives in your project, allowing unlimited modifications.
- **No Version Conflicts** - No dependency management headaches.
- **Transparent Implementation** - See exactly how each component works.
- **TypeScript Ready** - Fully typed components for better development experience.
- **Themeable** - Built-in theming system that works across all components.
- **Lightweight** - Add only the components you need.

## Table of Contents

- [Required Dependencies](#required-dependencies)
- [Installation](#installation)
- [Demo App](#demo-app)
- [Theme System](#theme-system)
- [Components](#components)
  - [Button](#button)
  - [TextInput](#textinput)
  - [Text](#text)
  - [RadioButton](#radiobutton)
  - [SegmentedControl](#segmentedcontrol)
  - [Switch](#switch)
  - [Toast](#toast)
  - [Alert](#alert)
  - [SafeAreaView](#safeareaview)
  - [View](#view)
- [License](#license)

## Required Dependencies

Some components require additional dependencies:

- **Theme:**

  - [react-native-async-storage](https://docs.expo.dev/versions/latest/sdk/async-storage/)

- **Toast Component:**

  - [react-native-gesture-handler](https://docs.expo.dev/versions/latest/sdk/gesture-handler/)
  - [react-native-safe-area-context](https://docs.expo.dev/versions/latest/sdk/safe-area-context/)
  - [react-native-reanimated](https://docs.expo.dev/versions/latest/sdk/reanimated/)

- **SafeAreaView Component:**
  - [react-native-safe-area-context](https://docs.expo.dev/versions/latest/sdk/safe-area-context/)

## Installation

No package installation required! Simply use the CLI to add components directly to your project:

```bash
# Add a specific component to your project
npx react-native-fundamentals add Button

# Add the theme system
npx react-native-fundamentals add theme

# Add everything at once
npx react-native-fundamentals add all

# See all available components
npx react-native-fundamentals list

# Get help
npx react-native-fundamentals help
```

## Demo App

See these components in action in our comprehensive demo app:

🔗 **[React Native Fundamentals Demo](https://github.com/Dragan14/react-native-fundamentals-demo)**

The demo app showcases:

## Theme System

The theme system provides consistent styling across all components and supports light/dark mode switching that persists to local storage.

```bash
npx react-native-fundamentals add blueTheme
```

```jsx
import { ThemeProvider } from "../theme/ThemeContext";

export default function App() {
  return <ThemeProvider>{/* Your app content */}</ThemeProvider>;
}
```

```jsx
import { useTheme } from "../context/ThemeContext";

// Access theme in components
const { theme, themeMode, isDark, setThemeMode } = useTheme();

// Available theme modes
setThemeMode("light");
setThemeMode("dark");
setThemeMode("system");

// Use theme colours
const myColor = theme.colors.primary;

// Get current theme mode
const currentTheme = themeMode;

// Check if the current theme mode is dark
const isCurrentThemeModeDark = isDark;
```

> **Customization Tip:** Modify theme colors directly in `blueTheme.ts` or create your own theme file.

## Components

### Button

```bash
npx react-native-fundamentals add Button
```

```jsx
import Button from "../components/Button";
import { Camera, Star } from "lucide-react-native";

<Button
  variant="primary" // primary, secondary, tertiary, error, success
  outlined={false}
  elevated={false}
  disabled={false}
  loading={false}
  leftIcon={<Camera />}
  rightIcon={<Star />}
  onPress={() => {}}
>
  Button Text
</Button>;
```

#### Button Props

| Prop                      | Type                                                             | Default     | Description                                                                           |
| ------------------------- | ---------------------------------------------------------------- | ----------- | ------------------------------------------------------------------------------------- |
| `children`                | `string`                                                         | -           | Text content of the button.                                                           |
| `color`                   | `string`                                                         | -           | Custom background color for the button. Overrides variant colors.                     |
| `textColor`               | `string`                                                         | -           | Custom text color for the button. Overrides variant text colors.                      |
| `leftIcon`                | `ReactElement`                                                   | -           | Icon element to display on the left side of the button text.                          |
| `rightIcon`               | `ReactElement`                                                   | -           | Icon element to display on the right side of the button text.                         |
| `loading`                 | `boolean`                                                        | `false`     | If true, displays an ActivityIndicator instead of the button content.                 |
| `style`                   | `StyleProp<ViewStyle>`                                           | -           | Style for the outer Pressable component.                                              |
| `textContainerStyle`      | `StyleProp<ViewStyle>`                                           | -           | Style for the container view wrapping the text content.                               |
| `contentContainerStyle`   | `StyleProp<ViewStyle>`                                           | -           | Style for the inner view wrapping all content (icons and text).                       |
| `leftIconContainerStyle`  | `StyleProp<ViewStyle>`                                           | -           | Style for the view wrapping the left icon.                                            |
| `rightIconContainerStyle` | `StyleProp<ViewStyle>`                                           | -           | Style for the view wrapping the right icon.                                           |
| `textStyle`               | `StyleProp<TextStyle>`                                           | -           | Style for the button text.                                                            |
| `rounded`                 | `boolean`                                                        | `false`     | If true, applies a circular border radius.                                            |
| `outlined`                | `boolean`                                                        | `false`     | If true, applies an outlined style with a transparent background and colored border.  |
| `elevated`                | `boolean`                                                        | `false`     | If true, applies an elevated style (lighter background).                              |
| `variant`                 | `"primary"`\|`"secondary"`\|`"tertiary"`\|`"error"`\|`"success"` | `"primary"` | Applies a predefined style variant for the button. Affects background and text color. |
| `disabled`                | `boolean`                                                        | `false`     | If true, disables button interactions and applies disabled styling.                   |
| `onPress`                 | `() => void`                                                     | -           | Callback function when button is pressed.                                             |
| `...props`                | `PressableProps`                                                 | -           | Additional React Native Pressable props.                                              |

#### Best Practices

- For button styling, it's recommended to use `maxWidth` instead of `width`.

### TextInput

```bash
npx react-native-fundamentals add TextInput
```

```jsx
import TextInput from "../components/TextInput";
import { Camera, Star } from "lucide-react-native";

const [value, setValue] = useState("");

<TextInput
  value={value}
  onChangeText={setValue}
  placeholder="placeholder text"
  variant="outlined" // outlined, solid, clear
  topLabel="Label"
  leftLabel="Label"
  leftIcon={<Camera />}
  rightIcon={<Star />}
  error={true}
  errorMessage="Error message"
  retainErrorMessageSpace={true}
  counter={true}
  maxLength={20}
  disabled={false}
/>;
```

#### TextInput Props

| Prop                      | Type                               | Default      | Description                                                      |
| ------------------------- | ---------------------------------- | ------------ | ---------------------------------------------------------------- |
| `topLabel`                | `string`                           | -            | Label text displayed above the input field.                      |
| `leftLabel`               | `string`                           | -            | Label text displayed to the left of the input field.             |
| `leftIcon`                | `ReactElement`                     | -            | Icon element displayed on the left side.                         |
| `rightIcon`               | `ReactElement`                     | -            | Icon element displayed on the right side.                        |
| `error`                   | `boolean`                          | `false`      | If true, applies error styling.                                  |
| `errorMessage`            | `string`                           | -            | Error message displayed below the input when `error` is true.    |
| `retainErrorMessageSpace` | `boolean`                          | `true`       | Reserves space for error message even when there is no error.    |
| `variant`                 | `"clear"`\|`"outlined"`\|`"solid"` | `"outlined"` | Visual style variant of the input field.                         |
| `counter`                 | `boolean`                          | `false`      | Displays a character counter below the input field.              |
| `maxLength`               | `number`                           | -            | Maximum number of characters allowed.                            |
| `style`                   | `StyleProp<ViewStyle>`             | -            | Style for the outermost container.                               |
| `textStyle`               | `StyleProp<TextStyle>`             | -            | Style for the text input component.                              |
| `topLabelStyle`           | `StyleProp<TextStyle>`             | -            | Style for the top label text.                                    |
| `leftLabelStyle`          | `StyleProp<TextStyle>`             | -            | Style for the left label text.                                   |
| `containerStyle`          | `StyleProp<ViewStyle>`             | -            | Style for the main input container.                              |
| `leftIconStyle`           | `StyleProp<ViewStyle>`             | -            | Style for the left icon container.                               |
| `rightIconStyle`          | `StyleProp<ViewStyle>`             | -            | Style for the right icon container.                              |
| `disabled`                | `boolean`                          | `false`      | If true, disables the input and applies disabled styling.        |
| `...props`                | `TextInputProps`                   | -            | Additional React Native TextInput props (such as `placeholder`). |

### Text

A text component with predefined variants and styles.

```bash
npx react-native-fundamentals add Text
```

```jsx
import Text from "../components/Text";

<Text
  variant="default" // default, primary, secondary, tertiary, error, success
  link={true}
  onPress={() => {}}
  disabled={false}
>
  Text content
</Text>;
```

#### Text Props

| Prop       | Type                                                                          | Default     | Description                                                                         |
| ---------- | ----------------------------------------------------------------------------- | ----------- | ----------------------------------------------------------------------------------- |
| `children` | `ReactNode`                                                                   | -           | Content to be rendered inside the Text component.                                   |
| `style`    | `StyleProp<TextStyle>`                                                        | -           | Custom style for the Text component.                                                |
| `variant`  | `"default"`\|`"primary"`\|`"secondary"`\|`"tertiary"`\|`"error"`\|`"success"` | `"default"` | Predefined color variant for the text, affecting text color.                        |
| `color`    | `string`                                                                      | -           | Custom text color, overrides variant color.                                         |
| `link`     | `boolean`                                                                     | `false`     | Renders text as a Pressable link with underline on hover/press. Requires `onPress`. |
| `disabled` | `boolean`                                                                     | `false`     | Disables the text (and the Pressable if `link` is true).                            |
| `onPress`  | `() => void`                                                                  | -           | Callback function when text is pressed.                                             |
| `...props` | `TextProps`                                                                   | -           | Additional React Native Text props.                                                 |

### RadioButton

```bash
npx react-native-fundamentals add RadioButton
```

```jsx
import RadioButton from "../components/RadioButton";
const [groupValue, setGroupValue] = useState<string|null>("optionA");

<RadioButton
  label="Option A"
  value={groupValue === "optionA"}
  onValueChange={() => setGroupValue("optionA")}
/>
<RadioButton
  label="Option B"
  value={groupValue === "optionB"}
  onValueChange={() => setGroupValue("optionB")}
  disabled={false}
/>
```

#### RadioButton Props

| Prop            | Type                       | Default | Description                                                                         |
| --------------- | -------------------------- | ------- | ----------------------------------------------------------------------------------- |
| `value`         | `boolean`                  | -       | The current state of the radio button (true for selected, false for unselected).    |
| `onValueChange` | `(value: boolean) => void` | -       | Callback function invoked when the radio button's state changes.                    |
| `label`         | `string`                   | -       | Optional label text displayed next to the radio button.                             |
| `disabled`      | `boolean`                  | `false` | If true, the radio button is disabled and cannot be interacted with.                |
| `color`         | `string`                   | -       | Custom color for the radio button (border and inner circle). Overrides theme color. |
| `style`         | `StyleProp<ViewStyle>`     | -       | Style for the outer container Pressable.                                            |
| `labelStyle`    | `StyleProp<TextStyle>`     | -       | Style for the label text.                                                           |
| `...props`      | `PressableProps`           | -       | Additional React Native Pressable props.                                            |

### SegmentedControl

```bash
npx react-native-fundamentals add SegmentedControl
```

```jsx
import SegmentedControl from "../components/SegmentedControl";
import { Text } from "react-native";
import { Camera, Star } from "lucide-react-native";

const [selectedIndices, setSelectedIndices] = useState<number[]>([0]);

<SegmentedControl
  values={[
    <Text>Tab One</Text>,
    <Text>Tab Two</Text>,
    // To display icons and text together wrap them in a fragment
    <>
      <Camera />
      <Text>Tab Three</Text>
    </>,
    <Star />,
  ]}
  selectedIndices={selectedIndices}
  // For single selection
  onTabPress={(index) => {
    setSelectedIndices([index]);
  }}
  // For allowing multiple selections
  onTabPress={(index) => {
    if (selectedIndices.includes(index)) {
      setSelectedIndices(
        selectedIndices.filter((i) => i !== index),
      );
    } else {
      setSelectedIndices([...selectedIndices, index]);
    }
  }}
  rounded={true}
  disabled={false}
/>;
```

#### SegmentedControl Props

| Prop               | Type                      | Default | Description                                                                                               |
| ------------------ | ------------------------- | ------- | --------------------------------------------------------------------------------------------------------- |
| `values`           | `ReactElement[]`          | -       | An array of React elements (e.g., Text, Icon, or Fragments) representing the content of each segment/tab. |
| `selectedIndices`  | `number[]`                | -       | An array of indices representing the currently selected segments.                                         |
| `onTabPress`       | `(index: number) => void` | -       | Callback function invoked when a tab is pressed, receiving the index of the pressed tab.                  |
| `style`            | `StyleProp<ViewStyle>`    | -       | Style for the outer container View.                                                                       |
| `tabStyle`         | `StyleProp<ViewStyle>`    | -       | Style applied to each individual tab Pressable.                                                           |
| `activeTabStyle`   | `StyleProp<ViewStyle>`    | -       | Style applied specifically to the active/selected tabs, overriding parts of `tabStyle`.                   |
| `inactiveTabStyle` | `StyleProp<ViewStyle>`    | -       | Style applied specifically to the inactive/unselected tabs, overriding parts of `tabStyle`.               |
| `rounded`          | `boolean`                 | `false` | If true, applies a circular border radius based on the component height.                                  |
| `disabled`         | `boolean`                 | `false` | If true, disables interaction with all tabs.                                                              |

### Switch

```bash
npx react-native-fundamentals add Switch
```

```jsx
import Switch from "../components/Switch";

const [isEnabled, setIsEnabled] = useState(true);

<Switch
  variant="primary" // primary, secondary, tertiary, error, success
  disabled={false}
  value={isEnabled}
  onValueChange={() => setIsEnabled(!isEnabled)}
/>;
```

#### Switch Props

| Prop            | Type                                                             | Default     | Description                                                              |
| --------------- | ---------------------------------------------------------------- | ----------- | ------------------------------------------------------------------------ |
| `variant`       | `"primary"`\|`"secondary"`\|`"tertiary"`\|`"error"`\|`"success"` | `"primary"` | Predefined style variant for the switch. Affects track and thumb colors. |
| `disabled`      | `boolean`                                                        | `false`     | If true, disables switch interactions and applies disabled styling.      |
| `value`         | `boolean`                                                        | -           | The value of the switch, true for on and false for off.                  |
| `onValueChange` | `(value: boolean) => void`                                       | -           | Callback function when switch value changes.                             |
| `...props`      | `SwitchProps`                                                    | -           | Additional React Native Switch props.                                    |

### Toast

```bash
npx react-native-fundamentals add Toast
```

```jsx
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ToastProvider } from "../context/ToastContext";

// Ensure the ToastProvider is wrapped in SafeAreaProvider and GestureHandlerRootView
<SafeAreaProvider>
  <GestureHandlerRootView>
    <ToastProvider>
      <App />
    </ToastProvider>
  </GestureHandlerRootView>
</SafeAreaProvider>;
```

```jsx
import { useToast } from "../context/ToastContext";

const { showToast, hideToast } = useToast();

showToast({
  message: "Message",
  variant: "primary",
  position: "top",
  elevated: false,
  outlined: false,
  leftIcon: <Icon onPress={hideToast} />,
  rightIcon: <Icon />,
  duration: 3000, // duration in ms, defaults to 3000
  // Use "infinite" to prevent automatic dismissal
  // duration: "infinite",
});
```

#### useToast Hook

The `useToast` hook provides two functions:

| Function    | Type                                | Description                                 |
| ----------- | ----------------------------------- | ------------------------------------------- |
| `showToast` | `(params: ShowToastParams) => void` | Displays a Toast with the given parameters. |
| `hideToast` | `() => void`                        | Hides the toast.                            |

#### showToast parameters

| Prop                      | Type                                                                     | Default     | Description                                                                               |
| ------------------------- | ------------------------------------------------------------------------ | ----------- | ----------------------------------------------------------------------------------------- |
| `message`                 | `string`                                                                 | -           | The message text to display in the toast.                                                 |
| `leftIcon`                | `ReactElement`                                                           | -           | Icon element to display on the left side of the toast message.                            |
| `rightIcon`               | `ReactElement`                                                           | -           | Icon element to display on the right side of the toast message.                           |
| `position`                | `"top"` \| `"bottom"`                                                    | `"bottom"`  | Position where the toast appears.                                                         |
| `style`                   | `StyleProp<ViewStyle>`                                                   | -           | Style for the outer Animated.View container.                                              |
| `contentContainerStyle`   | `StyleProp<ViewStyle>`                                                   | -           | Style for the inner Pressable content container.                                          |
| `leftIconContainerStyle`  | `StyleProp<ViewStyle>`                                                   | -           | Style for the view wrapping the left icon.                                                |
| `textContainerStyle`      | `StyleProp<ViewStyle>`                                                   | -           | Style for the view wrapping the text message.                                             |
| `textStyle`               | `StyleProp<TextStyle>`                                                   | -           | Style for the message text.                                                               |
| `rightIconContainerStyle` | `StyleProp<ViewStyle>`                                                   | -           | Style for the view wrapping the right icon.                                               |
| `elevated`                | `boolean`                                                                | `false`     | If true, applies an elevated style (often a lighter background based on the variant).     |
| `outlined`                | `boolean`                                                                | `false`     | If true, applies an outline style with a background matching the screen.                  |
| `color`                   | `string`                                                                 | -           | Custom background color for the toast. Overrides variant colors.                          |
| `textColor`               | `string`                                                                 | -           | Custom text color for the toast message. Overrides variant text colors.                   |
| `variant`                 | `"primary"` \| `"secondary"` \| `"tertiary"` \| `"success"` \| `"error"` | `"primary"` | Predefined style variant for the toast. Affects background and text color.                |
| `duration`                | `number` \| `"infinite"`                                                 | `3000`      | Duration in milliseconds to show the toast, or "infinite" to prevent automatic dismissal. |

### Alert

```bash
npx react-native-fundamentals add Alert
```

```jsx
import { AlertProvider } from "../context/AlertContext";

// In your app wrapper
<AlertProvider>
  <App />
</AlertProvider>;
```

```jsx
import { useAlert } from "../context/AlertContext";

const { showAlert, hideAlert } = useAlert();

showAlert({
  content: (
    <View style={{ gap: 10 }}>
      <Text>Alert Message</Text>
      <View style={{ flexDirection: "row", gap: 10 }}>
        <Button
          onPress={hideAlert}
          variant="secondary"
          outlined={true}
          style={{ flex: 1 }}
        >
          Cancel
        </Button>
        <Button onPress={hideAlert} variant="primary" style={{ flex: 1 }}>
          Confirm
        </Button>
      </View>
    </View>
  ),
  options: { dismissOnBackdropPress: true },
});
```

#### showAlert Parameters

| Parameter | Type           | Description                                                                                |
| --------- | -------------- | ------------------------------------------------------------------------------------------ |
| `content` | `ReactNode`    | The content to be displayed inside the alert. Can be any valid React component or element. |
| `options` | `AlertOptions` | Optional configuration object for the alert.                                               |

#### AlertOptions

| Option                   | Type                   | Default     | Description                                                |
| ------------------------ | ---------------------- | ----------- | ---------------------------------------------------------- |
| `style`                  | `StyleProp<ViewStyle>` | `undefined` | Custom style for the alert container.                      |
| `dismissOnBackdropPress` | `boolean`              | `false`     | If true, allows closing the alert by tapping the backdrop. |

#### useAlert Hook

The `useAlert` hook provides two functions:

| Function    | Type                                | Description                                           |
| ----------- | ----------------------------------- | ----------------------------------------------------- |
| `showAlert` | `(params: ShowAlertParams) => void` | Displays an alert with the given content and options. |
| `hideAlert` | `() => void`                        | Closes the currently displayed alert.                 |

#### Best Practices

- For buttons in alerts, wrap them in a `View` with `flexDirection: "row"` and assign `flex: 1` to each button to distribute width equally.

### SafeAreaView

```bash
npx react-native-fundamentals add SafeAreaView
```

```jsx
import SafeAreaView from "../components/SafeAreaView";

<SafeAreaView
  disableBottomSafeArea={false}
  disableTopSafeArea={false}
  disableSidesSafeArea={false}
  style={{}} // Custom styling (flex:1 and the background are already set)
>
  {/* Your content */}
</SafeAreaView>;
```

#### SafeAreaView Props

| Prop                    | Type                   | Default   | Description                                                      |
| ----------------------- | ---------------------- | --------- | ---------------------------------------------------------------- |
| `children`              | `ReactNode`            | -         | The content to be rendered within the safe area view.            |
| `style`                 | `StyleProp<ViewStyle>` | `flex: 1` | Custom style for the outer View component.                       |
| `disableBottomSafeArea` | `boolean`              | `false`   | If true, disables safe area padding at the bottom.               |
| `disableTopSafeArea`    | `boolean`              | `false`   | If true, disables safe area padding at the top.                  |
| `disableSidesSafeArea`  | `boolean`              | `false`   | If true, disables safe area padding on the left and right sides. |
| `...props`              | `ViewProps`            | -         | Additional React Native View props.                              |

#### Best Practices

- If the screen includes a header, set `disableTopSafeArea={true}`. If it includes a Tab Bar, set `disableBottomSafeArea={true}`.

### View

```bash
npx react-native-fundamentals add View
```

```jsx
import View from "../components/View";

<View
  style={{}} // Custom styling (will be merged with theme background)
>
  {/* Your content */}
</View>;
```

#### View Props

| Prop       | Type                   | Default | Description                                                       |
| ---------- | ---------------------- | ------- | ----------------------------------------------------------------- |
| `children` | `ReactNode`            | -       | The content to be rendered inside the View.                       |
| `style`    | `StyleProp<ViewStyle>` | -       | Custom style that will be merged with the theme background color. |
| `...props` | `ViewProps`            | -       | Additional React Native View props.                               |

## License

This project is licensed under the [MIT License](LICENSE).
