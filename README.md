# Executar os projetos:
* Para desenvolvimento foi utilizado `node v20.10.0`
* Instalar as dependências nas pastas `ixc-test-backend` e `ixc-test-frontend` utilizando `npm i` e executar cada uma com `npm run dev`
* Há um arquivo `.env` no backend onde é possível alterar algumas configurações (as configurações de endereço do servidor ficaram fixas em alguns locais, recomendado não alterar as portas `3000` e `3001`)

# Desafios e aprendizados
* O mais importante é não apressar a execução de um projeto quando já se prevê que não terá todo tempo para executá-lo, primeiro dia estava viajando e acabei retornando mais tarde do que previa, especialment quando é necessário estudo das tecnologias envolvidas
* MongoDB me surpreendeu e acabou tomando grande parte do tempo, estou acostumado com a abordagem relacional e a forma de pensar na armazenagem de dados é bem interessante e as magias que é possível fazer com recursões de operadores é bem legal. A redundância de informações e a execução de operações atomic precisam de um estudo maior.
* A organização dos arquivos e tipagens quando não se tem uma framework (`nestjs` neste caso) pra ditar como as coisas devem ser e estar também levantam dúvidas sobre qual o modo ideal de organizar o projeto. Acabei por testar algumas abordagens diferentes com funções puras, injeção de dependência, classes. Não tenho preferencia já que o cada empresa tem seu clean-code.
* socket.io foi relativamente simples, apesar do não consenso de onde manter no estado da aplicação front, acabei colocando em um middleware já que nunca tinha feito dessa forma.

## Pendências
Por estudo, falta de tempo e mal planejamente de prioridades o projeto não foi concluído, mas é possível fazer login, criar conta e mandar mensagens, os registros são armazenados em banco e os métodos para consulta foram implementados mas não invocados pelo front.
\
A lógica de identificação de envio e recebimento, replicando a informação para quem envia e quem recebe foi surpreendentemente complicada e não está 100%.
\
Não há notificações e marcar mensagem como lida.
\
No geral foi bem interessante e desafiador.
