module.exports = {
    //...
    plugins: [
        require('daisyui'),
    ],
    daisyui: {
        themes: [
            "light",
            "dark",
            "lofi",,
            "black",
            "winter",
            "sunset",
            "forest",
            "pastel",
            "cmyk",
        ],
        styled: true,
        theme: {
            theme: {
                extend: {
                    spacing: {
                        '5px': '5px',
                    }
                }
            }
        }
    },
}