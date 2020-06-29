import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { QualificationDetails } from 'src/app/classes/QualificationDetails';
import { MatDialogRef } from '@angular/material/dialog';
import { DataTransferService } from 'src/app/services/data-transfer.service';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent implements OnInit {

  form: FormGroup;
  educationArray: Array<QualificationDetails> = [];
  disableSubmit = true;

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<EducationComponent>, private dataTransferService: DataTransferService) { }

  ngOnInit(): void {
    this.createForm();
  }

  close() {
    this.dialogRef.close();
  }

  createForm() {

    if (this.dataTransferService.educationForm){
      this.form = this.dataTransferService.educationForm;
    }else{
      this.form = this.fb.group({
        education: this.fb.array([])
      });
      this.addEducation();
    }

    this.form.valueChanges.subscribe((data) => this.disableSubmit = !(this.form.valid));
  }

  getEducation() {
    return this.form.get('education') as FormArray;
  }

  addEducation() {
    (this.form.get('education') as FormArray).push(this.createItem());
    console.log('Form is ** ', this.form);
  }

  removeEducation(index: number) {
    (this.form.get('education') as FormArray).removeAt(index);
  }

  submit() {
    this.dataTransferService.educationForm = this.form;
    this.educationArray = this.form.value.education;
    this.dataTransferService.qualificationDetails = this.educationArray;
    console.log('Education Details are ', this.educationArray);
    this.dialogRef.close();
  }

  createItem(): FormGroup {
    return this.fb.group({
      degree: this.fb.control('', [Validators.required, Validators.minLength(1)]),
      institute: this.fb.control('', [Validators.required, Validators.minLength(1)]),
      grade: this.fb.control('', [Validators.required, Validators.minLength(1)]),
      fromDate: this.fb.control('', [Validators.required, Validators.minLength(1)]),
      toDate: this.fb.control('', [Validators.required, Validators.minLength(1)])
    });
  }
}
