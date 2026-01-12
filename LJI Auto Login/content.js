let attempts = 0;
const MAX_ATTEMPTS = 20;

// Fill fields with stored credentials and submit
function autoLogin() {
    if (attempts++ > MAX_ATTEMPTS) {
        console.error('Failed to find login form after max attempts');
        return;
    }

    chrome.storage.local.get(['username', 'password'], (result) => {
        if (!result.username || !result.password) {
            console.log('No credentials saved');
            return;
        }

        const usernameField = document.getElementById('username');
        const passwordField = document.getElementById('password');
        const button = document.querySelector('button[type="submit"]');

        if (usernameField && passwordField && button) {
            console.log('Filling credentials and submitting');

            // Fill the fields
            usernameField.value = result.username;
            passwordField.value = result.password;

            // Trigger events to notify the form
            usernameField.dispatchEvent(new Event('input', { bubbles: true }));
            usernameField.dispatchEvent(new Event('change', { bubbles: true }));
            passwordField.dispatchEvent(new Event('input', { bubbles: true }));
            passwordField.dispatchEvent(new Event('change', { bubbles: true }));

            // Click submit after short delay
            setTimeout(() => button.click(), 500);
        } else {
            console.log('Waiting for form...');
            setTimeout(autoLogin, 300);
        }
    });
}

setTimeout(autoLogin, 1000);
