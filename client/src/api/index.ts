const BASE_URL = "http://localhost:4444";

interface User {
  username: string;
  password: string;
}
export const login = async ({ username, password }: User) => {
  const res = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  console.log(res);
};
