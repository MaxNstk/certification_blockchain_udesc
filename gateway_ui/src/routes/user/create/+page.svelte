<script lang="ts">
	import type { PageData } from "../$types";

    export let data: PageData;
    $: campus = data.campus;
    
</script>

<form action="?/POST" method="POST" class="max-w-sm mx-auto">
  <div class="mb-5">
    <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Usuário</label>
    <input type="text" name="username" id="username" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
  </div>
  <div class="mb-5">
    <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Senha</label>
    <input type="password" name="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
  </div>

  <div class="mb-5">
    <label for="fullName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nome completo</label>
    <input type="text" name="fullName" id="fullName" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
  </div>

  <div class="mb-5">
    <label for="campus" class="block mb-2 text-sm font-medium dark:text-white">Curso</label>
    <select id="campus" name="campus"
      class="shadow-sm bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500
      focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
       dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required>
      <option value="" disabled selected>Selecione o campus</option>
      {#each campus as campi (campi.acronym) }
        <option value={campi.acronym}>
          {campi.acronym} - {campi.description}
        </option>
      {/each }
    </select>
  </div>

  <label class="inline-flex items-center mb-5 mr-3 cursor-pointer">
    <input type="checkbox" id="isAdmin" name="isAdmin" class="sr-only peer" required>
    <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300
       dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full 
        rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px]
           after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all
             dark:border-gray-600 peer-checked:bg-blue-600">
    </div>
    <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Administrador</span>
  </label>

  <label class="inline-flex items-center mb-5 mr-3 cursor-pointer">
    <input type="checkbox" id="isCoordinator" name="isCoordinator" class="sr-only peer" required>
    <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300
       dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full 
        rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px]
           after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all
             dark:border-gray-600 peer-checked:bg-blue-600">
    </div>
    <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Coordenador</span>
  </label>

  <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Salvar</button>

</form>
