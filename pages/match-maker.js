import React from "react";
import { useRef, useState } from 'react';
import styles from "./match-maker.module.css";
// Create a custom element for the match game
export default function MatchGame(props) {
    // const gameRef = useRef();
    // const [tilesArray, setTilesArray] = useState([]);
    const [isDisplayed, setIsDisplayed] = useState(true);
    // const [shuffledTilesArray, setShuffledTilesArray] = useState([]);
    let matchdata = props.result;
    let tilesArray = [];
    let tiles = [];
    // let tilesArray = [];

    const result = matchdata.slice(1, -1).split('\n')
        .map(str => {
            const [english, spanish] = str.split(' - ');
            return { english, spanish }
        });

    console.log(result);

    // Call the shuffleArray function with the input array
    let shuffledPairs = shuffleArray(result);
    tiles = createTiles(shuffledPairs);
    console.log("tiles", tiles);
    let gameTiles = shuffleTiles(tiles);




    // Define the function to shuffle the array using the Fisher-Yates algorithm
    function shuffleArray(array) {
        const resultArray = [...array];
        for (let i = resultArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [resultArray[i], resultArray[j]] = [resultArray[j], resultArray[i]];
        }
        return resultArray;
    }

    function createTiles(shuffledPairs) {
        // Loop through the shuffled pairs and create a tile for six pairs
        console.log("how many pairs", shuffledPairs);
        let counter = 0;
        for (let pair of shuffledPairs) {
            if (counter >= 6) {
                break;
            }
            let tile1 = (
                <div
                    className={`${styles.tile} gametile`}
                    data-english={pair.english}
                    data-spanish={pair.spanish}
                    key={counter}
                    id={counter}
                    onClick={handleTileClick}
                >
                    <p>{pair.english}</p>
                </div>
            );
            tilesArray.push(tile1);

            let tile2 = (
                <div
                    className={`${styles.tile} gametile`}
                    data-english={pair.english}
                    data-spanish={pair.spanish}
                    key={100 + counter}
                    id={100 + counter}
                    onClick={handleTileClick}
                >
                    <p>{pair.spanish}</p>
                </div>
            );
            tilesArray.push(tile2);

            counter++;
        }
        const newtiles = tilesArray;
        console.log("tiles create", newtiles);
        return newtiles;
    }

    function shuffleTiles(array) {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    }
    let firstTile = null;
    function handleTileClick(event) {
        console.log("click passed", event);
        let clickedTile = event.target.closest(".gametile");
        console.log("clickedTile set to:", clickedTile);
        console.log(clickedTile.id);


        if (!clickedTile) {
            return;
        }
        clickedTile.classList.add(`${styles.clicked}`);
        if (firstTile && firstTile.id === clickedTile.id) {
            firstTile.classList.remove(`${styles.clicked}`);
            clickedTile.classList.remove(`${styles.clicked}`);
            firstTile = null;
            clickedTile = null;
        }
        if (firstTile && clickedTile) {
            // let firstIndex = firstTile.index;
            if (firstTile.dataset.english === clickedTile.dataset.english) {
                firstTile.textContent = "\uD83D\uDE00";
                clickedTile.textContent = "\uD83D\uDE00";
                firstTile.classList.add(`${styles.matched}`);
                clickedTile.classList.add(`${styles.matched}`);
                console.log("match found");
            } else {
                firstTile.classList.remove(`${styles.clicked}`);
                clickedTile.classList.remove(`${styles.clicked}`);

            }
            firstTile = null;
            clickedTile = null;
        } else {
            firstTile = clickedTile;

        }
    }



    function playAgain(event) {
        event.preventDefault();
        gameTiles = null;
        firstTile = null;
        shuffledPairs = null;
        setIsDisplayed(false);
        tiles = null;

        setTimeout(() => {
            shuffledPairs = shuffleArray(result);
            tiles = createTiles(shuffledPairs);
            gameTiles = shuffleTiles(tiles);
            setIsDisplayed(true);

            console.log("tiles", tilesArray);
        }, 0);
    }

    return (
        <div>
            <h3>You can play a matching game or copy the words to another program.</h3>
            <form><input class="button" type="button" onClick={playAgain} value="Play Again" /></form>
            {isDisplayed && <div id="tile-container" className={styles['matchgamecontainer']}>
                {gameTiles}
              
            </div>}
            
        </div>
    );
}


