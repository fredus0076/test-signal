import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AutreNormalComponent } from './autre-normal.component';

describe('AutreNormalComponent', () => {
  let component: AutreNormalComponent;
  let fixture: ComponentFixture<AutreNormalComponent>;

  beforeEach(async () => {
    jest.spyOn(console, 'log').mockImplementation(() => {});

    await TestBed.configureTestingModule({
      imports: [AutreNormalComponent],
    }).compileComponents();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutreNormalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
