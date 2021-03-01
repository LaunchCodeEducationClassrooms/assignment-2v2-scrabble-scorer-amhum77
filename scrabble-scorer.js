// inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85

const input = require("readline-sync");
const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

const simplePointStructure ={
  1:['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
};
const vowelPointStructure ={
  1: ['B','C','D','F','G','H','J','K','L','M','N','P','Q','R','S','T','V','W','X','Z'], 
  3: ['A','E','I','O','U','Y']
};
let letterPoints;
let totalWordPoints;
let wordInput;
//Scores entered word with Scrabble based points.
let oldScrabbleScorer = function(word) {
	word = word.toUpperCase();
  let letterPoints = "";
  for (let i = 0; i < word.length; i++) { 
    for (const pointValue in oldPointStructure){
      if(oldPointStructure[pointValue].includes(word[i])) {
        letterPoints += `Points for '${word[i]}': ${pointValue}\n`
     }
    }
  }
  return letterPoints;
 }

//Asks for and stores a word from the user
let initialPrompt = function(prompt){
   wordInput = input.question(prompt);
   return wordInput;
};
//Scores entered word by system of 1 point for each letter
let simpleScore = function(word){
  word = word.toUpperCase();
  let totalWordPoints = 0;
  for(let i = 0; i < word.length; i++){
    for (let pointValue in simplePointStructure) {
      pointValue = Number(pointValue);
      totalWordPoints += pointValue; 
    }
  }  
    return totalWordPoints;
};
//Scores entered word giving extra points for vowels.
let vowelBonusScore = function(word){
  word = word.toUpperCase();
  let totalWordPoints = 0;
  for (let i = 0; i < word.length; i++) {
    for (let pointValue in vowelPointStructure) {
      if (vowelPointStructure[pointValue].includes(word[i])) {
        pointValue = Number(pointValue);
        totalWordPoints += pointValue;
      }
    }
  }
  return totalWordPoints;
 };

//totals the points for the Entered word using newPointStructure
let scrabbleScore = function(word){
  word = word.toLowerCase();
  let newPointValue = 0;
  for(let i=0; i< word.length; i++){
    for(let letter in newPointStructure){
      if(letter == word[i]){
        newPointValue += newPointStructure[letter];
      }
    }
  }
  return newPointValue;
}      
const scoringAlgorithms = [/*THIS LINE ORIGINAL CODE!!!!*/ 
  {
    Name: "Simple Score",
    Description: "Each letter is worth 1 point.",
    scoringFunction: simpleScore
  },
  {
    Name: "Bonus Vowels",
    Description: "Vowels are 3 pts, consonants are 1 pt.",
    scoringFunction: vowelBonusScore

  },
  {
    Name: "Scrabble",
    Description: "The traditional scoring algorithm.",
    scoringFunction: oldScrabbleScorer
  }
  ];
  
//This gives options to use above scoring methods and asks to choose one.
let scorerPrompt = function(){/* THIS LINE ORIGINAL CODE!!!!*/
  console.log("How would you like your word to be scored?"); 
  for(i=0; i<scoringAlgorithms.length; i++)
    {
      let guide = console.log(`${[i]} - ${scoringAlgorithms[i]["Name"]}, ${scoringAlgorithms[i]["Description"]}`);   
    }; 
  let scoringOption = input.question(console.log(` Enter 0, 1, or 2:`));
  scoringOption = Number(scoringOption);
  if(scoringOption === 0){
      console.log("algorithm name: ", scoringAlgorithms[0].Name);
      console.log("scoreFunction result: ", scoringAlgorithms[0].scoringFunction(wordInput));
     } else if(scoringOption === 1){
      console.log("algorithm name: ", scoringAlgorithms[1].Name);
      console.log("scoreFunction result: ", scoringAlgorithms[1].scoringFunction(wordInput));
  } else if(scoringOption ===2){
      console.log("algorithm name: ", scoringAlgorithms[2].Name);
      console.log("scoreFunction result: ", scoringAlgorithms[2].scoringFunction(wordInput));
      }
  return scoringOption;
};  

function transform(oldPointStructure) {
  let points;
  let newPointStructure = {};  
  let letter; 
  let newStructure = [];
  for(points in oldPointStructure){
   
    for(i=0; i < oldPointStructure[points].length; i++){
      newStructure = oldPointStructure[points][i].toLowerCase();
      points = Number(points);
      newPointStructure[newStructure] = points;  
     }   
  }
  return newPointStructure; 
};

let newPointStructure =transform(oldPointStructure);

scoringAlgorithms[2]['scoringFunction'] = scrabbleScore;
//console.log(scoringAlgorithms);

function runProgram(){
  initialPrompt("Let's play some scrabble! Enter a word:");
  scorerPrompt();
  newPointStructure; 
  };

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScore: simpleScore,
   vowelBonusScore: vowelBonusScore,
   scrabbleScore: scrabbleScore,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};

