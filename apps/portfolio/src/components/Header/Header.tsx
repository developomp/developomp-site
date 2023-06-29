import { type FC } from "react"
import { Link } from "wouter"

const Header: FC = () => {
    return (
        <header className="fixed top-0 z-50 flex w-screen justify-center dark:bg-dark-ui dark:text-dark-text-default">
            <div className="my-0 flex h-16 w-full max-w-5xl items-center">
                <Link
                    className="flex items-center"
                    to="/"
                    aria-label="homepage"
                >
                    <img
                        className="m-4 block h-10 cursor-pointer"
                        src="/favicon.svg"
                        alt="logo"
                    />
                </Link>
            </div>
        </header>
    )
}

export default Header
