import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AluguelService } from 'src/app/backend/aluguel.service';
import { Aluguel } from 'src/app/backend/models/aluguel.model';

@Component({
  selector: 'pagamento',
  templateUrl: './pagamento.component.html',
  styleUrls: ['./pagamento.component.css'],
})
export class PagamentoComponent implements OnInit {

  private inscricao: Subscription;

  public aluguel:Aluguel;

  public sucesso: boolean = false;
  public erro: boolean = false;

  constructor(
    private route:ActivatedRoute, 
    private aluguelService:AluguelService
  ) { }

  ngOnInit() {

    this.inscricao = this.route.params.subscribe((params:any)=> {
      this.buscarAluguel(params["id"]);
    });

  }

  buscarAluguel(id:string){
    this.aluguelService.buscarPorId(id).subscribe((aluguel:Aluguel) => {
      this.aluguel = aluguel;
    });
  }

  
  registrarPagamento(){
    this.aluguelService.registrarPagamento(`${this.aluguel.idAluguel}`).subscribe(res => {

      this.sucesso = true;

    }, error => {

      this.erro = true;

    });
  }

  ngOnDestroy(){
    this.inscricao.unsubscribe();
  }

} 
