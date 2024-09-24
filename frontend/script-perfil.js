document.addEventListener('DOMContentLoaded', () => {
    const perfilButton = document.getElementById('perfil');

    if (perfilButton) {
        perfilButton.addEventListener('click', () => {
            paginaPerfil(); // Chama a função para redirecionar o usuário
        });
    }
});

function paginaPerfil() {        
    if(localStorage.getItem('informacoes')) { 
        // Se houver registro de cadastro, redireciona para a página de perfil
        window.location.href = './perfil.html';
    } else {
        window.location.href = './login.html';
    }
}

window.addEventListener("load", () => {
    let dados = JSON.parse(localStorage.getItem('informacoes'))

    document.getElementById('nomeUsuario').textContent = dados.nome;
    document.getElementById('emailUsuario').textContent = dados.email

})

document.addEventListener('DOMContentLoaded', () => {
    const perfilButton = document.getElementById('perfil');
    const editButton = document.querySelector('.edit-button');
    
    if (perfilButton) {
        perfilButton.addEventListener('click', () => {
            paginaPerfil(); // Chama a função para redirecionar o usuário
        });
    }

    if (editButton) {
        editButton.addEventListener('click', () => {
            editarPerfil(); // Função para editar o perfil
        });
    }
});

// Função para editar o perfil
function editarPerfil() {
    let dados = JSON.parse(localStorage.getItem('informacoes'));

    if (dados) {
        const novoNome = prompt('Edite seu nome:', dados.nome);
        const novoEmail = prompt('Edite seu e-mail:', dados.email);

        if (novoNome && novoEmail) {
            // Atualiza os dados localmente no localStorage
            // dados.nome = novoNome;
            // dados.email = novoEmail;

            // Atualiza os elementos na página
            // document.getElementById('nomeUsuario').textContent = dados.nome;
            // document.getElementById('emailUsuario').textContent = dados.email;

            // Envia os dados atualizados para o servidor via requisição PUT
            console.log(dados.idusuario)
            fetch(`http://localhost:3013/usuario/editar/${dados.idusuario}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nome: novoNome,
                    email: novoEmail
                }),
            })
            .then(response => response.json())
            .then(results => {
                if (results.success) {
                    let dadosAtualizados = results.data;
                    // Atualiza os dados no localStorage com sucesso do servidor
                    localStorage.setItem('informacoes', JSON.stringify(dadosAtualizados));
                    alert('Perfil atualizado com sucesso!');
                } else {
                    alert('Erro ao atualizar o perfil no servidor.');
                }
            })
            .catch((error) => {
                console.error('Erro:', error);
                alert('Ocorreu um erro ao tentar atualizar o perfil.');
            });
        } else {
            alert('Os campos não podem estar vazios!');
        }
    } else {
        alert('Erro ao carregar informações do usuário.');
    }
}

function sair() {
    localStorage.removeItem('informacoes')
    window.location.href = './index.html';
    
}

window.addEventListener('load', () => {
    if(localStorage.getItem('informacoes')) {
        // document.getElementById('perfil').style.display = "block"
    } else {
        // remove a div de perfil
    }
})
