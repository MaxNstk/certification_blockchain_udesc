<script lang="ts">
	import type { PageData } from './$types';
	import CertificateList from './components/CertificateList.svelte';

  export let data: PageData;
  $: certificates = data.certificates;
</script>

<div class="dark">
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <div class="p-4 bg-white dark:bg-gray-900">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Diplomas
        </h2>
        <div class="flex justify-end m-4">
            <a class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none
             focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600
              dark:hover:bg-blue-700 dark:focus:ring-blue-800"
             href="/certificate/create">
             Adicionar
            </a>
        </div>

    <CertificateList {certificates}/>
    </div>
  </div>
</div>
