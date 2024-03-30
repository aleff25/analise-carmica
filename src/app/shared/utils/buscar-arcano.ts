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

export function transformarEmArcano(valor: number) {
  const valorStr = valor.toString();
  valor = Number(valorStr.charAt(0)) + Number(valorStr.charAt(1));
  return valor;
}

export function buscarNumerolgiaParteNome(nome: string): number {

  let valor = 0;
  // eslint-disable-next-line @typescript-eslint/prefer-for-of
  for (let index = 0; index < nome.length; index++) {
    valor += buscarNumerologia(nome[index]);
  }
  return valor;
}

export function buscarNumerolgiaNome(nome: string): number[] {

  let valor = 0;
  const nomes = nome.toLowerCase().split(' ');
  nomes.forEach(n => valor += buscarNumerolgiaParteNome(n));

  if (valor > 22) {

    if (valor < 100) {
      valor = transformarEmArcano(valor);
    } else {
      const valorStr = valor.toString();
      valor = Number(valorStr.charAt(0)) + Number(valorStr.charAt(1)) + Number(valorStr.charAt(2));

      if (valor > 22) {
        valor = transformarEmArcano(valor);
      }
    }
  }

  let valorInverso = 0;

  if (valor > 9 ) {
    valorInverso = transformarEmArcano(valor);
  }

  return [valor, valorInverso];
}

export function buscarNumerologiaDataNascimento(dataNascimento: string): number[] {
  const [dia, mes, ano] = dataNascimento.split('/');

  const numDia = Number(dia.charAt(0)) + Number(dia.charAt(1));
  const numMes = Number(mes.charAt(0)) + Number(mes.charAt(1));
  let numAno = Number(ano.charAt(0)) + Number(ano.charAt(1)) + Number(ano.charAt(2)) + Number(ano.charAt(3));

  if (numAno > 22) {
    numAno = transformarEmArcano(numAno);
  }

  return [numDia, numMes, numAno];
}

export function buscarArcanos(dataNascimento: string) {
  const [dia, mes, ano] = buscarNumerologiaDataNascimento(dataNascimento);

  let tridimensional = dia + mes + ano;
  if (tridimensional > 22) {
    tridimensional = transformarEmArcano(tridimensional);
  }

  let transpessoal = ano + tridimensional;
  if (transpessoal > 22) {
    transpessoal = transformarEmArcano(tridimensional);;
  }

  return {
    mental: ano,
    emocional: dia,
    racional: mes,
    espiritual: dia + mes,
    tridimensional,
    transpessoal
  };
}

type PosicaoArcano = {
  value: number,
  position: string
}

export function calcularArcanosEPosicoes(arcanos: any): PosicaoArcano[] {
  return [
    {
      value: arcanos.mental,
      position: 'TEXTEXT1'
    },
    {
      value: arcanos.mental + arcanos.emocional,
      position: 'TEXTEXT12'
    },
    {
      value: arcanos.mental + arcanos.espiritual,
      position: 'TEXTEXT2'
    },
    {
      value: arcanos.mental + arcanos.racional,
      position: 'TEXTEXT8'
    },
    {
      value: arcanos.emocional,
      position: 'TEXTEXT17'
    },
    {
      value: arcanos.emocional + arcanos.espiritual,
      position: 'TEXTEXT13'
    },
    {
      value: arcanos.espiritual,
      position: 'TEXTEXT3'
    },
    {
      value: arcanos.racional + arcanos.espiritual,
      position: 'TEXTEXT9'
    },
    {
      value: arcanos.racional,
      position: 'TEXTEXT16'
    },
    {
      value: arcanos.emocional + arcanos.tridimensional,
      position: 'TEXTEXT14'
    },
    {
      value: arcanos.tridimensional + arcanos.espiritual,
      position: 'TEXTEXT4'
    },
    {
      value: arcanos.tridimensional + arcanos.racional,
      position: 'TEXTEXT10'
    },
    {
      value: arcanos.tridimensional,
      position: 'TEXTEXT5'
    },
    {
      value: arcanos.transpessoal + arcanos.emocional,
      position: 'TEXTEXT15'
    },
    {
      value: arcanos.transpessoal + arcanos.tridimensional,
      position: 'TEXTEXT6'
    },
    {
      value: arcanos.transpessoal + arcanos.racional,
      position: 'TEXTEXT11'
    },
    {
      value: arcanos.transpessoal,
      position: 'TEXTEXT7'
    }
  ]
}