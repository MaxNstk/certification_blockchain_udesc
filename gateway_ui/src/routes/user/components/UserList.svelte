<script lang="ts">
	import type { User } from "$lib/types";

  export let users: User[] = [];
</script>

<table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
  <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
    <tr>
      <th scope="col" class="px-6 py-3">ID </th>
      <th scope="col" class="px-6 py-3">Usuário </th>
      <th scope="col" class="px-6 py-3">Nome completo </th>
      <th scope="col" class="px-6 py-3">Administrador </th>
      <th scope="col" class="px-6 py-3">Coordenador </th>
      <th scope="col" class="px-6 py-3">Campus</th>
      <th scope="col" class="px-6 py-3"><span class="sr-only">Editar</span></th>
    </tr>
</thead>
  <tbody>
      {#each users as user (user)}
      <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <td class="px-6 py-4">
          {user.userId}
        </td>
        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
          {user.username}
        </th>
        <td class="px-6 py-4">
            {user.fullName}
        </td>
        <td class="px-6 py-4">
            {user.isAdmin}
        </td>
        <td class="px-6 py-4">
          {user.isCoordinator}
      </td>
      <td class="px-6 py-4">
        {#if user.campus}
          {user.campus.acronym}
        {:else}
          N/A
        {/if}
      </td>
      </tr>  
      {/each}
  </tbody>
</table>