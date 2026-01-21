import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { AutreWithIdComponent } from './autre-with-id.component';

describe('AutreWithIdComponent', () => {
  let component: AutreWithIdComponent;
  let fixture: ComponentFixture<AutreWithIdComponent>;

  beforeEach(async () => {
    jest.spyOn(console, 'log').mockImplementation(() => {});

    await TestBed.configureTestingModule({
      imports: [AutreWithIdComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                user: of({ id: 1, name: 'Test User' }),
              },
            },
          },
        },
      ],
    }).compileComponents();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutreWithIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render base content', () => {
    const el: HTMLElement = fixture.nativeElement;

    expect(el.querySelector('[data-testid="autre-with-id-root"]')).toBeTruthy();
    expect(el.querySelector('[data-testid="title"]')?.textContent).toContain('Composant Autre avec ID');
    expect(el.querySelector('[data-testid="intro"]')?.textContent).toContain('Voici un composant chargé');
    expect(el.querySelector('[data-testid="show-graph-btn"]')).toBeTruthy();
  });

  it('should show placeholders by default', () => {
    const el: HTMLElement = fixture.nativeElement;

    expect(el.querySelector('[data-testid="defer-viewport-placeholder"]')).toBeTruthy();
    expect(el.querySelector('[data-testid="profile-placeholder"]')).toBeTruthy();
    expect(el.querySelector('[data-testid="defer-interaction-placeholder"]')).toBeTruthy();

    expect(el.querySelector('[data-testid="profile-content"]')).toBeFalsy();
  });

  it('should render profile content when showContent becomes true', async () => {
    component.showContent = true;
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('[data-testid="profile-content"]')?.textContent).toContain('John Doe');
  });
});
