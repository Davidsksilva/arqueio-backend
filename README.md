# Arqueio Backend

Backend source code from Arqueio, a discontinued architecture management platform startup that I was part of. It might be a useful reference material for someone that wants to build a backend in Node.js that includes:

- User registration and authentication;
- Database operations;
- File upload to AWS S3;
- Automatic deploy through gitlab cli.

Some technologies used in the project:

- Express: web framework;
- Postgres: store data;
- Sequelize ORM: interact with database;
- Multer: to handle file upload;
- AWS S3: to store files.

API utilizada para armazenar/resgatar informações do banco de dados. Também contém regra de negócio. 

Na pasta `etc` é possível encontrar um arquivo .json do workspace do [Insomnia](https://insomnia.rest/download/) que possui requisições pré definidas para o teste do backend.

## Requisitos

- Docker
- NPM/YARN
- Node

## Execução

```
docker-compose up -d
yarn
yarn dev
```
## Endpoints

Lista de endpoints e como utilizálos

### ``/users``: 

**POST**: Cria o usuário. Corpo da requisição necessita o atributo `name`,`email` e `password`. Exemplo:

```
{
	"name": "David",
	"email":"davidsimonkastle@gmail.com",
	"password":"acerola"
}
```

**OBS**:A senha é criptografada e apenas o hash éarmazenado no banco de dados.

### ``/sessions``

**POST**: Login do usuário, onde a resposta contém um token de autenticação que deverá ser anexado ao header das próximas requisições. Exemplo de requisição:

```
{
	"email": "davidsimonkastle@gmail.com",
	"password":"acerola"
}
```

Exemplo de resposta:

```
{
  "user": {
    "id": 1,
    "name": "David",
    "email": "davidsimonkastle@gmail.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTYzMTQzMTc2LCJleHAiOjE1NjM3NDc5NzZ9.cbxN10FnlHcG2mT1xBxmXdyN19KDdZLDIivxRJ77rTc"
}
```

**OBS:** o valor do atributo token é a chave de autenticação, dura 7 dias. Para adicioná-la ao header das proximas requisições, apenas criar um header do tipo `authorization: bearer <token>`.

### ``/projects`` 

**POST**: Cria um projeto. Corpo da requisição necessita o atributo `name` e `description`. Exemplo:

```
{
	"name": "Projeto teste",
	"description": "Teste"
}
```

Outros campos atributos que podem ser inseridos é o array `collaborators` e `client_id`. O campo *owner_id* é atribuído automaticamente ao usuário que fez a requisição.

**GET:** Retorna array com os projetos onde o usuário é o dono.

### `/projects/:id/tasks` 

**POST:** Cria uma nova tarefa no projeto `id`. Exemplo de requisição no endpoint `/projects/1/tasks`:

```json
{
	"title": "Atv 1",
	"description": "Alguma descrição"
}
```

Exemplo de resposta:

```json
{
  "title": "Atv 1",
  "description": "Alguma descrição",
  "deadline": null,
  "project_id": 1
}
```

**GET:** Retorna um array com as tarefas do projeto `id`. Exemplo de resposta:

```
[
  {
    "id": 2,
    "title": "Atv 1",
    "description": "Alguma descrição",
    "deadline": null,
    "project": {
      "id": 1,
      "name": "Projeto teste"
    }
  }
]
```



### ``/files`` 

**POST**: Cria um arquivo para armazenamento. Corpo da requisição necessita ser do tipo multi form, com o campo `file` contendo o arquivo a ser enviado. Exemplo de retorno:

```
{
  "url": "http://localhost:1337/files/d5aee6be84a8849cf28e7f2a5620f8c1.jpeg",
  "id": 1,
  "name": "paulo_freire.jpeg",
  "path": "d5aee6be84a8849cf28e7f2a5620f8c1.jpeg",
  "updatedAt": "2019-07-17T03:45:41.256Z",
  "createdAt": "2019-07-17T03:45:41.256Z"
}
```

O atributo `url` contém o hyperlink para a imagem, pronta para ser renderizada. Arquivos ficam salvos em `tmp/uploads`.

### ``/posts`` 

**POST**: Cria um post. Corpo da requisição necessita o atributo *title*. Exemplo:

```
{
	"title": "Post 1",
	"description": "Este é o primeiro post do Arqueio",
	"image_id": 1
}
```



Outro atributo que também pode ser inserido é `owner_id` que é o id do usuário dono do post.

### ``/gallery`` 

**GET**: Retorna um array com todos os posts da galeria. Contém paginação, 20 posts por página, para acessar páginas diferentes páginas, incluir o atributo ``page`` no header. Exemplo de resposta:

```
[
  {
    "id": 1,
    "title": "Post 1",
    "description": null,
    "owner_id": null,
    "image_id": 1,
    "image": {
      "url": "http://localhost:1337/files/d5aee6be84a8849cf28e7f2a5620f8c1.jpeg",
      "name": "paulo_freire.jpeg",
      "path": "d5aee6be84a8849cf28e7f2a5620f8c1.jpeg"
    },
    "owner": null
  }
]
```







