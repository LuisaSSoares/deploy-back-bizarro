window.addEventListener("load", () => {
    let dados = JSON.parse(localStorage.getItem('informacoes'))
        // Verifica se o botão de perfil existe na página
        const perfilButton = document.getElementById('perfil');
        if (perfilButton) {
            // Adiciona o evento de clique para redirecionar para a página de perfil
            perfilButton.addEventListener('click', paginaPerfil);
        }
 
    if (window.location.href.toString() === "http://127.0.0.1:5500/frontend/perfil.html") {
        document.getElementById('nomeUsuario').textContent = dados.nome;
        document.getElementById('emailUsuario').textContent = dados.email
 
        if (dados.perfil === 'admin') {
            document.getElementById('admin').style.display = 'block'; // Mostra a mensagem "Admin"
        } else {
            document.getElementById('admin').style.display = 'none'; // Esconde a mensagem "Admin"
        }
    }
 
    const editButton = document.querySelector('.edit-button');
    const modal = document.getElementById('ModalScreen');
    
    if (editButton) {
        editButton.addEventListener('click', () => {
            editarPerfil(); // Função para editar o perfil
        });
    }
 
    const closeModalButton = document.querySelector('.sair');
    if (closeModalButton) {
        closeModalButton.onclick = function() {
            modal.style.display = 'none'; // Fecha o modal
        }
    }
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = 'none'; // Fecha o modal ao clicar fora
        }
    }
 
        const confirmButton = document.getElementById('Confirm');;
        if(confirmButton) {
            confirmButton.onclick = function() {
            const novoNome = document.getElementById('ModifyName').value;
            const novoEmail = document.getElementById('ModifyEmail').value;
            atualizarPerfil(novoNome, novoEmail);                           
            }
        }
    });
 
//Função para abrir a página de perfil
function paginaPerfil() {
    if (localStorage.getItem('informacoes')) {
        // Se houver registro de cadastro, redireciona para a página de perfil
        window.location.href = './perfil.html';
    } else {
        window.location.href = './login.html';
    }
}
 
// Função para editar o perfil
function editarPerfil() {
    const dados = JSON.parse(localStorage.getItem('informacoes'));
    
    if (dados) {
        // Preenche os campos do modal com os dados atuais
        document.getElementById('ModifyName').value = dados.nome;
        document.getElementById('ModifyEmail').value = dados.email;
 
        // Mostra o modal
        document.getElementById('ModalScreen').style.display = 'block';
    } else {
        alert('Erro ao carregar informações do usuário.');
    }
}
 
// Função para atualizar o perfil
function atualizarPerfil(novoNome, novoEmail) {
    let dados = JSON.parse(localStorage.getItem('informacoes'));
 
    if (novoNome && novoEmail) {
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
                    let dadosAtualizados = {
                        idusuario: dados.idusuario,
                        nome: novoNome,
                        email: novoEmail
                    };
 
                    // Atualiza os dados no localStorage com sucesso do servidor
                    localStorage.setItem('informacoes', JSON.stringify(dadosAtualizados));
 
                    // Atualiza o conteúdo na tela imediatamente após a resposta do servidor
                    document.getElementById('nomeUsuario').textContent = novoNome;
                    document.getElementById('emailUsuario').textContent = novoEmail;
 
                    alert('Perfil atualizado com sucesso!');
                    // Fecha o modal
                    document.getElementById('ModalScreen').style.display = 'none';
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
}
 
function sair() {
    localStorage.removeItem('informacoes');
    window.location.href = './index.html';
}
 
 
 