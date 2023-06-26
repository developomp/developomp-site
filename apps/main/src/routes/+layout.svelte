<script>
    import "../app.css"

    import { browser } from "$app/environment"

    import darkTheme from "@developomp-site/theme/dist/dark.json"
    import { css } from "@emotion/css"
    import Navbar from "../components/Navbar.svelte"
</script>

<svelte:head>
    <meta name="description" content="developomp's website" />
    <meta name="theme-color" content="#000000" />
    <meta property="og:image" content="/icon.png" />
    <meta property="og:type" content="website" />
</svelte:head>

<!-- prevent flickering while theme is loading -->
{#if browser}
    <div
        class={css`
            font-family: ${darkTheme.font.sansSerif};

            color: ${darkTheme.color.text.default};
            background-color: ${darkTheme.color.background};

            a {
                color: ${darkTheme.component.anchor.color.default};
                text-decoration: none;
            }

            a:hover {
                color: ${darkTheme.component.anchor.color.hover};
                text-decoration: underline;
            }

            h2 {
                color: ${darkTheme.color.background};
                background-color: ${darkTheme.color.text.default};
                padding: 0 1rem;
            }
        `}
    >
        <Navbar />
        <main>
            <slot />
        </main>
    </div>
{/if}
