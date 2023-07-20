<script>
    import "./app.css"

    import Navbar from "$/components/Navbar.svelte"
</script>

<Navbar />
<main
    class="mx-auto my-0 flex w-full max-w-5xl flex-col items-center px-8 py-0 text-center font-normal"
>
    <slot />
</main>
