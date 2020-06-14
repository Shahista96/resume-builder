import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { ProjectDetails } from 'src/app/classes/ProjectDetails';
import { MatDialogRef } from '@angular/material/dialog';
import { DataTransferService } from 'src/app/services/data-transfer.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  form: FormGroup;
  projectsArray: ProjectDetails[];

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<ProjectsComponent>, private dataTransferService: DataTransferService) { }
  

  ngOnInit(): void {
    this.createForm();
  }

  close() {
    this.dialogRef.close();
  }

  createForm() {
    if (this.dataTransferService.projectForm){
      this.form = this.dataTransferService.projectForm;
    }else{
      this.form = this.fb.group({
        projects: this.fb.array([])
      });
      this.addProject();
    }
  }

  getProjects() {
    return this.form.get('projects') as FormArray;
  }

  addProject() {
    (this.form.get('projects') as FormArray).push(this.createItem());
    console.log('Form is ** ', this.form);
  }

  removeProject(index: number) {
    (this.form.get('projects') as FormArray).removeAt(index);
  }

  submit() {
    this.projectsArray = this.form.value.projects;
    this.dataTransferService.projectDetails = this.projectsArray;
    this.dataTransferService.projectForm = this.form;
    console.log('Projects are - > ', this.projectsArray);
    this.dialogRef.close();
  }

  createItem(): FormGroup {
    return this.fb.group({
      title: '',
      description: '',
    });
  }
}
