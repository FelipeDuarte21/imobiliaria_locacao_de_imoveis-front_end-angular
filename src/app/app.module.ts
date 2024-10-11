import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app.routing.module';

import { PipesModule } from './shared/pipes/pipes.module';
import { CabecalhoModule } from './shared/components/cabecalho/cabecalho.module';

import { AppComponent } from './app.component';
import { ServicesModule } from './services/services.module';

import { NgxMaskDirective, NgxMaskPipe, provideEnvironmentNgxMask } from 'ngx-mask';

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		CabecalhoModule,
		PipesModule,
		ServicesModule,
		NgxMaskDirective, 
		NgxMaskPipe
	],
	providers: [
		provideEnvironmentNgxMask()
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
