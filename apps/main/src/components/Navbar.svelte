<script>
    import { page } from "$app/stores"
</script>

<nav>
    <ul>
        <li aria-current={$page.url.pathname === "/" ? "page" : undefined}>
            <a target="_blank" href="https://blog.developomp.com">Blog</a>
        </li>
        <li aria-current={$page.url.pathname === "/about" ? "page" : undefined}>
            <a target="_blank" href="https://portfolio.developomp.com">
                Portfolio
            </a>
        </li>
        <li class="text-dark-footer-text">Resume (WIP)</li>
    </ul>
</nav>

<style lang="postcss">
    nav {
        @apply flex h-14 w-full items-center justify-end;
    }

    ul {
        @apply mr-4 flex list-none gap-4 p-0 no-underline;
    }

    li {
        @apply inline;
    }
</style>
