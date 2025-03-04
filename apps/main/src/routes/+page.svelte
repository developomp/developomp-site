<script lang="ts">
    import Discord from "@inqling/svelte-icons/simple-icons/discord.svelte"
    import GitHub from "@inqling/svelte-icons/simple-icons/github.svelte"
    import ProtonMail from "@inqling/svelte-icons/simple-icons/protonmail.svelte"
    import { onMount } from "svelte"

    import HandWave from "$/components/HandWave.svelte"
    import { discordInviteLink } from "$/constants"
    import getAge from "$/utils/getAge"

    let age = getAge() // run immediately the first time

    onMount(() => {
        const interval = setInterval(() => {
            age = getAge() // first called after the delay
        }, 100)

        return () => {
            clearInterval(interval)
        }
    })
</script>

<img
    class="shadow-dark-text-gray mx-auto mb-14 mt-20 aspect-square rounded-full shadow-[0_0_40px_20px]"
    src="/favicon.svg"
    alt="logo"
    width="200"
    height="200"
/>

<h1 class="mb-16 px-4 py-2 text-center text-4xl">
    <HandWave />Hello, I am <b>pomp</b>!
</h1>

<span>
    I am a <b>{age.toFixed(8)} years old</b> college student studying computer science
    in Seoul, South Korea.
</span>

<h2 class="mt-16 text-xl font-black">Military service</h2>
October 2023 ~ April 2025

<div class="mt-10 flex flex-wrap justify-center">
    <a
        class="social-profile"
        target="_blank"
        href="https://github.com/pompydev"
        aria-label="GitHub link"
    >
        <GitHub />
    </a>
    <a
        class="social-profile"
        target="_blank"
        href={discordInviteLink}
        aria-label="Discord link"
    >
        <Discord />
    </a>
    <a
        class="social-profile"
        target="_blank"
        href="mailto: pompydev@proton.me"
        aria-label="Email link (ProtonMail)"
    >
        <ProtonMail />
    </a>
</div>
