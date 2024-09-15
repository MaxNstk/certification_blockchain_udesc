<script lang="ts">
	import type { SimplifiedCertificate } from "$lib/types";
	import CertificateListHeader from "./CertificateListHeader.svelte";
	import CertificateListRow from "./CertificateListRow.svelte";
	
	export let certificates: SimplifiedCertificate[];
</script>
{#if certificates.length > 0}
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <CertificateListHeader />
        <tbody>
            {#each certificates as certificate (certificate)}
                <CertificateListRow {certificate} />
            {/each}
        </tbody>
    </table>
{:else}
    <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
    Sem diplomas para listar
    </h2>
{/if}
