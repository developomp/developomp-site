import { readFileSync } from "fs"
import merge from "merge-deep"
import { DeepPartial } from "utility-types"

import type { Theme } from "../.."
import BaseTheme from "../dark"

export default merge<Theme, DeepPartial<Theme>>(BaseTheme, {
    color: {
        text: {
            highContrast: "#000000",
            default: "#111111",
            gray: "#555",
        },
        background: "#F7F7F7",
    },
    component: {
        anchor: {
            color: {
                header: "#D3D3D3",
            },
        },

        blockQuote: {
            color: {
                background: "#0000000D",
                borderLeft: "#0000001A",
            },
        },

        card: {
            color: {
                background: "#FFFFFF",
                hoverGlow: "#00000040",
            },
        },

        code: {
            inline: {
                color: {
                    text: "#000000",
                    background: "#EEE",
                    border: "#BBB",
                },
            },
            block: {
                color: {
                    border: "#BBB",
                    highlight: "#DDDDDD",
                },
                style: readFileSync(__dirname + "/codeblock.css", "utf-8"),
            },
        },

        footer: {
            color: {
                background: "#FFFFFF",
                text: "",
            },
        },

        input: {
            color: {
                background: {
                    default: "#EEEEEE",
                    itemHover: "#FFFFFF",
                },
                border: {
                    default: "#CCCCCC",
                    hover: "#808080",
                    focus: "#000000",
                },
                placeHolder: "#777777",
            },
        },

        kbd: {
            color: {
                text: "#333333",
                border: "#CCCCCC",
                outerShadow: "#00000033",
                innerShadow: "#FFFFFF",
                background: "#F7F7F7",
            },
        },

        mark: {
            color: {
                text: "#000000",
                background: "#FFFF00BF",
            },
        },

        scrollbar: {
            color: {
                track: "#FFFFFF",
                thumb: "#DDDDDD",
            },
        },

        scrollProgressBar: {
            color: {
                background: "#d4d4d8", // zinc-300
                foreground: "#52525b", // zinc-600
            },
        },

        table: {
            color: {
                border: "#DDD",
                even: "#F2F2F2",
            },
        },

        ui: {
            color: {
                background: {
                    default: "#FFFFFF",
                    hover: "#EEEEEE",
                },
                border: "#CCC",
            },
        },
    },
}) as Theme
