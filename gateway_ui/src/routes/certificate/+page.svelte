<script lang="ts">
	import type { PageData } from './$types';
	import CertificateList from './components/CertificateList.svelte';

  export let data: PageData;
  $: certificates = data.certificates;
</script>

{#if certificates.length > 0}
<div class="dark">
  <CertificateList {certificates}/>
</div>
{:else}
<h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
  Sem diplomas para listar
</h2>
{/if}