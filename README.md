# Desafio BTG

## Descrição

Criar uma API REST que gerencia tokens OTP (One-Time-Passowrd) e permite a criação e validação desses tokens.

A api deve ser desenvolvida usando uma linguagem a sua escolha, mas deve seguir a **Clean Architechture** ou **Hexagonal Architechture**.

### Requisitos do Desafio:

A api deve possuir os seguintes endpoints e funcionalidades:
1. **Criar token otp**
   1. Deve gerar um novo token otp.
2. **Validar token otp**
   1. Este endpoint irá validar um token otp existente.

### Executando essa aplicação:

Crie na root da sua aplicação um arquivo `.env` e passe as seguintes variáveis:

##### Configurando seu banco de dados
1. `DB_USER`=username_do_seu_banco
2. `DB_PASS`=password_do_seu_banco
3. `DB_HOST`=db ou localhost (aplicação rodando fora do docker)
4. `DB_PORT`=<valor inteiro> refente a porta do seu banco de dados
5. `DB_NAME`=name_do_seu_banco

##### Configurando sua aplicação
1. `NODE_ENV`=development ou production
2. `PORT`=<valor inteiro> referente a porta da sua aplicação

##### Configurando seu Encriptador
1. `SECRET`=sua chave secreta utilizada para configurar a encriptação do seu token

Para executar o projeto:

```bash
docker compose up
```

Para parar a execução:

```bash
docker compose down
```

##### Rotas da aplicacão:
Após executar a aplicação, acessar a rota:

`http://localhost:PORT/api-docs`

Nesta página, você terá a informação referente as rotas, variáveis passadas no body das requisições e valor de retorno.

#### Contribuintes
<img height="15px" width="15px" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg" /> [Immanuel-Victor](https://github.com/Immanuel-Victor)

