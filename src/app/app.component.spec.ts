import { ComponentFixture, TestBed} from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';


import { ApiService } from 'src/app/services/api.service';
import { ProfileComponent } from './components/profile/profile.component';  // Ensure this import
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let apiService: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, ProfileComponent],  // Declare ProfileComponent here
      providers: [ApiService],
      imports: [HttpClientTestingModule,FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService);
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it("should have as title 'fyle-frontend-challenge'", () => {
    expect(component.title).toEqual('fyle-frontend-challenge');
  });

  it('should render title', () => {
    fixture.detectChanges();
    const appComponent = fixture.componentInstance;
    // const compiled = fixture.nativeElement as HTMLElement;
    expect(appComponent.title).toContain('fyle-frontend-challenge');
  });
});
