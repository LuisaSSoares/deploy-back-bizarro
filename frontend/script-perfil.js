document.addEventListener('DOMContentLoaded', () => {
    const perfilButton = document.getElementById('perfil');

    if (perfilButton) {
        perfilButton.addEventListener('click', () => {
            paginaPerfil(); // Chama a função para redirecionar o usuário
        });
    }
});

function paginaPerfil() {
    const cadastroSucesso = sessionStorage.getItem('cadastroSucesso'); // Usar sessionStorage para salvar infos do usuário cadastrado/logado 

    if (!cadastroSucesso) {
        // Se não houver registro de cadastro, redireciona para a página de cadastro
        window.location.href = './cadastro.html';
    } else if (cadastroSucesso === 'true') {
        // Se houver registro de cadastro, redireciona para a página de perfil
        window.location.href = './perfil.html';

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

function paginaPerfil() {
    const cadastroSucesso = sessionStorage.getItem('cadastroSucesso');

    if (!cadastroSucesso) {
        window.location.href = './cadastro.html';
    } else if (cadastroSucesso === 'true') {
        window.location.href = './perfil.html';
    }
}

window.addEventListener("load", () => {
    let dados = JSON.parse(localStorage.getItem('informacoes'));

    if (dados) {
        document.getElementById('nomeUsuario').textContent = dados.nome;
        document.getElementById('emailUsuario').textContent = dados.email;
    }
});

// Função para editar o perfil
function editarPerfil() {
    let dados = JSON.parse(localStorage.getItem('informacoes'));

    const novoNome = prompt('Edite seu nome:', dados.nome);
    const novoEmail = prompt('Edite seu e-mail:', dados.email);

    if (novoNome && novoEmail) {
        // Atualiza os dados
        dados.nome = novoNome;
        dados.email = novoEmail;

        // Salva as alterações no localStorage
        localStorage.setItem('informacoes', JSON.stringify(dados));

        // Atualiza os elementos na página
        document.getElementById('nomeUsuario').textContent = dados.nome;
        document.getElementById('emailUsuario').textContent = dados.email;

        alert('Perfil atualizado com sucesso!');
    } else {
        alert('Os campos não podem estar vazios!');
    }
}
