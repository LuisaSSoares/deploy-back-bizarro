document.addEventListener('DOMContentLoaded', () => {
    let produtoSelecionado = JSON.parse(localStorage.getItem('produtoSelecionado'));

    if (produtoSelecionado) {
        document.getElementById('img-produto').src = produtoSelecionado.imagem;
        document.getElementById('nome-produto').textContent = produtoSelecionado.nome;
        document.getElementById('valor-produto').textContent = produtoSelecionado.valor;
        document.getElementById('descricao').textContent = produtoSelecionado.descricao;
    }

    let carrinhoButton = document.querySelector('#add-carrinho');
    if (carrinhoButton) {
        carrinhoButton.addEventListener('click', () => {
            let produtosCarrinho = JSON.parse(localStorage.getItem('produtosCarrinho')) || [];
            let index = produtosCarrinho.findIndex(produto => produto.id === produtoSelecionado.id);

            if (index !== -1) {
                produtosCarrinho.splice(index, 1);
            } else {
                produtosCarrinho.push(produtoSelecionado);
            }

            localStorage.setItem('produtosCarrinho', JSON.stringify(produtosCarrinho));
        });
    }

    let curtidoButton = document.querySelector('#add-curtidos');
    if (curtidoButton) {
        curtidoButton.addEventListener('click', () => {
            let produtosCurtidos = JSON.parse(localStorage.getItem('produtosCurtidos')) || [];
            let index = produtosCurtidos.findIndex(produto => produto.id === produtoSelecionado.id);

            if (index === -1) { 
                produtosCurtidos.push(produtoSelecionado);
            }

            localStorage.setItem('produtosCurtidos', JSON.stringify(produtosCurtidos));
        });
    }
});
