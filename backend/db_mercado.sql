CREATE DATABASE db_mercado;
USE db_mercado;

CREATE TABLE usuario (
    idusuario INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cpf VARCHAR(11) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    telefone VARCHAR(15),
    senha VARCHAR(100) NOT NULL, 
    perfil ENUM('admin', 'usuario') DEFAULT 'usuario', 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE produto (
    idproduto INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    preco DECIMAL(10, 2) NOT NULL,
    descricao TEXT,
    imagem VARCHAR(255), 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    categoria VARCHAR(255),
    desconto DECIMAL(10, 2)
);

CREATE TABLE carrinho (
    idcarrinho INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    produto_id INT,
    quantidade INT DEFAULT 1,
    data_adicionado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuario(idusuario) ON DELETE CASCADE,
    FOREIGN KEY (produto_id) REFERENCES produto(idproduto) ON DELETE CASCADE
);

CREATE TABLE curtidas (
    idcurtido INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    produto_id INT,
    data_curtido TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuario(idusuario) ON DELETE CASCADE,
    FOREIGN KEY (produto_id) REFERENCES produto(idproduto) ON DELETE CASCADE
);

CREATE TABLE compra (
    idcompra INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    valor_total DECIMAL(10, 2) NOT NULL,
    quantidade_produtos INT NOT NULL,
    data_compra TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuario(idusuario) ON DELETE CASCADE
);

CREATE TABLE itens_compra (
    iditem INT AUTO_INCREMENT PRIMARY KEY,
    compra_id INT,
    produto_id INT,
    quantidade INT DEFAULT 1,
    preco DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (compra_id) REFERENCES compra(idcompra) ON DELETE CASCADE,
    FOREIGN KEY (produto_id) REFERENCES produto(idproduto) ON DELETE CASCADE
);

INSERT INTO produto (nome, imagem, preco, descricao) VALUES
('Pães mágicos com diversos efeitos mágicos', 'paes magicos coloridos.png', 59.90, 'Pães que, ao serem consumidos, concedem diferentes efeitos mágicos aos seus consumidores, como invisibilidade temporária, capacidade de voar, entre outros.'),
('Gang de cavalos ninjas', 'cavalos.png', 1250.00, 'Uma equipe de cavalos treinados nas artes ninja, prontos para realizar missões secretas e ágeis como o vento.'),
('Uma luva (com areia dentro)', 'luva.jpeg', 120.00, 'Como se sentir menos sozinho: Uma luva que contém areia dentro, projetada para dar conforto e companhia, ajudando a pessoa a se sentir menos sozinha.'),
('Kazoo de funeral', 'kazoo.png', 75.00, 'Um kazoo especialmente projetado para tocar músicas de funeral de forma respeitosa e solene.'),
('Sapato de suporte emocional', 'sapato de suporte emocional.jpeg', 57.90, 'Um sapato que oferece suporte emocional, proporcionando conforto e estabilidade emocional durante momentos difíceis.'),
('Réguas no formato de pretzels de diferentes tamanhos', 'pretzels.jpeg', 40.00, 'Réguas divertidas em forma de pretzels, perfeitas para quem gosta de objetos de papelaria diferentes e criativos.'),
('Mansão para tartarugas', 'mansao para tartarugas.jpeg', 100500.00, 'Uma miniatura de uma mansão luxuosa projetada especialmente para tartarugas de estimação, com todos os confortos e luxos que elas merecem.'),
('Tranca de porta de massinha de modelar', 'tranca de porta de massinha de modelar.jpeg', 10.00, 'Uma tranca de porta feita de massinha de modelar, que pode ser moldada de acordo com a vontade do usuário.'),
('Telha de papel', 'telha de papel.jpeg', 220.50, 'Uma telha feita de papel, ideal para proteção da sua casa ou de qualquer imóvel proporcionando um material leve e maleável.'),
('Células de ornitorrinco', 'celulas.jpeg', 699.99, 'Células coletadas de ornitorrinco, com propriedades únicas e interessantes para a ciência.'),
('Um pneu amigo', 'pneu amigo.png', 200.00, 'Um pneu que, de alguma forma, é amigável ou interativo. Talvez com um rosto ou personalidade própria, tudo depende da sua imaginação.'),
('Gritos de smurf', 'grito smurf.jpeg', 3230.00, 'Gritos coletados de smurfs reais embalados em um saco.'),
('O caboclo', 'caboclo.jpeg', 75.90, 'Um livro misterioso, relacionado à lendas/casos de desaparecimentos.'),
('Água de banho do Andrei', 'agua.png', 6087.00, 'Uma garrafa contendo água que supostamente foi utilizada no banho de Andrei, professor de técnico icônico do Senac SL.'),
('Wallpaper de windows 10', 'windows 10.png', 20.00, 'Fundo de tela de computador que com a interface do Windows 10, para fãs do sistema operacional.'),
('Carregador de batata para bola de vôlei', 'batata.jpeg', 89.50, 'Uma batata capaz de carregar a bateria de sua bola de vôlei.'),
('Presente misteriosamente secreto', 'presente misterioso.jpeg', 0.00, 'Um presente que é misteriosamente secreto, revelando seu conteúdo apenas após ser aberto.'),
('1 bloco de terra podre', 'terra podre.jpeg', 0.50, 'Um bloco de terra que está podre e fedendo.'),
('Tempestade de areia preta na garrafa', 'tempestade.jpeg', 1235.50, 'Uma garrafa contendo uma tempestade de areia preta em miniatura, perfeito para ter bons sonhos.'),
('Pombo de ouro de prata', 'pombo.jpeg', 5350.00, 'O pombo de Ouro da Saga de Harry Potter, porém feito de prata.'),
('Lareira que esfria', 'lareira.jpeg', 430.00, 'Uma lareira que, ao invés de aquecer, resfria o ambiente.'),
('Restos dos Muppets', 'muppets.jpeg', 5500.00, 'Fragmentos dos Muppets, personagens famosos do entretenimento.'),
('Abóbora que parece e tem gosto de maracujá', 'abobora.png', 50.00, 'Uma abóbora com sabor e aparência de maracujá, uma combinação inusitada de sabores e texturas.'),
('Copo furado', 'copo.jpeg', 20.00, 'Um copo com diversos furos no seu corpo, para que o líquido possa sair.'),
('Triturador de dinheiro', 'triturador.jpeg', 200.00, 'Um dispositivo capaz de triturar todo o seu dinheiro, produzindo confetes.'),
('Dente de jacaré', 'dente.jpeg', 2220.00, 'Um dente de jacaré, como um item exótico de decoração ou curiosidade.'),
('Dengo de xingxong', 'dengo.jpeg', 10390.00, 'Um produto ou objeto com o nome "dengo de xingxong", cujo significado seria algo alegre, doce e carinhoso.'),
('Cadeira para ficar de pé', 'cadeira.jpeg', 119.90, 'Uma cadeira projetada para ser usada enquanto a pessoa fica de pé, para proporcionar conforto em situações prolongadas.'),
('Descarregador de celular', 'descarregador.jpeg', 12.50, 'Um dispositivo que descarrega a bateria do seu aparelho.'),
('Pijama que dá choques com certa constância', 'pijama.jpeg', 130.00, 'Um pijama que dá choques elétricos com uma constância indefinida e aleatória, causando surpresas divertidas durante o sono.'),
('Chapéu que toca musica quando chove', 'chapeu.jpeg', 310.00, 'Um chapéu equipado com um dispositivo que reproduz música quando detecta chuva, para animar os dias chuvosos.'),
('Papel Higiênico com frases motivacionais', 'papel higienico.jpeg', 20.90, 'Papel higiênico com frases motivacionais impressas, torne a sua ida ao banheiro produtiva e incentivadora.'),
('Torradeira que imprime seu meme favorito na sua torrada', 'torradeira.jpeg', 420.00, 'Uma torradeira que, ao tostar o pão, imprime um meme favorito na superfície, proporcionando um café da manhã divertido e personalizado.'),
('Maçã dourada', 'maca dourada.jpeg', 420.00, 'Maçã Dourada do Minecraft na vida real.'),
('Lanterna que pisca em codigo morse', 'lanterna.jpeg', 540.00, 'Uma lanterna que emite luz piscando em código morse para se comunicar de forma misteriosa.'),
('Pão misterioso', 'pao.png', 19.50, 'Um pão misterioso capaz de ter efeitos sobre você ao consumí-lo.');

INSERT INTO produto (nome, imagem, preco, descricao,categoria,desconto) VALUES
('Pai Ausente', 'pai ausente.jpeg', 1200.00, 'Um produto que simboliza a ausência paterna. Presenteie seu amigo que não tem uma figura paterna!', 'desconto', 180.00),
('Ovo Pré-quebrado', 'ovo pre quebrado.jpg',679.00, 'Um ovo que já vem pré-quebrado, pronto para ser usado em receitas sem a necessidade de quebrá-lo', 'desconto', 101.85),
('Oxigênio Engarrafado','oxigenio engarrafado.jpeg',2880.00,'Oxigênio em uma garrafa, respire ar puro de verdade.','desconto',420.00);

INSERT INTO produto (nome, imagem, preco, descricao,categoria) VALUES
('Fantasminhas ajudantes personalizados', 'fantasminhas 2.jpeg', 100.00, 'Pequenos fantasmas que oferecem ajuda personalizada em diversas situações do dia a dia, desde encontrar chaves perdidas até lembrar compromissos.', 'regular'),
('Bizarro', 'bezerro bizarro.jpeg',450.00, 'Compre um Bizarro.', 'regular'),
('Grama de alfinete','grama de alfinete.jpeg',150.00,'Uma grama artificial feita de pequenos alfinetes, para quem gosta de sensações táteis incomuns.','regular');

UPDATE usuario SET perfil = 'admin' WHERE idusuario = 1;
