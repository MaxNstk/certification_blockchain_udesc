<script lang="ts">
	import { goto } from "$app/navigation";
		import type { Certificate, Course } from "$lib/types";

  export let certificate: Certificate = {
    certificateNumber: '',
    certificateEmissionDate: '',
    certificateCourseId: 0,
    certificateStatus: 'valid',
    ownerName: '',
    ownerRG: '',
    ownerBirthDate: '',
    ownerBirthState: '',
    campusName: '',
    campusAcronym: '',
    campusDirector: '',
    universityPresidentName: '',
    universityCertificateCoordinator: '',
    hasCompletedAllSubjects: true,
    hasSentAllRequiredDocuments: true,
    wentToDegreeGranting: true,
    note: ''
  };

  export let availableCourses:Course[] = [];

  export async function handleSubmit(event: Event) {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    
    const response = await fetch('?/POST', {
      //TODO send the certificate, max you re dumb
      method: 'POST',
      body: formData,
    });

    const result = await response.json();

    if (response.ok) {
      goto('/certificate');
    } else {
      console.error(result.error);
    }
  }

</script>

<h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-4"> Cadastro de diploma </h1>

<div class="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">

  <form method="POST" on:submit={handleSubmit} class="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 p-6">

    <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4 col-span-2"> Dados do diploma </h2>

    <div class="mb-5">
      <label for="certificateNumber" class="block mb-2 text-sm font-medium dark:text-white">Número</label>
      <input type="number" id="certificateNumber" name="certificateNumber" bind:value={certificate.certificateNumber} class="shadow-sm bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required>
    </div>

    <div class="mb-5">
      <label for="certificateEmissionDate" class="block mb-2 text-sm font-medium dark:text-white">Data de Emissão</label>
      <input type="date" id="certificateEmissionDate" name="certificateEmissionDate" bind:value={certificate.certificateEmissionDate} class="shadow-sm bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required>
    </div>

    <div class="mb-5">
      <label for="certificateStatus" class="block mb-2 text-sm font-medium dark:text-white">Status</label>
      <select id="certificateStatus" name="certificateStatus" bind:value={certificate.certificateStatus} class="shadow-sm bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required>
        <option value="valid">Válido</option>
        <option value="revoked">Revogado</option>
      </select>
    </div>

    <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4 col-span-2"> Dados do proprietário </h2>

    <div class="mb-5">
      <label for="ownerName" class="block mb-2 text-sm font-medium dark:text-white">Nome completo</label>
      <input type="text" id="ownerName" name="ownerName" bind:value={certificate.ownerName} class="shadow-sm bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required>
    </div>

    <div class="mb-5">
      <label for="ownerRG" class="block mb-2 text-sm font-medium dark:text-white">Registro Geral (RG)</label>
      <input type="text" id="ownerRG" name="ownerRG" bind:value={certificate.ownerRG} class="shadow-sm bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required>
    </div>

    <div class="mb-5">
      <label for="ownerBirthDate" class="block mb-2 text-sm font-medium dark:text-white">Data de Nascimento</label>
      <input type="date" id="ownerBirthDate" name="ownerBirthDate" bind:value={certificate.ownerBirthDate} class="shadow-sm bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required>
    </div>

    <div class="mb-5">
      <label for="ownerBirthState" class="block mb-2 text-sm font-medium dark:text-white">Estado de Nascimento</label>
      <select id="ownerBirthState" name="ownerBirthState" bind:value={certificate.ownerBirthState} class="shadow-sm bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required>
        <option value="" disabled selected>Selecione o estado</option>
        <option value="AC">Acre (AC)</option>
        <option value="AL">Alagoas (AL)</option>
        <option value="AP">Amapá (AP)</option>
        <option value="AM">Amazonas (AM)</option>
        <option value="BA">Bahia (BA)</option>
        <option value="CE">Ceará (CE)</option>
        <option value="DF">Distrito Federal (DF)</option>
        <option value="ES">Espírito Santo (ES)</option>
        <option value="GO">Goiás (GO)</option>
        <option value="MA">Maranhão (MA)</option>
        <option value="MT">Mato Grosso (MT)</option>
        <option value="MS">Mato Grosso do Sul (MS)</option>
        <option value="MG">Minas Gerais (MG)</option>
        <option value="PA">Pará (PA)</option>
        <option value="PB">Paraíba (PB)</option>
        <option value="PR">Paraná (PR)</option>
        <option value="PE">Pernambuco (PE)</option>
        <option value="PI">Piauí (PI)</option>
        <option value="RJ">Rio de Janeiro (RJ)</option>
        <option value="RN">Rio Grande do Norte (RN)</option>
        <option value="RS">Rio Grande do Sul (RS)</option>
        <option value="RO">Rondônia (RO)</option>
        <option value="RR">Roraima (RR)</option>
        <option value="SC">Santa Catarina (SC)</option>
        <option value="SP">São Paulo (SP)</option>
        <option value="SE">Sergipe (SE)</option>
        <option value="TO">Tocantins (TO)</option>
      </select>
    </div>

    <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4 col-span-2"> Dados do universitários </h2>

    <div class="mb-5">
      <label for="certificateCourseId" class="block mb-2 text-sm font-medium dark:text-white">Curso</label>
      <select id="certificateCourseId" name="certificateCourseId" bind:value={certificate.certificateCourseId} 
        class="shadow-sm bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500
        focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
         dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required>
        <option value="" disabled selected>Selecione o curso</option>
        {#each availableCourses as course (course.courseId) }
          <option value={course.courseId}>
            {course.description}
          </option>
        {/each }
      </select>
    </div>
    
    <div class="mb-5">
      <label for="campusName" class="block mb-2 text-sm font-medium dark:text-white">Nome do Campus</label>
      <input type="text" id="campusName" name="campusName" bind:value={certificate.campusName} class="shadow-sm bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required>
    </div>

    <div class="mb-5">
      <label for="campusAcronym" class="block mb-2 text-sm font-medium dark:text-white">Sigla do Campus</label>
      <input type="text" id="campusAcronym" name="campusAcronym" bind:value={certificate.campusAcronym} class="shadow-sm bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required>
    </div>

    <div class="mb-5">
      <label for="campusDirector" class="block mb-2 text-sm font-medium dark:text-white">Diretor(a) do Campus</label>
      <input type="text" id="campusDirector" name="campusDirector" bind:value={certificate.campusDirector} class="shadow-sm bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required>
    </div>

    <div class="mb-5">
      <label for="universityPresidentName" class="block mb-2 text-sm font-medium dark:text-white">Nome do Reitor(a)</label>
      <input type="text" id="universityPresidentName" name="universityPresidentName" bind:value={certificate.universityPresidentName} class="shadow-sm bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required>
    </div>

    <div class="mb-5">
      <label for="universityCertificateCoordinator" class="block mb-2 text-sm font-medium dark:text-white">Nome do(a) coordenadordor(a) de diplomas</label>
      <input type="text" id="universityCertificateCoordinator" name="universityCertificateCoordinator" bind:value={certificate.universityCertificateCoordinator} class="shadow-sm bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required>
    </div>

    <div class="mb-5 col-span-2">
      <label class="inline-flex items-center mb-5 mr-3 cursor-pointer">
        <input type="checkbox" id="hasCompletedAllSubjects" name="hasCompletedAllSubjects" bind:checked={certificate.hasCompletedAllSubjects} class="sr-only peer" required>
        <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Concluiu todas as disciplinas</span>
      </label>

      <label class="inline-flex items-center mb-5 mr-3 cursor-pointer">
        <input type="checkbox" id="hasSentAllRequiredDocuments" name="hasSentAllRequiredDocuments" bind:checked={certificate.hasSentAllRequiredDocuments} class="sr-only peer" required>
        <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Enviou todos os documentos</span>
      </label>

      <label class="inline-flex items-center mb-5 cursor-pointer">
        <input type="checkbox" id="wentToDegreeGranting" name="wentToDegreeGranting" bind:checked={certificate.wentToDegreeGranting} class="sr-only peer" required>
        <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Participou da colação de grau</span>
      </label>
    </div>

    <div class="mb-5 col-span-2">
      <label for="note" class="block mb-2 text-sm font-medium dark:text-white">Observações</label>
      <textarea id="note" name="note" bind:value={certificate.note} class="block p-2.5 w-full text-sm bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required></textarea>
    </div>

    <div class="col-span-2">
      <button type="submit" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Salvar Diploma</button>
    </div>
  </form>
</div>

