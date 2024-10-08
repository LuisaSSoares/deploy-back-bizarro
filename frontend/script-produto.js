document.addEventListener('DOMContentLoaded', async () => {
    // Retrieve the product ID from localStorage
    let produtoSelecionadoID = localStorage.getItem('produtoSelecionadoID');

    // If no product ID is found in localStorage, show an error
    if (!produtoSelecionadoID) {
        alert('Erro: Nenhum produto selecionado.');
        return;
    }

    // Get the "Add to Cart", "Edit", "Add to Liked", and "Delete" buttons
    const addCartButton = document.getElementById('add-carrinho');
    const editButton = document.getElementById('editar-btn');
    const addLikedButton = document.getElementById('add-curtidos');
    const excluirButton = document.getElementById('btn-excluir');

    // Check if user is an admin (based on the user profile from localStorage)
    const dados = JSON.parse(localStorage.getItem('informacoes'));
    if (dados && dados.perfil === 'admin') {
        // Hide "Add to Cart" button and show "Edit" and "Delete" buttons for admins
        if (addCartButton) {
            addCartButton.style.display = 'none';
            addLikedButton.style.display = 'none'; // Hide Like button for admins as well
        }
        if (editButton) {
            editButton.style.display = 'flex';
            excluirButton.style.display = 'flex'; // Show the delete button for admins

            excluirButton.addEventListener('click', async () => {
                let confirmed = confirm('Você tem certeza que deseja excluir este produto?');
                if (confirmed) {
                    try {
                        const deleteResponse = await fetch(`http://localhost:3013/produtos/excluir/${produtoSelecionadoID}`, {
                            method: 'DELETE',
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        });

                        const deleteResult = await deleteResponse.json();

                        if (deleteResult.success) {
                            alert('Produto excluído com sucesso.');
                            window.location.href = './catalogo.html'; // Redirect after deletion
                        } else {
                            alert('Erro ao excluir o produto.');
                        }
                    } catch (error) {
                        console.error('Erro ao excluir o produto:', error);
                    }
                }
            });
        }
    } else {
        // For non-admins: Show "Add to Cart" and "Like" buttons and hide "Edit" and "Delete" buttons
        if (addCartButton) {
            addCartButton.style.display = 'flex';
            addLikedButton.style.display = 'flex'; // Show Like button for non-admins
        }
        if (editButton) {
            editButton.style.display = 'none';
            excluirButton.style.display = 'none'; // Hide Delete button for non-admins
        }
    }

    // Fetch the product details from the backend using the selected product ID
    try {
        const response = await fetch(`http://localhost:3013/produtos/${produtoSelecionadoID}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(`Erro ao obter detalhes do produto. Status: ${response.status}`);
        }

        const result = await response.json(); // Parse the response as JSON

        if (result.success) {
            const product = result.data;

            // Display product details on the page
            document.getElementById('img-produto').src = `http://localhost:3013/uploads/${product.imagem}`;
            document.getElementById('nome-produto').textContent = product.nome;
            document.getElementById('valor-produto').textContent = `R$ ${parseFloat(product.preco).toFixed(2)}`;
            document.getElementById('descricao').textContent = product.descricao;

        } else {
            alert('Erro ao obter detalhes do produto: ' + result.message);
        }
    } catch (error) {
        console.error('Erro ao conectar com o servidor:', error);
        alert(`Erro ao conectar com o servidor: ${error.message}`);
    }
});
