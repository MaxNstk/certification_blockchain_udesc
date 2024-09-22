<script lang="ts">
  import type { PageData } from './$types';
  import JsonTree from 'svelte-json-tree';

  export let data: PageData;
  $: transactionList = data.transactionList;
</script>

<!-- Add 'dark' class to enable dark mode -->
<div class="dark bg-gray-100 dark:bg-gray-900 min-h-screen">
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
        Histórico de Transações
      </h1>
      <div class="space-y-6">
        {#each transactionList as transaction (transaction.txId)}
          <div class="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
            <div class="flex items-center justify-between">
              <div>
                <h2 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  ID da Transação
                </h2>
                <p class="text-gray-700 dark:text-gray-300 break-all">
                  {transaction.txId}
                </p>
              </div>
              <div>
                <h2 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Timestamp
                </h2>
                <p class="text-gray-700 dark:text-gray-300 break-all">
                  {transaction.date}
                </p>
              </div>
            </div>

            <div class="mt-4">
              <h3 class="text-md font-semibold mb-2 text-gray-900 dark:text-gray-100">
                Proposta de transação
              </h3>
              <div class="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg overflow-auto">
                <JsonTree value={transaction.value} />
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
</div>
