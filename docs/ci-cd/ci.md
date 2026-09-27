# Documentação de CI — DevHub

Esta é a documentação oficial do processo de **Integração Contínua (CI — Continuous Integration)** do projeto **DevHub**.

O objetivo do processo é verificar automaticamente se as alterações realizadas no projeto continuam funcionando corretamente, executando etapas de compilação, testes e validação do frontend e do backend.

## 1. Execução

O pipeline de CI será executado **automaticamente a cada 4 horas**.

Cada execução deverá realizar as etapas definidas abaixo em ordem.

## 2. Etapas do pipeline

### 2.1. Compilação do frontend

Primeiramente, o sistema deverá instalar as dependências necessárias e realizar a compilação do frontend.

Caso a compilação apresente erros, o pipeline deverá ser interrompido.

### 2.2. Testes do frontend

Após a compilação, deverão ser executados os testes automatizados do frontend.

Caso algum teste falhe, o pipeline deverá ser interrompido e a execução deverá ser considerada como falha.

### 2.3. Inicialização do frontend

Após a aprovação dos testes, o frontend deverá ser iniciado para verificar se a aplicação consegue ser executada corretamente.

### 2.4. Compilação do backend

Em seguida, o backend deverá ser compilado.

Caso ocorram erros durante a compilação, o pipeline deverá ser interrompido.

### 2.5. Testes unitários do backend

Após a compilação, deverão ser executados os testes unitários do backend.

Os testes deverão verificar individualmente os principais componentes e regras da aplicação.

### 2.6. Testes de integração do backend

Após a aprovação dos testes unitários, deverão ser executados os testes de integração.

Esses testes deverão verificar a interação entre diferentes componentes do sistema e, quando aplicável, sua comunicação com serviços externos e o banco de dados.

### 2.7. Inicialização do backend

Por fim, o backend deverá ser iniciado para verificar se a aplicação consegue ser executada corretamente após todas as etapas anteriores.

## 3. Fluxo do pipeline

O fluxo do CI seguirá a seguinte ordem:

```text
Início
  │
  ▼
Compilar Frontend
  │
  ▼
Testes do Frontend
  │
  ▼
Iniciar Frontend
  │
  ▼
Compilar Backend
  │
  ▼
Testes Unitários
  │
  ▼
Testes de Integração
  │
  ▼
Iniciar Backend
  │
  ▼
Pipeline concluído
```

Caso uma etapa obrigatória apresente falha, as etapas posteriores não deverão ser executadas.

## 4. Resultado da execução

Cada execução do pipeline deverá apresentar um resultado indicando se o processo foi concluído com sucesso ou apresentou falha.

Em caso de falha, deverão estar disponíveis informações que permitam identificar a etapa responsável pelo erro e auxiliar na sua correção.

## 5. Periodicidade

O pipeline deverá ser executado automaticamente a cada **4 horas**, permitindo verificar regularmente a integridade do projeto mesmo quando não houver uma execução manual do processo.
