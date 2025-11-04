let argv = process.argv.slice(2);
const alphabet = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];
let counter;
let wordToEncrypt = argv[0];
if (
  argv[1] &&
  (Math.sign(parseInt(argv[1])) === 1 || Math.sign(parseInt(argv[1])) === -1)
) {
  counter = parseInt(argv[1]);
} else {
  console.log("The second argument must be an integer.");
  process.exit("1");
}
let wordLength = wordToEncrypt.length;
let wordToEncryptArray = [];
for (let i = 0; i < wordLength; i++) {
  wordToEncryptArray.push(wordToEncrypt[i]);
}
function getPositionInAlphabet(letter) {
  return alphabet.indexOf(letter);
}
function getNeuChar(char, counter) {
  let charToReturn;
  if (alphabet.includes(char)) {
    let positionNew;
    let position = getPositionInAlphabet(char);
    if (counter > 0) {
      if (position + counter > 25) {
        positionNew = counter - 1 - (25 - position);
      } else {
        positionNew = position + counter;
      }
    } else {
      if (position + counter < 25) {
        positionNew = position + counter;
      } else {
        positionNew = 25 + (position + counter) + 1;
      }
    }
    charToReturn = alphabet[positionNew];
  } else {
    charToReturn = char;
  }
  return charToReturn;
}
const wordToEncryptArrayNew = wordToEncryptArray.map((char) =>
  getNeuChar(char, counter)
);
console.log(`The encrypted phrase: ${wordToEncryptArrayNew.join("")}`);
