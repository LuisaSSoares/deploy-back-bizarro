async function cadastrar(event) {
    event.preventDefault();

    const nome = document.getElementById('nomeUser').value;
    const email = document.getElementById('emailUser').value;
    const telefone = document.getElementById('telefoneUser').value;
    const cpf = document.getElementById('cpfUser').value;
    const senha = document.getElementById('senhaUser').value;

    const data = {nome, email, telefone, cpf, senha}

    console.log(data);
    
    const response = await fetch('http://localhost:3013/usuario/cadastrar', {
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(data)
    })

    const results = await response.json();

    if(results.success) {
        localStorage.setItem('cadastroSucesso', 'true')
        window.location.href = './index.html'
    }
}