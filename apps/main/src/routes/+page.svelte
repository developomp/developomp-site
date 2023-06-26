<script>
    import { page } from "$app/stores"
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

<svelte:head>
    <title>developomp</title>
</svelte:head>

<img
    class={css`
        width: 14rem;
        height: 14rem;
        border-radius: 50%;
        box-shadow: 0 0 40px 20px ${darkTheme.color.text.gray};
        margin: 5rem auto;
    `}
    src="/favicon.svg"
    alt="logo"
/>

<h1><HandWave />Hello! I am <b>developomp</b></h1>

<h2>Who am I?</h2>

<span
    class={css`
        text-align: center;
        width: 95%;
        max-width: 64rem;
    `}
>
    I am a <b>{new Date().getFullYear() - 2002} years old</b> college student studying computer science
    in Seoul, South Korea.
</span>

<h2>Contact</h2>

<table
    class={css`
        border-collapse: collapse;
        border-spacing: 1rem 0;

        margin-bottom: 1rem;

        width: 95%;
        max-width: 64rem;

        th {
            background-color: #ffffff22;
            font-weight: 700;
        }

        th,
        td {
            padding: 8px;
            text-align: center;
            width: 10rem;
            border: 1px solid ${darkTheme.component.table.color.border};
        }

        th:nth-child(1),
        td:nth-child(1) {
            text-align: right;
        }

        th:nth-child(3),
        td:nth-child(3) {
            text-align: left;
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

<i
    class={css`
        color: #ffffffcc;
    `}
>
    *Note that I may not be able to read your messages if you reach out to me using methods not
    listed above.
</i>

<div
    class={css`
        margin-top: 3rem;
        display: flex;
        gap: 1.5rem;
    `}
>
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
