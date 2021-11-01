import styles from "./styles.module.scss";
import LogoImg from "../../assets/logo.svg";
export function MessageList() {
  return (
    <div className={styles.messageListWrapper}>
      <img src={LogoImg} alt="doWhile" />

      <ul className={styles.messageList}>
        <li className={styles.message}>
          <p className={styles.messageContent}>
            Não vejo a hora de começar o DoWhile!!! Vai ser o melhor evento do
            ano! Vamos pra cima!
          </p>
          <div className={styles.messageUser}>
            <div className={styles.userImage}>
              <img src="https://github.com/PedroHenrique-O.png" alt="Pedro" />
            </div>
            <span>Pedro Henrique</span>
          </div>
        </li>
        <li className={styles.message}>
          <p className={styles.messageContent}>
            Não vejo a hora de começar o DoWhile!!! Vai ser o melhor evento do
            ano! Vamos pra cima!
          </p>
          <div className={styles.messageUser}>
            <div className={styles.userImage}>
              <img src="https://github.com/PedroHenrique-O.png" alt="Pedro" />
            </div>
            <span>Pedro Henrique</span>
          </div>
        </li>
      </ul>
    </div>
  );
}
