document.addEventListener('DOMContentLoaded', () => {
    let produtosCurtidos = JSON.parse(localStorage.getItem('produtosCurtidos')) || [];
    let listaProdutos = document.getElementById('lista-produtos-curtidos');
    let aviso = document.querySelector('#aviso');

    if (produtosCurtidos.length === 0) {
        aviso.style.display = 'flex';
    } else {
        aviso.style.display = 'none';
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
                </li>`;
            produtoHTML.addEventListener('click', () => {
                localStorage.setItem('produtoSelecionado', JSON.stringify(produto));
            });
            listaProdutos.appendChild(produtoHTML);
        });
    }
});
