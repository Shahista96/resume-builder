import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { DataTransferService } from 'src/app/services/data-transfer.service';
import { ProjectsComponent } from '../projects/projects.component';
import { SkillComponent } from '../skill/skill.component';

@Component({
  selector: 'app-achievement',
  templateUrl: './achievement.component.html',
  styleUrls: ['./achievement.component.scss']
})
export class AchievementComponent implements OnInit {

  form: FormGroup;
  achievementsArray: Array<string> = [];

  constructor(private fb: FormBuilder,private matDialog: MatDialog, public dialogRef: MatDialogRef<AchievementComponent>, private dataTransferService: DataTransferService) { }

  ngOnInit(): void {
    this.createForm();
  }

  close() {
    this.dialogRef.close();
  }

  createForm() {
    if(this.dataTransferService.achievementForm){
      this.form = this.dataTransferService.achievementForm;
    }else{
      this.form = this.fb.group({
        achievements: this.fb.array([])
      });
      this.addAchievement();
    }
   
  }

  getAchievements() {
    return this.form.get('achievements') as FormArray;
  }

  addAchievement() {
    (this.form.get('achievements') as FormArray).push(this.fb.control(''));
    console.log('Form is ** ', this.form);
  }

  removeAchievement(index: number) {
    (this.form.get('achievements') as FormArray).removeAt(index);
  }

  submit() {
    this.dataTransferService.achievementForm = this.form;
    this.achievementsArray = this.form.value.achievements;
    this.dataTransferService.achievementDetails = this.achievementsArray;
    console.log('Achievements are - > ', this.achievementsArray);
    this.dialogRef.close();
  }

  openSkill(){
    this.matDialog.open(SkillComponent, {width: '400px', minHeight: '150px'});
  }

  openProjects(){
    this.matDialog.open(ProjectsComponent, {width: '400px', minHeight: '150px'});
  }
}
