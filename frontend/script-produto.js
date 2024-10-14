document.addEventListener('DOMContentLoaded', async () => {
    const produtoSelecionadoID = localStorage.getItem('produtoSelecionadoID');
    const usuarioID = localStorage.getItem('usuarioID');
    const dados = JSON.parse(localStorage.getItem('informacoes'));

    const addLikedButton = document.getElementById('add-curtidos');
    const addCartButton = document.getElementById('add-carrinho');
    const removeLikedButton = document.getElementById('remove-curtidos');
    const editProductButton = document.getElementById('editar-btn');
    const deleteProductButton = document.getElementById('btn-excluir');

    if (!produtoSelecionadoID) {
        alert('Erro: Nenhum produto selecionado.');
        return;
    }

    // Utility function for making API requests
    async function fetchData(url, options = {}) {
        try {
            const response = await fetch(url, options);
            const result = await response.json();
            if (!response.ok) {
                throw new Error(result.message || 'Erro desconhecido no servidor');
            }
            return result;
        } catch (error) {
            console.error('Erro:', error.message);
            throw error;
        }
    }

    // Load product details
    async function loadProductDetails() {
        try {
            const result = await fetchData(`http://localhost:3013/produtos/${produtoSelecionadoID}`);
            if (result.success) {
                const product = result.data;
                displayProductDetails(product);
                handleUserPermissions();
                checkCurtidosStatus();
            }
        } catch (error) {
            alert('Erro ao carregar detalhes do produto.');
        }
    }

    // Display product details in the DOM
    function displayProductDetails(product) {
        document.getElementById('img-produto').src = `http://localhost:3013/uploads/${product.imagem.replace(/\s/g, '%20')}`;
        document.getElementById('nome-produto').textContent = product.nome;
        document.getElementById('valor-produto').textContent = `R$ ${parseFloat(product.preco).toFixed(2)}`;
        document.getElementById('descricao').textContent = product.descricao;
    }

    // Check user permissions and adjust buttons accordingly
    function handleUserPermissions() {
        if (dados && dados.perfil === 'admin') {
            toggleButtonVisibility(addCartButton, false);
            toggleButtonVisibility(addLikedButton, false);
            toggleButtonVisibility(removeLikedButton, false);
            toggleButtonVisibility(editProductButton, true, 'flex');
            toggleButtonVisibility(deleteProductButton, true, 'flex');
        } else {
            toggleButtonVisibility(editProductButton, false);
            toggleButtonVisibility(deleteProductButton, false);
        }
    }

    // Toggle the visibility of buttons
    function toggleButtonVisibility(button, show, displayType = 'block') {
        if (button) {
            button.style.display = show ? displayType : 'none';
        }
    }

    // Check if the product is already liked by the user
    async function checkCurtidosStatus() {
        try {
            const curtidosResult = await fetchData(`http://localhost:3013/curtidos/${usuarioID}`);
            if (curtidosResult.success) {
                const curtidos = curtidosResult.data;
                const isCurtido = curtidos.some(curtido => curtido.idproduto === parseInt(produtoSelecionadoID));
                updateCurtidosButtons(isCurtido);
            }
        } catch (error) {
            console.error('Erro ao carregar curtidos:', error);
        }
    }

    // Update Curtidos (like) buttons based on product's status
    function updateCurtidosButtons(isCurtido) {
        if (dados && dados.perfil != 'admin') {
            toggleButtonVisibility(addLikedButton, !isCurtido, 'flex');
            toggleButtonVisibility(removeLikedButton, isCurtido, 'flex');
        }
    }

    // Add event listeners
    function addEventListeners() {
        addCartButton?.addEventListener('click', addToCart);
        addLikedButton?.addEventListener('click', addToCurtidos);
        removeLikedButton?.addEventListener('click', removeFromCurtidos);
        editProductButton?.addEventListener('click', editProduct);
        deleteProductButton?.addEventListener('click', deleteProduct);
    }

    // Add product to cart
    async function addToCart() {
        try {
            const result = await fetchData('http://localhost:3013/carrinho/adicionar', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ produto_id: produtoSelecionadoID, usuario_id: usuarioID, quantidade: 1 })
            });
            alert('Produto adicionado ao carrinho com sucesso.');
            addCartButton.disabled = true;
        } catch (error) {
            alert('Erro ao adicionar ao carrinho.');
        }
    }

    // Add product to curtidos (liked)
    async function addToCurtidos() {
        try {
            const result = await fetchData('http://localhost:3013/curtidos/adicionar', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ produto_id: produtoSelecionadoID, usuario_id: usuarioID })
            });
            alert('Produto adicionado aos curtidos com sucesso.');
            updateCurtidosButtons(true);
        } catch (error) {
            alert('Erro ao adicionar aos curtidos.');
        }
    }

    // Remove product from curtidos
    async function removeFromCurtidos() {
        try {
            const result = await fetchData('http://localhost:3013/curtidos/remover', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ produto_id: produtoSelecionadoID, usuario_id: usuarioID })
            });
            alert('Produto removido dos curtidos com sucesso.');
            updateCurtidosButtons(false);
        } catch (error) {
            alert('Erro ao remover dos curtidos.');
        }
    }

    // Delete product (admin only)
    async function deleteProduct() {
        const confirmDelete = confirm('Tem certeza de que deseja deletar este produto?');
        if (!confirmDelete) return;

        try {
            const result = await fetchData(`http://localhost:3013/produtos/excluir/${produtoSelecionadoID}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            });
            alert('Produto deletado com sucesso.');
            window.location.href = './catalogo.html';
        } catch (error) {
            alert('Erro ao deletar produto.');
        }
    }

    // Edit product (admin only)
    function editProduct() {
        window.location.href = `./editarProduto.html?produto_id=${produtoSelecionadoID}`;
    }

    // Initialize the page
    async function initialize() {
        await loadProductDetails();
        addEventListeners();
    }

    initialize();
});
