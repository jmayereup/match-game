import Head from "next/head";
import React from "react";
import { useState, useEffect } from "react";
import { useRef } from 'react';
import styles from "./index.module.css";
import MatchGame from "./match-maker.js";

export default function Home() {
  const [topic, setVocabTopic] = useState("");
  const [result, setResult] = useState("");
  const [placeholderText, setPlaceholderText] = useState('Please enter a topic to study.');
  const [isDisabled, setIsDisabled] = useState(false);
  const preRef = useRef();
 
  function handleCopy() {
    navigator.clipboard.writeText(preRef.current.innerText);
  }

  async function onGenerate(event) {
    event.preventDefault();

    try {
      setVocabTopic("");
      setResult(null)
      setPlaceholderText('Please Wait');
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ topic: topic }),
      });

      const data = await response.json();

      if (response.status !== 200) {
        setPlaceholderText('There was an error. Please try again.');
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result);
      setPlaceholderText('You can play the game below.');
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }
function newGame(event) {
  event.preventDefault();
  setResult(null);
  setIsDisabled(false);
}

  //   // DEV Array for fast testing
  // function onGenerate(event) {
  //   event.preventDefault();
  //   setVocabTopic("");
  //   setIsDisabled(true);
  //   setResult("\nSanta - Papá Noel\nGift - Regalo\nMistletoe - Muérdago\nReindeer - Reno\nCandy Cane - Bastón de Caramelo\nSnowman - Muñeco de Nieve\nManger - Pesebre\nElf - Duende\nStar - Estrella\nCookie - Galleta\nGingerbread - Jengibre\nSnowflake - Copo de Nieve\nWreath - Corona\nAngel - Ángel\nCarol - Villancico\nComet - Cometa\nJingle Bells - Campana de Navidad\nHolly - Acebo\nCandle - Vela\nPinecone - Piña\nGarland - Guirnalda\nNutcracker - Rompecabezas\nChristmas - Navidad\nPresent - Presente\nNativity - Belén\nPoinsettia - Flor de Nochebuena\nOrnament - Adorno");
  //   setPlaceholderText('Please enter a new topic.');
  // }
  return (
    <div>
      <Head>
        <title>Matching Game</title>
        <link rel="icon" href="/study.svg" />
      </Head>

      <main className={styles.main}>
        <img src="/study.svg" className={styles.icon} />
        <h3>What would you like to study?</h3>
        <form>
          <input
            type="text"
            name="topic"
            placeholder={placeholderText}
            value={topic}
            onChange={(e) => setVocabTopic(e.target.value)}
          />
          <input type="button" onClick={onGenerate} disable={isDisabled} value="Generate Word Pairs" />
          <input type="button" onClick={handleCopy} value="Copy to Clipboard" />
          <input type="reset" onClick={newGame} value="Reset" />
        </form>
        <div className={styles.study}><details><summary>You can click here if you want to study before playing.</summary>
          <pre ref={preRef} className={styles.result}>{result}</pre>
        </details>
        </div>
        {result ? <MatchGame result={result} /> : <p>Please enter a topic and click generate.</p>}
      </main>
    </div>
  );
}
