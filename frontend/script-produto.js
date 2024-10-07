document.addEventListener('DOMContentLoaded', async () => {
    // Retrieve the product ID from localStorage
    let produtoID = localStorage.getItem('produtoSelecionadoID');
    
    // Retrieve user information (assuming it's stored in localStorage)
    let userInfo = JSON.parse(localStorage.getItem('informacoes'));

    // Ensure that the product ID is available
    if (produtoID) {
        try {
            // Fetch the product details from the server using the product ID
            const response = await fetch(`http://localhost:3013/produtos/${produtoID}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const result = await response.json();

            // If the product details are successfully retrieved
            if (result.success) {
                const produto = result.data;

                // Update the product page with the fetched details
                document.getElementById('img-produto').src = `http://localhost:3013/uploads/${produto.imagem}`;
                document.getElementById('nome-produto').textContent = produto.nome;
                document.getElementById('valor-produto').textContent = `R$ ${parseFloat(produto.preco).toFixed(2)}`;
                document.getElementById('descricao').textContent = produto.descricao;

                // Check if the user is admin and display admin-specific buttons
                if (userInfo && userInfo.perfil === 'admin') {
                    // Admin user - display Edit and Delete buttons
                    document.getElementById('admin-buttons').innerHTML = `
                        <button id="edit-produto">Editar Produto</button>
                        <button id="delete-produto">Deletar Produto</button>
                    `;

                    // Add functionality for Edit and Delete buttons
                    document.getElementById('edit-produto').addEventListener('click', () => {
                        window.location.href = `./editarProduto.html?id=${produtoID}`;  // Redirect to edit product page
                    });

                    document.getElementById('delete-produto').addEventListener('click', async () => {
                        if (confirm('Tem certeza que deseja deletar este produto?')) {
                            try {
                                const deleteResponse = await fetch(`http://localhost:3013/produtos/excluir/${produtoID}`, {
                                    method: 'DELETE',
                                    headers: {
                                        'Content-Type': 'application/json'
                                    }
                                });
                                const deleteResult = await deleteResponse.json();
                                if (deleteResult.success) {
                                    alert('Produto deletado com sucesso!');
                                    window.location.href = './catalogo.html';  // Redirect to catalog after deletion
                                } else {
                                    alert('Erro ao deletar o produto.');
                                }
                            } catch (error) {
                                console.error('Erro ao deletar o produto:', error);
                                alert('Erro ao conectar com o servidor.');
                            }
                        }
                    });

                } else {
                    // Non-admin user - display Add to Cart and Add to Liked buttons
                    document.getElementById('user-buttons').innerHTML = `
                        <button id="add-carrinho">Adicionar ao Carrinho</button>
                        <button id="add-curtidos">Curtir</button>
                    `;

                    // Add product to the cart when the 'Add to Cart' button is clicked
                    let carrinhoButton = document.querySelector('#add-carrinho');
                    if (carrinhoButton) {
                        carrinhoButton.addEventListener('click', () => {
                            let produtosCarrinho = JSON.parse(localStorage.getItem('produtosCarrinho')) || [];
                            let produtoSelecionado = {
                                id: produtoID,
                                nome: document.getElementById('nome-produto').textContent,
                                imagem: document.getElementById('img-produto').src,
                                valor: document.getElementById('valor-produto').textContent
                            };
                            produtosCarrinho.push(produtoSelecionado);
                            localStorage.setItem('produtosCarrinho', JSON.stringify(produtosCarrinho));
                        });
                    }

                    // Add product to liked products list
                    let curtidoButton = document.querySelector('#add-curtidos');
                    if (curtidoButton) {
                        curtidoButton.addEventListener('click', () => {
                            let produtosCurtidos = JSON.parse(localStorage.getItem('produtosCurtidos')) || [];
                            let produtoCurtido = {
                                id: produtoID,
                                nome: document.getElementById('nome-produto').textContent,
                                imagem: document.getElementById('img-produto').src,
                                valor: document.getElementById('valor-produto').textContent
                            };
                            produtosCurtidos.push(produtoCurtido);
                            localStorage.setItem('produtosCurtidos', JSON.stringify(produtosCurtidos));
                        });
                    }
                }

            } else {
                alert('Erro ao carregar o produto.');
            }
        } catch (error) {
            console.error('Erro ao buscar o produto:', error);
            alert('Erro ao conectar com o servidor.');
        }
    } else {
        alert('Produto não encontrado.');
    }
});
