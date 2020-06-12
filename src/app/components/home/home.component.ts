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
    this.matDialog.open(PersonalDetailsComponent, dialogConfig);
  }

  openAchievement(){
    const dialogConfig = new MatDialogConfig();
    this.matDialog.open(AchievementComponent, dialogConfig);
  }

  openCourse(){
    const dialogConfig = new MatDialogConfig();
    this.matDialog.open(CourseComponent, dialogConfig);
  }

  openEducation(){
    const dialogConfig = new MatDialogConfig();
    this.matDialog.open(EducationComponent, dialogConfig);
  }

  openExtraCurricular(){
    const dialogConfig = new MatDialogConfig();
    this.matDialog.open(ExtraCurricularComponent, dialogConfig);
  }

  openHobby(){
    const dialogConfig = new MatDialogConfig();
    this.matDialog.open(HobbyComponent, dialogConfig);
  }

  openInternship(){
    const dialogConfig = new MatDialogConfig();
    this.matDialog.open(InternshipComponent, dialogConfig);
  }

  openProjects(){
    const dialogConfig = new MatDialogConfig();
    this.matDialog.open(ProjectsComponent, dialogConfig);
  }

  openSkill(){
    const dialogConfig = new MatDialogConfig();
    this.matDialog.open(SkillComponent, dialogConfig);
  }

  openTraining(){
    const dialogConfig = new MatDialogConfig();
    this.matDialog.open(TrainingComponent, dialogConfig);
  }

  openWorkExperience(){
      const dialogConfig = new MatDialogConfig();
      this.matDialog.open(WorkExperienceComponent, dialogConfig);
  }
}
