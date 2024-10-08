document.addEventListener('DOMContentLoaded', async () => {
    // Fetch user information from localStorage
    const dados = JSON.parse(localStorage.getItem('informacoes'));

    // If the user is an admin, show the "Cadastrar Produto" button
    if (dados && dados.perfil === 'admin') {
        document.getElementById('cadastrar-produto-btn').classList.remove('hidden');
    }
    
    try {
        // Fetch the list of products from the backend
        const response = await fetch('http://localhost:3013/produtos/listar', {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const result = await response.json(); // Parse the response as JSON
        console.log('Response from server:', result); // Debugging: log the server response

        if (result.success) {
            const productData = result.data; // Extract the product data from the result
            const catalogElement = document.getElementById('listaCatalogo'); // The element where the products will be listed

            // Ensure that the catalog element exists in the DOM
            if (!catalogElement) {
                console.error('Element #listaCatalogo not found in the DOM.');
                return;
            }

            // Clear the catalog before appending new products
            catalogElement.innerHTML = '';

            // Iterate over the product data and create product cards for each product
            productData.forEach(product => {
                let preco = parseFloat(product.preco); // Parse the price as a float

                // Format the price if it's valid, otherwise set it as 'N/A'
                let precoFormatted = isNaN(preco) ? 'N/A' : `R$ ${preco.toFixed(2)}`;

                // Create the HTML structure for a product card
                let productCard = `
                    <div class="produto produtoCatalogo" data-id="${product.idproduto}" data-nome="${product.nome}" data-imagem="http://localhost:3013/uploads/${product.imagem}" data-valor="${precoFormatted}" data-descricao="${product.descricao}">
                        <img src="http://localhost:3013/uploads/${product.imagem}" class="imgCatalogo" alt="${product.nome}">
                        <p>${product.nome}</p>
                        <div class="precos">
                            <h3>${precoFormatted}</h3>
                        </div>
                    </div>
                `;

                // Append the product card to the catalog element
                catalogElement.innerHTML += productCard;
            });

           // Add click event listeners to each product to store the product ID and redirect to produto.html
           let produtos = document.querySelectorAll('.produto');
           produtos.forEach(produto => {
               produto.addEventListener('click', () => {
                   let id = produto.getAttribute('data-id'); // Get the product ID from data-id attribute
                   console.log('Product ID:', id); // Debugging: check if the correct ID is being retrieved
                   localStorage.setItem('produtoSelecionadoID', id); // Store product ID in localStorage
                   window.location.href = './produto.html'; // Redirect to the product details page
               });
           });           

        } else {
            console.error('Erro ao listar produtos:', result.message); // Log an error if products cannot be listed
            alert('Erro ao listar produtos: ' + result.message); // Show an error message to the user
        }
    } catch (error) {
        console.error('Erro ao buscar os produtos:', error); // Log any errors that occur during the fetch
        alert('Erro ao conectar com o servidor.'); // Show an error message if there's a connection issue
    }
});
