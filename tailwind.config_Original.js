/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1E3A8A', // Dark Blue  '#1E3A8A'
          light: '#93C5FD',   // Light Blue
          dark: '#152a62',   // Light Blue
        },
        accent: {
          DEFAULT: '#38b2ac', // Soft Yellow  '#FDE68A'
        },
        neutral: {
          DEFAULT: '#F3F4F6', // Light Gray for background
          dark: '#4B5563',    // Dark Gray for text
        },
        secondary: '#ffed4a'
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

