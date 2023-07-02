<script>
    import "../app.css"

    import darkTheme from "@developomp-site/theme/dist/dark.json"
    import { css } from "@emotion/css"

    import { browser } from "$app/environment"

    import Navbar from "../components/Navbar.svelte"
</script>

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
