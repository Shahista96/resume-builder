import { Component, OnInit } from '@angular/core';
import { DataTransferService } from 'src/app/services/data-transfer.service';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.scss']
})
export class TemplatesComponent implements OnInit {

  color = 'warn';

  constructor(public dataTransferService: DataTransferService) { }

  ngOnInit(): void {
  }


}
