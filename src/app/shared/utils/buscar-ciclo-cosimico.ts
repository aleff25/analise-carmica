/* eslint-disable prefer-arrow/prefer-arrow-functions */
import { addYears, differenceInYears, isAfter, subDays } from 'date-fns';

const estacoes = [
  {
    nome: 'Primavera',
    valor: 1
  },
  {
    nome: 'Verão',
    valor: 2
  },
  {
    nome: 'Outono',
    valor: 3
  },
  {
    nome: 'Inverno',
    valor: 4
  },
];

function encontrarEstacao(data, cicloSazonal, contador) {

  const proximaEstacao = addYears(data, cicloSazonal);
  const contadorAtt = contador >= 4 ? 1 : contador + 1;
  return isAfter(proximaEstacao, new Date())
    ? [data, proximaEstacao, contador]
    : encontrarEstacao(proximaEstacao, cicloSazonal, contadorAtt);
}

export function buscarEstacao(data, cicloSazonal) {
  let contador = 1;
  for (let index = 1; index <= cicloSazonal; index++) {
    if(contador < 4) {
      contador++;
    } else {
      contador = 1;
    }
  }

  const [estacaoAtual, proximaEstacao, valor] = encontrarEstacao(data, cicloSazonal, contador);

  return [estacaoAtual, proximaEstacao, estacoes.find(e => e.valor === valor)];
}

export function buscarCicloCosmico(dataNascimento: Date, numerologiaData: number) {

  const idade = differenceInYears(new Date(), dataNascimento);
  const cicloSazonal = numerologiaData;
  const cicloAtual = Math.ceil(idade / ((cicloSazonal * 4) + 1));

  const [dataEstacaoAtual, dataProximaEstacao, estacao] = buscarEstacao(dataNascimento, cicloSazonal);

  const valorProximaEstacao = estacao.valor + 1;
  const proximaEstacao = valorProximaEstacao > 4 ? estacoes[0] : estacoes[valorProximaEstacao];

  return {
    idade,
    cicloSazonal,
    cicloCosmico: cicloSazonal * 4,
    qtdCiclos: Math.floor(idade / (cicloSazonal * 4)),
    cicloAtual,
    estacaoAtual: estacao.nome,
    dataInicialEstacao: dataEstacaoAtual,
    dataFinalEstacao: subDays(dataProximaEstacao, 1),
    proximaEstacao: proximaEstacao.nome,
    dataInicioProximaEstacao: dataProximaEstacao,
  };
}
