import { useContext } from "react";
import styles from "./app.module.scss";
import { LoginBox } from "./components/LoginBox";
import { MessageList } from "./components/MessageList";
import { authContext } from "./contexts/auth";
import { SendMessageForm } from "./SendMessageForm";
export function App() {
  const { user } = useContext(authContext);
  return (
    <main
      className={`${styles.contentWrapper} 
        ${!!user ? styles.contentSigned : ""}`}
    >
      <MessageList />
      {!!user ? <SendMessageForm /> : <LoginBox />}
    </main>
  );
}
