function validateSudokuboard(sudoboardString) {
    // denne variablen gjør at man ikke kan bruke noe annet enn 1,2,3,4 og [mellomrom].
    const validChars = /^[1-4 ]+$/;
    const board = stringToArrayWithSpaces(sudoboardString)
    // Remove spaces from the input and convert it to a 2D array
    // const board = sudoboardString.replace(/ /g, '').split('').map(Number);


    // kommer til å gi feilmelding uansett så lenge det ikke er 16 (utfylt).
    if (sudoboardString.length !== 16) {
        return 'ugyldig brett, feil lengde';
    }

    // bruker const validChars for å sørge for at eneste input som fungerer bare er 1,2,3,4 og [mellomrom]
    else if (!validChars.test(sudoboardString)) {
        return 'ugyldig brett, ugyldig tegn';
    }

    else if (partiallyFilled(board) && hasDuplicatesInRows(board)) {
        return 'delvis utfylt, feil i rad';
    }
    
    else if (partiallyFilled(board) && hasDuplicatesInRows(getColumns(board))) {
        return 'delvis utfylt, feil i kolonne';
    }
    
    else if (partiallyFilled(board) && hasDuplicatesInRows(getSquares(board))) {
        return 'delvis utfylt, feil i firkant';
    }

    else if (partiallyFilled(board)) {
        return 'delvis utfylt, ingen feil';
    }

    else if (fullyFilled(board) && hasDuplicatesInRows(board)) {
        return 'helt utfylt, feil i rad';
    }
    
    else if (fullyFilled(board) && hasDuplicatesInRows(getColumns(board))) {
        return 'helt utfylt, feil i kolonne';
    }
    
    else if (fullyFilled(board) && hasDuplicatesInRows(getSquares(board))) {
        return 'helt utfylt, feil i firkant';
    }

    else if (fullyFilled(board)) {
        return 'helt utfylt, ingen feil';
    }


    // else if (partiallyFilled(board)) {
    //     if (hasDuplicates(board)) {
    //         return 'delvis utfylt, feil i rad';
    //     } else if (hasDuplicates(getColumns(board))) {
    //         return 'delvis utfylt, feil i kolonne';
    //     } else if (hasDuplicates(getSquares(board))) {
    //         return 'delvis utfylt, feil i firkant';
    //     } else {return 'delvis utfylt, ingen feil';}
    // }

    // else if (fullyFilled(board)) {
    //     if (hasDuplicates(board)) {
    //         return 'helt utfylt, feil i rad';
    //     } else if (hasDuplicates(getColumns(board))) {
    //         return 'helt utfylt, feil i kolonne';
    //     } else if (hasDuplicates(getSquares(board))) {
    //         return 'helt utfylt, feil i firkant';
    //     } else {return 'helt utfylt, ingen feil';}
    // }
    
    // else if (sudoboardString == '12  34          ') {
    //     return 'delvis utfylt, ingen feil';
    // }

    //
    // else if (sudoboardString == '121 34          ') {
    //     return 'delvis utfylt, feil i rad';
    // }

    // //
    // else if (sudoboardString == '12  34  1       ') {
    //     return 'delvis utfylt, feil i kolonne';
    // }

    // //
    // else if (sudoboardString == '12  34    2    2') {
    //     return 'delvis utfylt, feil i firkant';
    // }

    //
    // else if (sudoboardString == '1234341221434321') {
    //     return 'helt utfylt, ingen feil';
    // }

    // //
    // else if (sudoboardString == '1434321221434321') {
    //     return 'helt utfylt, feil i rad';
    // }

    // //
    // else if (sudoboardString == '1432341221434321') {
    //     return 'helt utfylt, feil i kolonne';
    // }
}

function stringToArrayWithSpaces(inputString) {
    // Split into characters
    const charArray = inputString.split('');

    // Map characters to integers, keeping spaces as they are
    const numericArray = charArray.map(char => (char.trim() === '' ? char : parseInt(char)));

    // Return the resulting array
    return numericArray;
}

// function stringToCharArray(sudoboardString) {
//     return sudoboardString.replace(/ /g, '').split('').map(Number);
// }

// function stringToCharArray(inputString) {
//     // Use split to get an array of characters
//     var resultArray = inputString.split('');
  
//     // Use map to convert each character to a number if it's a digit
//     resultArray = resultArray.map(function (char) {
//       return isNaN(char) ? char : Number(char);
//     });
  
//     // Return the resulting array
//     return resultArray;
//   }

/* tar inn en liste (board) som representerer et sudokubrett 
(board) er skrevet som en lang liste: 1d (bare èn dimenson)
"getColumns" lager en liste med lister: [[kolonne 0][kolonne 1][kolonne 2][kolonne 3]] 
Den returnerer dette som en 1d liste. */
function getColumns(board) {
    // variabel for tom liste
    const columns = [];
    
    // går i gjennom kolonne(col) 0,1,2,3 
    // col representerer kolonne indexen, kunne bli navngitt hva som helst for eks. (i)
    for (let col = 0; col < 4; col++) {
        // "push" legger til et element i slutten av listen
        // "push([])" legger til en tom liste i slutten av listen
        columns.push([]);
        // går i gjennom rad(row) 0,1,2,3
        // row representerer rad indexen, kunne bli navngitt hva som helst for eks. (j)
        for (let row = 0; row < 4; row++) {
            /* legger til sudoku brettets verdi til slutten av listen inni listen.
            ganger rad indexen med 4 fordi det er 4 posisjoner i hver rad
            plusser så på kolonne indexen med 1 fordi man må flytte 1 posisjon for komme til nest kolonne */
            columns[col].push(board[row * 4 + col]);
        }
    }
    // Returnerer de genererte kolonnene tilbake som en 1d liste
    return columns.flat();
}

/* Tar inn en liste (board) som representerer et sudokubrett. 
(board) er skrevet som en lang liste: 1d (bare èn dimenson)
"getSquare" lager en liste som representerer en enkelt firkant på 2x2 
startRow og startCol gir start posisjonen for firkanten. */
function getSquare(board, startRow, startCol) {
    // variabel for tom liste
    const square = [];
    
    // Itererer gjennom radene i firkanten (2 rader).
    // Hvis startRow = 0, får vi row = 0 og row = 1. Pga. max tallet er satt til < 2.
    for (let row = startRow; row < startRow + 2; row++) {
        // Itererer gjennom kolonnene i firkanten (2 kolonner).
        // hvis startCol = 0, får vi col = 0 og col = 1. Pga. max tallet er satt til < 2.
        for (let col = startCol; col < startCol + 2; col++) {
            /* legger til sudoku brettets verdi til slutten av listen inni listen.
            Ganger rad indexen med 4 fordi det er 4 posisjoner i hver rad
            Legger så til kolonne indexen med 1 fordi man må flytte 1 posisjon for komme til neste kolonne */
            // Legger til verdiene i posisjon 0,1,4,5 som tilsvarer: (row0 col0 = 0), (r0 c1 = 1), (r1 c0 = 4), (r1 c1 = 5).
            square.push(board[row * 4 + col]);
        }
    }
    // returnerer den genererte firkanten.
    return square;
}

// Hjelpefunksjon for å ta ut 2x2 firkanter ifra 1d listen som representerer sukodubrettet.
function getSquares(board) {
    // variabel for tom liste
    const squares = [];

    // Finner start radposisjonen til firkantene
    for (let startRow = 0; startRow < 4; startRow += 2) {
        // Finner start kolonneposisjonen til firkantene
        for (let startCol = 0; startCol < 4; startCol += 2) {
            /* Bruker getSquare funksjonen
             Inputten til funksjonen er sudokubrettet og start rad- og kolonneposisjonen fra linjene over. 
             Firkanten som getSquare returnerer, legges til i listen "squares" */
            squares.push(getSquare(board, startRow, startCol));
        }
    }
    // returnerer alle 4 firkanter som 1d.
    return squares.flat();
}


function hasDuplicatesInRows(board) {
    for (let row = 0; row < 4; row++) {
        const seen = {};
        const rowValues = board.slice(row * 4, (row + 1) * 4);

        for (const num of rowValues) {
            if (num !== ' ' && seen[num]) {
                return true;
            }
            seen[num] = true;
        }
    }
    return false;
}

// function hasDuplicates(board) {
//     // Helper function to check for duplicates in an array
//     function hasDuplicatesInArray(array) {
//         const seen = {};
//         for (const num of array) {
//             if (num !== ' ' && seen[num]) {
//                 return true;
//             }
//             seen[num] = true;
//         }
//         return false;
//     }

//     // Check for duplicates in each row
//     for (let i = 0; i < board.length; i += 4) {
//         const row = board.slice(i, i + 4).filter(num => num !== ' ');
//         if (hasDuplicatesInArray(row)) {
//             return true;
//         }
//     }

//     return false;
// }

// // Helper function to check for duplicate numbers in an array
// function hasDuplicates(arr) {
//     // variabel for et tomt objekt
//     const seen = {};

//     // går igjennom hvert element i lista (posisjon: 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15)
//     for (const num of arr) {
//         // Sjekker om det er et tall og sjekker om dette tallet har blitt sett allerede.
//         if (num !== ' ' && seen[num]) {
//             // Hvis begge betingelsene i linjen over er sant så returnerer den sant = "true" (da er det 2 av samme tall)
//             return true;
//         }
//         // Returnerer sant = "true" dersom tallet er sett
//         seen[num] = true;
//     }
//     // Hvis ikke det som står over, er det ikke duplikat av tallet og kan bli brukt.
//     return false;
// }

function partiallyFilled(board) {
    const numberOfNumbers = board.filter(element => typeof element === 'number' && !isNaN(element)).length;
    return numberOfNumbers !== 16;
}

function fullyFilled(board) {
    const numberOfNumbers = board.filter(element => typeof element === 'number' && !isNaN(element)).length;
    return numberOfNumbers === 16;
}


// function getRows(board) {
//     //
//     const rows = [];

//     for (let row = 0; row < 4; row++) {
//         rows.push([])

//         for (let col = 0; col < 4; col++) {
//             rows[row].push(board[row * 4 + col]);
//         }
//     }
//     return rows.flat();
// }


/*

function validateSudokuboard(sudokuboard) {
    // Remove spaces from the input and convert it to a 2D array
    const board = sudokuboard.replace(/ /g, '').split('').map(Number);
    
    // Check for duplicate numbers in rows, columns, and 3x3 squares
    if (hasDuplicates(board) || hasDuplicates(getColumns(board)) || hasDuplicates(getSquares(board))) {
        return 'feil i sudoku';
    }
    
    return 'delvis utfylt, ingen feil';
}


*/



// function hasDuplicates(array) {
//     return new Set(array).size !== array.length;
// }

/*  Qunit test 1 - 9 gamle
 1: if (sudoboardString = '12  34')
 2: else if (sudoboardString == '12  34     z    ') {
    return 'ugyldig brett, ugyldig tegn'
 }
*/