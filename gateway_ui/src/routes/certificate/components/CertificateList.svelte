<script lang="ts">
	import CertificateListRow from "./CertificateListRow.svelte";
  
    export let certificates: Certificate[] = [];
  
  </script>
  
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                  <th scope="col" class="px-6 py-3">Certificate Number</th>
                  <th scope="col" class="px-6 py-3">Emission Date</th>
                  <th scope="col" class="px-6 py-3">Course</th>
                  <th scope="col" class="px-6 py-3">Status</th>
                  <th scope="col" class="px-6 py-3">Owner</th>
                  <th scope="col" class="px-6 py-3">Campus</th>
                  <th scope="col" class="px-6 py-3"><span class="sr-only">Edit</span></th>
              </tr>
          </thead>
          <tbody>
              {#each certificates as certificate (certificate)}
                  <CertificateListRow {certificate} />
              {/each}
          </tbody>
      </table>
  </div>
  