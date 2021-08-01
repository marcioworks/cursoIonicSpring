import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { validateLocaleAndSetLanguage } from "typescript";

@IonicPage()
@Component({
  selector: "page-signup",
  templateUrl: "signup.html",
})
export class SignupPage {
  formGroup: FormGroup;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder
  ) {
    this.formGroup = formBuilder.group({
      name: [
        "Joaquim",
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(120),
        ],
      ],
      email: ["joaquim@gmail.com", [Validators.required, Validators.email]],
      type: ["1", [Validators.required]],
      cpfOrCnpj: [
        "02314465350",
        [
          Validators.required,
          Validators.minLength(11),
          Validators.maxLength(14),
        ],
      ],
      password: ["123", [Validators.required]],
      street: ["rua 04", [Validators.required]],
      number: ["350", [Validators.required]],
      complement: ["ap 203", []],
      neighborhood: ["pedras", []],
      zipcode: ["60878050", [Validators.required]],
      phone1: ["085997061756", [Validators.required]],
      phone2: ["", []],
      phone3: ["", []],
      stateId: [null, [Validators.required]],
      cityId: [null, [Validators.required]],
    });
  }

  signupUser() {
    console.log("enviado");
  }
}
