import { Component, ViewChild, OnInit, ElementRef, AfterViewChecked } from '@angular/core';
import { Router } from '@angular/router';
import { IonRouterOutlet } from '@ionic/angular';
import { ModalController } from '@ionic/angular';

import { ArcanosModalComponent } from './arcanos-modal';

import { json } from '../../../db.js';
import { buscarArcanos, buscarNumerolgiaNome, buscarNumerologiaDataNascimento, calcularArcanosEPosicoes } from '../shared/utils/buscar-arcano';
import { buscarCicloCosmico, encontrarCicloSazonal } from '../shared/utils/buscar-ciclo-cosimico';
import { parse } from 'date-fns';
import { Subscription } from 'rxjs';
import { ArcanoService } from './arcano.service';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';

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
export class ArcanosComponent implements OnInit, AfterViewChecked {

  @ViewChild('bodyArcanos') bodyArcanos: ElementRef;

  subscription: Subscription;

  public data = json;
  public arcanos: Arcanos;
  public cicloCosmico: CicloCosmico;

  public nome = 'Aleff Rodrigues';
  public dataNascimento = '25/11/1994';
  public analiseCarmica: number[] = [];

  constructor(private router: Router,
    private modalController: ModalController,
    private arcanoService: ArcanoService,
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    public routerOutlet: IonRouterOutlet) {}
  

  ngOnInit() {
    const {nomeCompleto, dataNascimento} = this.arcanoService.data;

    this.buscar(nomeCompleto?.trim(), dataNascimento);
    this.subscription = this.arcanoService
      .getAsObservable()
      .subscribe((data) => this.buscar(data.nomeCompleto, data.dataNascimento));
    this.carregarSVG();
    // this.popularArcanos();

  }

  ngAfterViewChecked(): void {
    //
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

  carregarSVG() {
    const caminhoSVG = 'assets/body.svg'; // Caminho para o seu arquivo SVG dentro da pasta assets
    this.http.get(caminhoSVG, { responseType: 'text' }).subscribe(svgData => {
      this.mudarImagemDeFundo(svgData);
    });
  }

  mudarImagemDeFundo(svgString: string) {

    calcularArcanosEPosicoes(this.arcanos)
      .forEach(({value, position}) => {
        svgString = svgString.replace(new RegExp("\\b"+position+"\\b"), value.toString());
      });

    // Codificar o SVG para Base64
    //const encodedSvg = btoa(svgString);
    const encodedSvg = encodeURIComponent(svgString);
    this.bodyArcanos.nativeElement.style.background = `url('data:image/svg+xml;utf8,${encodedSvg}') no-repeat center/cover`;
  }

  private buscar(nomeCompleto: string, dataNascimento: any) {
    //this.nome = nomeCompleto?.trim();
    this.analiseCarmica = buscarNumerolgiaNome(this.nome);
    //this.dataNascimento = dataNascimento;
    this.arcanos = buscarArcanos(this.dataNascimento);
    const data = parse(this.dataNascimento, 'dd/MM/yyyy', new Date());
    const [numDia, numMes, numAno] = buscarNumerologiaDataNascimento(this.dataNascimento);

    let numDataNascimento = numDia + numMes + numAno;
    numDataNascimento = encontrarCicloSazonal(numDataNascimento);

    this.cicloCosmico = buscarCicloCosmico(data, numDataNascimento);
  }
}
