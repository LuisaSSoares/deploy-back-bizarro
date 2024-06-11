document.addEventListener('DOMContentLoaded', () => {
    let produtosCarrinho = JSON.parse(localStorage.getItem('produtosCarrinho')) || [];
    let listaProdutos = document.getElementById('lista-produtos-carrinho');
    let listaFinal = document.querySelector('#lista-final');
    let aviso = document.querySelector('#aviso');
    let btnfinalizar = document.querySelector('#btnFinalizar');
    let btnComprar = document.querySelector('#buyBtn');
    let totalElement = document.getElementById('total');
    let totalValue = 0;

    if (produtosCarrinho.length === 0) {
        aviso.style.display = 'flex';
        btnfinalizar.style.display = 'none'
    } else {
        aviso.style.display = 'none';
        btnfinalizar.style.display = 'flex'
        produtosCarrinho.forEach(produto => {
            listaProdutos.innerHTML += `
                <a href="./produto.html">
                    <li>
                        <div class="produto produtoCatalogo" id="${produto.id}">
                            <img src="${produto.imagem}" alt="" class="imgCatalogo">
                            <p>${produto.nome}</p>
                            <div class="precos">
                                <h3>${produto.valor}</h3>
                            </div>
                        </div>
                    </li>
                </a>`;

            listaFinal.innerHTML += `
                <a href="./produto.html">
                    <li>
                        <div class="produtoFinal" id="${produto.id}">
                            <img src="${produto.imagem}" alt="" id="imgFinal">
                            <p><b>${produto.nome}</b></p>
                            <p>${produto.valor}</p>
                        </div>
                    </li>
                </a>`;

                let valor = parseFloat(produto.valor.replace('R$', '').replace('.', '').replace(',', '.'));
                totalValue += valor;
            });
        }
        totalElement.textContent = `TOTAL: R$${totalValue.toFixed(2)}`;
        
        btnComprar.onclick = function(e) {
            localStorage.removeItem('produtosCarrinho');
        };
    });

const viewModal = () => {
    const modal = document.querySelector('#finalizar');
    const style = modal.style.display;

    if (style === 'flex') {
        modal.style.display = 'none';
    } else {
        modal.style.display = 'flex';
    }
}

document.querySelector('#btnFinalizar').addEventListener('click', viewModal);

window.onclick = function(e) {
    const modal = document.querySelector('#finalizar');
    if (e.target === modal) {
        viewModal();
    }
}

document.querySelector('#closeModal').addEventListener('click', viewModal);
