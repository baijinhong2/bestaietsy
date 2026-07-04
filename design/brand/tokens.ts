/**
 * bestaietsy.com — Brand Tokens v2
 * Warm internet publication aesthetic · no pure black/white
 * Primary: Etsy Orange (#F1641E)
 * Accent: Forest Green (#3D7052) for nature/trust
 */

export const brand = {
  // === Primary: Etsy-inspired warm orange ===
  colors: {
    // Primary (orange family — Etsy warm)
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

    // Secondary: warm brown (replaces black for text/UI)
    brown: {
      50: '#FAF5F0',
      100: '#F2E7DA',
      200: '#E4CDB4',
      300: '#D2AE89',
      400: '#BC8F5E',
      500: '#A37545',
      600: '#8B5E36', // ← primary text color
      700: '#6F4827',
      800: '#55371E',
      900: '#3E2815', // ← darkest (replaces black)
    },

    // Tertiary: cream (background, replaces white)
    cream: {
      50: '#FFFCF7', // ← page background (replaces white)
      100: '#FFF8EC', // ← card background
      200: '#FFF1D9', // ← subtle accent
      300: '#FFE4B5',
      400: '#FCD9A0',
      500: '#F4C97D',
    },

    // Accent 1: Forest Green (Etsy-natural, trust signals)
    green: {
      50: '#EDF4EE',
      100: '#D4E5D8',
      200: '#A9CBB1',
      300: '#7DAB89',
      400: '#5A8D68',
      500: '#3D7052', // ← primary accent green
      600: '#2F5A41',
      700: '#234431',
      800: '#173021',
      900: '#0B1C12',
    },

    // Accent 2: Coral (warm warning/CTA — replaces red)
    coral: {
      50: '#FFF1F0',
      100: '#FFDAD4',
      200: '#FFB5A8',
      300: '#FF8B7B',
      400: '#F26A57',
      500: '#D8500F', // similar to orange 600
      600: '#B23E0C',
      700: '#8C310A',
    },

    // Accent 3: Mustard (CTA hover, highlights)
    mustard: {
      50: '#FCF6E5',
      100: '#F8EBC2',
      200: '#F0D580',
      300: '#E8C04D',
      400: '#D9A52E',
      500: '#B88A1F', // ← highlight/secondary CTA
    },

    // Note: NO neutral/black/white — replaced by brown + cream above.
    // For UI dividers, use brown-200 (#E4CDB4) instead of gray.
    // For text, use brown-600/700/900 instead of black.
    // For backgrounds, use cream-50/100 instead of white.
  },

  // === Typography ===
  fonts: {
    // Display: warm serif (for major headlines)
    display: '"Playfair Display", Georgia, serif',
    // Body: clean sans (most text)
    body: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    // Mono: for code/data
    mono: '"JetBrains Mono", "SF Mono", Menlo, monospace',
  },

  // === Spacing ===
  spacing: {
    section: '5rem',
    container: '1280px',
    content: '720px',
  },

  // === Border Radius (rounder = warmer) ===
  radius: {
    sm: '0.375rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    '2xl': '1.5rem',
    '3xl': '2rem',
    full: '9999px',
  },

  // === Shadows (warm-tinted, not gray) ===
  shadows: {
    sm: '0 1px 2px 0 rgba(139, 94, 54, 0.06)',
    md: '0 4px 6px -1px rgba(139, 94, 54, 0.08), 0 2px 4px -2px rgba(139, 94, 54, 0.06)',
    lg: '0 10px 15px -3px rgba(139, 94, 54, 0.10), 0 4px 6px -4px rgba(139, 94, 54, 0.08)',
    xl: '0 20px 25px -5px rgba(139, 94, 54, 0.10), 0 8px 10px -6px rgba(139, 94, 54, 0.08)',
    'inner-warm': 'inset 0 2px 4px 0 rgba(241, 100, 30, 0.06)',
  },

  // === Icon library (per user requirement: no emoji) ===
  icons: 'lucide-react',
} as const;

// === Tailwind theme extension ===
export const tailwindTheme = {
  extend: {
    colors: {
      primary: brand.colors.orange,
      secondary: brand.colors.brown,
      cream: brand.colors.cream,
      accent: brand.colors.green,
      coral: brand.colors.coral,
      mustard: brand.colors.mustard,
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