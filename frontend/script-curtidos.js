document.addEventListener('DOMContentLoaded', () => {
    // Get the element where liked products will be displayed
    const listaCurtidos = document.getElementById('lista-produtos-curtidos');

    // If the element doesn't exist, log an error and stop further execution
    if (!listaCurtidos) {
        console.error('Element #lista-produtos-curtidos not found in the DOM.');
        return;
    }

    // Get liked products from localStorage
    let produtosCurtidos = JSON.parse(localStorage.getItem('produtosCurtidos')) || [];

    // If no products have been liked, show a message
    if (produtosCurtidos.length === 0) {
        const mensagemVazio = `
            <div id="aviso" class="alerta">
                <h1>Você ainda não curtiu nenhum produto!</h1>
                <a href="./catalogo.html">Voltar para o Catálogo</a>
            </div>
        `;
        listaCurtidos.innerHTML = mensagemVazio;
        return;
    }

    // Iterate through the liked products and display them in the DOM
    produtosCurtidos.forEach(produto => {
        let preco = parseFloat(produto.valor);

        // Format price, fallback to 'N/A' if invalid
        let precoFormatted = isNaN(preco) ? 'N/A' : `R$ ${preco.toFixed(2)}`;

        // Create product card
        let productCard = `
            <div class="produtoCurtido" data-id="${produto.id}">
                <img src="${produto.imagem}" alt="${produto.nome}" class="imgCurtido">
                <div class="detalhesCurtido">
                    <h3>${produto.nome}</h3>
                    <p>${precoFormatted}</p>
                    <p>${produto.descricao}</p>
                    <button class="removerCurtido" data-id="${produto.id}">Remover</button>
                </div>
            </div>
        `;

        // Append the product card to the DOM
        listaCurtidos.innerHTML += productCard;
    });

    // Add event listeners to remove liked products
    const removerButtons = document.querySelectorAll('.removerCurtido');
    removerButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            let id = event.target.getAttribute('data-id');
            
            // Filter out the product with the clicked ID
            produtosCurtidos = produtosCurtidos.filter(produto => produto.id !== id);

            // Update localStorage with the new liked products array
            localStorage.setItem('produtosCurtidos', JSON.stringify(produtosCurtidos));

            // Reload the page to reflect the changes
            window.location.reload();
        });
    });
});
