<script lang="ts">
  import { onMount } from 'svelte';
  import { getCertificates } from '$lib/certificateService';
  import CertificateList from './components/CertificateList.svelte';
  
    let certificates: Certificate[] = [];
  
    onMount(async () => {
      try {
        certificates = await getCertificates();
      } catch (error) {
        console.error('Failed to load certificates:', error);
      }
    });
  </script>

  <div class="dark">
    <CertificateList {certificates}/>
  </div>
  