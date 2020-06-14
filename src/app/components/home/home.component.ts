import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PersonalDetailsComponent } from '../personal-details/personal-details.component';
import { AchievementComponent } from '../achievement/achievement.component';
import { CourseComponent } from '../course/course.component';
import { EducationComponent } from '../education/education.component';
import { ExtraCurricularComponent } from '../extra-curricular/extra-curricular.component';
import { HobbyComponent } from '../hobby/hobby.component';
import { InternshipComponent } from '../internship/internship.component';
import { ProjectsComponent } from '../projects/projects.component';
import { SkillComponent } from '../skill/skill.component';
import { TrainingComponent } from '../training/training.component';
import { WorkExperienceComponent } from '../work-experience/work-experience.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private matDialog: MatDialog) { }

  ngOnInit(): void {
  }

  openPersonalDetails(){
    const dialogConfig = new MatDialogConfig();
    this.matDialog.open(PersonalDetailsComponent, {width: '400px', minHeight: '150px'});
  }

  openAchievement(){
    const dialogConfig = new MatDialogConfig();
    this.matDialog.open(AchievementComponent, {width: '400px', minHeight: '150px'});
  }

  openCourse(){
    const dialogConfig = new MatDialogConfig();
    this.matDialog.open(CourseComponent, {width: '400px', minHeight: '150px'});
  }

  openEducation(){
    this.matDialog.open(EducationComponent, {width: '400px', minHeight: '150px'});
  }

  openExtraCurricular(){

    this.matDialog.open(ExtraCurricularComponent, {width: '400px', minHeight: '150px'});
  }

  openHobby(){
    const dialogConfig = new MatDialogConfig();
    this.matDialog.open(HobbyComponent, {width: '400px', minHeight: '150px'});
  }

  openInternship(){
    const dialogConfig = new MatDialogConfig();
    this.matDialog.open(InternshipComponent, {width: '400px', minHeight: '150px'});
  }

  openProjects(){
    const dialogConfig = new MatDialogConfig();
    this.matDialog.open(ProjectsComponent, {width: '400px', minHeight: '150px'});
  }

  openSkill(){
    const dialogConfig = new MatDialogConfig();
    this.matDialog.open(SkillComponent, {width: '400px', minHeight: '150px'});
  }

  openTraining(){
    const dialogConfig = new MatDialogConfig();
    this.matDialog.open(TrainingComponent, {width: '400px', minHeight: '150px'});
  }

  openWorkExperience(){
      const dialogConfig = new MatDialogConfig();
      this.matDialog.open(WorkExperienceComponent, {width: '400px', minHeight: '150px'});
  }
}
