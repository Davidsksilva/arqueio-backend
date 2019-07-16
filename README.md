# Arqueio Backend

API utilizada para armazenar/resgatar informações do banco de dados. Também contém regra de negócio.

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

### /users: 

**POST**: Cria o usuário. Corpo da requisição necessita o atributo *name*,*email* e *password*. Exemplo:

```
{
	"name": "David",
	"email":"davidsimonkastle@gmail.com",
	"password":"acerola"
}
```

**OBS**:A senha é criptografada e apenas o hash éarmazenado no banco de dados.



### /sessions: 

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

### /projects: 

**POST**: Cria o uprojeto. Corpo da requisição necessita o atributo *name* e *description*. Exemplo:

```
{
	"name": "Projeto teste",
	"description": "Teste"
}
```

Outros campos atributos que podem ser inseridos é o array *collaborators* e *client_id*. O campo *owner_id* é atribuído automaticamente ao usuário que fez a requisição.

**GET:** Retorna array com os projetos onde o usuário é o dono.