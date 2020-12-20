import { Component, OnInit,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'pesquisa',
  templateUrl: './pesquisa.component.html',
  styleUrls: ['./pesquisa.component.css']
})
export class PesquisaComponent implements OnInit {

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
