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

```
POST - /user
{

}

```
```
PATCH  - /user/:user_id
{
 
}
```
```
DELETE - /user/:user_id
{
 
}
```
---
## ROTA SESSION
```
POST  - /login
{
 
}
```
---
## ROTA PROJECT
```
POST  - /project 
{
 
}
```
```
GET  - /project 
{
 
}
```
```
GET - /project/:id 
{
 
}
```
```
GET - /project/:id/checkpoint 
{
 
}
```
```
PATCH - /project/:id  
{
 
}
```
```
DELETE   - /project/:id  
{
 
}
```
---
## ROTA CHECKPOINT

```
POST - /checkpoint
{
 
}
```
```
GET - /checkpoint/:project_id
{
 
}
```
```
PATCH - /checkpoint/:project_id
{
 
}
```
```
DELETE - /checkpoint/:project_id
{
 
}
```
## ROTA VALOR TOTAL
```
GET  - /project/total
{
 
}
```
```
GET /poject/:project_id/total
{
 
}
```
