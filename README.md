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

}

```
>**Atualização de usuário**
```
PATCH  - /user/:user_id 
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
POST  - /login 
{
 
}
```
---
## ROTA PROJECT
>**Cadastro/registro do projeto**
```
POST  - /project  
{
 
}
```
>**Listagem de todos os projetos**
```
GET  - /project 
{
 
}
```
>**Listagem de um projeto em específico**
```
GET - /project/:id  
{
 
}
```
>**Atualização de um projeto em específico**
```
PATCH - /project/:id  
{
 
}
```
>**Deleção de um projeto em específico**
```
DELETE   - /project/:id  
{
 
}
```
---
## ROTA CHECKPOINT
>**Ponto de registro do início e de fim da jornada de trabalho**
```
POST - /checkpoint 
{
 
}
```
>**Listar todos os checkinpoints de um projeto em específico**
```
GET - /checkpoint/project/:project_id 
{
 
}
```
>**Atualização do checkinpoint de um projeto em específico**
```
PATCH - /checkpoint/checkpoint_id/project/:project_id 
{
 
}
```
>**Deleção do checkinpoint de um projeto em específico**
```
DELETE - /checkpoint/checkpoint_id/project/:project_id 
{
 
}
```
## ROTA VALOR TOTAL
>**Soma do valor de todos os projetos**
```
GET  - /project/total 
{
 
}
```
>**Valor total do projeto específico**
```
GET /poject/:project_id/total
{
 
}
```
>**Valor por hora do projeto em específico**
```
GET /poject/:project_id/totalHora
{
 
}
```
