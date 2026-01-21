import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { MyAutreTestComponent } from './my-autre-test.component';
import { environmentToken } from '@core/environment/environmentToken';

describe('MyAutreTestComponent', () => {
  let component: MyAutreTestComponent;
  let fixture: ComponentFixture<MyAutreTestComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    jest.spyOn(console, 'log').mockImplementation(() => {});

    await TestBed.configureTestingModule({
      imports: [MyAutreTestComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: environmentToken,
          useValue: {
            fake_api: 'https://example.test/',
          },
        },
      ],
    }).compileComponents();

    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    jest.restoreAllMocks();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyAutreTestComponent);
    component = fixture.componentInstance;
  });

  it('ngOnInit should request todo and log the response after the RxJS delay', fakeAsync(() => {
    // Garantit le contrat observable : l’appel HTTP est fait sur le bon endpoint
    // et la réponse est consommée après le delay RxJS.
    fixture.detectChanges(); // déclenche ngOnInit

    const req = httpMock.expectOne('https://example.test/todos/1');
    expect(req.request.method).toBe('GET');

    req.flush({ id: 1, title: 'todo' });

    // delay(2000) est dans le pipe avant le subscribe
    expect(console.log).not.toHaveBeenCalled();
    tick(2000);
    expect(console.log).toHaveBeenCalledWith({ id: 1, title: 'todo' });
  }));
});
