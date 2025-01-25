import { TestBed } from '@angular/core/testing';
import { CrudProveedoresComponent } from './crud-proveedores.component';

describe('CrudProveedoresComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrudProveedoresComponent],
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(CrudProveedoresComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it(`should have the 'partystore' title`, () => {
    const fixture = TestBed.createComponent(CrudProveedoresComponent);
    const component = fixture.componentInstance;
    expect(component.title).toEqual('partystore');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(CrudProveedoresComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, partystore');
  });
});
