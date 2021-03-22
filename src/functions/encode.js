export const encodePassword = (password) => {
    const alphabets = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

    let encodedString = '';

    for (let char of password) {
        if (alphabets.includes(char.toLowerCase())){
            let length = alphabets.length;
            let charIndex = alphabets.indexOf(char.toLowerCase());
            if (char === char.toUpperCase()){
                encodedString += alphabets[ (length - charIndex) - 1].toUpperCase();
            } else {
                encodedString += alphabets[ (length - charIndex) - 1];
            }
        } else {
            encodedString += char;
        }
    }

    return encodedString;
}

console.log(encodePassword('Errors in strategy cannot be correct through tactical manoeuvres'));