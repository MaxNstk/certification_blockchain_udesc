<script lang="ts">
	import type { PageData } from "./$types";

	export let data: PageData;

</script>

<div class="container mx-auto px-8">

<form method="post" action="?/getCert">
  <div class="mb-5">
    <label for="certificateNumber" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Número do certificado</label>
    <input type="text" name="certificateNumber" id="certificateNumber" class="bg-gray-50 border border-gray-300
       text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 
       dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
  </div>
  
  <button type="submit" name="action" value="getCert" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none
   focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600
    dark:hover:bg-blue-700 dark:focus:ring-blue-800">Pesquisar</button>
</form>

{#if data.certificate}

<div class="w-full mt-6 p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
  <div class="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
    <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4 col-span-2">Dados do Diploma</h2>

    <!-- Certificate Number -->
    <div class="mb-5">
      <label class="block mb-2 text-sm font-medium dark:text-white">Número</label>
      <p class="text-sm rounded-lg bg-gray-50 border border-gray-300 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
        {data.certificate.certificateNumber}
      </p>
    </div>

    <!-- Certificate Emission Date -->
    <div class="mb-5">
      <label class="block mb-2 text-sm font-medium dark:text-white">Data de Emissão</label>
      <p class="text-sm rounded-lg bg-gray-50 border border-gray-300 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
        {new Date(data.certificate.certificateEmissionDate).toLocaleDateString('pt-BR')}
      </p>
    </div>

    <!-- Certificate Status -->
    <div class="mb-5">
      <label class="block mb-2 text-sm font-medium dark:text-white">Status</label>
      <p class="text-sm rounded-lg bg-gray-50 border border-gray-300 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
        {data.certificate.certificateStatus === 'valid' ? 'Válido' : 'Revogado'}
      </p>
    </div>

    <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4 col-span-2">Dados do Proprietário</h2>

    <!-- Owner Name -->
    <div class="mb-5">
      <label class="block mb-2 text-sm font-medium dark:text-white">Nome Completo</label>
      <p class="text-sm rounded-lg bg-gray-50 border border-gray-300 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
        {data.certificate.ownerName}
      </p>
    </div>

    <!-- Owner RG -->
    <div class="mb-5">
      <label class="block mb-2 text-sm font-medium dark:text-white">Registro Geral (RG)</label>
      <p class="text-sm rounded-lg bg-gray-50 border border-gray-300 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
        {data.certificate.ownerRG}
      </p>
    </div>

    <!-- Owner Birth Date -->
    <div class="mb-5">
      <label class="block mb-2 text-sm font-medium dark:text-white">Data de Nascimento</label>
      <p class="text-sm rounded-lg bg-gray-50 border border-gray-300 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
        {new Date(data.certificate.ownerBirthDate).toLocaleDateString('pt-BR')}
      </p>
    </div>

    <!-- Owner Birth State -->
    <div class="mb-5">
      <label class="block mb-2 text-sm font-medium dark:text-white">Estado de Nascimento</label>
      <p class="text-sm rounded-lg bg-gray-50 border border-gray-300 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
        {data.certificate.ownerBirthState}
      </p>
    </div>

    <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4 col-span-2">Dados Universitários</h2>

    <!-- Certificate Course -->
    <div class="mb-5">
      <label class="block mb-2 text-sm font-medium dark:text-white">Curso</label>
      <p class="text-sm rounded-lg bg-gray-50 border border-gray-300 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
        {data.certificate.certificateCourse}
      </p>
    </div>

    <!-- Campus Name -->
    <div class="mb-5">
      <label class="block mb-2 text-sm font-medium dark:text-white">Nome do Campus</label>
      <p class="text-sm rounded-lg bg-gray-50 border border-gray-300 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
        {data.certificate.campusName}
      </p>
    </div>

    <!-- Campus Acronym -->
    <div class="mb-5">
      <label class="block mb-2 text-sm font-medium dark:text-white">Sigla do Campus</label>
      <p class="text-sm rounded-lg bg-gray-50 border border-gray-300 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
        {data.certificate.campusAcronym}
      </p>
    </div>

    <!-- Campus Director -->
    <div class="mb-5">
      <label class="block mb-2 text-sm font-medium dark:text-white">Diretor(a) do Campus</label>
      <p class="text-sm rounded-lg bg-gray-50 border border-gray-300 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
        {data.certificate.campusDirector}
      </p>
    </div>

    <!-- University President Name -->
    <div class="mb-5">
      <label class="block mb-2 text-sm font-medium dark:text-white">Nome do Reitor(a)</label>
      <p class="text-sm rounded-lg bg-gray-50 border border-gray-300 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
        {data.certificate.universityPresidentName}
      </p>
    </div>

    <!-- University Certificate Coordinator -->
    <div class="mb-5">
      <label class="block mb-2 text-sm font-medium dark:text-white">Nome do(a) Coordenador(a) de Diplomas</label>
      <p class="text-sm rounded-lg bg-gray-50 border border-gray-300 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
        {data.certificate.universityCertificateCoordinator}
      </p>
    </div>

    <!-- Note -->
    <div class="mb-5 col-span-2">
      <label class="block mb-2 text-sm font-medium dark:text-white">Observações</label>
      <p class="text-sm rounded-lg bg-gray-50 border border-gray-300 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
        {data.certificate.note}
      </p>
    </div>
  </div>
</div>

{/if}
</div>
