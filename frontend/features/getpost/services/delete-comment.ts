export async function deleteComment(postId: number, jwt: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}comments/${postId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    },
  );

  if (!response.ok) {
    const error = await response.json();

    throw new Error(
      error.message || "Erro ao excluir o comentário. Tente novamente.",
    );
  }
}