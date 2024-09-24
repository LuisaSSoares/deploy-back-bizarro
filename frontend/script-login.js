async function login(event) {
    event.preventDefault();

    const email = document.getElementById('emailUser').value;
    const senha = document.getElementById('senhaUser').value;

    const data = { email, senha };
    const response = await fetch('http://localhost:3013/usuario/login', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    const results = await response.json(); // Converte a resposta da requisição para JSON

    if (results.success) {
        let userData = results.data
        
        localStorage.setItem('informacoes', JSON.stringify(userData))

        window.location.href = './index.html'; // Redireciona para a página inicial ou qualquer outra página desejada
    } else {
        const mensagem = document.getElementById('mensagemErro');
        mensagem.textContent = 'Email ou senha incorretos.';
        mensagem.style.display = 'block';
    }
}
