import { Component, ViewChild, OnInit, ElementRef, AfterViewChecked } from '@angular/core';
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
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

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

  @ViewChild('bodyArcanos') bodyArcanos: ElementRef;

  subscription: Subscription;

  public data = json;
  public arcanos: Arcanos;
  public cicloCosmico: CicloCosmico;

  svgContent: SafeHtml;

  public nome = '';
  public dataNascimento = '';
  public analiseCarmica: number[] = [];

  constructor(private modalController: ModalController,
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

  }

  async presentModal(arcano: number) {

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

    this.svgContent = this.sanitizer.bypassSecurityTrustHtml(svgString);
    // const encodedSvg = encodeURIComponent(svgString);
    // this.bodyArcanos.nativeElement.style.background = `url('data:image/svg+xml;utf8,${encodedSvg}') no-repeat center/cover`;
  }

  private buscar(nomeCompleto: string, dataNascimento: any) {
    // this.nome = nomeCompleto?.trim();
    this.analiseCarmica = buscarNumerolgiaNome(this.nome);
    // this.dataNascimento = dataNascimento;
    this.arcanos = buscarArcanos(this.dataNascimento);
    const data = parse(this.dataNascimento, 'dd/MM/yyyy', new Date());
    const [numDia, numMes, numAno] = buscarNumerologiaDataNascimento(this.dataNascimento);

    let numDataNascimento = numDia + numMes + numAno;
    numDataNascimento = encontrarCicloSazonal(numDataNascimento);

    this.cicloCosmico = buscarCicloCosmico(data, numDataNascimento);
  }

  onSvgClick(event: MouseEvent) {
    const target = event.target as SVGElement; // Cast para SVGElement para acessar propriedades do SVG
    console.log('Clicado:', target.id);

    // Aqui você pode implementar sua lógica baseada no ID ou outra propriedade do elemento clicado
    if (this.arcanos[target.id] !== undefined) {
      this.presentModal(this.arcanos[target.id]);
    }
  }
}
