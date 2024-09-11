// module.exports = {
//   plugins: {
//     tailwindcss: {},
//     autoprefixer: {},
//   },
// }

module.exports = {
  // parser: 'postcss-scss',
  // plugins: {
  //   tailwindcss: {},
  //   autoprefixer: {},
  // }
  plugins: [
    "tailwindcss",
    "postcss-nesting",
    [
      "postcss-preset-env",
      {
        autoprefixer: {
          flexbox: "no-2009",
        },
        stage: 3,
        features: {
          "custom-properties": false,
        },
      },
    ],
  ],
};
