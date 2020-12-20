import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from '../backend/home.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public totais = {
    proprietarios: 0,
    inquilinos: 0,
    imoveis: 0,
    locacoes: 0,
    alugueis: 0
  }

  constructor(
    private homeService:HomeService
  ) { }

  ngOnInit() {
    this.homeService.getTotalProprietarios().subscribe(res => {
      this.totais.proprietarios = res.length;
    },error => {
      this.totais.proprietarios = 0;
    });

    this.homeService.getTotalInquilinos().subscribe(res => {
      this.totais.inquilinos = res.length;
    },error => {
      this.totais.inquilinos = 0;
    });

    this.homeService.getTotalImoveis().subscribe(res => {
      this.totais.imoveis = res.length;
    },error => {
      this.totais.imoveis = 0;
    });

    this.homeService.getTotalLocacoes().subscribe(res => {
      this.totais.locacoes = res.length;
    },error => {
      this.totais.locacoes = 0;
    });

    this.homeService.getTotalAlugueisAtrasados().subscribe(res => {
      this.totais.alugueis = res.length;
    },error =>{
      this.totais.alugueis = 0;
    });

  }

} 
