import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // Vite에서 사용할 파일 경로
  ],
  theme: {
    extend: {
      colors: {
        rookieRed: '#8A1C1C',
        rookieHover: '#A82828',
        mainRed: '#CEA1A1',
        mainText: '#767676'
      }
    },
  },
  plugins: [
    daisyui,
  ],
};

