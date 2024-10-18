document.addEventListener('DOMContentLoaded', async () => {
    let produtoSelecionadoID = localStorage.getItem('produtoSelecionadoID');

    if (!produtoSelecionadoID) {
        alert('Erro: Nenhum produto selecionado.');
        return;
    }

    try {
        // Apresenta os detalhes do produto através do backend
        const response = await fetch(`http://localhost:3013/produtos/${produtoSelecionadoID}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const result = await response.json();

        if (result.success) {
            const product = result.data;

            // Preenche os campos do formulário com os detalhes do produto
            document.getElementById('nomeProduto').value = product.nome;
            document.getElementById('precoProduto').value = parseFloat(product.preco).toFixed(2);
            document.getElementById('descricaoProduto').value = product.descricao;

            // Apresenta a a imagem atual do produto product
            const imagemAtual = document.getElementById('imagem-atual');
            if (product.imagem) {
                imagemAtual.src = `http://localhost:3013/uploads/${product.imagem}`;
                imagemAtual.style.display = 'block'; 
            }
        } else {
            alert('Erro ao carregar detalhes do produto: ' + result.message);
        }
    } catch (error) {
        console.error('Erro ao conectar com o servidor:', error);
        alert('Erro ao conectar com o servidor.');
    }

    // Envio das alterações do formulário
    const form = document.getElementById('form-editar-produto');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault(); 

            const formData = new FormData();

            // Inclui apenas campos que possuem valor
            const nomeProduto = document.getElementById('nomeProduto').value.trim();
            if (nomeProduto) {
                formData.append('nome', nomeProduto);
            }

            const precoProduto = document.getElementById('precoProduto').value.trim();
            if (precoProduto) {
                formData.append('preco', precoProduto);
            }

            const descricaoProduto = document.getElementById('descricaoProduto').value.trim();
            if (descricaoProduto) {
                formData.append('descricao', descricaoProduto);
            }

            // Verifica se o arquivo de uma imagem foi inserido
            const imageInput = document.getElementById('imagemProduto');
            if (imageInput.files.length > 0) {
                formData.append('imagem', imageInput.files[0]);
            } else {
                // Se nenhuma imagem for inserida, apresenta a imagem atual
                const currentImage = document.getElementById('imagem-atual').src.split('/').pop();
                formData.append('imagem', currentImage);
            }

            try {
                // Envia os dados do formulário para o backend par ser atualizado
                const updateResponse = await fetch(`http://localhost:3013/produtos/editar/${produtoSelecionadoID}`, {
                    method: 'PUT',
                    body: formData 
                });

                const updateResult = await updateResponse.json();

                if (updateResult.success) {
                    alert('Produto atualizado com sucesso.');
                    window.location.href = './produto.html';
                } else {
                    alert('Erro ao atualizar o produto: ' + updateResult.message);
                }
            } catch (error) {
                console.error('Erro ao conectar com o servidor:', error);
            }
        });
    } else {
        console.error('Form not found on the page.');
    }
});
