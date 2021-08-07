import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddressPickPage } from './address-pick';

@NgModule({
  declarations: [
    AddressPickPage,
  ],
  imports: [
    IonicPageModule.forChild(AddressPickPage),
  ],
})
export class AddressPickPageModule {}
