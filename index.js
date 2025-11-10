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
const entities = [
  {
    char: "ä",
    entity: "&auml;",
  },
  {
    char: "ö",
    entity: "&ouml;",
  },
  {
    char: "ü",
    entity: "&uuml;",
  },
];
// Um wieviel verschieben, kann positiv bzw. negativ sein, z.B. 1 bzw. -1
let counter;
// Zeichenkette zum Verschlüsseln, kann String mit oder ohne Leerzeichen sein, z.B. hallo bzw. 'ich sage hallo'
let wordToEncrypt = argv[0];
// Das zweite Argument überprüfen, kann nur ein Integer (positiv bzw. negativ) sein, sonst wird Fehler geworfen
if (
  argv[1] &&
  (Math.sign(parseInt(argv[1])) === 1 || Math.sign(parseInt(argv[1])) === -1)
) {
  counter = parseInt(argv[1]);
} else {
  console.log("The second argument must be an integer.");
  process.exit("1");
}
let charFound;
let wordToEncryptArray = [];
let spetialCharFound = false;
// Aus Zeichenkette ein Array generieren
for (let i = 0; i < wordToEncrypt.length; i++) {
  if (wordToEncrypt[i] === "&") {
    // Wenn Anfang vom Entity für Umlaute gefunden
    charFound = "";
    spetialCharFound = true;
  } else if (wordToEncrypt[i] === ";") {
    // Wenn Ende vom Entity für Umlaute gefunden
    spetialCharFound = false;
  }
  if (spetialCharFound) {
    // Entity zusammen setzen
    charFound += wordToEncrypt[i];
    continue;
  } else {
    // Zeichen für Array vorbereiten
    if (wordToEncrypt[i] !== ";") {
      // Normales Zeichen
      charFound = wordToEncrypt[i];
    } else {
      // Ende vom Entity
      charFound += wordToEncrypt[i];
    }
  }
  // Zeichen im Array speichern
  wordToEncryptArray.push(charFound);
}
// Hilfefunktion, die die Position eines Zeichen im Array überpürft, z.B. für 'a' kommt 0
function getPositionInAlphabet(letter) {
  return alphabet.indexOf(letter);
}
// Neues Zeichen für die Verschlüsselung wird ermittelt
// char - altes Zeichen
// counter Anzahl für Verschiebung, kann positiv bzw. negativ sein
function getNeuChar(char, counter) {
  let charToReturn;
  // Wenn das Zeichen im Alphabet [a-z] ist, wird das neue Zeichen ermittelt
  if (alphabet.includes(char)) {
    let newPositon;
    let currentPosition = getPositionInAlphabet(char);
    // Bei der positiven Verschiebung wird nach rechts verschoben
    if (counter > 0) {
      // 'z' hat Potiontion 25
      // wenn counter = 1
      // newPositon von 'z' sollte 'a' ergeben:
      // 1 - 1 (25 - 25) = 0
      if (currentPosition + counter > 25) {
        newPositon = counter - 1 - (25 - currentPosition);
      } else {
        // Sonst nach rechts um counter-Anzahl verschieben
        newPositon = currentPosition + counter;
      }
      // Bei der negativen Verschiebung wird nach links verschoben
    } else {
      // 'z' hat Potiontion 25
      // wenn counter = -1
      // newPositon von 'z' sollte 'y' ergeben:
      // 25 + (-1) = 24
      // Ergebnis sollte nicht negativ sein, da Alphaber-Array mit 0-Index anfängt
      if (currentPosition + counter >= 0 && currentPosition + counter < 25) {
        newPositon = currentPosition + counter;
      } else {
        // Sonst nach links um counter-Anzahl verschieben
        newPositon = 25 + (currentPosition + counter) + 1;
      }
    }
    charToReturn = alphabet[newPositon];
  } else {
    //Ansonsten wird es überprüft, ob das Zeichen ein Umlaut [ä,ö,ü] bzw. ein Entity [&auml;,&ouml;,&uuml;] ist
    const entityFound1 = entities.find((entity) => entity.char === char);
    const entityFound2 = entities.find((entity) => entity.entity === char);
    // Wenn das Zeichen ein Umlaut [ä,ö,ü] bzw. ein Entity [&auml;,&ouml;,&uuml;] is
    if (entityFound1 || entityFound2) {
      if (counter < 0) {
        // Wenn die Verschlüsselung positiv ist, Umlaut wird zum Entity
        charToReturn = entityFound2.char;
      } else {
        // Wenn die Verschlüsselung negativ ist, Entity wird zum Umlaut
        charToReturn = entityFound1.entity;
      }
    } else {
      // Andere Zeichen wie Zahlen bzw. andere Sonderzeichen werden nicht verschlüsselt
      charToReturn = char;
    }
  }
  return charToReturn;
}
const wordToEncryptArrayNew = wordToEncryptArray.map((char) =>
  getNeuChar(char, counter)
);
console.log(`The encrypted phrase: ${wordToEncryptArrayNew.join("")}`);
