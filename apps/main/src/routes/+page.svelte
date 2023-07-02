<script>
    import darkTheme from "@developomp-site/theme/dist/dark.json"
    import { css } from "@emotion/css"
    import Discord from "@inqling/svelte-icons/simple-icons/discord.svelte"
    import GitHub from "@inqling/svelte-icons/simple-icons/github.svelte"
    import Mastodon from "@inqling/svelte-icons/simple-icons/mastodon.svelte"
    import Twitter from "@inqling/svelte-icons/simple-icons/twitter.svelte"
    import YouTube from "@inqling/svelte-icons/simple-icons/youtube.svelte"

    import HandWave from "../components/HandWave.svelte"
    import { discordInviteLink } from "../constants"
    import { SocialProfile } from "../theme"

    function myAge() {
        const now = new Date()
        const birth = new Date("2002-07-30") // my birthday :D

        const age = now.getFullYear() - birth.getFullYear()

        let month = now.getMonth()
        let birthMonth = birth.getMonth()

        if (birthMonth > month || (birthMonth === month && birth.getDate() >= now.getDate())) {
            return age - 1
        }

        return age
    }
</script>

<img
    class={"logo " +
        css`
            box-shadow: 0 0 40px 20px ${darkTheme.color.text.gray};
        `}
    src="/favicon.svg"
    alt="logo"
    width="200"
    height="200"
/>

<h1><HandWave />Hello! I am <b>developomp</b></h1>

<h2>Who am I?</h2>

<span>
    I am a <b>{myAge()} years old</b> college student studying computer science in Seoul, South Korea.
</span>

<h2>Contact</h2>

<table
    class={css`
        th,
        td {
            border: 1px solid ${darkTheme.component.table.color.border};
        }
    `}
>
    <tr>
        <th>Platform</th>
        <th>ID</th>
        <th>Response Time</th>
    </tr>
    <tr>
        <td>Discord</td>
        <td>@developomp</td>
        <td>~ 2 days</td>
    </tr>
    <tr>
        <td>Gmail</td>
        <td><a href="mailto: developomp@gmail.com">developomp@gmail.com</a></td>
        <td>2 ~ 4 days</td>
    </tr>
    <tr>
        <td>Mastodon</td>
        <td><a href="https://mastodon.social/@developomp">@developomp</a></td>
        <td>2 ~ 4 days</td>
    </tr>
</table>

<i class="note">
    *Note that I may not be able to read your messages if you reach out to me using methods not
    listed above.
</i>

<div class="socials-and-profiles">
    <a
        class={SocialProfile}
        target="_blank"
        href="https://github.com/developomp"
        aria-label="GitHub link"
    >
        <GitHub />
    </a>
    <a class={SocialProfile} target="_blank" href={discordInviteLink} aria-label="GitHub link">
        <Discord />
    </a>
    <a
        class={SocialProfile}
        target="_blank"
        href="https://twitter.com/developomp"
        aria-label="Twitter link"
    >
        <Twitter />
    </a>
    <a
        class={SocialProfile}
        target="_blank"
        href="https://mastodon.social/@developomp"
        aria-label="Mastodon link"
    >
        <Mastodon />
    </a>
    <a
        class={SocialProfile}
        target="_blank"
        href="https://youtube.com/@developomp"
        aria-label="YouTube link"
    >
        <YouTube />
    </a>
</div>

<style>
    .logo {
        aspect-ratio: auto 1 / 1;
        border-radius: 50%;
        margin: 5rem auto;
    }

    .socials-and-profiles {
        margin-top: 3rem;
        display: flex;
        flex-wrap: wrap;
        gap: 1.5rem;
    }

    .note {
        color: #ffffffcc;
    }
</style>
