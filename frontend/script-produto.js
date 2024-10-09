document.addEventListener('DOMContentLoaded', async () => {
    let produtoSelecionadoID = localStorage.getItem('produtoSelecionadoID');
    let usuarioID = localStorage.getItem('usuarioID');

    const addLikedButton = document.getElementById('add-curtidos');
    const removeLikedButton = document.getElementById('remove-curtidos');
    const editProductButton = document.getElementById('editar-btn');
    const deleteProductButton = document.getElementById('btn-excluir');

    // Fetch user information from localStorage
    const dados = JSON.parse(localStorage.getItem('informacoes'));

    if (!produtoSelecionadoID) {
        alert('Erro: Nenhum produto selecionado.');
        return;
    }

    // Fetch product details and display them
    try {
        const response = await fetch(`http://localhost:3013/produtos/${produtoSelecionadoID}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const result = await response.json();

        if (result.success) {
            const product = result.data;

            // Set product details on the page
            document.getElementById('img-produto').src = `http://localhost:3013/uploads/${product.imagem.replace(/\s/g, '%20')}`;
            document.getElementById('nome-produto').textContent = product.nome;
            document.getElementById('valor-produto').textContent = `R$ ${parseFloat(product.preco).toFixed(2)}`;
            document.getElementById('descricao').textContent = product.descricao;

            // Check if user is admin and display the correct buttons
            if (dados && dados.perfil === 'admin') {
                if (addCartButton) addCartButton.style.display = 'none';
                if (addLikedButton) addLikedButton.style.display = 'none';
                if (removeLikedButton) removeLikedButton.style.display = 'none';

                if (editProductButton) editProductButton.style.display = 'flex';
                if (deleteProductButton) deleteProductButton.style.display = 'flex';
            } else {
                // Regular user: Show add to cart and curtidos buttons
                if (editProductButton) editProductButton.style.display = 'none';
                if (deleteProductButton) deleteProductButton.style.display = 'none';
            }

            // Check if the product is already in curtidos (liked)
            const curtidosResponse = await fetch(`http://localhost:3013/curtidos/${usuarioID}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const curtidosResult = await curtidosResponse.json();

            if (curtidosResult.success) {
                const curtidos = curtidosResult.data;

                // Check if the product is already in the user's curtidos list
                const isCurtido = curtidos.some(curtido => curtido.idproduto === parseInt(produtoSelecionadoID));

                // Toggle visibility of Add/Remove Curtidos buttons
                if (dados && dados.perfil != 'admin') {
                    if (isCurtido) {
                        if (addLikedButton) addLikedButton.style.display = 'none';
                        if (removeLikedButton) removeLikedButton.style.display = 'flex';
                    } else {
                        if (addLikedButton) addLikedButton.style.display = 'flex';
                        if (removeLikedButton) removeLikedButton.style.display = 'none';
                    }
                }
            } else {
                console.error('Erro ao carregar curtidos:', curtidosResult.message);
            }
        } else {
            console.error('Erro no backend:', result.message);
        }
    } catch (error) {
        console.error('Erro ao conectar com o servidor:', error);
    }

    // Add product to cart
    if (addCartButton) {
        addCartButton.addEventListener('click', async () => {
            try {
                const response = await fetch(`http://localhost:3013/carrinho/adicionar`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        produto_id: produtoSelecionadoID,
                        usuario_id: usuarioID,
                        quantidade: 1 // Add default quantity as 1
                    })
                });

                const result = await response.json();
                if (response.ok && result.success) {
                    alert('Produto adicionado ao carrinho com sucesso.');
                    addCartButton.disabled = true; // Disable button after adding
                } else {
                    console.error('Erro ao adicionar ao carrinho:', result.message);
                }
            } catch (error) {
                console.error('Erro ao adicionar ao carrinho:', error);
            }
        });
    }

    // Add product to curtidos
    if (addLikedButton) {
        addLikedButton.addEventListener('click', async () => {
            try {
                const response = await fetch(`http://localhost:3013/curtidos/adicionar`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        produto_id: produtoSelecionadoID,
                        usuario_id: usuarioID
                    })
                });

                const result = await response.json();
                if (response.ok && result.success) {
                    alert('Produto adicionado aos curtidos com sucesso.');
                    addLikedButton.style.display = 'none';
                    removeLikedButton.style.display = 'flex';
                } else {
                    console.error('Erro ao adicionar aos curtidos:', result.message);
                }
            } catch (error) {
                console.error('Erro ao adicionar aos curtidos:', error);
            }
        });
    }

    // Remove product from curtidos
    if (removeLikedButton) {
        removeLikedButton.addEventListener('click', async () => {
            try {
                const response = await fetch(`http://localhost:3013/curtidos/remover`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        produto_id: produtoSelecionadoID,
                        usuario_id: usuarioID
                    })
                });

                const result = await response.json();
                if (response.ok && result.success) {
                    alert('Produto removido dos curtidos com sucesso.');
                    addLikedButton.style.display = 'flex';
                    removeLikedButton.style.display = 'none';
                } else {
                    console.error('Erro ao remover dos curtidos:', result.message);
                }
            } catch (error) {
                console.error('Erro ao remover dos curtidos:', error);
            }
        });
    }

    // Admin actions: delete product
    if (deleteProductButton) {
        deleteProductButton.addEventListener('click', async () => {
            const confirmDelete = confirm('Tem certeza de que deseja deletar este produto?');
            if (!confirmDelete) return;

            try {
                const response = await fetch(`http://localhost:3013/produtos/excluir/${produtoSelecionadoID}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                const result = await response.json();
                if (response.ok && result.success) {
                    alert('Produto deletado com sucesso.');
                    window.location.href = './catalogo.html'; // Redirect to catalog after deletion
                } else {
                    console.error('Erro ao deletar produto:', result.message);
                }
            } catch (error) {
                console.error('Erro ao deletar produto:', error);
            }
        });
    }

    // Admin actions: edit product
    if (editProductButton) {
        editProductButton.addEventListener('click', () => {
            window.location.href = `./editarProduto.html?produto_id=${produtoSelecionadoID}`;
        });
    }
});
