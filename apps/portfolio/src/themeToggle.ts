type Theme = "dark" | "light" | "system"

/**
 * Reads theme from local storage
 */
export function readTheme(): Theme {
    const data = localStorage.getItem("theme")

    if (
        !data || // data is falsy
        (data && data != "dark" && data != "light" && data != "system") // data is a non-empty string that's not a valid Theme
    ) {
        saveTheme("system")
        return "system"
    }

    return data as Theme
}

/**
 * Saves and sets the theme of the site at the same time
 */
export function saveTheme(theme: Theme): void {
    localStorage.setItem("theme", theme)
    setTheme(theme)
}

/**
 * Sets the theme of the site without saving it
 */
export function setTheme(theme: Theme): void {
    if (theme === "dark") document.documentElement.classList.add("dark")
    else document.documentElement.classList.remove("dark")
}

// watch theme preference state
window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", ({ matches }) => {
        // only respond to the event if the theme is set to system
        if (readTheme() != "system") return

        document.documentElement.classList.add("dark")
        document.documentElement.classList.remove("dark")

        setTheme(matches ? "dark" : "light")
    })
