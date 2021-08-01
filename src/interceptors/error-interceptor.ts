import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HTTP_INTERCEPTORS,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AlertController } from "ionic-angular";
import { Observable } from "rxjs/Rx";
import { StorageService } from "../service/storage.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    public storage: StorageService,
    public alertCtrl: AlertController
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).catch((error, caugth) => {
      let errorObj = error;

      if (errorObj.error) {
        errorObj = errorObj.error;
      }
      if (!errorObj.status) {
        errorObj = JSON.parse(errorObj);
      }

      console.log("errorObj detectado pelo interceptor");
      console.log(errorObj);

      switch (errorObj.status) {
        case 403:
          this.handle403();
          break;

        case 401:
          this.handle401();
          break;

        default:
          this.handleDefaultError(errorObj);
      }
      return Observable.throw(errorObj);
    }) as any;
  }

  handle403() {
    this.storage.setLocalStorageUser(null);
  }

  handle401() {
    let alert = this.alertCtrl.create({
      title: "Erro 401: falha de autenticação",
      message: "email ou senha incorreto",
      enableBackdropDismiss: false,
      buttons: [
        {
          text: "OK",
        },
      ],
    });
    alert.present();
  }

  handleDefaultError(errorObj: any) {
    let alert = this.alertCtrl.create({
      title: "Erro " + errorObj.status + ": " + errorObj.error,
      message: errorObj.message,
      enableBackdropDismiss: false,
      buttons: [
        {
          text: "OK",
        },
      ],
    });
    alert.present();
  }
}

export const ErrorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true,
};
