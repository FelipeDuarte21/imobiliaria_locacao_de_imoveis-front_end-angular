import { Component, OnInit,Output,EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'pesquisa',
  templateUrl: './pesquisa.component.html',
  styleUrls: ['./pesquisa.component.css']
})
export class PesquisaComponent implements OnInit {

  @Input() place:string;

  @Output() valor = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  pesquisar(value: string){
    return this.valor.emit(value);
  }

  onKeyup(value:string){
    return this.valor.emit(value);
  }

}
