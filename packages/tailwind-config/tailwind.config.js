/** @type {import('tailwindcss').Config} */
export default {
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                // UI
                /***/ "dark-ui": "#202225",
                /**/ "light-ui": "#FFFFFF",
                /***/ "dark-ui-hover": "#3F3F46",
                /**/ "light-ui-hover": "#EEEEEE",
                /***/ "dark-ui-bg": "#36393F",
                /**/ "light-ui-bg": "#F7F7F7",
                /***/ "dark-ui-border": "#555",
                /**/ "light-ui-border": "#CCC",

                // text
                /***/ "dark-text-default": "#EEEEEE",
                /**/ "light-text-default": "#111111",
                /***/ "dark-text-high-contrast": "#FFFFFF",
                /**/ "light-text-high-contrast": "#000000",
                /***/ "dark-text-gray": "#CCC",
                /**/ "light-text-gray": "#555",

                // anchor
                /*********/ anchor: "#66AAFF",
                /********/ "anchor-accent": "#4592F7",
                /***/ "dark-anchor-header": "#778899",
                /**/ "light-anchor-header": "#D3D3D3",

                // card
                /***/ "dark-card-bg": "#2F3136",
                /**/ "light-card-bg": "#FFFFFF",
                /***/ "dark-card-glow": "#FFFFFF33",
                /**/ "light-card-glow": "#00000040",

                // blockquote
                /***/ "dark-blockquote-bg": "#FFFFFF12",
                /**/ "light-blockquote-bg": "#0000000D",
                /***/ "dark-blockquote-accent": "#FFFFFF4D",
                /**/ "light-blockquote-accent": "#0000001A",

                // inline code
                /***/ "dark-inline-code-bg": "#444",
                /**/ "light-inline-code-bg": "#EEE",
                /***/ "dark-inline-code-text": "#FFFFFF",
                /**/ "light-inline-code-text": "#000000",
                /***/ "dark-inline-code-border": "#666",
                /**/ "light-inline-code-border": "#BBB",

                // block code
                // light theme using: highlight.js/styles/default.css
                // dark theme using: highlight.js/styles/atom-one-dark-reasonable.css
                /***/ "dark-block-code-border": "#555",
                /**/ "light-block-code-border": "#BBB",
                /***/ "dark-block-code-highlight": "#14161A",
                /**/ "light-block-code-highlight": "#DDDDDD",

                // footer
                /***/ "dark-footer-bg": "#000000",
                /**/ "light-footer-bg": "#FFFFFF",
                /***/ "dark-footer-text": "#808080",
                /* */ "light-footer-text": "#808080",

                // header
                /***/ "dark-header-bg": "#202225",
                /**/ "light-header-bg": "",
                /***/ "dark-header-hover": "#3F3F46",
                /**/ "light-header-hover": "",
                /***/ "dark-header-text": "#D4D4D8",
                /**/ "light-header-text": "",

                // input
                /***/ "dark-input-bg": "#36393F",
                /**/ "light-input-bg": "#EEEEEE",
                /***/ "dark-input-item-hover": "#202225",
                /**/ "light-input-item-hover": "#FFFFFF",
                /***/ "dark-input-border": "#555555",
                /**/ "light-input-border": "#CCCCCC",
                /***/ "dark-input-border-hover": "#808080",
                /**/ "light-input-border-hover": "#808080",
                /***/ "dark-input-border-focus": "#A3A3A3",
                /**/ "light-input-border-focus": "#000000",
                /***/ "dark-input-placeholder": "#A9A9A9",
                /**/ "light-input-placeholder": "#777777",

                // kbd
                /***/ "dark-kbd-bg": "#000000",
                /**/ "light-kbd-bg": "#F7F7F7",
                /***/ "dark-kbd-text": "#FFFFFF",
                /**/ "light-kbd-text": "#333333",
                /***/ "dark-kbd-border": "#555555",
                /**/ "light-kbd-border": "#CCCCCC",
                /***/ "dark-kbd-outer-shadow": "#FFFFFF4D",
                /**/ "light-kbd-outer-shadow": "#00000033",
                /***/ "dark-kbd-inner-shadow": "#000000",
                /**/ "light-kbd-inner-shadow": "#FFFFFF",

                // mark
                /***/ "dark-mark-bg": "#FFFF0080",
                /**/ "light-mark-bg": "#FFFF00BF",
                /***/ "dark-mark-text": "#FFFFFF",
                /**/ "light-mark-text": "#000000",

                // scrollbar
                /***/ "dark-scrollbar-track": "#18181B",
                /**/ "light-scrollbar-track": "#FFFFFF",
                /***/ "dark-scrollbar-thumb": "#888888",
                /**/ "light-scrollbar-thumb": "#DDDDDD",

                // scroll progress
                /***/ "dark-scroll-progress-bg": "#52525B",
                /**/ "light-scroll-progress-bg": "#D4D4D8",
                /***/ "dark-scroll-progress-fg": "#D4D4D8",
                /**/ "light-scroll-progress-fg": "#52525B",

                // table
                /***/ "dark-table-border": "#777777",
                /**/ "light-table-border": "#DDD",
                /***/ "dark-table-alt": "#21272E",
                /**/ "light-table-alt": "#F2F2F2",
            },
            fontFamily: {
                "noto-sans": ['"Noto Sans KR"', "sans-serif"],
                "source-code-pro": ['"Source Code Pro"', "monospace"],
            },
            boxShadow: {
                glow: "0 0px 10px",
            },
        },
    },
}
