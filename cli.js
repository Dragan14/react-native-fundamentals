#!/usr/bin/env node

const fs = require("fs-extra");
const path = require("path");

// Get command line arguments
const [, , command, componentName] = process.argv;

// Available components
const availableComponents = [
  "Alert",
  "Button",
  "RadioButton",
  "SafeAreaView",
  "SegmentedControl",
  "Switch",
  "Text",
  "TextInput",
  "Toast",
  "View",
];

// Available contexts
const availableContexts = ["AlertContext", "ThemeContext", "ToastContext"];

// Available themes
const availableThemes = ["blueTheme"];

// Check if component exists
const isValidComponent = (name) => {
  return (
    availableComponents.includes(name) ||
    availableContexts.includes(name) ||
    availableThemes.includes(name)
  );
};

// Helper to copy a file to user's project
const copyFile = async (sourcePath, targetPath) => {
  try {
    await fs.ensureDir(path.dirname(targetPath));

    // Read the source file
    const content = await fs.readFile(sourcePath, "utf8");

    // Replace placeholders with actual values
    await fs.writeFile(targetPath, content);
    console.log(`✅ Created ${targetPath}`);
    return true;
  } catch (error) {
    console.error(`❌ Failed to copy ${sourcePath}:`, error);
    return false;
  }
};

// Helper function to add related context
const addRelatedContext = async (contextName) => {
  if (!availableContexts.includes(contextName)) {
    console.error(`❌ Context "${contextName}" is not available.`);
    return false;
  }

  const sourcePath = path.resolve(__dirname, `context/${contextName}.tsx`);
  const targetDir = path.resolve(process.cwd(), "context");
  const targetPath = path.resolve(targetDir, `${contextName}.tsx`);

  // Check if the context already exists
  if (await fs.pathExists(targetPath)) {
    console.log(`ℹ️  ${contextName} already exists in your project.`);
    return true;
  }

  const success = await copyFile(sourcePath, targetPath);
  if (success) {
    console.log(`✅ Automatically added ${contextName} (required dependency)`);
  }
  return success;
};

// Command to add a component to the user's project
const addComponent = async (componentName) => {
  if (!componentName) {
    console.error("❌ Please specify a component name");
    showHelp();
    return;
  }

  // Check if the component name is "all"
  if (componentName === "all") {
    const allItems = [...availableComponents, ...availableThemes];
    for (const item of allItems) {
      await addComponent(item);
    }
    console.log("✅ Successfully added all components, contexts, and themes.");
    return;
  }

  if (!isValidComponent(componentName)) {
    console.error(`❌ Component "${componentName}" is not available.`);
    console.log("Available components:");
    availableComponents.forEach((comp) => console.log(`  - ${comp}`));
    console.log("Available themes:");
    availableThemes.forEach((theme) => console.log(`  - ${theme}`));
    return;
  }

  let sourcePath = "";
  let targetDir = "";
  let targetPath = "";
  let added = false;

  // Determine the correct paths based on component type
  if (availableComponents.includes(componentName)) {
    sourcePath = path.resolve(__dirname, `components/ui/${componentName}.tsx`);
    targetDir = path.resolve(process.cwd(), "components", "ui");
    targetPath = path.resolve(targetDir, `${componentName}.tsx`);

    // Check if the component already exists
    if (await fs.pathExists(targetPath)) {
      console.log(`ℹ️  ${componentName} already exists in your project.`);
    } else {
      await copyFile(sourcePath, targetPath);
      // Automatically add related context
      if (componentName === "Toast") {
        await addRelatedContext("ToastContext");
      } else if (componentName === "Alert") {
        await addRelatedContext("AlertContext");
      }
      added = true;
    }
  } else if (availableContexts.includes(componentName)) {
    sourcePath = path.resolve(__dirname, `context/${componentName}.tsx`);
    targetDir = path.resolve(process.cwd(), "context");
    targetPath = path.resolve(targetDir, `${componentName}.tsx`);

    // Check if the context already exists
    if (await fs.pathExists(targetPath)) {
      console.log(`ℹ️  ${componentName} already exists in your project.`);
    } else {
      await copyFile(sourcePath, targetPath);
      added = true;
    }
  } else if (availableThemes.includes(componentName)) {
    sourcePath = path.resolve(__dirname, `themes/${componentName}.ts`);
    targetDir = path.resolve(process.cwd(), "themes");
    targetPath = path.resolve(targetDir, `${componentName}.ts`);

    // Check if the theme already exists
    if (await fs.pathExists(targetPath)) {
      console.log(`ℹ️  ${componentName} already exists in your project.`);
    } else {
      await copyFile(sourcePath, targetPath);
      // Automatically add ThemeContext when adding a theme
      await addRelatedContext("ThemeContext");
      added = true;
    }
  }

  // If the component was added successfully, show success message
  if (added) {
    console.log(`✅ Successfully added ${componentName}`);

    // Only show relevant dependencies
    const requiredDeps = [];

    if (componentName === "Toast") {
      requiredDeps.push(
        "react-native-gesture-handler",
        "react-native-safe-area-context",
        "react-native-reanimated",
      );
    } else if (componentName === "SafeAreaView") {
      requiredDeps.push("react-native-safe-area-context");
    }
    if (requiredDeps.length > 0) {
      console.log(
        "Required dependencies for",
        componentName + ":",
        requiredDeps.join(", "),
      );
    }
  }
};

// Command to list all available components
const listComponents = () => {
  console.log("Available components:");
  availableComponents.forEach((comp) => console.log(`  - ${comp}`));
  console.log("\nAvailable themes:");
  availableThemes.forEach((theme) => console.log(`  - ${theme}`));
};

// Show help information
const showHelp = () => {
  console.log(`
React Native Fundamentals CLI

Usage:
  npx react-native-fundamentals [command] [options]

Commands:
  add <component>    Add a component to your project
  list               List all available components
  help               Show this help information

Examples:
  npx react-native-fundamentals add Button
  npx react-native-fundamentals add ThemeContext
  npx react-native-fundamentals add all
  npx react-native-fundamentals list
  `);
};

// Main function to run the CLI
const main = async () => {
  try {
    switch (command) {
      case "add":
        await addComponent(componentName);
        break;
      case "list":
        listComponents();
        break;
      case "help":
        showHelp();
        break;
      default:
        console.error(`❌ Unknown command: ${command}`);
        showHelp();
        break;
    }
  } catch (error) {
    console.error("❌ An error occurred:", error);
    process.exit(1);
  }
};

// Run the CLI
main();
