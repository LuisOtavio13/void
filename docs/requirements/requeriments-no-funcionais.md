# Requisitos Não Funcionais — DevHub

Os requisitos não funcionais definem características de qualidade, desempenho, segurança, compatibilidade e manutenção do sistema DevHub.

---

## 1. Desempenho

**RNF01 — Tempo de resposta**
As operações comuns do sistema deverão apresentar tempo de resposta adequado para utilização em condições normais de uso.

**RNF02 — Carregamento de posts**
O carregamento de posts deverá ocorrer de forma progressiva, evitando o carregamento simultâneo de uma quantidade excessiva de dados.

**RNF03 — Consultas**
As consultas ao banco de dados deverão ser realizadas de forma otimizada, especialmente em funcionalidades que envolvam posts, comentários, usuários e notificações.

---

## 2. Segurança

**RNF04 — Armazenamento de senhas**
As senhas dos usuários não deverão ser armazenadas em texto puro, devendo ser armazenadas utilizando um algoritmo de hash adequado.

**RNF05 — Autenticação**
As funcionalidades que exigem autenticação deverão estar protegidas contra acesso de usuários não autenticados.

**RNF06 — Autorização**
O sistema deverá verificar as permissões do usuário antes de permitir operações administrativas ou alterações em conteúdos pertencentes a outros usuários.

**RNF07 — Proteção de dados**
Informações privadas dos usuários não deverão ser disponibilizadas para usuários que não possuam permissão para acessá-las.

**RNF08 — Upload de arquivos**
Arquivos enviados pelos usuários deverão ser validados quanto ao tipo e tamanho, evitando o envio de arquivos incompatíveis ou potencialmente perigosos.

**RNF09 — Conteúdo enviado pelos usuários**
Conteúdos inseridos por usuários deverão ser tratados adequadamente para reduzir riscos relacionados à execução de código ou conteúdo malicioso.

---

## 3. Disponibilidade e confiabilidade

**RNF10 — Disponibilidade**
O sistema deverá permanecer disponível durante os períodos previstos para sua utilização.

**RNF11 — Integridade dos dados**
As operações realizadas no sistema deverão preservar a integridade dos dados armazenados.

**RNF12 — Tratamento de erros**
Erros durante a utilização do sistema deverão ser tratados sem causar o encerramento inesperado da aplicação ou a perda indevida de dados.

---

## 4. Usabilidade

**RNF13 — Interface**
A interface deverá ser intuitiva e permitir que as principais funcionalidades sejam acessadas sem procedimentos desnecessariamente complexos.

**RNF14 — Responsividade**
A interface deverá adaptar-se a diferentes tamanhos de tela, incluindo computadores, tablets e dispositivos móveis.

**RNF15 — Feedback das operações**
O sistema deverá fornecer feedback ao usuário após operações relevantes, como criação, edição ou exclusão de conteúdos.

**RNF16 — Mensagens de erro**
As mensagens de erro deverão informar de maneira clara o problema ocorrido e, quando possível, orientar o usuário sobre como solucioná-lo.

---

## 5. Compatibilidade

**RNF17 — Navegadores**
O sistema deverá ser compatível com os principais navegadores modernos.

**RNF18 — Dispositivos**
O sistema deverá poder ser utilizado em computadores e dispositivos móveis por meio de um navegador web.

---

## 6. Manutenibilidade

**RNF19 — Organização do código**
O código-fonte deverá ser organizado de forma modular, facilitando a manutenção e evolução do sistema.

**RNF20 — Separação de responsabilidades**
Os componentes do sistema deverão possuir responsabilidades bem definidas, reduzindo o acoplamento entre suas diferentes partes.

**RNF21 — Testes**
As principais funcionalidades do sistema deverão possuir testes automatizados para verificar seu funcionamento e reduzir regressões durante o desenvolvimento.

**RNF22 — Controle de versão**
O código-fonte deverá ser mantido utilizando um sistema de controle de versão.

---

## 7. Escalabilidade

**RNF23 — Crescimento de dados**
A arquitetura deverá permitir o crescimento da quantidade de usuários, posts, comentários e notificações sem exigir alterações fundamentais na estrutura do sistema.

**RNF24 — Paginação e carregamento de dados**
O sistema deverá evitar o carregamento desnecessário de grandes quantidades de dados em uma única requisição.

---

## 8. Tecnologias e infraestrutura

**RNF25 — Banco de dados**
Os dados da aplicação deverão ser armazenados em um banco de dados relacional.

**RNF26 — API**
A comunicação entre o frontend e o backend deverá ocorrer por meio de uma API.

**RNF27 — Conteinerização**
Os serviços necessários para execução do sistema deverão poder ser executados de forma isolada por meio de containers.

**RNF28 — Migrações do banco de dados**
Alterações na estrutura do banco de dados deverão ser controladas por meio de um sistema de migrações versionadas.
