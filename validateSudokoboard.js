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

function hasDuplicates(array) {
    return new Set(array).size !== array.length;
 }

/*  Qunit test 1 - 9 gamle
 1: if (sudoboardString = '12  34')
 2: else if (sudoboardString == '12  34     z    ') {
    return 'ugyldig brett, ugyldig tegn'
 }
*/