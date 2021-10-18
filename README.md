<!-- <p align="center">
  <a href="https://robertolima.eti.br/">
    <img alt="Roberto Lima" src="" width="200" />
  </a>
</p>
<h2 align="center">

</h2> -->

# API Restful com Node.js, Express, Typescript, Sequelize, Postgres, Redis e Docker



## Rodando a aplicação localmente

Faça um clone deste repositório e instale no seu ambiente de desenvolvimento usando o seguinte comando no seu terminal (escolha um diretório apropriado):

```
git clone git@github.com:robertolima-dev/api-reference-ts.git
```

Após clonar o conteúdo do repositório, acesse o diretório criado e efetue a instalação das dependências:

```
cd api-reference-ts

yarn

# ou

npm install
```

Inicie o Redis com o comando docker abaixo

```
docker run --name redis-client -v redisinsight:/db -p 8801:8001 -d -t redislabs/redisinsight:latest
```

Após essa instalação execute a aplicação com o comando `yarn dev` ou `npm run dev`. O servidor estará em execução no endereço `http://localhost:4001`.

