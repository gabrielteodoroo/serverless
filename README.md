# Serverless

Este código foi desenvolvido com o objetivo de praticar o uso do Serverless Framework. Ele implementa funcionalidades básicas, como listar usuários, criar novos usuários e adicionar uma foto para cada usuário.

## O que é o Serverless ?

O Serverless Framework é um poderoso framework que facilita o desenvolvimento e o gerenciamento de aplicações serverless. Ele permite que desenvolvedores criem, configurem e implantem funções diretamente em provedores de serviços, como a AWS Lambda, sem precisar gerenciar servidores.

### Principais benefícios:

**- Escalabilidade automática:** O provedor ajusta os recursos com base na demanda.

**- Custo-eficiência:** Você paga apenas pelos recursos utilizados (tempo de execução e consumo de memória).

**- Foco no código:** Elimina a preocupação com a infraestrutura subjacente.

### Como funciona na prática?

O Serverless Framework funciona como um orquestrador para configurar e gerenciar suas funções, eventos e recursos necessários no provedor de cloud, como a AWS. Ele utiliza o arquivo serverless.yml para descrever a infraestrutura e os serviços necessários para a aplicação.

## Requisitos

Antes de iniciar, certifique-se de ter os seguintes requisitos instalados em sua máquina:

- **Node.js**: Versão 18.x ou superior [Node.js Download](https://nodejs.org/)
- **npm**: Gerenciador de pacotes padrão do Node.js

###  Como este projeto usa Serverless Framework

**Configuração:** O arquivo serverless.yml é utilizado para configurar os serviços e funções.

**Execução local:** Você pode testar as funções localmente com o serverless-offline utilizando o comando **```npm run dev```**.

**Deploy:** A API foi implantada na AWS Lambda, utilizando o comando **```serverless deploy```**.

## Tecnologias Utilizadas

As principais tecnologias utilizadas para o desenvolvimento desta API são:

- **Node.js**: Runtime JavaScript
- **TypeScript**: Superconjunto do JavaScript que adiciona tipagem estática
- **Knex**: Query builder
- **AWS SDK**: Biblioteca oficial da AWS para interagir com os serviços da nuvem, como S3, DynamoDB e Lambda, permitindo a integração direta com a infraestrutura da Amazon Web Services a partir da aplicação.
- **Busboy**: Biblioteca leve e eficiente para processar uploads de arquivos em requisições multipart/form-data, utilizando streams para lidar com dados grandes de forma otimizada.
- **Serverless**: Ferramenta que simplifica o desenvolvimento e a implantação de aplicações sem servidor, permitindo que os desenvolvedores configurem e gerenciem funções em provedores de nuvem, como AWS Lambda, com facilidade.

## Instalação

1. Clone o repositório para a sua máquina local:

   ```bash
   git clone https://github.com/gabrielteodoroo/serverless
   ```
2. Acesse o diretório do projeto:

   ```bash
   cd serverless
   ```
3. Instale as dependências:

   ```bash
   npm install 
   ```

4. Renomeie o arquivo `.env-example` para `.env` e preencha as informações de acordo com o bucket e com o bando de dados que você criou.
