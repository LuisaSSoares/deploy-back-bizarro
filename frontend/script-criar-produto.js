document.getElementById('form-cadastrar-produto').addEventListener('submit', async (event) => {
    event.preventDefault();  // Prevent the default form submission

    // Get the form data from the input fields
    const nome = document.getElementById('nomeProduto').value;
    const preco = document.getElementById('precoProduto').value;
    const descricao = document.getElementById('descricaoProduto').value;
    const imagemInput = document.getElementById('imagemProduto');
    const imagem = imagemInput.files[0];  // Get the selected image file

    console.log('Form Data:', { nome, preco, descricao, imagem });  // Debugging log

    // Ensure that all fields are filled out
    if (!nome || !preco || !descricao || !imagem) {
        document.getElementById('mensagemErro').textContent = 'Por favor, preencha todos os campos.';
        return;
    }

    // Create a FormData object to handle the file upload
    const formData = new FormData();
    formData.append('nome', nome);
    formData.append('preco', preco);
    formData.append('descricao', descricao);
    formData.append('imagem', imagem);  // Append the image file to the form data

    try {
        // Make the request to the backend to create the product
        const response = await fetch('http://localhost:3013/produtos/cadastrar', {
            method: 'POST',
            body: formData  // Send the form data (including the image file)
        });

        const result = await response.json();  // Parse the response as JSON
        console.log('Server Response:', result);  // Debugging log

        // If the product was successfully created, redirect to the catalog page
        if (result.success) {
            window.location.href = './catalogo.html';  // Redirect to the catalog page
        } else {
            document.getElementById('mensagemErro').textContent = 'Erro ao cadastrar o produto.';
        }
    } catch (error) {
        console.error('Erro no servidor:', error);  // Log any server errors
        document.getElementById('mensagemErro').textContent = 'Erro no servidor. Tente novamente mais tarde.';
    }
});
