import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../services/api";

type authResponse = {
  token: string;
  user: {
    id: string;
    avatar_url: string;
    name: string;
    login: string;
  };
};
type User = {
  id: string;
  name: string;
  login: string;
  avatar_url: string;
};

type AuthContextData = {
  user: User | null;
  signInUrl: string;
  signOut: () => void;
};

type AuthProvider = {
  children: ReactNode;
};
export const authContext = createContext({} as AuthContextData);
export function AuthProvider(props: AuthProvider) {
  const [user, setUser] = useState<User | null>(null);
  const signInUrl = `https://github.com/login/oauth/authorize?scope=user&client_id=568e2c5c30f832164054`;

  async function sigIn(githubCode: string) {
    //pega o usuário do back-end e seta no state
    const response = await api.post<authResponse>("authenticate", {
      code: githubCode,
    });

    const { token, user } = response.data;

    localStorage.setItem("@doWWhile:token", token);
    api.defaults.headers.common.authorization = `Bearer ${token}`;
    setUser(user);
  }
  function signOut() {
    setUser(null);
    localStorage.removeItem("@doWWhile:token");
  }

  useEffect(() => {
    //verifica se há o token no localStorage
    //ao renderizar o app
    const token = localStorage.getItem("@doWWhile:token");
    if (token) {
      //manda o token no header da requisição com o axios
      //toda requisição daqui em dianta automaticamente e enviada com o token
      api.defaults.headers.common.authorization = `Bearer ${token}`;
      api.get("profile").then((response) => {
        setUser(response.data);
        console.log("Log", response);
      });
    }
  }, []);

  useEffect(() => {
    const url = window.location.href;
    const hasGitHubCode = url.includes("?code=");
    if (hasGitHubCode) {
      //tudo que vem antes é a url sem o code
      //tudo que vem depois e o cod
      const [urlWithoutCode, githubCode] = url.split("?code=");
      //limpa cod do user da url
      window.history.pushState({}, "", urlWithoutCode);

      sigIn(githubCode);
    }
  }, []);
  return (
    <authContext.Provider value={{ signInUrl, user, signOut }}>
      {props.children}
    </authContext.Provider>
  );
}
