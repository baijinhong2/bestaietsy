/**
 * bestaietsy.com — Brand Tokens
 * Inspired by Etsy's warm, handmade aesthetic.
 * Primary: Etsy Orange (#F1641E)
 * Secondary: warm browns + cream
 */

export const brand = {
  // === Primary: Etsy-inspired warm orange palette ===
  colors: {
    // Primary (Etsy orange family)
    orange: {
      50: '#FFF4ED',
      100: '#FFE5D4',
      200: '#FFC9A8',
      300: '#FFA171',
      400: '#F18C4A',
      500: '#F1641E', // ← Etsy official orange (PRIMARY)
      600: '#D8500F',
      700: '#B23E0C',
      800: '#8C310A',
      900: '#662407',
    },

    // Secondary: warm brown (craft/leather vibes)
    brown: {
      50: '#FAF5F0',
      100: '#F2E7DA',
      200: '#E4CDB4',
      300: '#D2AE89',
      400: '#BC8F5E',
      500: '#A37545',
      600: '#8B5E36',
      700: '#6F4827',
      800: '#55371E',
      900: '#3E2815',
    },

    // Tertiary: cream (background)
    cream: {
      50: '#FFFCF7',
      100: '#FFF8EC',
      200: '#FFF1D9',
      300: '#FFE4B5',
      400: '#FCD9A0',
      500: '#F4C97D',
    },

    // Accent: deep red (alerts/CTA emphasis)
    red: {
      500: '#D32F2F',
      600: '#B71C1C',
      700: '#931414',
    },

    // Neutrals
    neutral: {
      0: '#FFFFFF',
      50: '#FAFAFA',
      100: '#F5F5F4',
      200: '#E7E5E4',
      300: '#D6D3D1',
      400: '#A8A29E',
      500: '#78716C',
      600: '#57534E',
      700: '#44403C',
      800: '#292524',
      900: '#1C1917',
      950: '#0F0D0C',
    },
  },

  // === Typography ===
  fonts: {
    // Display: warm serif (Etsy uses custom "Tangerine"; we use Playfair Display as a free alternative)
    display: '"Playfair Display", "Tangerine", Georgia, serif',
    // Body: clean sans (Etsy uses "Graphik"; we use Inter)
    body: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    // Mono: for code/technical content
    mono: '"JetBrains Mono", "SF Mono", Menlo, monospace',
  },

  // === Spacing (Tailwind default + custom) ===
  spacing: {
    section: '5rem',
    container: '1280px',
    content: '720px',
  },

  // === Border Radius ===
  radius: {
    sm: '0.375rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    '2xl': '1.5rem',
    full: '9999px',
  },

  // === Shadows ===
  shadows: {
    sm: '0 1px 2px 0 rgba(244, 100, 30, 0.05)',
    md: '0 4px 6px -1px rgba(244, 100, 30, 0.08), 0 2px 4px -2px rgba(244, 100, 30, 0.06)',
    lg: '0 10px 15px -3px rgba(244, 100, 30, 0.10), 0 4px 6px -4px rgba(244, 100, 30, 0.08)',
    xl: '0 20px 25px -5px rgba(244, 100, 30, 0.10), 0 8px 10px -6px rgba(244, 100, 30, 0.08)',
  },
} as const;

// === Tailwind config helper ===
export const tailwindTheme = {
  extend: {
    colors: {
      primary: brand.colors.orange,
      secondary: brand.colors.brown,
      cream: brand.colors.cream,
      accent: brand.colors.red,
    },
    fontFamily: {
      display: brand.fonts.display.split(',').map((f) => f.trim()),
      sans: brand.fonts.body.split(',').map((f) => f.trim()),
      mono: brand.fonts.mono.split(',').map((f) => f.trim()),
    },
    boxShadow: brand.shadows,
    borderRadius: brand.radius,
  },
};

export default brand;