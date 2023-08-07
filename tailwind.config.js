module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      screens: {
        'xxsm': '350px',
        'xmsm': '448px',
        'xsm': '600px',
        "slg": "745px",
        'mdb': '767.5px',
        'xmd': '950px',
        'mlg': '990px',
        'xlg': '1120px',
      }
    },
  },
  plugins: [],
};