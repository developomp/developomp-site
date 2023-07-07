import { useCallback, useEffect, useState } from "react"
import { useLocation } from "wouter"

const st = "scrollTop"
const sh = "scrollHeight"
const h = document.documentElement
const b = document.body

// https://stackoverflow.com/a/8028584/12979111
function calculateScrollPercent() {
    return ((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) * 100
}

export default function ReadProgress() {
    const [scroll, setScroll] = useState(0)
    const [location] = useLocation()
    const scrollHandler = useCallback(() => {
        setScroll(calculateScrollPercent())
    }, [])

    useEffect(() => {
        const resizeObserver = new ResizeObserver(() => {
            scrollHandler()
        })

        resizeObserver.observe(document.body)
        window.addEventListener("scroll", scrollHandler)

        // progress bar gets de-synced after
        const intervalId = setInterval(() => {
            scrollHandler()
        }, 1000)

        return () => {
            clearInterval(intervalId)
            resizeObserver.disconnect()
            window.removeEventListener("scroll", scrollHandler)
        }
    })

    // a hack to fix progress bar de-sync on navigation
    useEffect(() => {
        setTimeout(() => {
            scrollHandler()
        }, 100)
    }, [location])

    return (
        <div className="h-1 bg-light-scroll-progress-bg dark:bg-dark-scroll-progress-bg">
            <div
                className="h-full bg-light-scroll-progress-fg dark:bg-dark-scroll-progress-fg"
                style={{ width: `${scroll}%` }}
            />
        </div>
    )
}
