import { Component, OnInit } from '@angular/core';
import { DataTransferService } from 'src/app/services/data-transfer.service';
import { TEMPLATES, Template } from '../../classes/template';


@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.scss']
})
export class TemplatesComponent implements OnInit {

  templates;
  previewImage;

  constructor(public dataTransferService: DataTransferService) { }

  ngOnInit(): void {
    this.templates = TEMPLATES;
    this.previewImage = this.templates[0];
  }


  toggleSelection(template: Template ){
   
      this.templates.forEach(element => {
        if(element.templateId == template.templateId){
          element.selected = !template.selected;
          this.previewImage = template;
          return;
        }
      });
  }

}
