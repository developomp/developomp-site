<script>
    import Discord from "@inqling/svelte-icons/simple-icons/discord.svelte"

    import { discordInviteLink } from "$/constants"
    import { browser } from "$app/environment"

    // redirect to developomp's discord server
    if (browser) {
        window.location.replace(discordInviteLink)
    }
</script>

<div>
    <Discord />
    <h1>Redirecting...</h1>
</div>
