import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { QualificationDetails } from 'src/app/classes/QualificationDetails';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { DataTransferService } from 'src/app/services/data-transfer.service';
import { slideLeft } from '../../animations/app.animations';
import { fromEventPattern } from 'rxjs';
import { WorkExperienceComponent } from '../work-experience/work-experience.component';
import { PersonalDetailsComponent } from '../personal-details/personal-details.component';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent implements OnInit {

  form: FormGroup;
  educationArray: Array<QualificationDetails> = [];
  disableSubmit = true;

  constructor(private fb: FormBuilder,
              public dialogRef: MatDialogRef<EducationComponent>,
              private dataTransferService: DataTransferService,
              private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.createForm();
  }

  close() {
    this.dialogRef.close();
  }

  createForm() {

    if (this.dataTransferService.educationForm) {
      this.form = this.dataTransferService.educationForm;
    } else {
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
    alert('Submit Education Triggered');
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

  openWorkExperience() {
    this.matDialog.open(WorkExperienceComponent, { width: '400px', minHeight: '150px' });
  }

  openPersonalDetails() {
    this.matDialog.open(PersonalDetailsComponent, { width: '400px', minHeight: '150px' });
  }
}
