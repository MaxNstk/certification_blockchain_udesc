<script lang="ts">
    import "../app.css";
	import type { PageLoad } from "./certificate/$types";
    import Nav from "./components/Nav.svelte";

    export let data: PageLoad;
    $: user = data.user;
</script>

<style lang="postcss">
    :global(html) {
      background-color: theme(colors.gray.900);
    }
</style>

<div class="dark">
    <Nav {user}/>
    <main class="pt-16"> 
        <div class="container mx-auto px-4">
            <div class="mt-12">
                <slot />
            </div>
        </div>
    </main>
</div>

