import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";

import { MyApp } from "./app.component";

import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { CategoryService } from "../service/domain/category.service";
import { ErrorInterceptorProvider } from "../interceptors/error-interceptor";
import { AuthService } from "../service/auth.service";
import { StorageService } from "../service/storage.service";
import { ClientService } from "../service/domain/client.service";
import { AuthInterceptorProvider } from "../interceptors/auth-intereceptor";
import { ProductService } from "../service/domain/product.service";
import { CartService } from "../service/domain/cart.service";

@NgModule({
  declarations: [MyApp],
  imports: [BrowserModule, HttpClientModule, IonicModule.forRoot(MyApp)],
  bootstrap: [IonicApp],
  entryComponents: [MyApp],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    CategoryService,
    AuthInterceptorProvider,
    ErrorInterceptorProvider,
    AuthService,
    StorageService,
    ClientService,
    ProductService,
    CartService,
  ],
})
export class AppModule {}
