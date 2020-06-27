import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Homev2Component } from './components/homev2/homev2.component';
import { TemplatesComponent } from './components/templates/templates.component';
import { PDFComponent } from './components/pdf/pdf.component';


const routes: Routes = [
  {path: 'home', component: Homev2Component},
  {path: 'selectTemplates', component: TemplatesComponent},
  {path: 'downloadResume', component: PDFComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
