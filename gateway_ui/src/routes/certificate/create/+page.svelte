<script lang="ts">
	import CertificateForm from "../components/CertificateForm.svelte"; 

    export let data;
    $: availableCourses = data.availableCourses;
    
</script>

<div class="container mx-auto px-8">
    <CertificateForm {availableCourses} />
</div>
