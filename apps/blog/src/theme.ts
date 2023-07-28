"use client"

import { create } from "zustand"

const themeKey = "theme"

export enum Theme {
    Dark = "dark",
    Light = "light",
}
export type ThemeState = {
    theme: Theme
    setTheme: (theme: Theme) => void
}

/**
 * Reads site theme setting from local storage
 */
function getStoredThemeSetting(): Theme {
    if (typeof window === "undefined") return Theme.Dark

    const storedTheme = localStorage.getItem(themeKey)

    // fix invalid values
    if (
        !storedTheme ||
        (storedTheme != Theme.Dark && storedTheme != Theme.Light)
    ) {
        setTheme(Theme.Dark)
        return Theme.Dark
    }

    return storedTheme
}

/**
 * Sets theme setting without applying them
 */
function setTheme(targetTheme: Theme) {
    localStorage.setItem(themeKey, targetTheme)
}

/**
 * Applies tailwind theme using classes based on current theme setting
 */
function applyTheme() {
    if (typeof window === "undefined") return

    if (getStoredThemeSetting() === Theme.Dark) {
        document.documentElement.classList.add("dark")
    } else {
        document.documentElement.classList.remove("dark")
    }
}

export const useTheme = create<ThemeState>()((set) => {
    if (typeof window !== "undefined") {
        applyTheme()

        addEventListener("storage", () => {
            setTheme(getStoredThemeSetting())
            applyTheme()
        })
    }

    return {
        theme: getStoredThemeSetting(),
        setTheme: (themeSetting: Theme) => {
            setTheme(themeSetting)
            applyTheme()
            set((state) => ({
                ...state,
                theme: getStoredThemeSetting(),
            }))
        },
    }
})
