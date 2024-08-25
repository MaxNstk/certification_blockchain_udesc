<script lang="ts">
	import CertificateForm from "../components/CertificateForm.svelte"; 

    let certificate: SimplifiedCertificate = {
        certificateNumber: '',
        certificateEmissionDate: '',
        certificateCourse: '',
        certificateStatus: '',
        ownerName: '',
        campusAcronym: '',
    };

    async function createCertificate() {
        // Example API call to create the certificate
        //const response = await fetch('/api/certificates', {
        //    method: 'POST',
        //    headers: {
        //        'Content-Type': 'application/json'
        //    },
        //    body: JSON.stringify(certificate)
        //});
//
        //if (response.ok) {
        //    goto('/certificates');
        //} else {
        //    console.error('Failed to create certificate');
        //}
    }
</script>

<div class="container mx-auto px-24">
    <CertificateForm {certificate} />
</div>
