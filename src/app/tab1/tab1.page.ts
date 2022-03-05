import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { format, parseISO } from 'date-fns';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  nomeCompleto = '';
  dataNascimento: string;

  constructor(private router: Router) {}

  formatarData(value: string) {
    return format(parseISO(value), 'dd/MM/yyyy');
  }

  buscar() {
    this.router.navigate(['/tabs/arcanos'], {
      state: {
        nomeCompleto: this.nomeCompleto,
        dataNascimento: this.dataNascimento
      }
    });
  }

}
