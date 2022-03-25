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
  const [estacaoAtual, proximaEstacao, valor] = encontrarEstacao(data, cicloSazonal, 1);

  const valorAtt = valor === 0 ? 1 : valor;

  return [estacaoAtual, proximaEstacao, estacoes.find(e => e.valor === valorAtt)];
}

export function buscarCicloCosmico(dataNascimento: Date, numerologiaData: number) {
  const idade = differenceInYears(new Date(), dataNascimento);
  const cicloSazonal = numerologiaData;
  const qtdCiclos =  Math.floor(idade / (cicloSazonal * 4));
  const cicloAtual = qtdCiclos + 1;

  const [dataEstacaoAtual, dataProximaEstacao, estacao] = buscarEstacao(dataNascimento, cicloSazonal);

  const valorProximaEstacao = estacao.valor + 1;
  const proximaEstacao = valorProximaEstacao > 4 ? estacoes[0] : estacoes.find(e => e.valor === valorProximaEstacao);

  return {
    idade,
    cicloSazonal,
    cicloCosmico: cicloSazonal * 4,
    qtdCiclos,
    cicloAtual,
    estacaoAtual: estacao.nome,
    dataInicialEstacao: dataEstacaoAtual,
    dataFinalEstacao: subDays(dataProximaEstacao, 1),
    proximaEstacao: proximaEstacao.nome,
    dataInicioProximaEstacao: dataProximaEstacao,
  };
}

export function encontrarCicloSazonal(numDataNascimento: number) {

  let ciclo = 0;

  if (numDataNascimento > 9) {
    const totalStr = numDataNascimento.toString();
    ciclo = Number(totalStr.charAt(0)) + Number(totalStr.charAt(1));
  }
  return ciclo <= 9
    ? ciclo
    : encontrarCicloSazonal(ciclo);
}
