export async function saveCookie(jwt: string) {
  await fetch("/api/auth", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ jwt }),
  });
}
export async function logout() {
  await fetch("/api/auth/logout", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
}
