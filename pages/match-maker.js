import React from "react";
// Create a custom element for the match game
export default function MatchGame(props) {
    let matchdata = props.result;


    const result = matchdata.slice(1, -1).split('\n')
        .map(str => {
            const [english, spanish] = str.split(' - ');
            return { english, spanish }
        });

    console.log(result);
    //shuffleArray(dataArray);


    // Define the function to shuffle the array using the Fisher-Yates algorithm
    function shuffleArray(array) {
        const resultArray = [...array]; 
        for (let i = resultArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [resultArray[i], resultArray[j]] = [resultArray[j], resultArray[i]];
        }
        return resultArray;
    }

    // Call the shuffleArray function with the input array
    const shuffledArray = shuffleArray(result);

    // Display the shuffled array in the console
    console.log(shuffledArray);



    // Render shuffled data here
    return (
        <div>
            <h3>Data from Match Maker Component</h3>
            <ul>
                {matchdata}
            </ul>
            <p>Result Value Here: {result.textContent}</p>
        </div>
    );
}


