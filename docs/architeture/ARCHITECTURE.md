# Arquitetura do Projeto DevHub

## Visão geral

O projeto está estruturado como um sistema web fullstack em monorepo, com três blocos principais:

- Backend em Java com Spring Boot
- Frontend em Next.js
- Documentação e requisitos do sistema

Essa organização favorece separação de responsabilidades, manutenção por domínio e evolução modular do software.

---

## 1. Estrutura geral da raiz

Na raiz do projeto, ficam os arquivos de configuração e execução:

- [pom.xml](../../pom.xml): configuração do backend Maven
- [docker-compose.yml](../../docker-compose.yml): orquestração dos serviços e containers
- [mvnw](../../mvnw) e [mvnw.cmd](../../mvnw.cmd): wrapper do Maven
- [SECURITY.md](../../SECURITY.md): políticas de segurança
- [docs](../): documentação técnica e de requisitos
- [frontend](../../frontend): aplicação web
- [src](../../src): código do backend

Essa é a base do projeto e centraliza a execução e a infraestrutura principal.

---

## 2. Backend: Java + Spring Boot

O backend fica em [src](../../src), com a seguinte divisão:

- [src/main/java/com/devHub/proj](../../src/main/java/com/devHub/proj): código principal da aplicação
- [src/main/resources](../../src/main/resources): arquivos de configuração e recursos do Spring
- [src/test/java](../../src/test/java): testes automatizados

### Organização por feature

Dentro do pacote principal, o código está organizado por domínio funcional:

- [src/main/java/com/devHub/proj/features/auth](../../src/main/java/com/devHub/proj/features/auth): autenticação e autorização
- [src/main/java/com/devHub/proj/features/post](../../src/main/java/com/devHub/proj/features/post): gerenciamento de posts
- [src/main/java/com/devHub/proj/features/comment](../../src/main/java/com/devHub/proj/features/comment): comentários
- [src/main/java/com/devHub/proj/features/like](../../src/main/java/com/devHub/proj/features/like): curtidas e reações
- [src/main/java/com/devHub/proj/features/globalsearch](../../src/main/java/com/devHub/proj/features/globalsearch): busca global

Essa organização por feature facilita a manutenção e deixa cada funcionalidade com sua própria responsabilidade.

### Padrão de cada feature

Em geral, cada módulo segue uma estrutura parecida:

- controller: expõe endpoints REST
- service: encapsula a regra de negócio
- dto/request e dto/response: entrada e saída de dados
- exception: exceções específicas da funcionalidade
- config: configurações do módulo
- repository: acesso ao banco de dados
- model/domain: entidades ou classes centrais

Além disso, existe um pacote global:

- [src/main/java/com/devHub/proj/global](../../src/main/java/com/devHub/proj/global)

Esse pacote reúne elementos compartilhados, como:

- modelos comuns
- repositórios globais
- DTOs reutilizáveis
- tratamento de exceções gerais

Essa abordagem ajuda a manter o backend com uma arquitetura em camadas e com boa separação entre domínio, aplicação e infraestrutura.

---

## 3. Frontend: Next.js

O frontend está localizado em [frontend](../../frontend) e foi organizado para separar páginas, features e componentes reutilizáveis.

### Estrutura principal

- [frontend/app](../../frontend/app): rotas e páginas da aplicação
- [frontend/features](../../frontend/features): módulos funcionais do sistema
- [frontend/shared](../../frontend/shared): componentes compartilhados
- [frontend/lib](../../frontend/lib): utilidades e helpers
- [frontend/public](../../frontend/public): arquivos públicos e assets

### Organização do app

A pasta [frontend/app](../../frontend/app) define as rotas do sistema, com separação entre áreas públicas e privadas:

- [frontend/app/(public)](../../frontend/app/(public)): login e registro
- [frontend/app/(private)](../../frontend/app/(private)): páginas internas, como home e notificações
- [frontend/app/api](../../frontend/app/api): rotas de API do próprio frontend
- [frontend/app/posts](../../frontend/app/posts): vistas específicas de posts

Essa divisão deixa clara a diferenciação entre fluxo autenticado e fluxo público.

### Módulos funcionais

A pasta [frontend/features](../../frontend/features) agrupa funcionalidades do produto:

- auth: autenticação e cadastro
- getpost: obtenção e exibição de posts
- globalsearch: busca global
- home: feed principal

Cada feature normalmente contém:

- components
- hooks
- services
- types
- schema

Esse padrão deixa o frontend modular e facilita manutenção conforme cresce a aplicação.

### Componentes compartilhados

A pasta [frontend/shared](../../frontend/shared) concentra itens reutilizados em vários pontos do sistema:

- navbar e footer
- modal, dropdown e UI base
- toast de erro
- contexto do usuário
- hooks globais

Essa prática reduz duplicação de código e facilita padronização visual e comportamental.

---

## 4. Documentação

A pasta [docs](../) organiza toda a parte documental do projeto:

- [docs/architeture](../): arquitetura do sistema
- [docs/requirements](../requirements): requisitos funcionais e não funcionais
- [docs/usecases](../usecases): casos de uso
- [docs/ci-cd](../ci-cd): integração contínua e entrega contínua
- [docs/class](../class): documentação de classes e modelagem

Essa estrutura mantém o projeto bem documentado, desde visão geral até requisitos e automação.

---

## 5. Padrão arquitetural adotado

O projeto segue uma arquitetura de domínios e camadas, combinando:

- Frontend em Next.js para interface e experiência do usuário
- Backend em Spring Boot para API e regras de negócio
- Organização por features no frontend e backend
- Estruturas reutilizáveis para componentes e utilitários compartilhados
- Documentação separada por assunto

Em outras palavras, o sistema foi pensado com separação clara entre:

- interface do usuário
- regras de negócio
- acesso a dados
- infraestrutura e documentação

Isso torna a aplicação mais escalável, organizada e fácil de evoluir.

---

## 6. Conclusão

A arquitetura do DevHub é modular e bem dividida em responsabilidades:

- [frontend](../../frontend): interface e experiência do usuário
- [src](../../src): lógica de negócio e API
- [docs](../): documentação e requisitos

Essa organização favorece manutenção, testes e crescimento do projeto, mantendo o código mais compreensível e reutilizável.
