document.addEventListener('DOMContentLoaded', async () => {
    // Obtém o ID do produto a partir da URL (supondo que o ID esteja como parâmetro na URL)
    const urlParams = new URLSearchParams(window.location.search);
    const produtoId = urlParams.get('id'); // Exemplo de URL: produto.html?id=123

    if (!produtoId) {
        console.error('ID do produto não encontrado na URL.');
        return;
    }

    try {
        // Faz a requisição para buscar as informações do produto pelo ID
        const response = await fetch(`http://localhost:3013/produtos/${produtoId}`);
        const data = await response.json();

        if (data.success) {
            const produto = data.data;

            // Preenche os elementos da página com os dados do produto
            document.getElementById('img-produto').src = `http://localhost:3013/uploads/${produto.imagem}`;
            document.getElementById('nome-produto').textContent = produto.nome;
            document.getElementById('valor-produto').textContent = `R$${produto.preco}`;
            document.getElementById('descricao').textContent = produto.descricao;
        } else {
            console.error('Erro ao buscar informações do produto:', data.message);
        }
    } catch (error) {
        console.error('Erro ao se conectar ao servidor:', error);
    }

    // Adiciona o produto ao carrinho
    let carrinhoButton = document.querySelector('#add-carrinho');
    if (carrinhoButton) {
        carrinhoButton.addEventListener('click', async () => {
            try {
                let produtosCarrinho = JSON.parse(localStorage.getItem('produtosCarrinho')) || [];
                let index = produtosCarrinho.findIndex(produto => produto.id === produtoId);

                if (index !== -1) {
                    produtosCarrinho.splice(index, 1);
                } else {
                    // Adiciona o produto ao carrinho
                    produtosCarrinho.push({ id: produtoId, nome: produto.nome, preco: produto.preco, imagem: produto.imagem });
                }

                localStorage.setItem('produtosCarrinho', JSON.stringify(produtosCarrinho));
            } catch (error) {
                console.error('Erro ao adicionar ao carrinho:', error);
            }
        });
    }

    // Adicionar o produto aos curtidos
    let curtidoButton = document.querySelector('#add-curtidos');
    if (curtidoButton) {
        curtidoButton.addEventListener('click', () => {
            let produtosCurtidos = JSON.parse(localStorage.getItem('produtosCurtidos')) || [];
            let index = produtosCurtidos.findIndex(produto => produto.id === produtoId);

            if (index === -1) {
                produtosCurtidos.push({ id: produtoId, nome: produto.nome, preco: produto.preco, imagem: produto.imagem });
            }

            localStorage.setItem('produtosCurtidos', JSON.stringify(produtosCurtidos));
        });
    }
});
