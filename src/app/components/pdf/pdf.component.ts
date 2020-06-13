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


  details: string[];

  personalDetails: PersonalDetails;
  qualifications: QualificationDetails[];
  workExperience: WorkExperience[];
  documentDefinition: any;

  constructor() { }

  ngOnInit(): void {
    this.personalDetails = new PersonalDetails();
    this.personalDetails.fname = 'Shahista';
    this.personalDetails.lname = 'Patel';
    this.personalDetails.qualification = 'Bachelor of Engineering, Information Technology';
    this.personalDetails.email = 'patelshahista96@gmail.com';
    this.personalDetails.phoneNumber = '+91 7391071076';
    this.personalDetails.linkedIn = 'https://www.linkedin.com/in/shahista-patel-0108';

    this.initializeDocumentDefinition();
    this.addPersonalDetailsToPDF();
    this.getEducationalDetailsMocked();
    console.log("degree details ", this.qualifications);
    this.addQualificationDetailsToPDF();
    //this.pushDetailsDynamicallyTest();
    //this.columnPDFSample();
    this.generatePdf();

  }

  getEducationalDetailsMocked() {
    const qualification = new QualificationDetails();
    this.qualifications = [];
    qualification.degree = 'SSC';
    qualification.institute = 'Priyadarshani School';
    qualification.fromDate = '';
    qualification.toDate = '2012';
    qualification.grade = '91%';

    
    const qualification1 = new QualificationDetails();

    qualification1.degree = 'HSC';
    qualification1.institute = 'Modern College, Pune';
    qualification1.fromDate = '2012';
    qualification1.toDate = '2014';
    qualification1.grade = '75%';

    

    const qualification2 = new QualificationDetails();

    qualification2.degree = 'Bachelor of Engineering, Information Technology';
    qualification2.institute = 'Maharashtra Institute of Technology, Alandi';
    qualification2.fromDate = '2014';
    qualification2.toDate = '2018';
    qualification2.grade = '75%';

    this.qualifications.push(qualification2);
    this.qualifications.push(qualification1);
    this.qualifications.push(qualification);

  }

  addPersonalDetailsToPDF() {
    this.documentDefinition.content.push(
      {
        text: this.personalDetails.fname + ' ' + this.personalDetails.lname + '\n',
        style: 'header'
      });
    // tslint:disable-next-line: align
    this.documentDefinition.content.push(
      [
        this.personalDetails.qualification,
        this.personalDetails.email,
        this.personalDetails.phoneNumber,
        this.personalDetails.linkedIn,
        '\n',
        { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1 }] },
        '\n'
      ]
    );

  }

  initializeDocumentDefinition() {
    this.documentDefinition = {
      content: [
      ],
      styles: {
        header: {
          fontSize: 16,
          bold: true
        },
        bigger: {
          fontSize: 15,
          italics: true
        }
      }
    };
  }

  generateDocumentDefinition11() {
    const documentDefinition = {
      content: [
        {
          text: 'This is a header (whole paragraph uses the same header style)\n\n',
          style: 'header'
        },
        {
          text: [
            'It is however possible to provide an array of texts ',
            'to the paragraph (instead of a single string) and have ',
            { text: 'a better ', fontSize: 15, bold: true },
            'control over it. \nEach inline can be ',
            { text: 'styled ', fontSize: 20 },
            { text: 'independently ', italics: true, fontSize: 40 },
            'then.\n\n'
          ]
        },
      ]
    };
    return documentDefinition;
  }





  addQualificationDetailsToPDF() {

    let count = 0;
    this.qualifications.forEach((elem) => {

        let details = [];
        details.push(elem.degree);
        details.push(elem.institute);
        details.push('Percentage : ' + elem.grade);

        if(count == 0){
          this.documentDefinition.content.push(
            {
              columns: [
                {
                  width: 150,
                  text: 'Education',
                },
                [
                  {
                    text: details[0],
                    bold: true
                  },
                  details[1],
                  details[2],
                  '\n'
                ]
              ]
            }
          );
        }else{
          this.documentDefinition.content.push(
            {
              columns: [
                {
                  width: 150,
                  text: ' ',
                },
                [
                  {
                    text: details[0],
                    bold: true
                  },
                  details[1],
                  details[2],
                  '\n'
                ]
              ]
            }
          );
        }

        count++;
      }
    );

    this.documentDefinition.content.push(
      [ { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1 }] }]
    );

  }

  pushDetailsDynamicallyTest() {

    this.details = [];


    this.qualifications.forEach(qualification => {
      this.details.push(qualification.degree);
      this.details.push(qualification.institute);
      this.details.push('Percentage : ' + qualification.grade);
      console.log('Details are - ', this.details)

      this.documentDefinition.content.push([
        {
          columns: [
            {
              width: 150,
              text: '',
            },
            this.details[0],
            this.details[1]
          ]
        }
      ]);

      this.details = [];
    });


    // this.qualifications.forEach(qualification => {
    //   this.documentDefinition.content.columns.push(qualification.description);
    //   this.documentDefinition.content[2].columns[2].push(qualification.institute);
    //   this.documentDefinition.content[2].columns[2].push(qualification.description);
    //   this.documentDefinition.content[2].columns[2].push(qualification.institute);
    // });

  }

  generatePdf() {
    pdfMake.createPdf(this.documentDefinition).open();
  }

}
