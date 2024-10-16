let inputElement = document.querySelector('#textSearch');  // Captura o campo de input da barra de pesquisa
let listElement = document.querySelector('#listaCatalogo'); // Captura o container que contém os produtos
let anuncio = document.querySelector('#title');  // Captura o título ou anúncio

// Função para capturar todos os itens de produto
const getProducts = () => {
    return document.querySelectorAll('.produto');  // Seleciona todos os produtos na página (cada um com a classe .produto)
}

// Evento de input para capturar o termo de pesquisa
inputElement.addEventListener("input", (e) => {
    let inputed = e.target.value.toLowerCase();  // Obtém o valor digitado pelo usuário e transforma em minúsculas
    let products = getProducts();  // Obtém a lista atual de produtos

    // Percorre todos os produtos e aplica o filtro
    products.forEach((product) => {
        let productName = product.querySelector('p').textContent.toLowerCase();  // Obtém o nome do produto
        if (productName.includes(inputed)) {  // Verifica se o nome do produto contém o texto digitado
            product.style.display = "block";  // Exibe o produto se ele corresponder ao termo de pesquisa
        } else {
            product.style.display = "none";  // Esconde o produto se ele não corresponder ao termo de pesquisa
        }
    });

    // Se o input estiver vazio, mostra o anúncio/título
    if (inputed === "") {
        anuncio.style.display = "block";
    } else {
        anuncio.style.display = "none";
    }
});

// Executa quando a página é carregada
window.addEventListener("load", () => {
    let dados = JSON.parse(localStorage.getItem('informacoes'));
    console.log(dados);  // Apenas para ver se há informações no localStorage
});
