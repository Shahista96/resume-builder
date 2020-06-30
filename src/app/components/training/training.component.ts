import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { TrainingDetails } from 'src/app/classes/TrainingDetails';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { DataTransferService } from 'src/app/services/data-transfer.service';
import { ExtraCurricularComponent } from '../extra-curricular/extra-curricular.component';
import { PDFComponent } from '../pdf/pdf.component';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit {

  form: FormGroup;
  trainingArray: TrainingDetails[];

  constructor(private fb: FormBuilder,private matDialog: MatDialog, public dialogRef: MatDialogRef<TrainingComponent>, private dataTransferService: DataTransferService) { }

  ngOnInit(): void {
    this.createForm();
  }

  close() {
    this.dialogRef.close();
  }

  createForm() {
    if (this.dataTransferService.trainingForm){
      this.form = this.dataTransferService.trainingForm;
    }else{
      this.form = this.fb.group({
        trainings: this.fb.array([])
      });
      this.addTraining();
    }
  }

  getTraining() {
    return this.form.get('trainings') as FormArray;
  }

  addTraining() {
    (this.form.get('trainings') as FormArray).push(this.createItem());
    console.log('Form is ** ', this.form);
  }

  removeTraining(index: number) {
    (this.form.get('trainings') as FormArray).removeAt(index);
  }

  submit() {
    this.dataTransferService.trainingForm = this.form;
    this.trainingArray = this.form.value.trainings;
    this.dataTransferService.trainingDetails = this.trainingArray;
  }

  createItem(): FormGroup {
    return this.fb.group({
      title: '',
      description: '',
    });
  }

  openExtraCurricular(){
    this.matDialog.open(ExtraCurricularComponent, {width: '400px', minHeight: '150px'});
  }

  openDownloadPDF(){
    this.matDialog.open(PDFComponent, {width: '400px', minHeight: '150px', maxHeight: '300px'});
  }
}
