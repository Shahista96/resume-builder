import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { ProjectDetails } from 'src/app/classes/ProjectDetails';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { DataTransferService } from 'src/app/services/data-transfer.service';
import { InternshipComponent } from '../internship/internship.component';
import { AchievementComponent } from '../achievement/achievement.component';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  form: FormGroup;
  projectsArray: ProjectDetails[];

  constructor(private fb: FormBuilder,private matDialog: MatDialog, public dialogRef: MatDialogRef<ProjectsComponent>, private dataTransferService: DataTransferService) { }
  

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
  }

  createItem(): FormGroup {
    return this.fb.group({
      title: '',
      description: '',
    });
  }

  openInternship(){
    this.matDialog.open(InternshipComponent, {width: '400px', minHeight: '150px'});
    this.close();
  }

  openAchievement(){
    this.matDialog.open(AchievementComponent, {width: '400px', minHeight: '150px'});
    this.close();
  }
}
