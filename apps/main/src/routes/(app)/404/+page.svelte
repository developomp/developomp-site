<script>
    import "$/routes/(app)/app.css"

    import { page } from "$app/stores"
</script>

<h1 class="mx-auto mt-10 text-center text-8xl font-normal">
    {$page.status}
</h1>
<h2 class="mx-auto mt-6 text-center text-3xl font-normal">
    {$page.error?.message}
</h2>
