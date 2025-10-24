# OS.js Application Features Documentation

## Overview

This document describes the custom features implemented in the OS.js application, including the macOS theme, icon path fixes, and work hour counter.

## Features Implemented

### 1. macOS Theme

A custom macOS theme has been implemented to give the OS.js desktop a macOS-like appearance. The theme includes:

- Custom window styling with traffic light buttons (red, yellow, green)
- Panel styling with dark translucent background
- macOS-style buttons and input elements
- Custom scrollbar styling
- Overall macOS aesthetic with rounded corners and appropriate shadows

The theme files are located in:
- `src/packages/macOS-theme/dist/main.css` - CSS styling
- `src/packages/macOS-theme/dist/main.js` - Theme configuration

### 2. Icon Path Fix

Fixed an issue where icons were not loading correctly due to incorrect path resolution. The problem was that icon URLs were being generated with a double `/icons/` path, such as:
```
/icons/Gnome/icons/system-search.png
```

Instead of the correct path:
```
/icons/Gnome/system-search.png
```

The fix is implemented in `src/custom-components/icon-path-fix.js` and includes:

- XMLHttpRequest override to intercept and fix icon URLs
- Fetch API override for modern browser support
- Image constructor override for dynamic image loading
- Direct theme icon function patching

### 3. Work Hour Counter

A work hour counter component has been added to the top-right corner of the desktop. This component:

- Tracks elapsed time in HH:MM:SS format
- Calculates earnings based on a configurable hourly rate ($25.00 by default)
- Provides Start/Stop and Reset controls
- Features macOS-style UI with gradient buttons and translucent background
- Updates in real-time every second

The component is implemented in `src/client/index.js` and is initialized when the OS.js core starts.

## Configuration

### Theme Configuration

The macOS theme is configured in `src/client/config.js`:

```javascript
export default {
  // ... other config
  desktop: {
    settings: {
      theme: 'MacOSTheme',
      icons: 'Gnome'
    }
  }
};
```

### Work Hour Counter Customization

The work hour counter can be customized by modifying the hourly rate in the WorkHourCounter class:

```javascript
class WorkHourCounter {
  constructor(core) {
    // ... 
    this.hourlyRate = 25.00; // Default hourly rate in USD
    // ...
  }
}
```

## Build and Deployment

### Building the Application

To build the OS.js application with all custom features:

```bash
cd OS.js
npm run build
```

### Running the Application

To run the OS.js application:

```bash
cd OS.js
npm run serve
```

The application will be available at `http://localhost:8000`.

## Troubleshooting

### Icon Issues

If icons are not displaying correctly:

1. Ensure the icon path fix script is included in `src/client/index.ejs`
2. Verify that the Gnome icons package is installed
3. Check the browser console for any 404 errors related to icon files

### Theme Issues

If the macOS theme is not applying correctly:

1. Verify that the theme files exist in `src/packages/macOS-theme/dist/`
2. Check that the theme name in `config.js` matches the theme package name
3. Ensure the theme package is listed in `packages.json`

### Work Hour Counter Issues

If the work hour counter is not appearing:

1. Verify that the WorkHourCounter class is properly implemented in `index.js`
2. Check that the component is initialized in the OS.js core startup event
3. Look for any JavaScript errors in the browser console