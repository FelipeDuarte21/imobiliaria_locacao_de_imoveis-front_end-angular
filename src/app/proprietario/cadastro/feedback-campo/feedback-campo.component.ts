import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'feedback-campo',
  templateUrl: './feedback-campo.component.html',
  styleUrls: ['./feedback-campo.component.css']
})
export class FeedbackCampoComponent implements OnInit {

  @Input() mostrarErro: boolean;
  @Input() campo: FormControl;

  constructor() { }

  ngOnInit() {
  }

  getErro():boolean{
    return this.mostrarErro;
  }

}
