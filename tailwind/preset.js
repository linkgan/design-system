/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        canvas: "var(--lds-color-bg-canvas)",
        surface: "var(--lds-color-bg-surface)",
        elevated: "var(--lds-color-bg-elevated)",
        muted: "var(--lds-color-bg-muted)",
        accent: {
          DEFAULT: "var(--lds-color-accent)",
          hover: "var(--lds-color-accent-hover)",
          subtle: "var(--lds-color-accent-subtle)",
        },
        ink: {
          primary: "var(--lds-color-text-primary)",
          secondary: "var(--lds-color-text-secondary)",
          muted: "var(--lds-color-text-muted)",
        },
        border: {
          DEFAULT: "var(--lds-color-border-default)",
          strong: "var(--lds-color-border-strong)",
        },
        positive: "var(--lds-color-positive)",
        negative: "var(--lds-color-negative)",
        "on-accent": "var(--lds-color-on-accent)",
      },
      fontFamily: {
        sans: "var(--lds-font-family-sans)",
        display: "var(--lds-font-family-display)",
        mono: "var(--lds-font-family-mono)",
      },
      fontSize: {
        xs: "var(--lds-text-xs)",
        sm: "var(--lds-text-sm)",
        base: "var(--lds-text-md)",
        lg: "var(--lds-text-lg)",
        xl: "var(--lds-text-xl)",
        "2xl": "var(--lds-text-2xl)",
        "3xl": "var(--lds-text-3xl)",
        "4xl": "var(--lds-text-4xl)",
        "5xl": "var(--lds-text-5xl)",
      },
      spacing: {
        0: "var(--lds-space-0)",
        1: "var(--lds-space-1)",
        2: "var(--lds-space-2)",
        3: "var(--lds-space-3)",
        4: "var(--lds-space-4)",
        5: "var(--lds-space-5)",
        6: "var(--lds-space-6)",
        8: "var(--lds-space-8)",
        10: "var(--lds-space-10)",
        12: "var(--lds-space-12)",
        16: "var(--lds-space-16)",
        20: "var(--lds-space-20)",
        24: "var(--lds-space-24)",
      },
      borderRadius: {
        sm: "var(--lds-radius-sm)",
        md: "var(--lds-radius-md)",
        lg: "var(--lds-radius-lg)",
        full: "var(--lds-radius-full)",
      },
      boxShadow: {
        sm: "var(--lds-shadow-sm)",
        md: "var(--lds-shadow-md)",
        lg: "var(--lds-shadow-lg)",
      },
      transitionDuration: {
        fast: "var(--lds-motion-fast)",
        base: "var(--lds-motion-base)",
        slow: "var(--lds-motion-slow)",
      },
      transitionTimingFunction: {
        out: "var(--lds-ease-out)",
        standard: "var(--lds-ease-standard)",
      },
      maxWidth: {
        layout: "var(--lds-layout-max)",
        narrow: "var(--lds-layout-narrow)",
      },
    },
  },
};
