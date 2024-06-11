document.addEventListener('DOMContentLoaded', () => {
  if (!sessionStorage.getItem('cartCleared')) {
      localStorage.removeItem('produtosCarrinho');
      localStorage.removeItem('produtosCurtidos');
      sessionStorage.setItem('cartCleared', 'true');
  }
});
