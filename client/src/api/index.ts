const BASE_URL = "http://localhost:4444";

interface User {
  username: string;
  password: string;
}
export const login = async ({ username, password }: User) => {
  try {
    const res = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const response = await res.json();
    return response;
  } catch (e) {
    console.error(e);
    return { error: e };
  }
};

export const registration = async ({ username, password }: User) => {
  try {
    const res = await fetch(`${BASE_URL}/registration`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const response = await res.json();
    return response;
  } catch (e) {
    console.error(e);
    return { error: e };
  }
};
