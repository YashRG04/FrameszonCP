/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["*"],
    theme: {
        extend: {
            backgroundImage: {
                "location-sm": "url('/img/location.png')",
                "location-md": "url('/img/location.png')",
                "wintersale-md": "url('/img/wintersale.png')",
                "wintersale-sm": "url('/img/wintersale.png')",
                "walkin-sm": "url('/img/walkin.png')",
                "walkin-md": "url('/img/walkin.png')",
            },
        },
    },
    plugins: [require("daisyui")],
};