<script lang="ts">
  import CertificateList from './components/CertificateList.svelte';
	import type { SimplifiedCertificate } from './simplifiedCertificate';

  export let certificates: SimplifiedCertificate[];
</script>

<div class="dark">
  <CertificateList {certificates}/>
</div>
  