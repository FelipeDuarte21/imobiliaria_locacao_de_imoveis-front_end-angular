import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
	{ path: 'home', loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule) },
	{ path: 'proprietario', loadChildren: () => import('./modules/proprietario/proprietario.module').then(m => m.ProprietarioModule) },
	{ path: 'inquilino', loadChildren: () => import('./modules/inquilino/inquilino.module').then(m => m.InquilinoModule) },
	{ path: 'imovel', loadChildren: () => import('./modules/imovel/imovel.module').then(m => m.ImovelModule) },
	{ path: 'locacao', loadChildren: () => import('./modules/locacao/locacao.module').then(m => m.LocacaoModule) },
	{ path: 'aluguel', loadChildren: () => import('./modules/aluguel/aluguel.module').then(m => m.AluguelModule) },
	{ path: '', pathMatch: 'full', redirectTo: 'home' }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
