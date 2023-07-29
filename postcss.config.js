const purgecss = ["@fullhuman/postcss-purgecss", {
    content: ["./pages/*.js", "./pages/**/*.js", "./components/Landing/*.js", "./components/Landing/**/*.js",],
    whitelistPatterns: [/^slick-/],
    defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
},]

module.exports = {
    plugins: ["postcss-import", "tailwindcss", "autoprefixer"],
}
