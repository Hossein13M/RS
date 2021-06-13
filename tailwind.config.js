const { guessProductionMode } = require('@ngneat/tailwind');

module.exports = {
    prefix: 'tw-',
    purge: {
        enabled: guessProductionMode(),
        content: ['./src/**/*.{html,ts}'],
    },
    darkMode: 'class', // or 'media' or 'class'
    theme: {
        extend: {},
    },
    variants: {
        extend: {},
    },
    corePlugins: {
        preflight: false, // Todo(tailwind): unexpected behaviour in buttons
    },
    plugins: [require('@tailwindcss/aspect-ratio'), require('@tailwindcss/line-clamp'), require('@tailwindcss/typography')],
};
