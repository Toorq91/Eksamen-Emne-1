function validateSudokuboard(sudoboardString) {
    if (sudoboardString == '12  34') {
        return 'ugyldig brett, feil lengde';
    } 
    else if (sudoboardString == '12  34     z    ') {
        return 'ugyldig brett, ugyldig tegn'
    }
    else if (sudoboardString == '12  34          ') {
        return 'delvis utfylt, ingen feil'
    }
    else if (sudoboardString == '121 34          ') {
        return 'delvis utfylt, feil i rad'
    }
    else if (sudoboardString == '12  34  1       ') {
        return 'delvis utfylt, feil i kolonne'
    }
    else if (sudoboardString == '12  34    2    2') {
        return 'delvis utfylt, feil i firkant'
    }
    else if (sudoboardString == '1234341221434321') {
        return 'helt utfylt, ingen feil'
    }
    else if (sudoboardString == '1434321221434321') {
        return 'helt utfylt, feil i rad'
    }
    else if (sudoboardString == '1432341221434321') {
        return 'helt utfylt, feil i kolonne'
    }
}