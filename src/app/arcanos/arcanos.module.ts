import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArcanosComponent } from './arcanos.component';
import { FormsModule } from '@angular/forms';
import { ArcanosRoutingModule } from './arcanos-routing.module';
import { IonicModule } from '@ionic/angular';
import { ArcanosModalComponent } from './arcanos-modal';


@NgModule({
  declarations: [
    ArcanosComponent,
    ArcanosModalComponent
  ],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ArcanosRoutingModule
  ],
})
export class ArcanosModule { }
