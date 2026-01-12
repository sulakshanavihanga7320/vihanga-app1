/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                dark: {
                    900: '#0a0a0a',
                    800: '#171717',
                    700: '#262626',
                },
                primary: {
                    400: '#60a5fa',
                    500: '#3b82f6', // Professional Blue
                    600: '#2563eb',
                    900: '#1e3a8a',
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
