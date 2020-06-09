import { Component, OnInit } from '@angular/core';
import pdfMake from 'node_modules/pdfmake/build/pdfmake.js';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { PersonalDetails } from 'src/app/classes/PersonalDetails';
import { QualificationDetails } from 'src/app/classes/QualificationDetails';
import { WorkExperience } from 'src/app/classes/WorkExperience';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.scss']
})
export class PDFComponent implements OnInit {


  personalDetails: PersonalDetails;
  qualifications: QualificationDetails[];
  workExperience: WorkExperience[];

  constructor() { }

  ngOnInit(): void {
  }

  generatePdf(){
    const documentDefinition = { content: 'This is for testing.' };
    pdfMake.createPdf(documentDefinition).open();
  }

}
