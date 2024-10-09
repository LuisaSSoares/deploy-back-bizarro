async function login(event) {
    event.preventDefault();

    const email = document.getElementById('emailUser').value;
    const senha = document.getElementById('senhaUser').value;
    const mensagem = document.getElementById('mensagemErro')

    if (!email || !senha) {
        mensagem.textContent = 'Por favor, preencha todos os campos.';
        mensagem.style.display = 'block';
        return;
    }

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
        let userData = results.data;

        // Store the entire user information and specifically the user ID in localStorage
        localStorage.setItem('informacoes', JSON.stringify(userData));
        localStorage.setItem('usuarioID', userData.idusuario); // Assuming 'idusuario' is the correct field for user ID

        window.location.href = './index.html'; // Redireciona para a página inicial ou qualquer outra página desejada
    } else {
        mensagem.textContent = 'Email ou senha incorretos.';
        mensagem.style.display = 'block';
    }
}
