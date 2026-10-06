export const SEARCH_SKELETON_ITEMS = Array.from({ length: 4 }, (_, index) => index);

export const EMPTY_SEARCH_MESSAGES = {
  idle: {
    title: "Digite para buscar",
    description: "Procure por usuários ou projetos pelo nome.",
  },
  empty: {
    title: "Nenhum resultado encontrado",
    description: "Não encontramos nenhum usuário ou projeto com esse nome.",
  },
};
