document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const errorMessages = document.getElementById('errorMessages');
    const reposList = document.getElementById('reposList');


    contactForm.addEventListener('submit', (event) => {
        errorMessages.textContent = '';

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        if (!name || !email || !message) {
            errorMessages.textContent = 'Todos os campos são obrigatórios.';
            event.preventDefault();
        } else if (!validateEmail(email)) {
            errorMessages.textContent = 'O email fornecido não é válido.';
            event.preventDefault();
        }
    });

    function validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }


    fetch('https://api.github.com/users/biinahc/repos')
        .then(response => response.json())
        .then(repos => {
            reposList.innerHTML = repos.map(repo => `
                <div>
                    <a href="${repo.html_url}" target="_blank">${repo.name}</a>
                    <p>${repo.description || 'Sem descrição'}</p>
                </div>
            `).join('');
        })
        .catch(error => {
            reposList.innerHTML = '<p>Erro ao carregar repositórios.</p>';
            console.error('Erro ao consultar a API do GitHub:', error);
        });
});


