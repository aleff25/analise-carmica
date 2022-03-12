import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArcanoService {

  data: any = {};
  atualizarView = new Subject<any>();

  public getAsObservable() {
    return this.atualizarView.asObservable();
  }

  public atualizar(data: any = null): void {
    this.data = data;
    this.atualizarView.next(data);
  }

}
