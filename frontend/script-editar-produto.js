document.addEventListener('DOMContentLoaded', async () => {
    let produtoSelecionadoID = localStorage.getItem('produtoSelecionadoID');

    if (!produtoSelecionadoID) {
        alert('Erro: Nenhum produto selecionado.');
        return;
    }

    try {
        // Fetch product details from the backend
        const response = await fetch(`http://localhost:3013/produtos/${produtoSelecionadoID}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const result = await response.json();

        if (result.success) {
            const product = result.data;

            // Pre-fill form fields with product details
            document.getElementById('nomeProduto').value = product.nome;
            document.getElementById('precoProduto').value = parseFloat(product.preco).toFixed(2);
            document.getElementById('descricaoProduto').value = product.descricao;

            // Display the current product image
            const imagemAtual = document.getElementById('imagem-atual');
            imagemAtual.src = `http://localhost:3013/uploads/${product.imagem}`;
        } else {
            alert('Erro ao carregar detalhes do produto: ' + result.message);
        }
    } catch (error) {
        console.error('Erro ao conectar com o servidor:', error);
        alert('Erro ao conectar com o servidor.');
    }

    // Handle form submission
    const form = document.getElementById('form-editar-produto');
    form.addEventListener('submit', async (e) => {
        e.preventDefault(); // Prevent default form submission

        const formData = new FormData(form);
        formData.append('id', produtoSelecionadoID); // Include product ID

        // Check if an image file was uploaded
        const imageInput = document.getElementById('imagemProduto');
        if (!imageInput.files.length) {
            // No new image uploaded, append the current image path
            const currentImage = document.getElementById('imagem-atual').src.split('/').pop();
            formData.append('imagem', currentImage); // Send current image to the backend
        }

        try {
            // Send the form data to the backend for update
            const updateResponse = await fetch(`http://localhost:3013/produtos/editar`, {
                method: 'POST',
                body: formData // Send form data, including file upload
            });

            const updateResult = await updateResponse.json();

            if (updateResult.success) {
                alert('Produto atualizado com sucesso.');
                window.location.href = './produto.html'; // Redirect after successful update
            } else {
                alert('Erro ao atualizar o produto: ' + updateResult.message);
            }
        } catch (error) {
            console.error('Erro ao conectar com o servidor:', error);
        }
    });
});
