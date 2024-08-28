<script lang="ts">
	import type { PageData } from "../$types";
	import CertificateForm from "../../components/CertificateForm.svelte";

  export let data: PageData;
  $: certificate = data.certificate;
  
</script>

<div class="dark">
  <CertificateForm {certificate}/>
</div>
