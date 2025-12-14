# Control Panel UI

## Overview
This project is a single-page control panel UI built with HTML and CSS, using Google Fonts for typography. The design features a dark, metallic theme with blue accents, creating a futuristic, high-tech aesthetic. The layout is fully responsive and includes interactive elements such as knobs, a toggle switch, and a modal dialog system for adjusting settings.

## Component Inventory
- **Screen Module:** A top-aligned screen that displays a dollar amount, set against a stylized city skyline.
- **Control Grid:** The main interactive area, organized into a three-column layout:
  - **Left Knob Group:** A container with three knobs and their corresponding labels: "Rebalancing Interval," "AI Confidence," and "Parameter C."
  - **Center Controls:** 
    - "BULL" and "BEAR" mode indicators.
    - A central toggle switch to alternate between "BULL" and "BEAR" modes.
    - An LED status indicator.
  - **Right Knob Group:** A container with three knobs and their corresponding labels: "Sector Weighting," "Take Profit," and "Parameter F."
- **Modal Dialog:** A pop-up modal that allows users to adjust the values for each of the six knobs.

## Class Map
- **Layout:** The main layout is structured with a `.panel` container that holds the `.screen` and `.control-grid`. The `.control-grid` is a CSS grid with three columns, containing the `.knob-group`s and `.middle-controls`.
- **Knobs:** The `.knob` class styles the circular buttons. The `.knob-label` class styles the text labels below each knob.
- **Indicators:** The `.mode-tag` class styles the "BULL" and "BEAR" indicators.
- **Interactivity:** The JavaScript handles the logic for the bull/bear mode toggle, the LED indicator, and the modal dialogs for each knob.

## External Assets
- **Google Fonts:** The UI uses the "Orbitron" and "Inter" fonts from Google Fonts.
- **Images:** The project uses various images for the background, knobs, toggle switch, and LED lights, all located in the `images/` directory.

## Build for Amplify
```Powershell
# npm run build --prefix control-panel-react

# npm run dev -- --prefix control-panel-react
```
