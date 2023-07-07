/**
 *  inspired by https://codepen.io/avstorm/pen/RwNzPNN
 */

import "./Loading.scss"

import Card from "@/components/Card"

import TeaCup from "./TeaCup"

export default function Loading() {
    return (
        <Card className="loading-card m-4 flex h-fit w-full max-w-screen-mobile flex-col items-center justify-center stroke-light-text-default text-center dark:stroke-dark-text-default">
            <TeaCup />
            <h1 className="text-4xl">Loading...</h1>
        </Card>
    )
}
