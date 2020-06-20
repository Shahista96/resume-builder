import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PersonalDetails } from '../classes/PersonalDetails';
import { QualificationDetails } from '../classes/QualificationDetails';
import { WorkExperience } from '../classes/WorkExperience';
import { ProjectDetails } from '../classes/ProjectDetails';
import { InternshipDetails } from '../classes/InternshipDetails';
import { TrainingDetails } from '../classes/TrainingDetails';

@Injectable({
  providedIn: 'root'
})
export class DataTransferService {

  totalWorkExperience;
  imageDetails;
  personalDetails: PersonalDetails;
  qualificationDetails: QualificationDetails[] = [];
  workExperienceDetails: WorkExperience[] = [];
  hobbyDetails: string[];
  projectDetails: ProjectDetails[] = [];
  personalDetailsForm;
  projectForm;
  educationForm;
  workExperienceForm;
  courseForm;
  achievementForm;
  internshipForm;
  skillForm;
  activitiesForm;
  trainingForm;
  intershipDetails: InternshipDetails[] = [];
  skillDetails: string[] = [];
  activityDetails: string[] = [];
  trainingDetails: TrainingDetails[] = [];
  courses: string[] = [];
  achievementDetails: string[] = [];

  private personalInfo = new BehaviorSubject({PersonalDetails});
  personalInfoObserver = this.personalInfo.asObservable();

  private educationInfo = new BehaviorSubject([]);
  educationInfoObserver = this.educationInfo.asObservable();

  private workExperienceInfo = new BehaviorSubject([]);
  workExperienceInfoObserver = this.workExperienceInfo.asObservable();

  constructor() { }

  updatePersonalInfo(personalInfoDetails){
    console.log('Called ', personalInfoDetails);
    this.personalInfo.next(personalInfoDetails);
  }

  updateEducationInfo(educationInfo: QualificationDetails[]){
    this.educationInfo.next(educationInfo);
  }

  updateWorkExperienceInfo(workExperienceInfo: WorkExperience[]){
    this.workExperienceInfo.next(workExperienceInfo);
  }
}
