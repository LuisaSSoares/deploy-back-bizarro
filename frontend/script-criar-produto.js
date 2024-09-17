document.getElementById('form-cadastrar-produto').addEventListener('submit', async (event) => {
    event.preventDefault();

    const nome = document.getElementById('nomeProduto').value;
    const preco = document.getElementById('precoProduto').value;
    const descricao = document.getElementById('descricaoProduto').value;
    const imagem = document.getElementById('imagemProduto').value;

    const data = { nome, preco, descricao, imagem };

    try {
        const response = await fetch('http://localhost:3013/produtos/cadastrar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        if (result.success) {
            alert('Produto cadastrado com sucesso!');
            window.location.href = './catalogo.html'; // Redirect to the product catalog
        } else {
            document.getElementById('mensagemErro').textContent = 'Erro ao cadastrar o produto.';
        }
    } catch (error) {
        document.getElementById('mensagemErro').textContent = 'Erro no servidor. Tente novamente mais tarde.';
    }
});
