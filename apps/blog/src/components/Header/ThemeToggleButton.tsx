import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { Theme, useTheme } from "@/theme"

export default function ThemeToggleButton() {
    const { theme, setTheme } = useTheme()

    return (
        <button
            onClick={() =>
                setTheme(theme === Theme.Dark ? Theme.Light : Theme.Dark)
            }
            className="flex w-20 items-center justify-center hover:bg-light-ui-hover dark:scale-x-[-1] dark:hover:bg-dark-ui-hover"
            aria-label="theme toggle"
        >
            {theme === Theme.Dark ? (
                <FontAwesomeIcon icon={faMoon} />
            ) : (
                <FontAwesomeIcon icon={faSun} />
            )}
        </button>
    )
}
