import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonDatetime } from '@ionic/angular';
import { format, parseISO } from 'date-fns';
import { ArcanoService } from '../arcanos/arcano.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  @ViewChild(IonDatetime, { static: true }) datetime: IonDatetime;

  nomeCompleto = '';
  dataNascimento: string;

  constructor(private router: Router,
    private arcanoService: ArcanoService) {}

  formatarData(value: string) {
    return format(parseISO(value), 'dd/MM/yyyy');
  }

  buscar() {
    this.arcanoService.atualizar({
      nomeCompleto: this.nomeCompleto,
      dataNascimento: this.formatarData(this.dataNascimento)
    });
    this.router.navigate(['/tabs/arcanos']);
  }

}
