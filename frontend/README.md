DOCUMENTAÇÃO DO PROJETO

-Visão geral: Nome do projeto: BIZARRO

Descrição: O "BIZARRO" é um projeto desenvolvido na aula de Técnico do SENAC durante dois meses no primeiro trimestre e no final do segundo trimestre. Consiste em um mercado místico, com produtos diferenciados e criativos. O objetivo deste projeto durante o primeiro trimestre era aprender a aplicar o localStorage utilizando JS para coletar as informações dos produtos para poder visualizá-los separadamente e os armazenar no carrinho. Já no segundo, nós aprendemos a conectar o site com seu banco de dados relacional para armazenar dados de usuário e produtos, utilizamos Node.js com Express para rodar o servidor e implementamos autenticação e gerenciamento de sessões de usuário por meio de rotas de API's. Além disso, esse projeto em desenvolvimento é uma forma de estimular a criatividade e desempenhar boas práticas de programação.

Cores utilizadas: FUNDO: #222677; #382277; #09203D HEADER: #1C457D INPUT: #a458b9 LOGO E BOTÕES: #CA6CE5 CATÁLOGO BOX: #1C457D; #CA6CE5

**--PRIMEIRA ENTREGA:**

Linguagens utilizadas: HTML: Estrutura das páginas web. CSS: Estilo das páginas web. JS: Lógica de interação do front-end e back-end.

-Meu papel no projeto (Luisa Soares): Responsabilidades: Fiquei responsável em desenvolver o front-end da página inicial e do catálogo.

-Documentação Front-end: Página inicial (index.html): Na página inicial, desenvolvi toda a estrutura do header, uma parte do carousel de slides, as boxes de acessos e os produtos de hoje (em destaque).

Header: Componentes: Os componentes do header incluem a logo e o nome do mercado, a barra de pesquisa com a lupa e os botões de carrinho e de curtidos.

Layout: Os elementos implementados no header foram divididos em 3 <div> com ids diferentes (logo, search e acesso) para poder fazer ajustes em partes que incluíam mais de um elementos. Essas 3 divisões foram separadas uniformemente de forma que fossem distribuídas no eixo do header com o space-around no CSS. Além dele, utilizei o height para deixar a altura do header maior, tirei as bordas e alinhei eles ao centro com o align-items.

Logo e nome do mercado: Descrição: A imagem da logo e o

correspondente ao nome do mercado foram colocados dentro da <div> chamada "logo" e estão posicionados no canto esquerdo do header. Para deixar estes elementos juntos, atribuí um display: flex nessa div e coloquei uma margem em cima e ao lado esquerdo para deixar um pequeno espaçamento entre eles e o header.
LOGO: A implementação do logo foi feita por um ícone de bezerro no Canva, onde modificamos a cor para ficar conforme a paleta de cores do mercado. foi atribuído um id pra ela chamada "figure" para poder ajustar seu tamanho no header com o CSS. Além disso, colocamos a tag ligada com a página principal para que, quando formos para outras páginas, podemos retornar para a página principal clicando na figura.

NOME: Para fazer uns ajustes no nome do mercado "BIZARRO" com o CSS, atribuí um id chamado "nome" e utilizei a fonte "David Libre" e a cor #CA6CE5, conhecida por um magenta mais claro. Para aumentar o tamanho da fonte, utilizei font-size e deixei uma margem para cima para deixá-lo alinhado com a figura. Para deixar um pouco de espaço entre as letras, usei o letter-spacing.

Barra de pesquisa: O input de pesquisa e o ícone de lupa foram colocados dentro de uma <div> chamada "Search" e estão posicionados ao centro do header. Utilizei o CSS para deixar esses objetos juntos com o display flex e para modificar a barra, colocando uma borda que incluísse esses elementos, onde mudei a cor para a mesma que usei na logo. Assim, aumentei a altura e largura da barra de pesquisa com height e width e arredondei as laterais da borda com border-radius. Ao clicar na barra de pesquisa, ela vai direto para a página do catálogo (./catalogo.html)

Input: A tag <input> de tipo text serve como um campo de entrada de dados para que possamos digitar o produto que queremos procurar. Coloquei dentro dela um placeholder escrito "Procure por qualquer coisa" que aparece dentro desse input, mas desaparece quando digitamos algo. Atribuí a ele um id chamado "textSearch" para fazer algumas correções no CSS. Utilizei o border: none para tirar a borda que aparecia ao redor do placeholder e o outline: none para não aparecer o contorno do placeholder quando clicamos na barra para digitar. Além destes, usei outras propriedades, como o background-color: none para não aparecer a cor de fundo da barra e criei uma margem para aumentar o espaço dentro dela. A barra de pesquisa funciona somente na página do catálogo, onde apresenta os demais produtos.

lupa: A lupa inserida dentro da barra de pesquisa foi coletada de uma biblioteca de ícones do bootstrap e modificada. Foi alterada a cor para a mesma da barra de pesquisa e seu tamanho.

Botões de carrinho e curtidos: Os botões de carrinho e de curtidos foram colocados dentro de uma <div> chamada "acesso" em forma de imagens e estão no canto direito do header. Como a lupa, coletei estes ícones na biblioteca do Bootstrap e modifiquei o tamanho e a cor deles para fazer alguns ajustes e correções no CSS, atribuindo uma classe a eles chamado "carrinhoECurtidos". Além de ajustar o tamanho, coloquei um cursor de pointer para eles para funcionarem como botões e utilizei o z-index para deixá-los acima do botão do carrossel, pois estavam bugados. Quando o botão do carrinho é clicado, ele abre para a página ./carrinho.html, onde mostra se há ou não produtos adicionados nele (o mesmo ocorre com o botão de curtidos, só que ele leva para a página ./curtidos.html).

Main: Componentes: Na main, desenvolvi uma parte do carrossel de slides, os produtos de hoje e o botão que leva para a página do catálogo completo.

Layout: O layout da página inicial inclui os seguintes componentes principais: um carrossel com dois slides, um destacando uma promoção especial e outro apresentando produtos com desconto. Abaixo dele, há botões de navegação para mover entre os slides. Em seguida, há uma <div> chamada "infos" com caixas de informações do usuário - "Minha conta", "Minha localização" e "Forma de pagamento". Logo depois, temos uma última <div> chamada "produtosHoje" correspondente aos Produtos de Hoje, que mostra uma lista de três produtos em destaque e o botão.

Carrossel de slides: O carrossel de slides foi tirado de uma biblioteca do Bootstrap e modificado. Os slides mudam a cada intervalo de 10000 milissegundos (10 segundos) ou quando clicamos no botão para passar o slide atual.

Slide: A parte que desenvolvi foi um slide de promoção, onde criei uma <div> chamada "promocao" para alinhar os elementos do slide e outra chamada "containerPromocao". Abaixo dessa última <div>, inseri a imagem do produto que estava em promoção e um id chamado "imgPromocao".

promocao: No CSS, utilizei display flex para deixar os elementos filhos (div com o título e subtítulo da promoção e a imagem do produto) juntos e space-between para deixá-los separados de modo que ocupem todo aquele espaço dessa <div>.

containerPromocao: O container da promoção inclui o

escrito “PROMOÇÃO!” e um
da descrição “Compre um pão mágico e ganhe um presente misterioso!”. Utilizei o CSS para alinhá-los ao centro com o align-items e margem para deixar um espaçamento ao redor deles.

Imagem da promoção: A imagem da promoção se encontra no canto direito da tela. Utilizei height para aumentar seu tamanho e o mask-image para cima para deixar com um filtro degradê de roxo, aparentando um ar místico.

produtos de hoje: A <div> chamada “produtosHoje” incluem o título “produtos de hoje” e o botão. Para que o botão se direcionasse ao catálogo de produtos, utilizei uma imagem tirada do banco de ícones do Bootstrap, mudei sua cor e tamanho e linkei com a tag para a página ./catalogo.html.

lista de produtos em destaque: Abaixo do carrossel, temos os produtos de hoje, ou produtos em destaque, que incluem um fundo retangular com um degrade de roxo e rosa e a imagem, preço e nome do produto, além dos botões de curtir e de adicionar ao carrinho. Ao clicar neles, aparece o produto e sua descrição dos, junto com o botão de adicionar ao carrinho. No CSS, utilizei display flex para que cada produto ficassem juntos e um gap para dar um espaçamento entre eles, além do ::hover para que apareça uma borda quando o mouse passar por cima do produto.

Catálogo (catalogo.html): A página do catálogo inclui uma lista com os diferentes produtos do nosso mercado (com exceção dos produtos com desconto e os de hoje). O header continua sendo o mesmo, mas quando clicamos na logo do mercado, ele volta para a página inicial. Para isso, colocamos o nome e a figura do mercado dentro de um com link no ./index.html.

Título do catálogo: Dentro de uma <div>, temos o título

do catálogo junto de uma <hr>, que cria uma quebra de linha. Utilizei ela para criar uma linha abaixo do título para criar uma interface visual diferente, utilizando a mesma cor desse título.
Produtos: como dito anteriormente, os produtos estão dentro de uma lista para que, ao digitar o nome de um produto que esteja dentro desta lista, ele aparece. Todos os produtos foram linkados com a página ./produtos.html, para que, quando clicarmos em um produto, apareça uma caixa individual do produto em específico. No CSS, utilizei padding para deixar a imagem, preço e nome do produto no interior de seus containers e, para o fundo, utilizei o linear-gradient para deixar um efeito de cores degradê. Para arredondar as bordas, utilizei o border-radius e, para não bugar o nome do produto, utilizei text-overflow ellipsis, para deixar reticências quando o nome chegar no limite da sua caixa.

Meu papel no projeto (Charles Baltazar): Páginas desenvolvidas: - Index.html; - Carrinho.html; - Produto.html;

No index eu desenvolvi parte do carrossel de slides, que ficam passando em um intervalo de tempo. O segundo slide mostra produtos em promoção, apenas fiz uma div única e personalizei com as cores padrões do site em um degradê com o produto em cima e os preços em baixo. A div esta junta de um que redireciona para a página do produto ./Produto.html.

Fiz um simples modelo para o carrinho que é substituído quando um produto é adicionado ao carrinho, o

que indica que não há produtos nele, desaparece e dá espaço aos produtos adicionados. Caso não haja produtos no carrinho, um com o link do ./Catalogo.html fica exposto para que o comprador vá até o catálogo e adicione alguma coisa ao carrinho, com uma mensagem dizendo “Ir para o catálogo”.
O modelo do produto foi usado com 3 colunas que estão ligadas por uma <div> com classe de nome <containerProduto> que engloba <produtoBase> -> Inclui foto do produto e botão de adicionar ao carrinho; <produtoNome> -> Inclui

com o nome do produto, e
com o preço; <produtoDesc> -> Inclui a descrição do produto e o botão () de favoritar.
Meu papel no projeto foi toda parte de programação em JS, além de pequenas implementações no HTML e CSS para maior funcionalidade da plataforma (Marina Menezes) Sendo os arquivos: script-index.js script-curtidos.js script-carrinho.js script-catalogo.js script.js script-produto.js curtidos.html socorro.html compra.html carrinho.html(modal)

script-index.js: Conectei este arquivo com a página ‘index.html’, nele criei uma função que garante que toda vez que a plataforma seja aberta em uma nova guia, a lista ‘produtosCarrinho’ e 'produtosCurtidos' seja apagada no LocalStorage. Este código foi feito a fim de que seja possível “iniciar uma nova sessão” no site.

script-catalogo.js: Este arquivo está conectado com as páginas ‘catalogo.htm’l e ‘index.html’. Neste arquivo crei uma variável chamada produto para chamar todos elementos com a classe ‘.produto’, fiz uma função capaz de ao clicar no produto, em alguma das páginas, as informações atribuídas à ele no HTML como “data-nome”, “data-imagem”, “data-valor”, “data-descrição” e “id”, fossem salvas no LocalStorage dentro de ‘produtoSelecionado’.

script-curtidos.js: Neste arquivo criei uma função onde, ao ser carregada a página ‘curtidos.html’, os elementos ‘lista-produtos-curtidos’, ‘aviso’ e o item ‘produtosCurtidos’ são atribuídos às variáveis ‘listaProdutos’, ‘aviso’ e ‘produtosCurtidos’. Também criei um “if” que, se a lista ‘produtosCurtidos’ estiver vazia, o ‘aviso’ será exibido alertando que nenhum produto foi curtido, e se este cenário não acontecer, o ‘aviso’ não será exibido e será criado um

dentro desta lista com as informações armazenadas dentro de ‘produtoSelecionado’ no LocalStorage.
script-carrinho.js: Neste arquivo criei uma função onde, ao ser carregada a página ‘carrinho.html’, os elementos ‘lista-produtos-carrinho’, ‘aviso’, ‘lista-final’, ‘btnFinalizar’, ‘buyBtn’, ‘total’ e o item ‘produtosCarrinho’ são atribuídos á variáveis. Também criei um “if” que, se a lista ‘produtosCarrinho’ estiver vazia, o ‘aviso’ será exibido alertando que nenhum produto foi curtido e o ‘btnFinalizar’ não será exibido, e se este cenário não acontecer, o ‘aviso’ não será exibido, será criado um

dentro da lista ‘listaProdutos’ e da ‘listaFinal’ com as informações armazenadas dentro de ‘produtoSelecionado’ no LocalStorage, o ‘btnFinalizar’ será exibido e será criada uma variáve chamada de valor, onde os elementos especiais são adaptados para operação matemática e o valor do produto é somado e atribuído à variável ‘totalValue’ a fim de obter o valor total da compra a ser feita, fora do ‘if’ chamei a variável ‘totalElement’ para fazer alteração no texto do elemento ‘total’ para apresentar o valor da compra obtido. Ainda criei uma função que faz com que ao clicar no elemento ‘buyBtn’ o item ‘produtosCarrinho’ seja apagado do localStorage. Também foi criado uma função para controlar a exibição do modal de compra, onde é criado duas variáveis, uma chamando o modal(‘finalizar’) e outra com a propriedade doestilo do display, seguidas de um “if” definindo que se o modal estiver visível o estilo do display é alterado para ‘none’ para que não seja mais exibido, e caso o cenário seja diferente do descrito, o estilo do display é definido como ‘flex’ tornando o modal visível. Depois de definir a função, apliquei ela para ser executada ao clicar no elemento ‘closeModal’ ou no elememento ‘btnFinalizar’. Criei uma função onde é criada uma variável cahamando o modal(‘finalizar’) com um “if” para que se o objeto do modal estiver sendo executado, ao clicar em qualquer parte da tela, a função de exibição do modal será executada.
script-produto.js: Neste arquivo é criada uma função para que ao carregar a página ‘produto.html’ seja criada uma variável chamando as informações armazenadas em ‘produtoSelecionado’ no LocalStorage, e se este item existir seja atribuída cada uma destas informações aos elementos da página. Criei uma variável chamando o botão ‘add-carrinho’, adicionei ao botão uma função que cria duas variáveis, ‘produtosCarrinho’ chamando o item do LocalStorage e ‘index’ para verificar a existência do produto do carrinho dentro do produto selecionado através do id de cada produto e identificar o index, para que se ele já tiver sido adicionado alguma vez ao carrinho, seja removido, caso contrário, seja adicionado. Depois garante que se o produto for adicionado ao carrinho, ele seja atribuído ao item ‘produtosCarrinho’ no LocalStorage. Em seguida é criada a mesma função para o botão ‘add-curtidos’, garantindo que o botão adicione e remova o produto.

script.js: Este arquivo foi criado como script geral e está conectado à todas as páginas da plataforma, nele criei as variáveis ‘’inputElement’, ‘listElement’, ‘itemElement’ e ‘anuncio’ chamando a barra de pesquisa, a lista do catálogo de produtos, a classe dos produtos e o anúncio apresentado no carrossel. Em seguida atribuí uma função ao ‘inputElement’( barra de pesquisa), onde garante com que todos os caracteres, tanto da pesquisa quanto dos produtos, estejam em letras minúsculas para facilitar a perquisa. Criei um “if” para que se o nome do produto existir no que for digitado na barra de pesquisa, ele seja exibido, caso contrário, não será. Também criei outro “if” para que se não houver nada escrito na barra de pesquisa, o anúncio seja exibido, e se tiver algo, ele desapareça a partir do estilo do display.

curtidos.html: Criei esta página com base na página ‘carrinho.html’ criada pelo Charles, onde só alterei os id’s, classes, e o aviso para de acordo com o contexto de produtos curtidos.

compra.html: Esta página dispõe apenas do header criado pela Luisa, e do recado informando sobre a compra realizada.

socorro.html: O mesmo que a página de compra, apenas dispondo do header e do recado direcionado aos professores. Esta página foi criada mais como uma brincadeira com o intuito de não deixar os elementos da div ‘dados’ completamente sem funcionalidade.

**--SEGUNDA ENTREGA:**

Páginas adicionadas: cadastro.html: Esta página contém a interface para o cadastro do usuário, disponível no botão de perfil, carrinho, curtidos e catálogo, caso o usuário ainda não tenha alguma conta. Ela exibe um formulário com diferentes <input> para que o usuário informe seus dados pessoais: nome, e-mail, telefone, CPF e senha. Para a senha, utilizamos um <input type=password> para que ela fique "mascarada". Após isso, há um botão de cadastrar para que seja enviadas essas informações ao banco de dados. Abaixo do formulário, há um link que, caso o usuário já tenha conta, ele poderá realizar o login. Ainda no HTML, há uma <div> com o id "mensagemErro", disponível também na página de login, no qual aparece a mensagem de que "Ocorreu um erro durante o cadastro. Tente novamente" quando o usuário for realizar o cadastro e ele der erro.

login.html: Essa página permite que os usuários realizem a autenticação na sua conta a partir do email e senha definidos durante o cadastro, recuperando seu perfil, além de fornecer um link para a página de cadastro, caso o usuário ainda não tenha uma conta. No CSS, utilizamos configurações semelhantes ao cadastro, deixando a página padrão com o resto do site. Quando o usuário definir um email ou senha que não existam, será exibida a mensagem na div criada anteriormente no cadastro, só que com a seguinte mensagem: "Email ou senha incorretos".

perfil.html: Essa página exibe o perfil do usuário após seu cadastro ou login, podendo ser acessada independente da página que ele estiver no momento.

cadastro.js: Este arquivo é responsável pela função "cadastrar", que gerencia o processo de cadastro de novos usuários no mercado. Quando o usuário preenche seus dados e clica no botão "Cadastrar", essa função é ativada. Os valores inseridos nos campos de nome, e-mail, telefone, CPF e senha são coletados e organizados em um objeto chamado data. Esses dados são então enviados ao servidor através de uma requisição POST para a rota http://localhost:3013/usuario/cadastrar, que salva as informações na tabela "usuario" do banco de dados deste projeto. Essa requisição inclui o cabeçalho "Content-Type: application/json" e o corpo da mensagem em formato JSON. Se o cadastro for bem-sucedido, a chave cadastroSucesso é definida como true no sessionStorage, e o usuário é redirecionado para a página inicial (index.html). Caso ocorra algum erro durante o cadastro, a <div> da mensagem de erro é exibida, utilizando display: block.

login.js: Já nesse arquivo, ele contém a função "login", com estrutura semelhante ao cadastro, mas é responsável por gerenciar o processo de login de usuários no mercado. Quando é inserido o e-mail e senha do usuário, ao clicar no botão de "Fazer Login", a função é ativada. Os valores inseridos nesses campos são coletados e organizados em um objeto chamado data. Esses dados são então enviados ao servidor através de uma requisição POST para a rota http://localhost:3013/usuario/login, onde o servidor verifica os dados fornecidos. Essa requisição também inclui o cabeçalho "Content-Type: application/json" e o corpo da mensagem em formato JSON. Se o login for bem-sucedido, a chave cadastroSucesso é também definida como true no sessionStorage, e o usuário é redirecionado para a página inicial (index.html). Caso algum campo esteja incorreto, a mensagem de erro "Email ou senha incorretos" é exibida na página, utilizando display: block.

perfil.js: Conectado com todas as páginas HTML do site, exceto a de cadastro e login, este arquivo é responsável pelo gerenciamento do redirecionamento do usuário para a página de seu perfil ao clicar no ícone correspondente. Ao carregar a página, ele adiciona um evento ouvinte ao botão com o ID perfil. Quando clicado, a função paginaPerfil é chamada, verificando o valor da chave cadastroSucesso no sessionStorage. A sessionStorage foi definida anteriormente para garantir que os dados do usuário sejam preservados e o redirecionamento seja adequado quando o site for reaberto. Se a chave cadastroSucesso não estiver definida, o script redireciona o usuário para a página de cadastro (cadastro.html), mas se estiver definida e for igual a 'true', o usuário é redirecionado para a página de perfil (perfil.html). Esse processo garante que somente os usuários cadastrados/logados possam acessar a página de perfil independente da página que estiverem no momento.

Alterações do projeto: --Remoção da <div> "infos": Decidimos excluir a <div> chamada "infos" para simplificar o layout e melhorar a usabilidade da página.

--Reaproveitamento do Ícone "Minha Conta": O ícone de perfil referente ao botão "Minha Conta" foi adicionado no header, ao lado dos ícones do carrinho e dos itens curtidos. Utilizamos a mesma classe aplicada a esses botões para manter a o mesmo padrão.

--Link com a Página de Perfil: O botão de perfil agora está vinculado à página ./perfil.html, facilitando o preenchimento de dados e acesso às informações do usuário.

--Remoção do socorro.html: Essa página foi removida devido a continuação do mercado durante o final do segundo trimestre.

Ferramentas utilizadas: NODE.JS: Ambiente de execução para JavaScript no lado do servidor, permitindo criar aplicações standalone (autosuficientes) de forma eficiente, leve e escalável.

MYSQL: Banco de dados relacional utilizado para armazenar e gerenciar os dados do usuário e dos produtos no mercado.

NPM (Node Package Manager): Gerenciador de pacotes para Node.js, utilizado para instalar e gerenciar dependências do projeto.

Pacotes utiliados: NODEMON:Ferramenta de desenvolvimento que reinicia automaticamente o servidor Node.js sempre que há alterações no código, facilitando a continuidade do desenvolvimento do projeto.

MYSQL2: Pacote que permite a interação com o banco de dados MySQL utilizando Node.js, oferecendo suporte a promessas e outras funcionalidades avançadas.

EXPRESS: Framework web para Node.js, utilizado para criar e gerenciar rotas da aplicação.

CORS: Mecanismo usado para adicionar cabeçalhos HTTP, permitindo que a aplicação web seja executada em uma origem e acesse recursos de outra origem diferente.

DOTENV: Pacote que gerencia variáveis de ambiente dentro do projeto.

Processos de instalações e configurações:

1-Instalar Node.js: Para instalar o Node.js, acessamos o site (https://nodejs.org/), fomos para o menu "Descarregar", no submenu "Instalador do pré-compilado" e depois no botão "Descarregar a Node.js (versão atual do seu sistema)". Com o servidor instalado, para verificar sua versão, utilizamos o comando "node -v" dentro do terminal.

2-Iniciar NPM: A NPM já vem acompanhada com o Node.js, e para iniciarmos esse gerenciamento de pacotes, abrimos o arquivo do projeto pelo terminal utilizando "cd (Nome do arquivo)" e utilizamos o comando "npm init -y", que cria um arquivo package.json, contendo os pacotes npm e metadados do projeto.

3- Instalando pacotes com o NPM: Para instalar os pacotes descritos anteriormente utilizando o NPM, com o arquivo aberto no terminal, executamos o comando "npm i express mysql2 nodemon dotenv cors", no qual ficam salvos no arquivo package.json como "dependencies" e suas versão ficam salvas no package-lock json.

4- Organizar arquivos do projeto: Para melhor organização do projeto, criamos uma pasta "scr", onde dentro dela há dois arquivos: db_config.js e server.js.

DB_CONFIG: O db_config é responsável em criar uma conexão com o banco de dados utilizando o mysql2(salva em uma variável chamada "mysql" que requisita esse pacote). Assim, criamos outra variável chamada "connection" que cria uma conexão com o arquivo mysql, informando o host, password, email e o nome da database. Quando essa conexão funcionar, uma mensagem de "Mysql conectado" será exibida no console do navegador.

SERVER.JS: O server.js é um arquivo responsável em configurar o servidor da aplicação, utilizando a framework Express. Ela utiliza os pacotes cors para permitir solicitações de diferentes origens, express.json() para manipular dados JSON, bcrypt para criptografar senhas, e express-session para gerenciar sessões de usuário. Além disso, o servidor também é responsável pela definição das rotas para API's HTTP, responsáveis por postar (POST), solicitar(GET), substituir(PUT), deletar(DELETE) ou aplicar modificações parciais (PATCH).

5- Configurar o Express: Para fazer com que o servidor rode no sistema, criamos uma variável chamada "porta" que vai carregar um número (geralmente maior que 3000), e outra variável chamada "app" que vai requisitar o pacote express. Assim, o app vai ter uma função listen que vai ouvir e rodar a porta que estamos acessando dentro do servidor.

6- Definir comando no nodemon: Para não precisarmos reiniciar o servidor a cada alteração, definimos o comando "start" dentro dos scripts no arquivo package.json e chamamos o pacote nodemon para monitorar as alterações da aplicação. Para iniciar o servidor, utilizamos o comando "npm start" dentro e esperamos a mensagem de que ele está rodando corretamente na porta desejada.

7-Separar os arquivos em pastas de backend e frontend: Para melhorar o gerenciamento e a organização, os arquivos do projeto são divididos em pastas distintas para o backend e o frontend.

BACKEND: Os arquivos são organizados em uma pasta dedicada a scripts e configurações do servidor.

FRONTEND: contém a pasta "assets" com os ícones e imagens dos produtos, além dos arquivos HTML, CSS e JS responsáveis pela estrutura e manipulação das páginas web.

Banco de dados:

1-Tabelas do Banco de Dados Tabela usuario: Armazena as informações dos usuários cadastrados, incluindo o perfil (administrador ou usuário). sql CREATE TABLE usuario ( idusuario INT AUTO_INCREMENT PRIMARY KEY, nome VARCHAR(100) NOT NULL, cpf VARCHAR(11) UNIQUE NOT NULL, email VARCHAR(100) UNIQUE NOT NULL, telefone VARCHAR(15), senha VARCHAR(100) NOT NULL, -- A senha será armazenada como um hash perfil ENUM('admin', 'usuario') DEFAULT 'usuario', -- Perfil do usuário created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ); idusuario: Chave primária única para identificar cada usuário. cpf: CPF do usuário (único). perfil: Define se o usuário é um admin ou usuario.

Tabela produto: Armazena os produtos disponíveis no catálogo, contendo informações sobre nome, preço, descrição e imagem. sql CREATE TABLE produto ( idproduto INT AUTO_INCREMENT PRIMARY KEY, nome VARCHAR(100) NOT NULL, preco DECIMAL(10, 2) NOT NULL, descricao TEXT, imagem VARCHAR(255), -- URL ou caminho da imagem do produto created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ); idproduto: Chave primária única para identificar cada produto. preco: Preço do produto, representado como um número decimal.

Tabela carrinho: Armazena os itens que os usuários adicionaram ao carrinho de compras. Um carrinho pode ter múltiplos produtos. sql CREATE TABLE carrinho ( idcarrinho INT AUTO_INCREMENT PRIMARY KEY, usuario_id INT, produto_id INT, quantidade INT DEFAULT 1, data_adicionado TIMESTAMP DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (usuario_id) REFERENCES usuario(idusuario) ON DELETE CASCADE, FOREIGN KEY (produto_id) REFERENCES produto(idproduto) ON DELETE CASCADE ); usuario_id: Relaciona o carrinho ao usuário que adicionou o produto. produto_id: Relaciona o produto ao carrinho. quantidade: Quantidade de unidades de cada produto no carrinho.

Tabela curtidos: Armazena os produtos que os usuários curtiram (favoritaram). sql CREATE TABLE curtidos ( idcurtido INT AUTO_INCREMENT PRIMARY KEY, usuario_id INT, produto_id INT, data_curtido TIMESTAMP DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (usuario_id) REFERENCES usuario(idusuario) ON DELETE CASCADE, FOREIGN KEY (produto_id) REFERENCES produto(idproduto) ON DELETE CASCADE ); usuario_id: ID do usuário que curtiu o produto. produto_id: ID do produto curtido.

Tabela compra: Armazena as compras realizadas pelos usuários. Cada compra pode conter múltiplos produtos. sql CREATE TABLE compra ( idcompra INT AUTO_INCREMENT PRIMARY KEY, usuario_id INT, valor_total DECIMAL(10, 2) NOT NULL, quantidade_produtos INT NOT NULL, data_compra TIMESTAMP DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (usuario_id) REFERENCES usuario(idusuario) ON DELETE CASCADE ); usuario_id: Relaciona a compra ao usuário. valor_total: Valor total da compra. quantidade_produtos: Número de produtos na compra.

Tabela itens_compra: Armazena os itens de cada compra, associando cada produto a uma compra específica. sql CREATE TABLE itens_compra ( iditem INT AUTO_INCREMENT PRIMARY KEY, compra_id INT, produto_id INT, quantidade INT DEFAULT 1, preco DECIMAL(10, 2) NOT NULL, FOREIGN KEY (compra_id) REFERENCES compra(idcompra) ON DELETE CASCADE, FOREIGN KEY (produto_id) REFERENCES produto(idproduto) ON DELETE CASCADE ); compra_id: Relaciona o item à compra específica. produto_id: Relaciona o produto ao item da compra. quantidade: Quantidade de unidades compradas de cada produto.

2-Relações entre as Tabelas usuario ↔ carrinho: Cada usuário pode ter múltiplos itens em seu carrinho. Quando um usuário é deletado, os itens no carrinho também são removidos.

usuario ↔ curtidos: Um usuário pode curtir vários produtos. Se um usuário for deletado, suas curtidas também serão removidas.

usuario ↔ compra: Cada usuário pode fazer múltiplas compras. As compras são excluídas se o usuário for removido.

produto ↔ carrinho, curtidos, itens_compra: Cada produto pode estar em vários carrinhos, ser curtido por vários usuários e aparecer em várias compras.

Rotas:

1-Rotas de Usuário Cadastro de Usuário: URL: /usuario/cadastrar Método: POST Descrição: Cadastra um novo usuário no sistema. Corpo da Requisição: json { "nome": "string", "cpf": "string", "email": "string", "telefone": "string", "senha": "string" } Resposta: 201: Usuário cadastrado com sucesso. 400: Erro no cadastro do usuário.

Login de Usuário: URL: /usuario/login Método: POST Descrição: Realiza a autenticação do usuário. Corpo da Requisição: json { "email": "string", "senha": "string" } Resposta: 200: Login realizado com sucesso. 401: Senha incorreta. 404: Usuário não encontrado.

Logout de Usuário: URL: /usuario/logout Método: POST Descrição: Realiza o logout do usuário atual e destrói a sessão. Resposta: 200: Logout realizado com sucesso. 500: Erro ao tentar fazer logout.

Listar Todos os Usuários: URL: /usuarios/listar Método: GET Descrição: Retorna uma lista de todos os usuários cadastrados. Resposta: 200: Lista de usuários. 400: Erro ao buscar usuários.

Validar Usuário pelo ID: URL: /usuario/validar/:id Método: GET Descrição: Retorna os detalhes de um usuário específico pelo ID. Parâmetros da URL: :id: ID do usuário a ser validado. Resposta: 200: Usuário encontrado. 404: Usuário não encontrado.

Editar Usuário (Admin Only): URL: /usuarios/editar/:id Método: PUT Descrição: Edita os dados de um usuário específico. Somente administradores podem realizar essa ação. Parâmetros da URL: :id: ID do usuário a ser editado. Corpo da Requisição: json { "nome": "string", "cpf": "string", "email": "string", "telefone": "string", "senha": "string", "perfil": "string" // admin ou usuario } Resposta: 200: Usuário editado com sucesso. 403: Acesso negado, apenas administradores podem editar. 500: Erro ao editar o usuário.

Deletar Usuário (Admin Only): URL: /usuario/deletar/:id Método: DELETE Descrição: Deleta um usuário específico. Somente administradores podem realizar essa ação. Parâmetros da URL: :id: ID do usuário a ser deletado. Resposta: 200: Usuário deletado com sucesso. 403: Acesso negado, apenas administradores podem deletar. 500: Erro ao deletar o usuário.

2-Rotas de Produtos Adicionar Produto (Admin Only): URL: /produtos/adicionar Método: POST Descrição: Adiciona um novo produto ao catálogo. Somente administradores podem adicionar produtos. Corpo da Requisição: json { "nome": "string", "preco": "decimal", "descricao": "string", "imagem": "string" } Resposta: 201: Produto adicionado com sucesso. 403: Acesso negado, apenas administradores podem adicionar produtos. 500: Erro ao adicionar o produto.

Editar Produto (Admin Only): URL: /produtos/editar/:id Método: PUT Descrição: Edita um produto existente no catálogo. Somente administradores podem realizar esta ação. Parâmetros da URL: :id: ID do produto a ser editado. Corpo da Requisição: json { "nome": "string", "preco": "decimal", "descricao": "string", "imagem": "string" } Resposta: 200: Produto editado com sucesso. 403: Acesso negado, apenas administradores podem editar produtos. 500: Erro ao editar o produto.

Deletar Produto (Admin Only): URL: /produtos/deletar/:id Método: DELETE Descrição: Deleta um produto existente no catálogo. Somente administradores podem realizar essa ação. Parâmetros da URL: :id: ID do produto a ser deletado. Resposta: 200: Produto deletado com sucesso. 403: Acesso negado, apenas administradores podem deletar produtos. 500: Erro ao deletar o produto.

3-Rotas de Curtidos Curtir um Produto: URL: /curtir Método: POST Descrição: Permite que um usuário adicione um produto à sua lista de curtidos. Corpo da Requisição: json { "usuarioId": "integer", "produtoId": "integer" } Respostas: 200: Produto curtido com sucesso. 400: Requisição malformada (faltando usuarioId ou produtoId). 500: Erro ao curtir o produto.

Listar Produtos Curtidos de um Usuário: URL: /produtos/curtidos/:id Método: GET Descrição: Retorna a lista de produtos curtidos por um usuário específico. Parâmetros da URL: :id - ID do usuário que deseja listar os produtos curtidos. Respostas: 200: Produtos curtidos retornados com sucesso. 400: Nenhum produto curtido encontrado para o usuário. 500: Erro ao buscar produtos curtidos.

Remover Produto Curtido: URL: /curtidos/remover/:produtoId Método: DELETE Descrição: Remove um produto específico da lista de curtidos de um usuário. Parâmetros da URL: :produtoId - ID do produto a ser removido da lista de curtidos. Corpo da Requisição: json { "usuarioId": "integer" } Respostas: 200: Produto removido dos curtidos com sucesso. 404: Produto não encontrado na lista de curtidos. 500: Erro ao remover o produto dos curtidos.

4-Rotas de Carrinho Adicionar Produto ao Carrinho: URL: /carrinho/adicionar Método: POST Descrição: Adiciona um produto ao carrinho de compras de um usuário. Corpo da Requisição: json { "usuario_id": "integer", "produto_id": "integer" } Resposta: 201: Produto adicionado ao carrinho com sucesso. 400: Erro ao adicionar o produto ao carrinho. 500: Erro no servidor.

Listar Produtos no Carrinho: URL: /carrinho/listar/:id Método: GET Descrição: Retorna os produtos adicionados ao carrinho de um usuário. Parâmetros da URL: :id: ID do usuário. Resposta: 200: Produtos listados com sucesso. 404: Nenhum produto encontrado no carrinho. 500: Erro ao buscar produtos no carrinho.

Remover Produto do Carrinho: URL: /carrinho/remover/:produto_id Método: DELETE Descrição: Remove um produto específico do carrinho de compras de um usuário. Parâmetros da URL: :produto_id: ID do produto a ser removido do carrinho. Resposta: 200: Produto removido do carrinho com sucesso. 404: Produto não encontrado no carrinho. 500: Erro ao remover o produto do carrinho.

5-Middleware Admin Middleware: Descrição: Middleware utilizado para proteger as rotas de administração. Verifica se o usuário autenticado possui o perfil admin. Se o perfil não for admin, retorna uma resposta 403 - Acesso negado. javascript function checkAdmin(req, res, next) { if (req.session.user && req.session.user.perfil === 'admin') { return next(); // O usuário é admin, pode continuar } else { return res.status(403).json({ success: false, message: 'Acesso negado. Apenas administradores podem realizar essa ação.' }); } } Observações: Autenticação de Usuário: Para editar ou excluir produtos e usuários, o perfil do usuário precisa ser de administrador (admin).