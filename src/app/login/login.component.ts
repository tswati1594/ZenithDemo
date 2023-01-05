import { Component } from '@angular/core';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  firstFormGroup = this._formBuilder.group({
    name: ['', [Validators.required]],
    organisation: ['', [Validators.required]],
    phone: ['', [Validators.required, Validators.pattern("[- +()0-9]+")]],
    email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
  });
  secondFormGroup = this._formBuilder.group({
    practices: this._formBuilder.array([]),
  });
  isOptional = false;
  public firstFormData: any = {};
  public secondFormData: any = {};
  public showQuote = false;

  constructor(private _formBuilder: FormBuilder) { }

  getPracticeFormArray = () => {
    return this.secondFormGroup.get("practices") as FormArray;
  }

  getPracticeFormArrayLength = () => {
    const practiceFormArray = this.getPracticeFormArray();
    return practiceFormArray.controls.length;
  }

  addPractices = () => {
    const practiceFormArray = this.getPracticeFormArray();
    practiceFormArray.push(this.newPractice());  
  }

  newPractice = () => {
    return this._formBuilder.group({
      practiceName: ['', [Validators.required]],
    })  
  }

  removePractices = () => {
    const practiceFormArray = this.getPracticeFormArray();
    practiceFormArray.removeAt(this.getPracticeFormArrayLength() - 1);  
  }

  getQuote = () => {
    this.firstFormData = this.firstFormGroup.getRawValue();
    this.secondFormData = this.secondFormGroup.getRawValue();
    this.showQuote = true;
    console.log(this.secondFormData);
  }

}
