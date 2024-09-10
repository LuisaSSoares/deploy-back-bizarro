document.addEventListener('DOMContentLoaded', () => {
    const perfilButton = document.getElementById('perfil');
 
    if (perfilButton) {
        perfilButton.addEventListener('click', () => {
            paginaPerfil(); // Chama a função para redirecionar o usuário
        });
    }
});
 
function paginaPerfil() {
    const cadastroSucesso = sessionStorage.getItem('cadastroSucesso'); // Usar sessionStorage
 
    if (!cadastroSucesso) {
        // Se não houver registro de cadastro, redireciona para a página de cadastro
        window.location.href = './cadastro.html';
    } else if (cadastroSucesso === 'true') {
        // Se houver registro de cadastro, redireciona para a página de perfil
        window.location.href = './perfil.html';
    }
}