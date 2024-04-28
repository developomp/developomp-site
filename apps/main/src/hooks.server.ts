import { handleErrorWithSentry, sentryHandle } from "@sentry/sveltekit"
import * as Sentry from "@sentry/sveltekit"
import { sequence } from "@sveltejs/kit/hooks"

Sentry.init({
    dsn: "https://236b66c6551a16fe6e9356e269c4b1ef@o4507090692210688.ingest.de.sentry.io/4507163100905552",
    tracesSampleRate: 1.0,

    // uncomment the line below to enable Spotlight (https://spotlightjs.com)
    // spotlight: import.meta.env.DEV,
})

// If you have custom handlers, make sure to place them after `sentryHandle()` in the `sequence` function.
export const handle = sequence(sentryHandle())

// If you have a custom error handler, pass it to `handleErrorWithSentry`
export const handleError = handleErrorWithSentry()
