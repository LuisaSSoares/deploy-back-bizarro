document.addEventListener('DOMContentLoaded', async () => {
  try {
      // Fetch products categorized as 'desconto'
      const responseDesconto = await fetch('http://localhost:3013/produtos/categoria/desconto', {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
          },
      });

      const resultDesconto = await responseDesconto.json();

      if (resultDesconto.success) {
          const produtosDesconto = resultDesconto.data;
          let listaProdutosDesconto = document.getElementById('lista-produtos-desconto');

          produtosDesconto.forEach(produto => {
              listaProdutosDesconto.innerHTML += `
              <li>
                  <div class="produto produtoCatalogo" data-id="${produto.idproduto}" data-nome="${produto.nome}" data-imagem="./assets/produtos/${produto.imagem.replace(/\s/g, '%20')}" data-valor="R$${produto.preco}" data-descricao="${produto.descricao}">
                      <img src="http://localhost:3013/uploads/${produto.imagem.replace(/\s/g, '%20')}" class="imgCatalogo">
                      <h1>${produto.nome}</h1>
                      <div class="precos">
                          <h3>R$${parseFloat(produto.preco).toFixed(2)}</h3>
                          ${produto.desconto ? `<h6><u>De R$${produto.desconto}</u></h6>` : ''}
                      </div>
                      <div class="produtoCarrinhoCurtidos">
                          <img src="./assets/cart-plus-fill.svg">
                          <img src="./assets/heart.svg" alt=""/>
                      </div>
                  </div>
              </li>`;
          });

          // Add click event listeners to each product to store the product ID and redirect to produto.html
          let produtos = document.querySelectorAll('.produto');
          produtos.forEach(produto => {
              produto.addEventListener('click', () => {
                  let id = produto.getAttribute('data-id'); // Capture product ID
                  console.log('Product ID:', id); // Debug: Check the correct ID is captured
                  localStorage.setItem('produtoSelecionadoID', id); // Store product ID in localStorage
                  window.location.href = './produto.html'; // Redirect to the product details page
              });
          });

      } else {
          alert('Nenhum produto com desconto encontrado.');
      }

      // Fetch products categorized as 'regular'
      const responseRegular = await fetch('http://localhost:3013/produtos/categoria/regular', {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
          },
      });

      const resultRegular = await responseRegular.json();

      if (resultRegular.success) {
          const produtosRegulares = resultRegular.data;
          let listaProdutos = document.getElementById('lista');

          produtosRegulares.forEach(produto => {
              listaProdutos.innerHTML += `
              <li>
                  <div class="produto produtoDestaque" data-id="${produto.idproduto}" data-nome="${produto.nome}" data-imagem="../backend/src/produtos/${produto.imagem.replace(/\s/g, '%20')}" data-valor="${produto.preco}" data-descricao="${produto.descricao}">
                      <img src="http://localhost:3013/uploads/${produto.imagem.replace(/\s/g, '%20')}" class="produtoImg">
                      <p>${produto.nome}</p>
                      <p><b>R$${parseFloat(produto.preco).toFixed(2)}</b></p>
                      <div class="produtoCarrinhoCurtidos">
                          <img src="./assets/cart-plus-fill.svg">
                          <img src="./assets/heart.svg" alt=""/>
                      </div>
                  </div>
              </li>`;
          });

          // Add click event listeners to each product to store the product ID and redirect to produto.html
          let produtos = document.querySelectorAll('.produto');
          produtos.forEach(produto => {
              produto.addEventListener('click', () => {
                  let id = produto.getAttribute('data-id'); // Capture product ID
                  console.log('Product ID:', id); // Debug: Check the correct ID is captured
                  localStorage.setItem('produtoSelecionadoID', id); // Store product ID in localStorage
                  window.location.href = './produto.html'; // Redirect to the product details page
              });
          });

      } else {
          alert('Nenhum produto regular encontrado.');
      }
  } catch (error) {
      console.error('Erro ao carregar produtos:', error);
  }
});
