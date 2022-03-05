/* eslint-disable prefer-arrow/prefer-arrow-functions */
export function buscarNumerologia(letra: string) {
  switch (letra) {
    case 'a':
    case 'j':
    case 's':
      return 1;
    case 'b':
    case 'k':
    case 't':
      return 2;
    case 'c':
    case 'l':
    case 'u':
      return 3;
    case 'd':
    case 'm':
    case 'v':
      return 4;
    case 'e':
    case 'n':
    case 'w':
      return 5;
    case 'f':
    case 'o':
    case 'x':
      return 6;
    case 'g':
    case 'p':
    case 'y':
      return 7;
    case 'h':
    case 'q':
    case 'z':
      return 8;
    case 'i':
    case 'r':
      return 9;
    default:
      return 1;
  }
}


export function buscarNumerolgiaParteNome(nome: string): number {

  return 1;
}

export function buscarNumerolgiaNome(nome: string): number {

  let valor = 0;
  const nomes = nome.split(' ');
  nomes.forEach(n => valor += buscarNumerolgiaParteNome(n));

  if (valor > 22) {

    if (valor < 100) {
      const valorStr = valor.toString();
      valor = Number(valorStr.charAt(0)) + Number(valorStr.charAt(1));
    } else {
      let valorStr = valor.toString();
      valor = Number(valorStr.charAt(0)) + Number(valorStr.charAt(1)) + Number(valorStr.charAt(2));

      if (valor > 22) {
        valorStr = valor.toString();
        valor = Number(valorStr.charAt(0)) + Number(valorStr.charAt(1));
      }
    }
  }

  return valor;
}
