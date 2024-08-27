async function cadastrar(event) {
    event.preventDefault();

    const name = document.getElementById('nomeUser').value;
    const email = document.getElementById('emailUser').value;
    const fone = document.getElementById('telefoneUser').value;
    const cpf = document.getElementById('cpfUser').value;
    const password = document.getElementById('senhaUser').value;

    const data = {name, email, fone, cpf, password}

    console.log(data);
    
    const response = await fetch('http://localhost:3002/usuario/cadastrar', {
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(data)
    })

    const results = await response.json();

    if(results.success) {
        alert(results.message)
    } else {
        alert(alert.message)
    }
}