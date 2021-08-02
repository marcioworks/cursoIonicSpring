import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { CityService } from "../../service/domain/city.service";
import { StateService } from "../../service/domain/state.service";
import { SignupPage } from "./signup";

@NgModule({
  declarations: [SignupPage],
  imports: [IonicPageModule.forChild(SignupPage)],
  providers: [CityService, StateService],
})
export class SignupPageModule {}
