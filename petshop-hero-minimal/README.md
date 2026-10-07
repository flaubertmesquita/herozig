# Hero mínima de petshop — vídeo controlado pelo cursor

Template sem React, sem bibliotecas e sem controles visíveis. A hero contém somente o vídeo em tela cheia; a posição horizontal do cursor escolhe o ponto correspondente na linha do tempo.

## Adicionar o vídeo

1. Copie seu arquivo para `src/assets/videos/cachorrinho.mp4`.
2. Abra `index.html` com o Live Server do VS Code.
3. Mova o cursor horizontalmente sobre a hero.

O vídeo começa olhando para a direita e termina olhando para a esquerda. O código inverte a linha do tempo para que o cursor à direita mostre o olhar à direita e o cursor à esquerda mostre o olhar à esquerda.

## Atenção: eixo vertical

Este MP4 representa uma sequência de uma dimensão: direita → esquerda. Com esse arquivo, o cursor controla o eixo horizontal. Ele não contém informação para fazer o cachorrinho olhar para cima ou para baixo. Para controlar os dois eixos, seria necessário criar outras poses/clipes ou usar uma sequência de poses 2D (por exemplo, uma grade 3×3 ou 5×5).

## Ajustes

- Se o arquivo tiver outro nome/caminho, altere `src` em `index.html`.
- Para ajustar o recorte, altere `object-position: 70% center` em `src/css/hero.css`.
- Para integrar a outra página, copie o `<main class="pet-hero">`, inclua o CSS e carregue `src/js/hero.js` com `defer`.
- Não é necessário autoplay: o JavaScript faz seek no vídeo conforme o ponteiro se move.


“Carregar src/js/hero.js com defer” significa incluir esse arquivo JavaScript na página usando uma tag <script> com o atributo defer.

No <head> do seu HTML, adicione:

HTML

<link rel="stylesheet" href="src/css/hero.css">
<script src="src/js/hero.js" defer></script>
O navegador baixa o JavaScript enquanto lê o HTML, mas espera até que o HTML esteja interpretado para executar o arquivo. Assim, o script consegue encontrar os elementos da hero na página.

O caminho depende da localização do HTML. Se a página estiver na raiz do projeto, como 
index.html
, use:

HTML

<script src="src/js/hero.js" defer></script>
Se ela estiver dentro de uma subpasta, por exemplo pages/loja.html, o caminho relativo pode ser:

HTML

<script src="../src/js/hero.js" defer></script>
A hero também precisa manter os atributos que o script procura, especialmente data-pet-hero no contêiner e data-pet-video no vídeo.

Observação: se sua página já tiver um elemento <main>, não coloque outro <main> dentro dele. Nesse caso, copie a hero como <section class="pet-hero" data-pet-hero> e mantenha as classes e atributos do vídeo.
