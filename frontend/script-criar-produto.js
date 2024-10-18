document.getElementById('form-cadastrar-produto').addEventListener('submit', async (event) => {
    event.preventDefault(); 
    // Pega os dados do formulário de cada campo input 
    const nome = document.getElementById('nomeProduto').value;
    const preco = document.getElementById('precoProduto').value;
    const descricao = document.getElementById('descricaoProduto').value;
    const imagemInput = document.getElementById('imagemProduto');
    const imagem = imagemInput.files[0];  

    console.log('Form Data:', { nome, preco, descricao, imagem });

    // Garante que todos campos estejam preenchidos
    if (!nome || !preco || !descricao || !imagem) {
        document.getElementById('mensagemErro').textContent = 'Por favor, preencha todos os campos.';
        return;
    }

    // Cria um objeto FormData para armazenar os valores
    const formData = new FormData();
    formData.append('nome', nome);
    formData.append('preco', preco);
    formData.append('descricao', descricao);
    formData.append('imagem', imagem); 

    try {
        // Realiza o request para o backend para criar o produto 
        const response = await fetch('http://localhost:3013/produtos/cadastrar', {
            method: 'POST',
            body: formData 
        });

        const result = await response.json(); 
        console.log('Server Response:', result);  

        // Se o produto foi criado com sucesso, é redirecionado para a página de caltálogo 
        if (result.success) {
            window.location.href = './catalogo.html';  // Redirect to the catalog page
        } else {
            document.getElementById('mensagemErro').textContent = 'Erro ao cadastrar o produto.';
        }
    } catch (error) {
        console.error('Erro no servidor:', error); 
        document.getElementById('mensagemErro').textContent = 'Erro no servidor. Tente novamente mais tarde.';
    }
});
