function validateSudokuboard(sudoboardString) {
    // denne variablen gjør at man ikke kan bruke noe annet enn 1,2,3,4 og [mellomrom].
    const validChars = /^[1-4 ]+$/;

    /* Konverterer den innsendte tekststrengen til en liste (array), slik at
    de andre funksjonene kan lese av listen med korrekte verdier og ta hensyn
    til mellomrom som fyller ut de 16 totale plassene på brettet. */
    const board = stringToArrayWithSpaces(sudoboardString)

    // kommer til å gi feilmelding uansett så lenge det ikke er 16 (utfylt).
    if (sudoboardString.length !== 16) {
        return 'ugyldig brett, feil lengde';
    }

    // bruker "const validChars" for å sørge for at eneste input som fungerer bare er 1,2,3,4 og [mellomrom]
    else if (!validChars.test(sudoboardString)) {
        return 'ugyldig brett, ugyldig tegn';
    }

    // Sjekker at det ikke er 2 av samme tall på noen av radene i brettet (board) når det er delvis utfylt.
    else if (partiallyFilled(board) && hasDuplicatesInRows(board)) {
        return 'delvis utfylt, feil i rad';
    }

    // Sjekker at det ikke er 2 av samme tall på noen av kolonnene i brettet (board) når det er delvis utfylt.
    else if (partiallyFilled(board) && hasDuplicatesInRows(getColumns(board))) {
        return 'delvis utfylt, feil i kolonne';
    }

    // Sjekker at det ikke er 2 av samme tall på noen av firkantene i brettet (board) når det er delvis utfylt.
    else if (partiallyFilled(board) && hasDuplicatesInRows(getSquares(board))) {
        return 'delvis utfylt, feil i firkant';
    }

    // Sjekker om det er feil i brettet når det er delvis utfylt, ikke ferdig.
    else if (partiallyFilled(board)) {
        return 'delvis utfylt, ingen feil';
    }

    // Sjekker at det ikke er 2 av samme tall på noen av radene i brettet (board) når det er helt utfylt (16/16 elementer).
    else if (fullyFilled(board) && hasDuplicatesInRows(board)) {
        return 'helt utfylt, feil i rad';
    }

    // Sjekker at det ikke er 2 av samme tall på noen av kolonnene i brettet (board) når det er helt utfylt (16/16 elementer).
    else if (fullyFilled(board) && hasDuplicatesInRows(getColumns(board))) {
        return 'helt utfylt, feil i kolonne';
    }

    // Sjekker at det ikke er 2 av samme tall på noen av firkantene i brettet (board) når det er helt utfylt (16/16 elementer).
    else if (fullyFilled(board) && hasDuplicatesInRows(getSquares(board))) {
        return 'helt utfylt, feil i firkant';
    }

    // Sjekker om det er feil i brettet når det er helt ufylt (spillet er ferdig)
    else if (fullyFilled(board)) {
        return 'helt utfylt, ingen feil';
    }
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

// Funksjon for å konvertere en tekststreng til en liste med elementer, inkludert mellomrom.
function stringToArrayWithSpaces(inputString) {
    // Deler teksten opp i en liste med elementer.
    const charArray = inputString.split('');
    /* Lager et kart over alle bokstavene i listen (arrayet) og konverterer teksttallene 
    til faktiske tallverdier ved hjelp av parseInt.
    Tomme strenger forblir uendret. */
    const numericArray = charArray.map(char => (char.trim() === '' ? char : parseInt(char)));
    // Returnerer den nye listen
    return numericArray;
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

function partiallyFilled(board) {
    const numberOfNumbers = board.filter(element => typeof element === 'number' && !isNaN(element)).length;
    return numberOfNumbers !== 16;
}

function fullyFilled(board) {
    const numberOfNumbers = board.filter(element => typeof element === 'number' && !isNaN(element)).length;
    return numberOfNumbers === 16;
}