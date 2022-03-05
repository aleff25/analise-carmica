import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArcanosComponent } from './arcanos.component';

const routes: Routes = [
  {
    path: '',
    component: ArcanosComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArcanosRoutingModule {}
