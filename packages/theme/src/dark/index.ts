import type { Theme } from "../.."

import { readFileSync } from "fs"

export default {
    font: {
        sansSerif: "'Noto Sans KR', sans-serif", // https://fonts.google.com/noto/specimen/Noto+Sans+KR
        monospace: "'Source Code Pro', monospace",
    },

    color: {
        text: {
            highContrast: "#FFFFFF",
            default: "#EEEEEE",
            gray: "#CCC",
        },
        background: "#36393F",
    },

    maxDisplayWidth: {
        mobile: "1024px", // max-w-screen-lg
        desktop: "1536px", // max-w-screen-2xl
    },

    component: {
        anchor: {
            color: {
                default: "#66AAFF",
                hover: "#4592F7",
                active: "#4592F7",
                header: "#778899",
            },
        },

        blockQuote: {
            color: {
                background: "#FFFFFF12",
                borderLeft: "#FFFFFF4D",
            },
        },

        card: {
            color: {
                background: "#2F3136",
                hoverGlow: "#FFFFFF33",
            },
        },

        code: {
            inline: {
                color: {
                    text: "#FFFFFF",
                    background: "#444",
                    border: "#666",
                },
            },
            block: {
                color: {
                    border: "#555",
                    highlight: "#14161A",
                },
                style: readFileSync(__dirname + "/codeblock.css", "utf-8"),
            },
        },

        footer: {
            color: {
                background: "#000000",
                text: "",
            },
        },

        header: {
            color: {
                background: "#202225", // custom
                hover: "#3F3F46", // zinc-700
                text: "#D4D4D8", // zinc-300
            },
            height: "16px", // h-4
        },

        input: {
            color: {
                background: {
                    default: "#36393f",
                    itemHover: "#202225",
                },
                border: {
                    default: "#555555",
                    hover: "#808080",
                    focus: "#a3a3a3", // neutral-400
                },
                placeHolder: "#A9A9A9",
            },
        },

        kbd: {
            color: {
                text: "#FFFFFF",
                border: "#555555",
                outerShadow: "#FFFFFF4D",
                innerShadow: "#000000",
                background: "#000000",
            },
        },

        mark: {
            color: {
                text: "#FFFFFF",
                background: "#FFFF0080",
            },
        },

        scrollbar: {
            color: {
                track: "#18181B",
                thumb: "#888888",
            },
            width: "8px", // w-2
            borderRadius: "4px", // rounded
        },

        scrollProgressBar: {
            color: {
                background: "#52525B", // zinc 600
                foreground: "#D4D4D8", // zinc-300
            },
        },

        table: {
            color: {
                border: "#777777",
                even: "#21272E",
            },
        },

        ui: {
            color: {
                background: {
                    default: "#202225",
                    hover: "#3F3F46", // zinc-700
                },
                border: "#555",
            },
        },
    },
} as Theme
