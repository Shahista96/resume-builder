import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { QualificationDetails } from 'src/app/classes/QualificationDetails';
import { MatDialogRef } from '@angular/material/dialog';
import { WorkExperience } from 'src/app/classes/WorkExperience';
import { DataTransferService } from 'src/app/services/data-transfer.service';

@Component({
  selector: 'app-work-experience',
  templateUrl: './work-experience.component.html',
  styleUrls: ['./work-experience.component.scss']
})
export class WorkExperienceComponent implements OnInit {

  form: FormGroup;
  experience: WorkExperience[];
  totalWorkExperience;

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<WorkExperienceComponent>, private dataTransferService: DataTransferService) { }

  ngOnInit(): void {
    this.createForm();
  }

  close() {
    this.dialogRef.close();
  }

  createForm() {
    if (this.dataTransferService.workExperienceForm) {
      this.form = this.dataTransferService.workExperienceForm;
    } else {
      this.form = this.fb.group({
        experienceControl: this.fb.array([])
      });
      this.addWorkExperience();
    }
  }

  getWorkExperience() {
    return this.form.get('experienceControl') as FormArray;
  }

  addWorkExperience() {
    (this.form.get('experienceControl') as FormArray).push(this.createItem());
    console.log('Form is ** ', this.form);
  }

  removeWorkExperience(index: number) {
    (this.form.get('experienceControl') as FormArray).removeAt(index);
  }

  submit() {
    this.dataTransferService.totalWorkExperience = this.totalWorkExperience;
    this.dataTransferService.workExperienceForm = this.form;
    this.experience = this.form.value.experienceControl;
    console.log('Education Details are ', this.experience);
    this.dataTransferService.workExperienceDetails = this.experience;
    this.dialogRef.close();
  }

  initResponsibilities() {
    return new FormGroup({
      responsibility: new FormControl('')
    });
  }

  createItem(): FormGroup {
    return this.fb.group({
      designation: '',
      organizationName: '',
      fromDate: '',
      toDate: '',
      jobDescription: '',
      responsibilities: new FormArray([
        this.initResponsibilities()
      ])
    });
  }

  addResponsibility(i: number): void {
    ((this.form.get('experienceControl') as FormArray).controls[i].get('responsibilities') as FormArray).push(this.initResponsibilities());
    console.log('After Adding Form Value is ** ', this.form);
  }

  getResponsibilities(i) {
    return ((this.form.get('experienceControl') as FormArray).controls[i].get('responsibilities') as FormArray).controls;
  }

  removeResponsibility(i, j): void {
    if (j !== 0) {
      const control = (this.form.get('experienceControl') as FormArray).controls[i].get('responsibilities') as FormArray;
      control.removeAt(j);
    }


    //((this.form.get('experienceControl') as FormArray).controls[i].get('responsibilities') as FormArray).controls[j]

    //(this.form.get(['experienceControl', i, 'responsibilities', j]) as FormArray).removeAt(0);
  }

}
