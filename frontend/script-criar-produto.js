document.getElementById('form-cadastrar-produto').addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const formData = new FormData();
    formData.append('nome', document.getElementById('nomeProduto').value);
    formData.append('preco', document.getElementById('precoProduto').value);
    formData.append('descricao', document.getElementById('descricaoProduto').value);
    formData.append('imagem', document.getElementById('imagemProduto').files[0]);

    try {
        const response = await fetch('http://localhost:3013/produtos/cadastrar', {
            method: 'POST',
            body: formData
        });

        const result = await response.json();
        if (result.success) {
            alert('Produto cadastrado com sucesso!');
            window.location.href = './catalogo.html';
        } else {
            document.getElementById('mensagemErro').textContent = 'Erro ao cadastrar o produto.';
        }
    } catch (error) {
        document.getElementById('mensagemErro').textContent = 'Erro no servidor. Tente novamente mais tarde.';
    }
});
