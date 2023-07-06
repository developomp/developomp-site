<script>
    import { page } from "$app/stores"
</script>

<nav
    class="mx-auto flex h-14 max-w-screen-mobile flex-col items-center justify-between px-4 xs:flex-row"
>
    <!-- only show home button when not in home -->
    <a
        href="/"
        aria-current={$page.url.pathname === "/" ? "page" : undefined}
        class="left-0"
        style={$page.url.pathname === "/" ? "visibility: hidden;" : ""}
    >
        Home
    </a>

    <ul class="flex list-none gap-4 no-underline">
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
    li {
        @apply inline;
    }
</style>
