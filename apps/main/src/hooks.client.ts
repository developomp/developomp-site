import { handleErrorWithSentry } from "@sentry/sveltekit"
import * as Sentry from "@sentry/sveltekit"

Sentry.init({
    dsn: "https://236b66c6551a16fe6e9356e269c4b1ef@o4507090692210688.ingest.de.sentry.io/4507163100905552",
    tracesSampleRate: 1.0,

    integrations: [],
})

// If you have a custom error handler, pass it to `handleErrorWithSentry`
export const handleError = handleErrorWithSentry()
