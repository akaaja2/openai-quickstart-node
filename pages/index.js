import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [animalInput, setAnimalInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ animal: animalInput }),
    });
    const data = await response.json();
    setResult(data.result);
    setAnimalInput("");
  }

  return (
    <div>
      <Head>
        <title>OpenAI Trussbot</title>
        <link rel="icon" href="/liz.jpg" />
      </Head>

      <main className={styles.main}>
        <img src="/liz.jpg" className={styles.icon} />
        <h3>Liz Truss + OpenAI</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="animal"
            placeholder="What does Liz think about ..."
            value={animalInput}
            onChange={(e) => setAnimalInput(e.target.value)}
          />
          <input type="submit" value="Show me the policy" />
        </form>
        <div className={styles.answerbox}>
        <div className={styles.result}>{result}</div></div>
      </main>
    </div>
  );
}
