document.addEventListener('DOMContentLoaded', async () => {
    // Busca as informações do usuário do localStorage 
    const dados = JSON.parse(localStorage.getItem('informacoes'));

    // Se o usuário é um admin, apresenta o botão de "Cadastrar Produto"
    if (dados && dados.perfil === 'admin') {
        document.getElementById('cadastrar-produto-btn').classList.remove('hidden');
    }
    
    try {
        // Apresenta a lista de produtose do backend
        const response = await fetch('http://localhost:3013/produtos/listar', {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const result = await response.json(); 
        console.log('Response from server:', result);

        if (result.success) {
            const productData = result.data; 
            const catalogElement = document.getElementById('listaCatalogo');
            
            // Garante que o eletento de catálogo existe no DOM
            if (!catalogElement) {
                console.error('Element #listaCatalogo not found in the DOM.');
                return;
            }

            // Limpa o catálogo antes de apresentar os produtos
            catalogElement.innerHTML = '';

            // Funciona sobre os dados do produto e cria o card de produto para cada produto
            productData.forEach(product => {
                let preco = parseFloat(product.preco); 

                // Formata o preço se for válido, caso contrário é salvo como 'N/A'
                let precoFormatted = isNaN(preco) ? 'N/A' : `R$ ${preco.toFixed(2)}`;

                // Cria a estrutura HTML para os cards dos produtos
                let productCard = `
                    <div class="produto produtoCatalogo" data-id="${product.idproduto}" data-nome="${product.nome}" data-imagem="http://localhost:3013/uploads/${product.imagem}" data-valor="${precoFormatted}" data-descricao="${product.descricao}">
                        <img src="http://localhost:3013/uploads/${product.imagem}" class="imgCatalogo" alt="${product.nome}">
                        <p>${product.nome}</p>
                        <div class="precos">
                            <h3>${precoFormatted}</h3>
                        </div>
                    </div>
                `;

                // Adiciona o card do produto ao elemento do catálogo
                catalogElement.innerHTML += productCard;
            });

          // Adiciona o evento de click para cada produto para salvar o seu repectivo ID como produtoSelecionadoID e redireciona à pagina produto.html
           let produtos = document.querySelectorAll('.produto');
           produtos.forEach(produto => {
               produto.addEventListener('click', () => {
                   let id = produto.getAttribute('data-id'); 
                   console.log('Product ID:', id); 
                   localStorage.setItem('produtoSelecionadoID', id); 
                   window.location.href = './produto.html'; 
               });
           });           

        } else {
            console.error('Erro ao listar produtos:', result.message); 
            alert('Erro ao listar produtos: ' + result.message); 
        }
    } catch (error) {
        console.error('Erro ao buscar os produtos:', error); 
        alert('Erro ao conectar com o servidor.'); 
    }
});
