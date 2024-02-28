"use client"

import "./Toc.scss"

import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import { Collapse } from "react-collapse"

interface Props {
    data?: string
}

export default function Toc({ data }: Props) {
    const [isTocOpened, setIsTocOpened] = useState<boolean>(
        typeof window !== "undefined" &&
            localStorage.getItem("isTocOpened") === "true",
    )

    useEffect(() => {
        localStorage.setItem("isTocOpened", isTocOpened.toString())
    }, [isTocOpened])

    if (!data) return <></>

    return (
        <>
            <button
                className="w-full"
                onClick={() => setIsTocOpened((prev) => !prev)}
            >
                <strong>
                    Table of Contents{" "}
                    <FontAwesomeIcon
                        icon={isTocOpened ? faCaretUp : faCaretDown}
                    />
                </strong>
            </button>
            <Collapse isOpened={isTocOpened}>
                <div dangerouslySetInnerHTML={{ __html: data }} />
            </Collapse>
            <hr />
        </>
    )
}
