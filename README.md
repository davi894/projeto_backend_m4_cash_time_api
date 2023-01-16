# Doc CashTime API 💻

> É uma APi voltada ao controle de finanças de usuáros freelances, onde são medida as horas, onde acontece a conversão de horas de trabalho em dinheiro

## TECHS E BIBLIOTECAS
| TECHS | BIBLIOTECAS |
|:-------:|:-------------:|
|   Typescript  |bcryptjs            |
|    NodeJS     |jsonwebtoken        |
|    Shell      |jest                |
|               |uuid-validate       |
|               |express-async-errors|
|               |reflect-metadata    |
|               |typeorm             |
|               |yup                 |

## ROTA USER
>**Cadastro/registro de usuário**
```
POST - /user 
{
 "name":"test teste",
 "email":"test@gmail.com",
 "isActive": true,
 "createdAt":"",
 "updatedAt":"",
 "password":"123456"
}
```
>**Dados do usuario**
```
GET - /user 
{

}
```
>**Atualização de usuário**
```
PATCH - /user/:user_id 
{
 
}
```
>**deleção de usuário pelo soft delete**
```
DELETE - /user/:user_id
{
 
}
```
---
>**Login do usuário**
## ROTA SESSION
```
POST - /login 
{
 
}
```
---
## ROTA PROJECT
>**Cadastro/registro do projeto**
```
POST - /project  
{
 
}
```
>**Listagem de todos os projetos**
```
GET - /project 
{
 
}
```
>**Listagem de um projeto em específico**
```
GET - /project/:project_id  
{
 
}
```
>**Atualização de um projeto em específico**
```
PATCH - /project/:project_id  
{
 
}
```
>**Deleção de um projeto em específico**
```
DELETE - /project/:project_id  
{
 
}
```
>**Total de um projeto**
```
GET - /poject/:project_id/total  
{
 
}
```
>**Total de todos os projetos**
```
GET - /project/total   
{
 
}
```
---
## ROTA CHECKPOINT
>**Ponto de registro do início e de fim da jornada de trabalho**
```
POST - /checkpoint/:project_id 
{
 
}
```
>**Listar todos os checkinpoints de um projeto em específico**
```
GET - /checkpoint/:project_id 
{
 
}
```
>**Atualização do checkinpoint de um projeto em específico**
```
PATCH - /checkpoint/:project_id
{
 
}
```

