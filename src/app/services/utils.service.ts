import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(
    public loadingCtrl: LoadingController,
  ) { }

   /**
   * Permite crear un ShowLoading y luego otorgar el control desde cualquier pantalla
   * el mostrado u ocultado del mismo
   *
   * Entrada:
   * mensaje: String - El mensaje a mostrar en el Loading
   *
   * Salida:
   * La referencia del loading a utilizar.
   */
  async createLoading(message = "Please wait...") {
    const loader = this.loadingCtrl.create({
      message: message
    });
    return loader;
  }

}
