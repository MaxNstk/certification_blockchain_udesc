<script lang="ts">
	import type { SimplifiedCertificate } from "$lib/types";

    export let certificate: SimplifiedCertificate;
</script>
  
  <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
          {certificate.certificateNumber}
      </th>
      <td class="px-6 py-4">
          {certificate.ownerName}
      </td>
      <td class="px-6 py-4">
          {certificate.certificateEmissionDate}
      </td>
      <td class="px-6 py-4">
          {certificate.certificateCourse}
      </td>
      <td class="px-6 py-4">
        {#if certificate.certificateStatus === 'valid'}
            Válido
        {:else}
            Revogado
            {/if}
        </td>
      <td class="px-6 py-4">
          {certificate.campusAcronym}
      </td>
      <td class="px-6 py-4 text-right">
          <a href="/certificate/update/{certificate.certificateNumber}" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Editar</a>
      </td>
      <td class="px-6 py-4 text-right">
        <a href="/certificate/history/{certificate.certificateNumber}" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Histórico</a>
    </td>
  </tr>
  