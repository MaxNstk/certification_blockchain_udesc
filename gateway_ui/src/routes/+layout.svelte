<script>
	import "../app.css";
	import Nav from "./components/Nav.svelte";
</script>

<style lang="postcss">
    :global(html) {
      background-color: theme(colors.gray.900);
    }
</style>

<div class="dark">
    <Nav />
    <main class="pt-16"> 
        <div class="container mx-auto px-4">
            <div class="mt-12">
                <slot />
            </div>
        </div>
    </main>
</div>

