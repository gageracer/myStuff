<script>
    window.onSignIn = (googleUser) => {
        const profile = googleUser.getBasicProfile();
        console.log('ID: ' + profile.getId());
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());
    };
</script>

<svelte:head>
    <script src="https://apis.google.com/js/platform.js" async defer></script>
    <meta name="google-signin-client_id" content="117413078094-c1i6mg67nt6ap9dhp0knimdq8qjdqqao.apps.googleusercontent.com">
</svelte:head>

<div class="g-signin2" data-longtitle="true" data-onsuccess="onSignIn" />