<script>
    import { css } from "@emotion/css"
    import darkTheme from "@developomp-site/theme/dist/dark.json"
    import HandWave from "../components/HandWave.svelte"
    import { SocialProfile } from "../theme"

    import GitHub from "@inqling/svelte-icons/simple-icons/github.svelte"
    import Twitter from "@inqling/svelte-icons/simple-icons/twitter.svelte"
    import Mastodon from "@inqling/svelte-icons/simple-icons/mastodon.svelte"
    import YouTube from "@inqling/svelte-icons/simple-icons/youtube.svelte"

    const today = new Date()
    const birthDay = new Date(2002, 7, 30)

    const month = today.getMonth() + 1
    const birthMonth = birthDay.getMonth() + 1

    let age = today.getFullYear() - birthDay.getFullYear()

    if (birthMonth > month || (birthMonth === month && birthDay.getDate() >= today.getDate())) {
        age--
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
    I am a <b>{new Date().getFullYear() - 2002} years old</b> college student studying computer science
    in Seoul, South Korea.
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
    <a class={SocialProfile} target="_blank" href="https://github.com/developomp">
        <GitHub />
    </a>
    <a class={SocialProfile} target="_blank" href="https://twitter.com/developomp">
        <Twitter />
    </a>
    <a class={SocialProfile} target="_blank" href="https://mastodon.social/@developomp">
        <Mastodon />
    </a>
    <a class={SocialProfile} target="_blank" href="https://youtube.com/@developomp">
        <YouTube />
    </a>
</div>
