document.addEventListener('DOMContentLoaded', async () => {
    const usuarioID = localStorage.getItem('usuarioID');
    
    if (!usuarioID) {
        alert('Erro: Usuário não logado.');
        return;
    }

    try {
        const response = await fetch(`http://localhost:3013/carrinho/${usuarioID}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const result = await response.json();

        if (result.success) {
            const produtosCarrinho = result.data;
            let listaProdutos = document.getElementById('lista-produtos-carrinho');
            let listaFinal = document.querySelector('#lista-final');
            let aviso = document.querySelector('#aviso');
            let btnFinalizar = document.querySelector('#btnFinalizar');
            let modal = document.getElementById('finalizar')
            let totalElement = document.getElementById('total');
            let totalValue = 0;

            if (produtosCarrinho.length === 0) {
                aviso.style.display = 'flex';
                btnFinalizar.style.display = 'none';
            } else {
                aviso.style.display = 'none';
                btnFinalizar.style.display = 'flex';
                        btnFinalizar.addEventListener('click', () => {
                            modal.style.display = 'flex'
                        })
                produtosCarrinho.forEach(produto => {
                    listaProdutos.innerHTML += `
                        <a href="javascript:void(0);" class="produto-link">
                            <li>
                                <div class="produto produtoCatalogo" id="${produto.idproduto}">
                                    <img src="http://localhost:3013/uploads/${produto.imagem}" alt="" class="imgCatalogo">
                                    <p>${produto.nome}</p>
                                    <div class="precos">
                                        <h3>R$ ${parseFloat(produto.preco).toFixed(2)}</h3>
                                    </div>
                                </div>
                            </li>
                        </a>`;

                    listaFinal.innerHTML += `
                        <a href="javascript:void(0);" class="produto-link">
                            <li>
                                <div class="produtoFinal" id="${produto.idproduto}">
                                    <img src="http://localhost:3013/uploads/${produto.imagem}" alt="" id="imgFinal">
                                    <p><b>${produto.nome}</b></p>
                                    <p>R$ ${parseFloat(produto.preco).toFixed(2)}</p>
                                </div>
                            </li>
                        </a>`;

                    totalValue += parseFloat(produto.preco);

                    // Adiciona evento de clique para redirecionar para a página do produto
                    const produtoLinks = document.querySelectorAll('.produto-link');
                    produtoLinks.forEach((link, index) => {
                        link.addEventListener('click', () => {
                            const produtoSelecionadoID = produtosCarrinho[index].idproduto;
                            localStorage.setItem('produtoSelecionadoID', produtoSelecionadoID);
                            window.location.href = './produto.html';  // Redireciona para a página do produto
                        });
                    });
                });
            }

            totalElement.textContent = `TOTAL: R$ ${totalValue.toFixed(2)}`;
        } else {
            alert('Erro ao carregar produtos do carrinho.');
        }
    } catch (error) {
        console.error('Erro ao carregar produtos do carrinho:', error);
    }

    // Handle purchase finalization (emptying the cart)
    const btnComprar = document.querySelector('#buyBtn');
    if (btnComprar) {
        btnComprar.addEventListener('click', async () => {
            try {
                // Finalize the purchase on the backend and clear the cart
                const clearCartResponse = await fetch(`http://localhost:3013/carrinho/limpar/${usuarioID}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                const clearResult = await clearCartResponse.json();

                if (clearResult.success) {
                    alert('Compra finalizada com sucesso!');

                    // Optionally clear localStorage if necessary
                    localStorage.removeItem('produtosCarrinho');

                    // Update the UI
                    document.getElementById('lista-produtos-carrinho').innerHTML = '<p>Seu carrinho está vazio.</p>';
                    document.getElementById('total').textContent = 'TOTAL: R$ 0.00';
                    document.getElementById('lista-final').innerHTML = '';
                    document.getElementById('aviso').style.display = 'flex';
                    document.getElementById('btnFinalizar').style.display = 'none';
                } else {
                    alert('Erro ao finalizar a compra.');
                }
            } catch (error) {
                console.error('Erro ao finalizar a compra:', error);
            }
        });
    }
});
