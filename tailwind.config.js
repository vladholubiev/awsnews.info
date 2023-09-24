/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        'ua-blue': {
          200: '#4c89cc',
          300: '#3278c5',
          400: '#1967be',
          500: '#0057b7',
          600: '#004592',
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {height: 0},
          to: {height: "var(--radix-accordion-content-height)"},
        },
        "accordion-up": {
          from: {height: "var(--radix-accordion-content-height)"},
          to: {height: 0},
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': theme('colors.zinc.600'),
            '--tw-prose-headings': theme('colors.zinc.900'),
            '--tw-prose-links': theme('colors.ua-blue.500'),
            '--tw-prose-links-hover': theme('colors.ua-blue.600'),
            '--tw-prose-underline': theme('colors.ua-blue.500 / 0.2'),
            '--tw-prose-underline-hover': theme('colors.ua-blue.500'),
            '--tw-prose-bold': theme('colors.zinc.900'),
            '--tw-prose-counters': theme('colors.zinc.900'),
            '--tw-prose-bullets': theme('colors.zinc.900'),
            '--tw-prose-hr': theme('colors.zinc.100'),
            '--tw-prose-quote-borders': theme('colors.zinc.200'),
            '--tw-prose-captions': theme('colors.zinc.400'),
            '--tw-prose-code': theme('colors.zinc.700'),
            '--tw-prose-code-bg': theme('colors.zinc.300 / 0.2'),
            '--tw-prose-pre-code': theme('colors.zinc.100'),
            '--tw-prose-pre-bg': theme('colors.zinc.900'),
            '--tw-prose-pre-border': 'transparent',
            '--tw-prose-th-borders': theme('colors.zinc.200'),
            '--tw-prose-td-borders': theme('colors.zinc.100'),

            '--tw-prose-invert-body': theme('colors.zinc.400'),
            '--tw-prose-invert-headings': theme('colors.zinc.200'),
            '--tw-prose-invert-links': theme('colors.ua-blue.200'),
            '--tw-prose-invert-links-hover': theme('colors.ua-blue.200'),
            '--tw-prose-invert-underline': theme('colors.ua-blue.200 / 0.3'),
            '--tw-prose-invert-underline-hover': theme('colors.ua-blue.400'),
            '--tw-prose-invert-bold': theme('colors.zinc.200'),
            '--tw-prose-invert-counters': theme('colors.zinc.200'),
            '--tw-prose-invert-bullets': theme('colors.zinc.200'),
            '--tw-prose-invert-hr': theme('colors.zinc.700 / 0.4'),
            '--tw-prose-invert-quote-borders': theme('colors.zinc.500'),
            '--tw-prose-invert-captions': theme('colors.zinc.500'),
            '--tw-prose-invert-code': theme('colors.zinc.300'),
            '--tw-prose-invert-code-bg': theme('colors.zinc.200 / 0.05'),
            '--tw-prose-invert-pre-code': theme('colors.zinc.100'),
            '--tw-prose-invert-pre-bg': 'rgb(0 0 0 / 0.4)',
            '--tw-prose-invert-pre-border': theme('colors.zinc.200 / 0.1'),
            '--tw-prose-invert-th-borders': theme('colors.zinc.700'),
            '--tw-prose-invert-td-borders': theme('colors.zinc.800'),

            // Inline elements
            a: {
              color: 'var(--tw-prose-links)',
              fontWeight: theme('fontWeight.semibold'),
              textDecoration: 'underline',
              textDecorationColor: 'var(--tw-prose-underline)',
              transitionProperty: 'color, text-decoration-color',
              transitionDuration: theme('transitionDuration.150'),
              transitionTimingFunction: theme('transitionTimingFunction.in-out'),
            },
            'a:hover': {
              color: 'var(--tw-prose-links-hover)',
              textDecorationColor: 'var(--tw-prose-underline-hover)',
            },
          }
        }
      }),
    },
  },
  plugins: [require("tailwindcss-animate"), require('@tailwindcss/typography')],
}
