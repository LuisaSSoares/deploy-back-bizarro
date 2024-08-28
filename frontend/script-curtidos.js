// document.addEventListener('DOMContentLoaded', () => {
//     let produtosCurtidos = JSON.parse(localStorage.getItem('produtosCurtidos')) || [];
//     let listaProdutos = document.getElementById('lista-produtos-curtidos');
//     let aviso = document.querySelector('#aviso');

//     if (produtosCurtidos.length === 0) {
//         aviso.style.display = 'flex';
//     } else {
//         aviso.style.display = 'none';
//         produtosCurtidos.forEach(produto => {
//             let produtoHTML = document.createElement('a');
//             produtoHTML.href = './produto.html';
//             produtoHTML.innerHTML = `
//                 <li>
//                     <div class="produto produtoCatalogo" id="${produto.id}">
//                         <img src="${produto.imagem}" alt="" class="imgCatalogo">
//                         <p>${produto.nome}</p>
//                         <div class="precos">
//                             <h3>${produto.valor}</h3>
//                         </div>
//                     </div>
//                 </li>`;
//             produtoHTML.addEventListener('click', () => {
//                 localStorage.setItem('produtoSelecionado', JSON.stringify(produto));
//             });
//             listaProdutos.appendChild(produtoHTML);
//         });
//     }
// });

document.addEventListener('DOMContentLoaded', () => {
    //URL da API para retornar os produtos curtidos
    const curtidosURL = 'http://localhost:3013/produto/produtosCurtidos';
    const loginCheckURL = 'http://localhost:3013/usuario/checkLogin';

    // Verifica se o usuário está logado
    fetch(loginCheckURL)
        .then(response => {
            if (response.ok) {
                return fetch(curtidosURL); // Se estiver logado, busca os produtos curtidos
            } else {
                // Se não estiver logado, exibe mensagem para criar ou fazer login
                document.querySelector('#aviso').innerHTML = `
                    <h1>Você precisa estar logado para ver seus produtos curtidos.</h1>
                    <a href="./login.html">Entrar em uma conta</a>
                    <a href="./cadastro.html">Criar uma conta</a>
                `;
            }
        })

    //faz uma requisição para a API para buscar os produtos curtidos
    .then(response => response.json())
    .then(produtosCurtidos => {
        let listaProdutos = document.getElementById('lista-produtos-curtidos')
        let aviso = document.querySelector('#aviso')

        if (produtosCurtidos.length === 0) {
            aviso.style.display = 'flex'
            aviso.innerHTML = 
            `
                <img src="./assets/broken.png" alt="" id="img-broken">
                <h1>Ops! Parece que você não curtiu nenhum produto...</h1>
                <a href="./catalogo.html">Ir para o Catálogo</a>
            `
          
        } else{
            aviso.style.display = 'none'
            produtosCurtidos.forEach(produto => {
                let produtoHTML = document.createElement('a');
                produtoHTML.href = './produto.html';
                produtoHTML.innerHTML = `
                    <li>
                        <div class="produto produtoCatalogo" id="${produto.id}">
                            <img src="${produto.imagem}" alt="" class="imgCatalogo">
                            <p>${produto.nome}</p>
                            <div class="precos">
                                <h3>${produto.valor}</h3>
                            </div>
                        </div>
                    </li>
                    `;
                produtoHTML.addEventListener('click', () => {
                    localStorage.setItem('produtoSelecionado', JSON.stringify(produto));
                });
                listaProdutos.appendChild(produtoHTML);
            });
        }
    })
    .catch(error => {
        console.error('Erro ao buscar os produtos curtidos:', error);
    });
});
