document.addEventListener('DOMContentLoaded', () => {
    const greetBtn = document.getElementById('greetBtn');
    const nameInput = document.getElementById('nameInput');
    const resultBox = document.getElementById('result');
    const messageEl = document.getElementById('message');

    greetBtn.addEventListener('click', fetchGreeting);
    nameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            fetchGreeting();
        }
    });

    async function fetchGreeting() {
        let name = nameInput.value.trim();
        let url = '/api/hello';
        if (name) {
            url += `?name=${encodeURIComponent(name)}`;
        }

        try {
            greetBtn.disabled = true;
            greetBtn.innerText = 'Loading...';

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();

            // Display result
            messageEl.innerText = data.message;
            resultBox.classList.remove('hidden');

            // Add simple pop animation
            resultBox.style.transform = 'scale(1.05)';
            setTimeout(() => {
                resultBox.style.transform = 'scale(1)';
            }, 200);

        } catch (error) {
            console.error('Error fetching greeting:', error);
            messageEl.innerText = 'Error connecting to the server.';
            resultBox.classList.remove('hidden');
        } finally {
            greetBtn.disabled = false;
            greetBtn.innerText = 'Greet Me';
        }
    }
});
