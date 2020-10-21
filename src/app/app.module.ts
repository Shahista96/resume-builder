import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider,
  AmazonLoginProvider,
} from 'angularx-social-login';


import 'hammerjs';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PersonalDetailsComponent } from './components/personal-details/personal-details.component';
import { HeaderComponent } from './components/header/header.component';
import { PDFComponent } from './components/pdf/pdf.component';
import { HomeComponent } from './components/home/home.component';
import { EducationComponent } from './components/education/education.component';
import { WorkExperienceComponent } from './components/work-experience/work-experience.component';
import { InternshipComponent } from './components/internship/internship.component';
import { HobbyComponent } from './components/hobby/hobby.component';
import { SkillComponent } from './components/skill/skill.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ExtraCurricularComponent } from './components/extra-curricular/extra-curricular.component';
import { AchievementComponent } from './components/achievement/achievement.component';
import { TrainingComponent } from './components/training/training.component';
import { CourseComponent } from './components/course/course.component';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Homev2Component } from './components/homev2/homev2.component';
import { FooterComponent } from './components/footer/footer.component';
import { TemplatesComponent } from './components/templates/templates.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { LoginComponent } from './components/login/login.component';
import { AuthenticatorService } from './authenticator.service';


@NgModule({
  declarations: [
    AppComponent,
    PersonalDetailsComponent,
    HeaderComponent,
    PDFComponent,
    HomeComponent,
    EducationComponent,
    WorkExperienceComponent,
    InternshipComponent,
    HobbyComponent,
    SkillComponent,
    ProjectsComponent,
    ExtraCurricularComponent,
    AchievementComponent,
    TrainingComponent,
    CourseComponent,
    Homev2Component,
    FooterComponent,
    TemplatesComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatSlideToggleModule,
    HttpClientModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    SocialLoginModule
  ],
  providers: [AuthenticatorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
