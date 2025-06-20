# Scrum Dashboard Theme System

## Overview

Your app now has a comprehensive theme system that provides consistent dark styling across all pages. The system uses DaisyUI with a custom `scrum-dark` theme as the default.

## Available Themes

1. **`scrum-dark`** (Default) - Your custom dark theme with purple/blue accent colors
2. **`light`** - Standard light theme
3. **`dark`** - Standard dark theme

## How to Use the Theme System

### 1. **Automatic Theme Application**

The theme is automatically applied to your entire app through the `ThemeProvider` in `src/app/layout.tsx`. All pages will use the `scrum-dark` theme by default.

### 2. **DaisyUI Theme Classes**

Use these DaisyUI classes for consistent styling:

```tsx
// Background colors
className="bg-base-100"     // Main background (black)
className="bg-base-200"     // Secondary background (dark gray)
className="bg-base-300"     // Tertiary background (lighter gray)

// Text colors
className="text-base-content"  // Primary text (white)
className="text-primary"       // Purple accent
className="text-secondary"     // Blue accent
className="text-muted"         // Muted text (70% opacity)

// Cards
className="card card-dark"     // Dark card with border
className="card bg-base-200"   // Alternative card styling

// Buttons
className="btn btn-primary"    // Purple button
className="btn btn-secondary"  // Blue button
className="btn btn-ghost"      // Ghost button
```

### 3. **Custom Utility Classes**

Use these custom utility classes for common patterns:

```tsx
// Text utilities
className="text-muted"         // Muted text (70% opacity)
className="text-secondary"     // Secondary text (50% opacity)

// Card utilities
className="card-dark"          // Dark card with border and shadow

// Background utilities
className="gradient-bg"        // Purple to blue gradient background
className="hero-gradient"      // Hero section gradient
```

### 4. **Theme Switching**

Users can switch themes using the theme toggle in the navbar. The theme preference is saved in localStorage.

### 5. **Creating New Pages**

When creating new pages, use the theme classes instead of hardcoded colors:

```tsx
// ✅ Good - Uses theme system
<div className="bg-base-100 text-base-content">
  <h1 className="text-primary">Title</h1>
  <p className="text-muted">Description</p>
  <div className="card card-dark">
    <div className="card-body">
      Content
    </div>
  </div>
</div>

// ❌ Bad - Hardcoded colors
<div className="bg-black text-white">
  <h1 className="text-purple-400">Title</h1>
  <p className="text-gray-300">Description</p>
  <div className="bg-gray-900 border border-gray-800">
    Content
  </div>
</div>
```

## Theme Colors

### Primary Colors (Purple)
- `primary`: #9333ea (Purple-600)
- `primary-focus`: #7c3aed (Purple-700)

### Secondary Colors (Blue)
- `secondary`: #3b82f6 (Blue-500)
- `secondary-focus`: #2563eb (Blue-600)

### Background Colors
- `base-100`: #000000 (Black)
- `base-200`: #111827 (Gray-900)
- `base-300`: #1f2937 (Gray-800)

### Text Colors
- `base-content`: #ffffff (White)
- `text-muted`: 70% opacity white
- `text-secondary`: 50% opacity white

## Customizing the Theme

To modify the theme colors, edit the `scrum-dark` theme in `tailwind.config.ts`:

```ts
'scrum-dark': {
  "primary": "#9333ea",        // Change primary color
  "secondary": "#3b82f6",      // Change secondary color
  "base-100": "#000000",       // Change main background
  // ... other colors
}
```

## Adding New Utility Classes

To add new utility classes, edit `src/app/globals.css`:

```css
@layer components {
  .your-custom-class {
    @apply bg-base-200 text-primary border border-base-300;
  }
}
```

## Best Practices

1. **Always use theme classes** instead of hardcoded colors
2. **Use semantic class names** like `text-muted` instead of `text-gray-300`
3. **Leverage DaisyUI components** for consistent styling
4. **Test with different themes** to ensure accessibility
5. **Use the custom utility classes** for common patterns

## Migration Guide

If you have existing pages with hardcoded colors, replace them with theme classes:

| Old | New |
|-----|-----|
| `bg-black` | `bg-base-100` |
| `bg-gray-900` | `bg-base-200` |
| `text-white` | `text-base-content` |
| `text-gray-300` | `text-muted` |
| `text-purple-400` | `text-primary` |
| `text-blue-400` | `text-secondary` |
| `border-gray-800` | `border-base-300` |

This theme system ensures your app has consistent, professional styling that's easy to maintain and customize! 