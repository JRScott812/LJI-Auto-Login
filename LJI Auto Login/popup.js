document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.local.get(['username', 'password'], (result) => {
        if (result.username) document.getElementById('username').value = result.username;
        if (result.password) document.getElementById('password').value = result.password;
    });

    document.getElementById('saveBtn').addEventListener('click', () => {
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();

        if (!username || !password) {
            showMessage('Enter both fields', 'error');
            return;
        }

        chrome.storage.local.set({ username, password }, () => showMessage('Saved!', 'success'));
    });

    document.getElementById('clearBtn').addEventListener('click', () => {
        chrome.storage.local.remove(['username', 'password'], () => {
            document.getElementById('username').value = '';
            document.getElementById('password').value = '';
            showMessage('Cleared', 'success');
        });
    });
});

function showMessage(text, type) {
    const msg = document.getElementById('message');
    msg.textContent = text;
    msg.className = type;
    setTimeout(() => { msg.textContent = ''; msg.className = ''; }, 2000);
}
