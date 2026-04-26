import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#11141E',
          blue: '#0D66B4',
          sky: '#40AEE7',
          white: '#FAFBFB',
          border: '#B9C9D3',
          skin: '#9B7464',
        },
      },
      fontFamily: {
        heading: ['var(--font-jakarta)', 'sans-serif'],
        body: ['var(--font-inter)', 'sans-serif'],
      },
      borderRadius: {
        card: '24px',
        btn: '16px',
      },
      fontSize: {
        hero: ['clamp(2.5rem, 5vw, 4rem)', { lineHeight: '1.2' }],
        xl: ['clamp(1.875rem, 3vw, 2.25rem)', { lineHeight: '1.3' }],
        lg: ['clamp(1.25rem, 2.5vw, 1.875rem)', { lineHeight: '1.4' }],
        base: ['clamp(1rem, 1.5vw, 1.125rem)', { lineHeight: '1.5' }],
      },
    },
  },
  plugins: [],
}

export default config
