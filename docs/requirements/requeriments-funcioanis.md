# Requisitos Funcionais — DevHub

Este documento apresenta os requisitos funcionais do projeto **DevHub**, uma rede social voltada para desenvolvedores, destinada ao compartilhamento de conteúdo, interação entre usuários e discussão de assuntos relacionados à tecnologia e desenvolvimento de software.

---

## 1. Autenticação e autorização

**RF01 — Cadastro de usuário**
O sistema deverá permitir a criação de uma conta por meio de um formulário contendo **nome, e-mail e senha**.

**RF02 — Confirmação de e-mail**
Após o cadastro, o sistema deverá enviar um link de confirmação para o e-mail informado pelo usuário. A conta deverá ter o e-mail confirmado para ser considerada verificada.

**RF03 — Cadastro com Google**
O sistema deverá permitir a criação de uma conta utilizando uma conta Google.

**RF04 — Login**
O usuário deverá poder realizar login utilizando:

* e-mail e senha; ou
* conta Google.

**RF05 — E-mail único**
O sistema não deverá permitir a criação de mais de uma conta utilizando o mesmo endereço de e-mail.

**RF06 — Recuperação de senha**
O sistema deverá permitir que o usuário solicite a recuperação da senha por meio da opção **"Esqueci minha senha"**, enviando um link de recuperação para o e-mail associado à conta.

**RF07 — Logout**
O usuário deverá poder encerrar sua sessão.

**RF08 — Alteração de perfil**
O usuário deverá poder alterar suas informações de perfil.

**RF09 — Exclusão de conta**
O usuário deverá poder excluir sua própria conta.

**RF10 — Denúncia de perfil**
O usuário deverá poder denunciar o perfil de outro usuário.

---

## 2. Moderação

**RF11 — Função de moderador**
O moderador será um usuário com cargo administrativo responsável por garantir a organização e o cumprimento das regras dentro da plataforma.

**RF12 — Promoção a moderador**
Um moderador poderá atribuir a outro usuário o cargo de moderador.

**RF13 — Remoção de moderador**
Um moderador poderá remover o cargo de moderador de outro usuário.

**RF14 — Exclusão de contas**
O moderador poderá excluir contas de usuários.

**RF15 — Banimento de usuários**
O moderador poderá banir usuários da plataforma.

**RF16 — Permissões do moderador**
O moderador possuirá as mesmas permissões de um usuário comum e, adicionalmente, poderá administrar conteúdos e contas de outros usuários.

**RF17 — Verificação de contas**
O moderador poderá verificar ou remover a verificação de uma conta.

**RF18 — Visualização de conteúdo**
O moderador poderá visualizar posts independentemente de suas configurações de visibilidade.

---

## 3. Comentários

**RF19 — Criação de comentários**
Qualquer usuário autenticado poderá criar comentários.

**RF20 — Respostas a comentários**
Um comentário poderá possuir uma quantidade indefinida de respostas, permitindo a criação de uma estrutura hierárquica de comentários.

**RF21 — Alteração de comentários**
O autor de um comentário ou um moderador poderá alterar o conteúdo do comentário.

**RF22 — Exclusão de comentários**
O autor de um comentário ou um moderador poderá excluir o comentário.

**RF23 — Identificação de comentário editado**
Quando um comentário for alterado, o sistema deverá indicar que ele foi editado e informar a data e o horário da última alteração.

**RF24 — Limite de caracteres**
Um comentário poderá possuir no máximo **2.000 caracteres**.

**RF25 — Exclusão de respostas**
Quando um comentário que possua respostas for excluído, suas respostas também deverão ser excluídas.

**RF26 — Reações em comentários**
O usuário poderá reagir a um comentário utilizando **like** ou **dislike**.

**RF27 — Markdown em comentários**
Os comentários deverão oferecer suporte à formatação utilizando Markdown.

**RF28 — Imagens em comentários**
O sistema deverá permitir o envio de imagens em comentários.

---

## 4. Posts

**RF29 — Criação de posts**
Qualquer usuário autenticado poderá criar posts.

**RF30 — Conteúdo do post**
Um post deverá possuir:

* título;
* conteúdo em Markdown;
* imagens;
* vídeos;
* links; e
* tags relacionadas ao conteúdo.

**RF31 — Alteração de posts**
O autor de um post ou um moderador poderá editar o post.

**RF32 — Exclusão de posts**
O autor de um post ou um moderador poderá excluir o post.

**RF33 — Identificação de post atualizado**
Quando um post for editado, o sistema deverá indicar que ele foi atualizado e informar a data e o horário da última atualização.

**RF34 — Visibilidade de posts**
O usuário poderá definir a visibilidade de um post como:

* público; ou
* somente amigos.

**RF35 — Reações em posts**
O usuário poderá reagir a um post utilizando **like** ou **dislike**.

**RF36 — Ranking de posts**
Os posts poderão ser classificados de acordo com a quantidade de likes recebidos.

**RF37 — Resposta por meio de post**
Um post poderá ser respondido por meio da criação de outro post relacionado.

**RF38 — Menções**
O usuário poderá mencionar outros usuários em um post. O usuário mencionado deverá receber uma notificação.

**RF39 — Menção geral**
O moderador poderá utilizar a menção **@everyone**, notificando todos os usuários elegíveis.

**RF40 — Busca por usuários e posts**
O sistema deverá permitir a busca por usuários e posts.

**RF41 — Carregamento progressivo**
Os posts deverão ser carregados progressivamente durante a rolagem da página, utilizando scroll infinito.

---

## 5. Notificações

**RF42 — Recebimento de notificações**
O usuário deverá receber notificações relacionadas a eventos ocorridos na plataforma.

**RF43 — Notificações de interação**
O sistema deverá gerar notificações para eventos relevantes, como respostas a comentários e menções.

**RF44 — Notificações de moderação**
Ações realizadas por moderadores que afetem um usuário poderão gerar notificações para o usuário afetado.

**RF45 — Notificações por eventos**
Eventos da plataforma poderão gerar notificações padronizadas para os usuários envolvidos.

**RF46 — Exclusão de notificações**
O usuário poderá:

* excluir uma notificação;
* selecionar e excluir várias notificações; ou
* excluir todas as notificações.

**RF47 — Exemplo de notificação**
Quando outro usuário responder a um comentário, o autor do comentário deverá receber uma notificação informando que **um usuário respondeu ao seu comentário**.

---

## 6. Usuários e perfis

**RF48 — Visualização de perfil**
O usuário poderá visualizar seu próprio perfil e o perfil de outros usuários.

**RF49 — Pesquisa de usuários**
O sistema deverá permitir localizar usuários por meio da funcionalidade de busca.

**RF50 — Menção de usuários**
O sistema deverá permitir que usuários sejam mencionados em conteúdos da plataforma.

**RF51 — Denúncia de usuários**
O usuário poderá denunciar outros usuários, permitindo que a denúncia seja posteriormente analisada pela moderação.

---

## 7. Amizades

**RF52 — Solicitação de amizade**
O usuário poderá enviar uma solicitação de amizade para outro usuário.

**RF53 — Gerenciamento de solicitações**
O usuário poderá aceitar ou recusar solicitações de amizade.

**RF54 — Remoção de amizade**
O usuário poderá remover outro usuário de sua lista de amigos.

**RF55 — Visibilidade para amigos**
Posts definidos como **"somente amigos"** deverão ser visíveis apenas para usuários que possuam uma relação de amizade com o autor.
