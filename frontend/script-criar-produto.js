document.getElementById('form-cadastrar-produto').addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('nome', document.getElementById('nomeProduto').value);
    formData.append('preco', document.getElementById('precoProduto').value);
    formData.append('descricao', document.getElementById('descricaoProduto').value);
    formData.append('imagem', document.getElementById('imagemProduto').files[0]); // Get the file from the input

    try {
        const response = await fetch('http://localhost:3013/produtos/cadastrar', {
            method: 'POST',
            body: formData // Send the FormData object
        });

        const result = await response.json();
        if (result.success) {
            alert('Produto cadastrado com sucesso!');
            window.location.href = './catalogo.html'; // Redirect to catalog page after adding the product
        } else {
            document.getElementById('mensagemErro').textContent = 'Erro ao cadastrar o produto.';
        }
    } catch (error) {
        document.getElementById('mensagemErro').textContent = 'Erro no servidor. Tente novamente mais tarde.';
    }
});
