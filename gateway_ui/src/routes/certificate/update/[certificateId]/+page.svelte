<script lang="ts">
	import CertificateForm from "../../components/CertificateForm.svelte";

  /** @type {import('./$types').PageLoad} */
  export let data;
  $: certificate = data.certificate;
  
</script>

<div class="dark">
  <CertificateForm {certificate}/>
</div>
