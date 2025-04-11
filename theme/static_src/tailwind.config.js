/**
 * This is a minimal config.
 *
 * If you need the full config, get it from here:
 * https://unpkg.com/browse/tailwindcss@latest/stubs/defaultConfig.stub.js
 */

module.exports = {
  content: [
    // Templates dentro do app de tema
    '../templates/**/*.html',

    // Templates principais do projeto
    '../../templates/**/*.html',

    // Templates de outros apps Django
    '../../**/templates/**/*.html',

    // JS com classes Tailwind
    './static/js/**/*.js',
  ],
  safelist: [
    'scale-105',
    'scale-95',
    'transition-transform',
    'border-2',
    'border-fatho-gold',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'hsl(142, 30%, 50%)',
          foreground: 'hsl(210, 40%, 98%)',
        },
        secondary: {
          DEFAULT: 'hsl(142, 30%, 96%)',
          foreground: 'hsl(142, 30%, 30%)',
        },
        fatho: {
          mint: '#d4e8d9',
          dark: '#333333',
          gold: '#c8a97e',
          light: '#f5f9f6',
          background: 'hsl(150, 30%, 98%)',
          foreground: 'hsl(222.2, 84%, 4.9%)',
        },
      },
      scale: {
        95: '0.95',
        100: '1',
        105: '1.05',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.fatho.dark'),
            a: {
              color: theme('colors.primary.DEFAULT'),
              '&:hover': {
                color: theme('colors.fatho.gold'),
              },
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
};
