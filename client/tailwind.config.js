export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial']
      },
      colors: {
        primary: '#4F46E5',
        secondary: '#8B5CF6',
        accent: '#3B82F6',
        surface: {
          light: '#F1F5F9',
          soft: '#F5F3FF',
          card: '#FFFFFF'
        },
        text: {
          heading: '#0F172A',
          body: '#64748B'
        }
      },
      borderRadius: {
        '24': '24px'
      }
    }
  },
  plugins: []
};
