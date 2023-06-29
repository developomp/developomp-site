<script>
    import { page } from "$app/stores"
    import { css } from "@emotion/css"
</script>

<nav
    class={css`
        display: flex;
        width: 100%;
        justify-content: right;

        ul {
            display: flex;
            gap: 1rem;
            list-style-type: none;
            margin-right: 1rem;
            padding: 0;
        }

        li {
            display: inline;
        }
    `}
>
    <ul>
        <li aria-current={$page.url.pathname === "/" ? "page" : undefined}>
            <a target="_blank" href="https://blog.developomp.com">Blog</a>
        </li>
        <li aria-current={$page.url.pathname === "/about" ? "page" : undefined}>
            <a target="_blank" href="https://portfolio.developomp.com">Portfolio</a>
        </li>
        <li
            class={css`
                color: gray;
            `}
        >
            Resume (WIP)
        </li>
    </ul>
</nav>
