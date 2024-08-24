<script lang="ts">
	import CertificateListHeader from "./CertificateListHeader.svelte";
	import CertificateListRow from "./CertificateListRow.svelte";
  
    export let certificates: Certificate[] = [];
  
  </script>
  
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <CertificateListHeader/>
          <tbody>
              {#each certificates as certificate (certificate)}
                  <CertificateListRow {certificate} />
              {/each}
          </tbody>
      </table>
  </div>
  