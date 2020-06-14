import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { DataTransferService } from 'src/app/services/data-transfer.service';

@Component({
  selector: 'app-extra-curricular',
  templateUrl: './extra-curricular.component.html',
  styleUrls: ['./extra-curricular.component.scss']
})
export class ExtraCurricularComponent implements OnInit {

  form: FormGroup;
  activitiesArray: Array<string> = [];

  // tslint:disable-next-line: max-line-length
  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<ExtraCurricularComponent>, private dataTransferService: DataTransferService) { }

  ngOnInit(): void {
    this.createForm();
  }

  close() {
    this.dialogRef.close();
  }

  createForm() {
    if (this.dataTransferService.activitiesForm){
      this.form = this.dataTransferService.activitiesForm;
    }else{
      this.form = this.fb.group({
        activities: this.fb.array([])
      });
      this.addActivity();
    }
   
  }

  getActivity() {
    return this.form.get('activities') as FormArray;
  }

  addActivity() {
    (this.form.get('activities') as FormArray).push(this.fb.control(''));
  }

  removeActivity(index: number) {
    (this.form.get('activities') as FormArray).removeAt(index);
  }

  submit() {
    this.dataTransferService.activitiesForm = this.form;
    this.activitiesArray = this.form.value.activities;
    this.dataTransferService.activityDetails = this.activitiesArray;
    this.dialogRef.close();
  }
}
