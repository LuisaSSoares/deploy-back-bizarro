let produtos = document.querySelectorAll('.produto');

produtos.forEach(produto => {
    produto.addEventListener('click', () => {
        let nome = produto.getAttribute('data-nome');
        let imagem = produto.getAttribute('data-imagem');
        let valor = produto.getAttribute('data-valor');
        let id = produto.getAttribute('id');
        let descricao = produto.getAttribute('data-descricao');

        localStorage.setItem('produtoSelecionado', JSON.stringify({ nome, imagem, valor, id, descricao }));
    });
});
