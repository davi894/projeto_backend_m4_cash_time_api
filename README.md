# Doc CashTime API 💻

> É uma APi voltada ao controle de finanças de usuáros freelances, onde são medida as horas, onde acontece a conversão de horas de trabalho em dinheiro

## TECHS E BIBLIOTECAS

|   TECHS    |     BIBLIOTECAS      |
| :--------: | :------------------: |
| Typescript |       bcryptjs       |
|   NodeJS   |     jsonwebtoken     |
|   Shell    |         jest         |
|            |    uuid-validate     |
|            | express-async-errors |
|            |   reflect-metadata   |
|            |       typeorm        |
|            |         yup          |

## ROTA USER

> **Cadastro/registro de usuário**

```
POST - /user

> envio

{
 "name":teste,
 "email":"test@gmail.com",
 "isActive": true,
 "createdAt":"",
 "updatedAt":"",
 "password":"123456"
}

> retorno

status - 201

{
	"updatedAt": "2023-01-17T11:21:27.917Z",
	"createdAt": "2023-01-17T11:21:27.917Z",
	"isActive": true,
	"email": "teste5@gmail.com",
	"name": "teste 5",
	"id": "b30d628b-8523-4048-b860-ab7e89e0ea86"
}
```

> **Dados do usuario**

```
GET - /user

retorno

status - 200

{
	"updatedAt": "2023-01-17T11:18:29.922Z",
	"createdAt": "2023-01-17T11:18:29.922Z",
	"isActive": true,
	"email": "teste4@gmail.com",
	"name": "teste 4",
	"id": "120e056e-7d20-4c35-ab4f-782560475263"
}
```

> **Atualização de usuário**

```
PATCH - /user

> envio

{
	"name":"teste 2 atualizado",
	"email": "teste2@gmail.com",
	"senha": "1234567"
}

> resposta

status - 200
{
	"name":"teste 2 atualizado",
	"email": "teste2@gmail.com",
}

```

> **deleção de usuário pelo soft delete**

```
DELETE - /user

retorno

status 204 - sem body no response

```

---

> **Login do usuário**

## ROTA SESSION

```
POST - /login

> envio

{
  "email": "teste@gmail.com",
  "password":"123456"
}

> resposta

status - 200

{
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoidGVzdGU1QGdtYWlsLmNvbSIsImlhdCI6MTY3Mzk1NDQ5NSwiZXhwIjoxNjc0MDQwODk1LCJzdWIiOiJiMzBkNjI4Yi04NTIzLTQwNDgtYjg2MC1hYjdlODllMGVhODYifQ.EMeQO1yzKNwv0a1UJxjBjD0DfqxmntieaA1HC90ovi4"
}

```

---

## ROTA PROJECT

> **Cadastro/registro do projeto**

```
POST - /project

> envio
{
	"name":"teste",
	"description":"teste 2",
	"hourValue": 50,
	"status":"Em progresso",
	"totalValue":2300,
	"totalTime":"12:00"
}

> resposta

status - 200

{
	"name": "teste",
	"description": "teste",
	"hourValue": 50,
	"status": "Em progresso",
	"totalValue": 2300,
	"totalTime": "12:00",
	"user_": "120e056e-7d20-4c35-ab4f-782560475263",
	"id": "74b1d840-3999-42e7-b7ee-1dfed17e15ae",
	"createdAt": "2023-01-17T12:33:53.318Z",
	"updatedAt": "2023-01-17T12:33:53.318Z"
}

```

> **Listagem de todos os projetos**

```
GET - /project

resposta
status - 200
 [
	{
		"id": "54c6bedf-769a-456b-83c0-38596e7dbcba",
		"name": "teste7",
		"description": "teste 2",
		"createdAt": "2023-01-17T11:19:27.552Z",
		"updatedAt": "2023-01-17T11:19:27.552Z",
		"hourValue": 50,
		"status": "Em progresso",
		"totalValue": 2.3,
		"totalTime": "12:40"
	}
]

```

> **Total de um projeto**

```
GET - /poject/:project_id/total

ao enviar lembrar de colocar o id do projeto criado no parâmetro da url

Ex.:
/project/:project_id
/project/asqssas12233-124232-12244423

> resposta

status - 200

{
	"Total Value": "600.00"
}
```

> **Total de todos os projetos**

```
GET - /project/total

> resposta

status - 200

[
	{
		"name": "teste7",
		"totalValue": 2.3
	},
	{
		"name": "teste8",
		"totalValue": 2.3
	},
	{
		"name": "teste9",
		"totalValue": 2.3
	},
	{
		"name": "teste10",
		"totalValue": 2300
	}
]
```

> **Listagem de um projeto em específico**

```
GET - /project/:project_id

> envio

ao enviar lembrar de colocar o id do projeto criado no parâmetro da url

Ex.:
/project/:project_id
/project/asqssas12233-124232-12244423

> resposta

status - 200

{
	"id": "54c6bedf-769a-456b-83c0-38596e7dbcba",
	"name": "teste7",
	"description": "teste 2",
	"createdAt": "2023-01-17T11:19:27.552Z",
	"updatedAt": "2023-01-17T11:19:27.552Z",
	"hourValue": 50,
	"status": "Em progresso",
	"totalValue": 2.3,
	"totalTime": "12:40"
}

```

> **Atualização de um projeto em específico**

```
PATCH - /project/:project_id

> envio

{
 status : "em progresso"
}

> resposta

status - 200

{
    message: "projeto atualizado com sucesso"
}
```

> **Deleção de um projeto em específico**

```
DELETE - /project/:project_id
> envio

ao enviar lembrar de colocar o id do projeto criado no parâmetro da url

Ex.:
/project/:project_id
/project/asqssas12233-124232-12244423

> resposta

 status - 204 - sem body no response

```

---

## ROTA CHECKPOINT

> **Ponto de registro do início da jornada de trabalho**

```
POST - /checkpoint/:project_id


> envio

ao enviar lembrar de colocar o id do projeto criado no parâmetro da url

Ex.:
/checkpoint/:project_id
/checkpoint/asqssas12233-124232-12244423

{
"entry":"9:30",
"output":"10:20",
"date":"10/12/2022"
}

> resposta

status - 201

{
	"message": "Checkpoint created!"
}

```

> **Lista um  checkinpoints de um projeto em específico**

```
GET - /checkpoint/:project_id

> envio

ao enviar lembrar de colocar o id do projeto criado no parâmetro da url

Ex.:
/checkpoint/:project_id
/checkpoint/asqssas12233-124232-12244423

{
	"checkpoint_id":"f64b752c-08a3-43c6-882c-017dbed7b7f7"
}

> resposta

status - 200

{
	"id": "f64b752c-08a3-43c6-882c-017dbed7b7f7",
	"entry": "09:30:00",
	"output": "20:00:00",
	"date": "2022-10-12"
}

```

> **Listar todos os checkinpoints do usuário**

```
GET - /checkpoint

> envio

{
  "initialRange": "2022-10-12",
  "finalInterval": "2022-10-12",
}

> resposta

status - 200

[
	{
		"id": "5a9bcd87-a67b-46dd-a840-558394c4f4d9",
		"entry": "09:30:00",
		"output": "10:20:00",
		"date": "2022-10-12",
		"user_": {
			"id": "b30d628b-8523-4048-b860-ab7e89e0ea86",
			"name": "teste 5",
			"email": "teste5@gmail.com",
			"password": "$2a$10$vPlCuJpBqi4GMpUOdkHgiuEmuDoKsNV7D8QDuMRE0qpw1h7jVGIFG",
			"createdAt": "2023-01-17T11:21:27.917Z",
			"updatedAt": "2023-01-17T11:21:27.917Z",
			"isActive": true
		}
	},
	{
		"id": "4aab22e2-6163-4e0a-bec6-19b501337e0b",
		"entry": "09:30:00",
		"output": "18:00:00",
		"date": "2022-10-12",
		"user_": {
			"id": "b30d628b-8523-4048-b860-ab7e89e0ea86",
			"name": "teste 5",
			"email": "teste5@gmail.com",
			"password": "$2a$10$vPlCuJpBqi4GMpUOdkHgiuEmuDoKsNV7D8QDuMRE0qpw1h7jVGIFG",
			"createdAt": "2023-01-17T11:21:27.917Z",
			"updatedAt": "2023-01-17T11:21:27.917Z",
			"isActive": true
		}
	}
]
```

> **Listar todos checkpoints de um projeto em específico**

```
GET - /checkpoint/:project_id/all

> envio

ao enviar lembrar de colocar o id do projeto criado no parâmetro da url

Ex.:
/checkpoint/:project_id
/checkpoint/asqssas12233-124232-12244423

> resposta

status - 200

[
	{
		"id": "f64b752c-08a3-43c6-882c-017dbed7b7f7",
		"entry": "09:30:00",
		"output": "18:00:00",
		"date": "2022-10-12"
	}
]

```

> **Atualização do checkinpoint de um projeto em específico**

```
PATCH - /checkpoint/:project_id/all

> envio

{
	"output":"18:00",
	"checkpoint_id":"4aab22e2-6163-4e0a-bec6-19b501337e0b"
}

> resposta

status - 200

{
	"message": "Checkpoint Updated"
}

```
