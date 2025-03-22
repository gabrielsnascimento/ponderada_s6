# Testes Automatizados
Este projeto foi criado para realizar testes automatizados nos controladores de uma aplicação, com foco no `atendimentoController`. Os testes foram escritos utilizando **Jest** e **TypeScript**, com **mocks** para simular interações com o banco de dados e evitar dependências externas.

## Estrutura do Projeto
```
src/
├── config/
│   └── database.ts
├── controllers/
│   ├── alunoController.ts
│   ├── atendimentoController.ts
│   ├── courseController.ts
│   ├── funcionarioController.ts
│   ├── institutionController.ts
│   └── statsController.ts
├── models/
│   ├── Aluno.ts
│   ├── Atendimento.ts
│   ├── Autenticacao.ts
│   ├── AuxiliarAluno.ts
│   ├── AuxiliarDeAcompanhamento.ts
│   └── Funcionario.ts
└── tests/
    └── atendimentoController.test.ts
```

## Tecnologias Utilizadas
- **Node.js**: Ambiente de execução para JavaScript.
- **TypeScript**: Superset de JavaScript que adiciona tipagem estática.
- **Jest**: Framework de testes utilizado para criar e executar os testes.
- **Mocks**: Simulações utilizadas para evitar dependências externas (como conexões reais com o banco de dados).

## Como Executar o Projeto
Certifique-se de que você tem instalado:
- **Node.js** (versão 16 ou superior)
- **npm** (gerenciador de pacotes do Node.js)

### Instalação
1. Clone este repositório:
   ```sh
   git clone <URL_DO_REPOSITORIO>
   ```
2. Navegue até a pasta do projeto:
   ```sh
   cd testes-automatizados
   ```
3. Instale as dependências:
   ```sh
   npm install
   ```

### Executando os Testes
Para rodar os testes automatizados, execute o comando:
```sh
npm test
```
Os resultados dos testes serão exibidos no terminal.

## Resultados dos Testes

### Teste: `getAtendimentos`
- **Objetivo:** Verificar se o método retorna corretamente todos os atendimentos registrados.
- **Resultado Esperado:** Retorno de uma lista de atendimentos em formato JSON.
- **Resultado Obtido:** ✅ Sucesso. O método retornou os dados simulados corretamente.

### Teste: Erro ao buscar atendimentos
- **Objetivo:** Verificar o comportamento do sistema quando ocorre um erro ao buscar atendimentos.
- **Resultado Esperado:** O sistema deve retornar uma mensagem de erro apropriada e um código de status HTTP correto.
- **Resultado Obtido:**  Em andamento. Ajustes necessários para simular diferentes cenários de falha.
