import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { IonRouterOutlet } from '@ionic/angular';
import { ModalController } from '@ionic/angular';

import { ArcanosModalComponent } from './arcanos-modal';

import { json } from '../../../db.js';
import { buscarArcanos, buscarNumerolgiaNome, buscarNumerologiaDataNascimento } from '../shared/utils/buscar-arcano';
import { buscarCicloCosmico } from '../shared/utils/buscar-ciclo-cosimico';
import { parse } from 'date-fns';
import { Subscription } from 'rxjs';
import { ArcanoService } from './arcano.service';

type Arcanos = {
  mental: number;
  emocional: number;
  racional: number;
  espiritual: number;
  tridimensional: number;
  transpessoal: number;
};

type CicloCosmico = {
  idade: number;
  cicloSazonal: number;
  cicloCosmico: number;
  qtdCiclos: number;
  cicloAtual: number;
  estacaoAtual: string;
  dataInicialEstacao: Date;
  dataFinalEstacao: Date;
  proximaEstacao: string;
  dataInicioProximaEstacao: Date;
};

@Component({
  selector: 'app-arcanos',
  templateUrl: './arcanos.component.html',
  styleUrls: ['./arcanos.component.scss'],
})
export class ArcanosComponent implements OnInit {

  subscription: Subscription;

  public data = json;
  public arcanos: Arcanos;
  public cicloCosmico: CicloCosmico;

  public nome = '';
  public dataNascimento = '';
  public analiseCarmica: number[] = [];

  constructor(private router: Router,
    private modalController: ModalController,
    private arcanoService: ArcanoService,
    public routerOutlet: IonRouterOutlet) {}

  ngOnInit() {
    const {nomeCompleto, dataNascimento} = this.arcanoService.data;

    this.buscar(nomeCompleto, dataNascimento);
    this.subscription = this.arcanoService
      .getAsObservable()
      .subscribe((data) => this.buscar(data.nomeCompleto, data.dataNascimento));
  }

  async presentModal(arcano) {
    const modal = await this.modalController.create({
      component: ArcanosModalComponent,
      componentProps: {
        title: this.data[arcano].title,
        text: this.data[arcano].text,
      }
    });
    return await modal.present();
  }

  private buscar(nomeCompleto: any, dataNascimento: any) {
    this.nome = nomeCompleto;
    this.analiseCarmica = buscarNumerolgiaNome(this.nome);
    this.dataNascimento = dataNascimento;
    this.arcanos = buscarArcanos(dataNascimento);
    const data = parse(dataNascimento, 'dd/MM/yyyy', new Date());
    const [numDia, numMes, numAno] = buscarNumerologiaDataNascimento(dataNascimento);

    let numDataNascimento = numDia + numMes + numAno;
    if (numDataNascimento > 9) {
      const totalStr = numDataNascimento.toString();
      numDataNascimento = Number(totalStr.charAt(0)) + Number(totalStr.charAt(1));
    }

    this.cicloCosmico = buscarCicloCosmico(data, numDataNascimento);
  }


}
