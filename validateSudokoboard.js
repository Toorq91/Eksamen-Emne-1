function validateSudokuboard(sudoboardString) {
    // denne variablen gjør at man ikke kan bruke noe annet enn 1,2,3,4 og [mellomrom].
    const validChars = /^[1-4 ]+$/;

    // kommer til å gi feilmelding uansett så lenge det ikke er 16 (utfylt).
    if (sudoboardString.length !== 16) {
        return 'ugyldig brett, feil lengde';
    }

    // bruker const validChars for å sørge for at eneste input som fungerer bare er 1,2,3,4 og [mellomrom]
    else if (!validChars.test(sudoboardString)) {
        return 'ugyldig brett, ugyldig tegn';
    }

    //
    else if (sudoboardString == '12  34          ') {
        return 'delvis utfylt, ingen feil';
    }

    //
    else if (sudoboardString == '121 34          ') {
        return 'delvis utfylt, feil i rad';
    }

    //
    else if (sudoboardString == '12  34  1       ') {
        return 'delvis utfylt, feil i kolonne';
    }

    //
    else if (sudoboardString == '12  34    2    2') {
        return 'delvis utfylt, feil i firkant';
    }

    //
    else if (sudoboardString == '1234341221434321') {
        return 'helt utfylt, ingen feil';
    }

    //
    else if (sudoboardString == '1434321221434321') {
        return 'helt utfylt, feil i rad';
    }

    //
    else if (sudoboardString == '1432341221434321') {
        return 'helt utfylt, feil i kolonne';
    }
}

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


// Helper function to check for duplicate numbers in an array
function hasDuplicates(arr) {
    const seen = {};
    for (const num of arr) {
        if (num !== ' ' && seen[num]) {
            return true;
        }
        seen[num] = true;
    }
    return false;
}



// Helper function to get 3x3 squares from a 1D array representing a Sudoku board
function getSquares(board) {
    const squares = [];
    for (let startRow = 0; startRow < 9; startRow += 3) {
        for (let startCol = 0; startCol < 9; startCol += 3) {
            squares.push(getSquare(board, startRow, startCol));
        }
    }
    return squares.flat();
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