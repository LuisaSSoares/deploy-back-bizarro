document.addEventListener('DOMContentLoaded', async () => {
    const productList = document.getElementById('listaCatalogo');
    
    try {
        const response = await fetch('http://localhost:3013/produtos/listar');
        const data = await response.json();

        if (data.success) {
            const products = data.data;
            products.forEach(product => {
                const productHTML = `
                    <a href="./produto.html">
                        <li>
                            <div class="produto produtoCatalogo" id="${product.id}">
                                <img src="http://localhost:3013/uploads/${product.imagem}" alt="${product.nome}" class="imgCatalogo">
                                <p>${product.nome}</p>
                                <div class="precos">
                                    <h3>${product.preco}</h3>
                                </div>
                                <div class="produtoCarrinhoCurtidos">
                                    <img src="./assets/cart-plus-fill.svg">
                                    <img src="./assets/heart.svg">
                                </div>
                            </div>
                        </li>
                    </a>
                `;
                productList.innerHTML += productHTML;
            });
        } else {
            console.error('Erro ao carregar produtos:', data.message);
        }
    } catch (error) {
        console.error('Erro ao se conectar ao servidor:', error);
    }
});
