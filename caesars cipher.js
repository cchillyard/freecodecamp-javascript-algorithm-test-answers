function rot13(str) {
  return str.split('').map((char) => {
    const charCode = char.charCodeAt();

    if (charCode >= 65 && charCode <= 90) {

      if (charCode > 77) {
        return String.fromCharCode(charCode - 13);
      }
      else {
        return String.fromCharCode(charCode + 13);
      }
    }
    else {
      return char;
    }
  }).join('');
}

rot13('SERR PBQR PNZC');
