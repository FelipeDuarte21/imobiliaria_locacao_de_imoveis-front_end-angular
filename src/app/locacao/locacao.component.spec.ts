import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocacaoComponent } from './locacao.component';

describe('LocacaoComponent', () => {
  let component: LocacaoComponent;
  let fixture: ComponentFixture<LocacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
