import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-arcanos-modal',
  templateUrl: './arcanos-modal.html'
})
export class ArcanosModalComponent implements OnInit {

  @Input() title: string;
  @Input() text: string;

  constructor(
    private modalController: ModalController,
  ) { }

  ngOnInit(): void {}


  dismissModal() {
    this.modalController.dismiss({
      dismissed: true
    });
  }

}
