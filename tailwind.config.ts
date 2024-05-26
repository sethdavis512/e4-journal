import type { Config } from 'tailwindcss';
import { wedgesTW, wedgesPalette } from '@lemonsqueezy/wedges';

const green = wedgesPalette.green;
green;

export default {
    content: [
        './app/**/*.{js,jsx,ts,tsx}',
        'node_modules/@lemonsqueezy/wedges/dist/**/*.{js,ts,jsx,tsx}'
    ],
    theme: {
        extend: {}
    },
    darkMode: 'class',
    plugins: [
        wedgesTW({
            themes: {
                // dark: {
                //     extend: 'dark',
                //     colors: {
                //         primary: green
                //     }
                // },
                // light: {
                //     extend: 'light',
                //     colors: {
                //         primary: green
                //     }
                // }
            }
        })
    ]
} satisfies Config;
