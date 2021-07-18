const { guessProductionMode } = require('@ngneat/tailwind');
const colors = require('tailwindcss/colors');

module.exports = {
    prefix: '',
    important: true,
    purge: {
        enabled: guessProductionMode(),
        content: ['./src/**/*.{html,ts}'],
    },
    darkMode: 'class', // or 'media' or 'class'
    theme: {
        extend: {
            boxShadow: {
                blue: '0 1px 3px 0 ' + colors.blue['100'],
                'blue-lg': '0 10px 15px -3px ' + colors.blue['200'],
                green: '0 1px 3px 0 ' + colors.green['100'],
                'green-lg': '0 10px 15px -3px ' + colors.green['200'],
                yellow: '0 1px 3px 0 ' + colors.yellow['100'],
                'yellow-lg': '0 10px 15px -3px ' + colors.yellow['200'],
                pink: '0 1px 3px 0 ' + colors.pink['100'],
                'pink-lg': '0 10px 15px -3px ' + colors.pink['200'],
            },
        },
    },
    variants: {
        extend: {
            backgroundColor: ['even', 'odd'],
        },
    },
    corePlugins: {
        preflight: false, // Todo(tailwind): unexpected behaviour in buttons
    },
    plugins: [
        require('postcss-import'),
        require('autoprefixer'),
        require('tailwindcss'),
        require('@tailwindcss/aspect-ratio'),
        require('@tailwindcss/line-clamp'),
        require('@tailwindcss/typography'),
    ],
};
