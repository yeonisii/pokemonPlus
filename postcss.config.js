/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {}, // Autoprefixer 플러그인 추가
  },
};

module.exports = config; // CommonJS 모듈 형식으로 변경
