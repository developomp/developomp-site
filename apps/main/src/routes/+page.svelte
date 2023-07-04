<script>
    import Discord from "@inqling/svelte-icons/simple-icons/discord.svelte"
    import GitHub from "@inqling/svelte-icons/simple-icons/github.svelte"
    import Gmail from "@inqling/svelte-icons/simple-icons/gmail.svelte"
    import Mastodon from "@inqling/svelte-icons/simple-icons/mastodon.svelte"
    import Twitter from "@inqling/svelte-icons/simple-icons/twitter.svelte"
    import YouTube from "@inqling/svelte-icons/simple-icons/youtube.svelte"

    import HandWave from "../components/HandWave.svelte"
    import { discordInviteLink } from "../constants"

    function myAge() {
        const now = new Date()
        const birth = new Date("2002-07-30") // my birthday :D

        const age = now.getFullYear() - birth.getFullYear()

        let month = now.getMonth()
        let birthMonth = birth.getMonth()

        if (
            birthMonth > month ||
            (birthMonth === month && birth.getDate() >= now.getDate())
        ) {
            return age - 1
        }

        return age
    }
</script>

<img
    class="mx-auto my-20 aspect-square rounded-full shadow-[0_0_40px_20px] shadow-dark-text-gray"
    src="/favicon.svg"
    alt="logo"
    width="200"
    height="200"
/>

<h1><HandWave />Hello! I am <b>developomp</b></h1>

<h2>Who am I?</h2>

<span>
    I am a <b>{myAge()} years old</b> college student studying computer science in
    Seoul, South Korea.
</span>

<div class="mt-12 flex flex-wrap justify-center gap-6">
    <a
        class="social-profile"
        target="_blank"
        href="https://github.com/developomp"
        aria-label="GitHub link"
    >
        <GitHub />
    </a>
    <a
        class="social-profile"
        target="_blank"
        href={discordInviteLink}
        aria-label="GitHub link"
    >
        <Discord />
    </a>
    <a
        class="social-profile"
        target="_blank"
        href="https://twitter.com/developomp"
        aria-label="Twitter link"
    >
        <Twitter />
    </a>
    <a
        class="social-profile"
        target="_blank"
        href="https://mastodon.social/@developomp"
        aria-label="Mastodon link"
    >
        <Mastodon />
    </a>
    <a
        class="social-profile"
        target="_blank"
        href="mailto: developomp@gmail.com"
        aria-label="YouTube link"
    >
        <Gmail />
    </a>
    <a
        class="social-profile"
        target="_blank"
        href="https://youtube.com/@developomp"
        aria-label="YouTube link"
    >
        <YouTube />
    </a>
</div>
