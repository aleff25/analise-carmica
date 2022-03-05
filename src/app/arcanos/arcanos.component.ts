import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-arcanos',
  templateUrl: './arcanos.component.html',
  styleUrls: ['./arcanos.component.scss'],
})
export class ArcanosComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    // const { nomeCompleto, dataNascimento } = this.router.getCurrentNavigation().extras.state;
    // console.log(nomeCompleto, dataNascimento);
  }

}
