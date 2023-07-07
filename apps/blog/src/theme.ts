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
    const storedTheme = localStorage.getItem(themeKey)

    // fix invalid values
    if (
        !storedTheme ||
        (storedTheme != Theme.Dark && storedTheme != Theme.Light)
    ) {
        localStorage.setItem(themeKey, Theme.Dark)
        return Theme.Dark
    }

    return storedTheme
}

/**
 * Applies tailwind theme using classes based on current theme setting
 */
function applyTheme() {
    if (getStoredThemeSetting() === Theme.Dark) {
        document.documentElement.classList.add("dark")
    } else {
        document.documentElement.classList.remove("dark")
    }
}

export const useTheme = create<ThemeState>()((set) => {
    applyTheme()

    return {
        theme: getStoredThemeSetting(),
        setTheme: (themeSetting: Theme) => {
            localStorage.setItem(themeKey, themeSetting)
            applyTheme()
            set((state) => ({
                ...state,
                theme: getStoredThemeSetting(),
            }))
        },
    }
})
