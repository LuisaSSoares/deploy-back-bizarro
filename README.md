DOCUMENTAÇÃO DO PROJETO 

-Visão geral:
Nome do projeto: BIZARRO

Descrição: O "BIZARRO" foi um projeto desenvolvido na aula de Técnico do SENAC durante dois meses no primeiro trimestre. Consiste em um mercado místico, com produtos diferenciados e criativos. O objetivo deste projeto era aprender a aplicar o localStorage utilizando JS para coletar as informações dos produtos para poder visualizá-los separadamente e os armazenar no carrinho. Além disso, foi uma forma de estimular a criatividade e desempenhar boas práticas de programação.

Linguagens utilizadas: HTML, CSS e JS

Cores utilizadas:
FUNDO: #222677; #382277; #09203D
HEADER: #1C457D
INPUT: #a458b9
LOGO E BOTÕES: #CA6CE5
CATÁLOGO BOX: #1C457D; #CA6CE5

-Meu papel no projeto (Luisa Soares):
Responsabilidades: Fiquei responsável em desenvolver o front-end da página inicial e do catálogo.

-Documentação Front-end: 
Página inicial (index.html): Na página inicial, desenvolvi toda a estrutura do header, uma parte do carousel de slides, as boxes de acessos e os produtos de hoje (em destaque). 

Header:
Componentes: Os componentes do header incluem a logo e o nome do mercado, a barra de pesquisa com a lupa e os botões de carrinho e de curtidos.

Layout: Os elementos implementados no header foram divididos em 3 <div> com ids diferentes (logo, search e acesso) para poder fazer ajustes em partes que incluíam mais de um elementos. Essas 3 divisões foram separadas uniformemente de forma que fossem distribuídas no eixo do header com o space-around no CSS. Além dele, utilizei o height para deixar a altura do header maior, tirei as bordas e alinhei eles ao centro com o align-items.

Logo e nome do mercado: 
Descrição: A imagem da logo e o <h1> correspondente ao nome do mercado foram colocados dentro da <div> chamada "logo" e estão posicionados no canto esquerdo do header. Para deixar estes elementos juntos, atribuí um display: flex nessa div e coloquei uma margem em cima e ao lado esquerdo para deixar um pequeno espaçamento entre eles e o header. 

LOGO: A implementação do logo foi feita por um ícone de bezerro no Canva, onde modificamos a cor para ficar conforme a paleta de cores do mercado. foi atribuído um id pra ela chamada "figure" para poder ajustar seu tamanho no header com o CSS. Além disso, colocamos a tag <a> ligada com a página principal para que, quando formos para outras páginas, podemos retornar para a página principal clicando na figura. 


NOME: Para fazer uns ajustes no nome do mercado "BIZARRO" com o CSS, atribuí um id chamado "nome" e utilizei a fonte "David Libre" e a cor #CA6CE5, conhecida por um magenta mais claro. Para aumentar o tamanho da fonte, utilizei font-size e deixei uma margem para cima para deixá-lo alinhado com a figura. Para deixar um pouco de espaço entre as letras, usei o letter-spacing. 

Barra de pesquisa: O input de pesquisa e o ícone de lupa foram colocados dentro de uma <div> chamada "Search" e estão posicionados ao centro do header. Utilizei o CSS para deixar esses objetos juntos com o display flex e para modificar a barra, colocando uma borda que incluísse esses elementos, onde mudei a cor para a mesma que usei na logo. Assim, aumentei a altura e largura da barra de pesquisa com height e width e arredondei as laterais da borda com border-radius. Ao clicar na barra de pesquisa, ela vai direto para a página do catálogo (./catalogo.html)

Input: A tag <input> de tipo text serve como um campo de entrada de dados para que possamos digitar o produto que queremos procurar. Coloquei dentro dela um placeholder escrito "Procure por qualquer coisa" que aparece dentro desse input, mas desaparece quando digitamos algo. Atribuí a ele um id chamado "textSearch" para fazer algumas correções no CSS. Utilizei o border: none para tirar a borda que aparecia ao redor do placeholder e o outline: none para não aparecer o contorno do placeholder quando clicamos na barra para digitar. Além destes, usei outras propriedades, como o background-color: none para não aparecer a cor de fundo da barra e criei uma margem para aumentar o espaço dentro dela. A barra de pesquisa funciona somente na página do catálogo, onde apresenta os demais produtos.

lupa: A lupa inserida dentro da barra de pesquisa foi coletada de uma biblioteca de ícones do bootstrap e modificada. Foi alterada a cor para a mesma da barra de pesquisa e seu tamanho. 

Botões de carrinho e curtidos: Os botões de carrinho e de curtidos foram colocados dentro de uma <div> chamada "acesso" em forma de imagens e estão no canto direito do header. Como a lupa, coletei estes ícones na biblioteca do Bootstrap e modifiquei o tamanho e a cor deles para fazer alguns ajustes e correções no CSS, atribuindo uma classe a eles chamado "carrinhoECurtidos". Além de ajustar o tamanho, coloquei um cursor de pointer para eles para funcionarem como botões e utilizei o z-index para deixá-los acima do botão do carrossel, pois estavam bugados. Quando o botão do carrinho é clicado, ele abre para a página ./carrinho.html, onde mostra se há ou não produtos adicionados nele (o mesmo ocorre com o botão de curtidos, só que ele leva para a página ./curtidos.html. 

Main: 
Componentes: Na main, desenvolvi uma parte do carrossel de slides, os produtos de hoje e o botão que leva para a página do catálogo completo. 

Layout: O layout da página inicial inclui os seguintes componentes principais: um carrossel com dois slides, um destacando uma promoção especial e outro apresentando produtos com desconto. Abaixo dele, há botões de navegação para mover entre os slides. Em seguida, há uma <div> chamada "infos" com caixas de informações do usuário - "Minha conta", "Minha localização" e "Forma de pagamento". Logo depois, temos uma última <div> chamada "produtosHoje" correspondente aos Produtos de Hoje, que mostra uma lista de três produtos em destaque e o botão.

Carrossel de slides: O carrossel de slides foi tirado de uma biblioteca do Bootstrap e modificado. Os slides mudam a cada intervalo de 10000 milissegundos (10 segundos) ou quando clicamos no botão para passar o slide atual.

Slide: A parte que desenvolvi foi um slide de promoção, onde criei uma <div> chamada "promocao" para alinhar os elementos do slide e outra chamada "containerPromocao". Abaixo dessa última <div>, inseri a imagem do produto que estava em promoção e um id chamado "imgPromocao". 

promocao: No CSS, utilizei display flex para deixar os elementos filhos (div com o título e subtítulo da promoção e a imagem do produto) juntos e space-between para deixá-los separados de modo que ocupem todo aquele espaço dessa <div>. 

containerPromocao: O container da promoção inclui o <h1> escrito “PROMOÇÃO!” e um <p> da descrição “Compre um pão mágico e ganhe um presente
misterioso!”. Utilizei o CSS para alinhá-los ao centro com o align-items e margem para deixar um espaçamento ao redor deles.

Imagem da promoção: A imagem da promoção se encontra no canto direito da tela. Utilizei height para aumentar seu tamanho e o mask-image para cima para deixar com um filtro degradê de roxo, aparentando um ar místico.

produtos de hoje: A <div> chamada “produtosHoje” incluem o título “produtos de hoje” e o botão. Para que o botão se direcionasse ao catálogo de produtos, utilizei uma imagem tirada do banco de ícones do Bootstrap, mudei sua cor e tamanho e linkei com a tag <a> para a página ./catalogo.html. 

lista de produtos em destaque: Abaixo do carrossel, temos os produtos de hoje, ou produtos em destaque, que incluem um fundo retangular com um degrade de roxo e rosa e a imagem, preço e nome do produto, além dos botões de curtir e de adicionar ao carrinho. Ao clicar neles, aparece o produto e sua descrição dos, junto com o botão de adicionar ao carrinho. No CSS, utilizei display flex para que cada produto ficassem juntos e um gap para dar um espaçamento entre eles, além do ::hover para que apareça uma borda quando o mouse passar por cima do produto. 

Catálogo (catalogo.html): A página do catálogo inclui uma lista com os diferentes produtos do nosso mercado (com exceção dos produtos com desconto e os de hoje). O header continua sendo o mesmo, mas quando clicamos na logo do mercado, ele volta para a página inicial. Para isso, colocamos o nome e a figura do mercado dentro de um <a> com link no ./index.html.

Título do catálogo: Dentro de uma <div>, temos o título <h1> do catálogo junto de uma <hr>, que cria uma quebra de linha. Utilizei ela para criar uma linha abaixo do título para criar uma interface visual diferente, utilizando a mesma cor desse título.

Produtos: como dito anteriormente, os produtos estão dentro de uma lista para que, ao digitar o nome de um produto que esteja dentro desta lista, ele aparece. Todos os produtos foram linkados com a página ./produtos.html, para que, quando clicarmos em um produto, apareça uma caixa individual do produto em específico. No CSS, utilizei padding para deixar a imagem, preço e nome do produto no interior de seus containers e, para o fundo, utilizei o linear-gradient para deixar um efeito de cores degradê. Para arredondar as bordas, utilizei o border-radius e, para não bugar o nome do produto, utilizei text-overflow ellipsis, para deixar reticências quando o nome chegar no limite da sua caixa.


Meu papel no projeto (Charles Baltazar):
Páginas desenvolvidas:
- Index.html;
- Carrinho.html;
- Produto.html;
 
No index eu desenvolvi parte do carrossel de slides, que ficam passando em um intervalo de tempo. O segundo slide mostra produtos em promoção, apenas fiz uma div única e personalizei com as cores padrões do site em um degradê com o produto em cima e os preços em baixo. A div esta junta de um <a> que redireciona para a página do produto ./Produto.html.
 
Fiz um simples modelo para o carrinho que é substituído quando um produto é adicionado ao carrinho, o <h1> que indica que não há produtos nele, desaparece e dá espaço aos produtos adicionados. Caso não haja produtos no carrinho, um <a> com o link do ./Catalogo.html fica exposto para que o comprador vá até o catálogo e adicione alguma coisa ao carrinho, com uma mensagem dizendo “Ir para o catálogo”.

O modelo do produto foi usado com 3 colunas que estão ligadas por uma <div> com classe de nome <containerProduto> que engloba <produtoBase> -> Inclui foto do produto e botão de adicionar ao carrinho; <produtoNome> -> Inclui <h2> com o nome do produto, e <h1> com o preço; <produtoDesc> -> Inclui a descrição do produto e o botão (<img>) de favoritar.


Meu papel no projeto foi toda parte de programação em JS, além de pequenas implementações no HTML e CSS para maior funcionalidade da plataforma (Marina Menezes)
Sendo os arquivos:
script-index.js
script-curtidos.js
script-carrinho.js
script-catalogo.js
script.js
script-produto.js
curtidos.html
socorro.html
compra.html
carrinho.html(modal)

script-index.js: Conectei este arquivo com a página ‘index.html’, nele criei uma função que garante que toda vez que a plataforma seja aberta em uma nova guia, a lista ‘produtosCarrinho’ e 'produtosCurtidos' seja apagada no LocalStorage. Este código foi feito a fim de que seja possível “iniciar uma nova sessão” no site.

script-catalogo.js: Este arquivo está conectado com as páginas ‘catalogo.htm’l e ‘index.html’. Neste arquivo crei uma variável chamada produto para chamar todos elementos com a classe ‘.produto’, fiz uma função capaz de ao clicar no produto, em alguma das páginas, as informações atribuídas à ele no HTML como “data-nome”, “data-imagem”, “data-valor”, “data-descrição” e “id”, fossem salvas no LocalStorage dentro de ‘produtoSelecionado’.

script-curtidos.js: Neste arquivo criei uma função onde, ao ser carregada a página ‘curtidos.html’, os elementos ‘lista-produtos-curtidos’, ‘aviso’ e o item ‘produtosCurtidos’ são atribuídos às variáveis ‘listaProdutos’, ‘aviso’ e ‘produtosCurtidos’. Também criei um “if” que, se a lista ‘produtosCurtidos’ estiver vazia, o ‘aviso’ será exibido alertando que nenhum produto foi curtido, e se este cenário não acontecer, o ‘aviso’ não será exibido e será criado um <li> dentro desta lista com as informações armazenadas dentro de ‘produtoSelecionado’ no LocalStorage.

script-carrinho.js: Neste arquivo criei uma função onde, ao ser carregada a página ‘carrinho.html’, os elementos ‘lista-produtos-carrinho’, ‘aviso’, ‘lista-final’, ‘btnFinalizar’, ‘buyBtn’, ‘total’ e o item ‘produtosCarrinho’ são atribuídos á variáveis. Também criei um “if” que, se a lista ‘produtosCarrinho’ estiver vazia, o ‘aviso’ será exibido alertando que nenhum produto foi curtido e o ‘btnFinalizar’ não será exibido, e se este cenário não acontecer, o ‘aviso’ não será exibido, será criado um <li> dentro da lista ‘listaProdutos’ e da ‘listaFinal’ com as informações armazenadas dentro de ‘produtoSelecionado’ no LocalStorage, o ‘btnFinalizar’ será exibido e será criada uma variáve chamada de valor, onde os elementos especiais são adaptados para operação matemática e o valor do produto é somado e atribuído à variável ‘totalValue’ a fim de obter o valor total da compra a ser feita, fora do ‘if’ chamei a variável ‘totalElement’ para fazer alteração no texto do elemento ‘total’ para apresentar o valor da compra obtido. Ainda criei uma função que faz com que ao clicar no elemento ‘buyBtn’ o item ‘produtosCarrinho’ seja apagado do localStorage. Também foi criado uma função para controlar a exibição do modal de compra, onde é criado duas variáveis, uma chamando o modal(‘finalizar’) e outra com a propriedade doestilo do display, seguidas de um “if” definindo que se o modal estiver visível o estilo do display é alterado para ‘none’ para que não seja mais exibido, e caso o cenário seja diferente do descrito, o estilo do display é definido como ‘flex’ tornando o modal visível. Depois de definir a função, apliquei ela para ser executada ao clicar no elemento ‘closeModal’ ou no elememento ‘btnFinalizar’. Criei uma função onde é criada uma variável cahamando o modal(‘finalizar’) com um “if” para que se o objeto do modal estiver sendo executado, ao clicar em qualquer parte da tela, a função de exibição do modal será executada.

script-produto.js: Neste arquivo é criada uma função para que ao carregar a página ‘produto.html’ seja criada uma variável chamando as informações armazenadas em ‘produtoSelecionado’ no LocalStorage, e se este item existir seja atribuída cada uma destas informações aos elementos da página. Criei uma variável chamando o botão ‘add-carrinho’, adicionei ao botão uma função que cria duas variáveis, ‘produtosCarrinho’ chamando o item do LocalStorage e ‘index’ para verificar a existência do produto do carrinho dentro do produto selecionado através do id de cada produto e identificar o index, para que se ele já tiver sido adicionado alguma vez ao carrinho, seja removido, caso contrário, seja adicionado. Depois  garante que se o produto for adicionado ao carrinho, ele seja atribuído ao item ‘produtosCarrinho’ no LocalStorage. Em seguida é criada a mesma função para o botão ‘add-curtidos’, garantindo que o botão adicione e remova o produto.

script.js: Este arquivo foi criado como script geral e está conectado à todas as páginas da plataforma, nele criei as variáveis ‘’inputElement’, ‘listElement’, ‘itemElement’ e ‘anuncio’ chamando a barra de pesquisa, a lista do catálogo de produtos, a classe dos produtos e o anúncio apresentado no carrossel. Em seguida atribuí uma função ao ‘inputElement’( barra de pesquisa), onde garante com que todos os caracteres, tanto da pesquisa quanto dos produtos, estejam em letras minúsculas para facilitar a perquisa. Criei um “if” para que se o nome do produto existir no que for digitado na barra de pesquisa, ele seja exibido, caso contrário, não será. Também criei outro “if” para que se não houver nada escrito na barra de pesquisa, o anúncio seja exibido, e se tiver algo, ele desapareça a partir do estilo do display.

curtidos.html: Criei esta página com base na página ‘carrinho.html’ criada pelo Charles, onde só alterei os id’s, classes, e o aviso para de acordo com o contexto de produtos curtidos.

compra.html: Esta página dispõe apenas do header criado pela Luisa, e do recado informando sobre a compra realizada.

socorro.html: O mesmo que a página de compra, apenas dispondo do header e do recado direcionado aos professores. Esta página foi criada mais como uma brincadeira com o intuito de não deixar os elementos da div ‘dados’ completamente sem funcionalidade.
