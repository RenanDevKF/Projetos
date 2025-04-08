/**
 * This is a minimal config.
 *
 * If you need the full config, get it from here:
 * https://unpkg.com/browse/tailwindcss@latest/stubs/defaultConfig.stub.js
 */

module.exports = {
    content: [
      /**
       * HTML. Paths to Django template files that will contain Tailwind CSS classes.
       */
  
      /* Templates within theme app (<tailwind_app_name>/templates), e.g. base.html. */
      '../templates/**/*.html',
  
      /*
       * Main templates directory of the project (BASE_DIR/templates).
       * Adjust the following line to match your project structure.
       */
      '../../templates/**/*.html',
  
      /*
       * Templates in other django apps (BASE_DIR/<any_app_name>/templates).
       * Adjust the following line to match your project structure.
       */
      '../../**/templates/**/*.html',
  
      /* JavaScript files that might contain Tailwind CSS classes */
      './static/js/**/*.js',
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
      },
    },
    plugins: [
      require('@tailwindcss/forms'),
      require('@tailwindcss/typography'),
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  