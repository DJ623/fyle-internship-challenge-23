import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';

import { ApiService } from 'src/app/services/api.service';
import { ProfileComponent } from './profile.component';
import { AppComponent } from 'src/app/app.component';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let apiService: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent,ProfileComponent],
      providers: [ApiService],
      imports: [HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch user profile and repositories when findProfile is called', fakeAsync(() => {
    const username = 'testuser';
    const page = 1;
    const mockProfile = { login: 'testuser', avatar_url: 'testurl', bio: 'test bio', email: 'test@test.com', followers: 5, following: 10 };
    const mockRepos = [{ name: 'repo1', description: 'repo description', language: 'JavaScript', html_url: 'repo_url' }];

    spyOn(apiService, 'getUser').and.returnValue(of(mockProfile));
    spyOn(apiService, 'getRepos').and.returnValue(of(mockRepos));

    component.findProfile(username, page);
    tick(); 

    expect(apiService.getUser).toHaveBeenCalledWith(username);
    expect(apiService.getRepos).toHaveBeenCalledWith(username, page, component.itemsPerPage);
    expect(component.profile).toEqual(mockProfile);
    expect(component.repos).toEqual(mockRepos);
    expect(component.error).toBeNull();
  }));

  it('should handle errors when findProfile encounters an error', fakeAsync(() => {
    const username = 'testuser';
    const page = 1;
    const errorMessage = 'User not found';

    spyOn(apiService, 'getUser').and.returnValue(throwError(errorMessage));

    component.findProfile(username, page);
    tick(); 

    expect(apiService.getUser).toHaveBeenCalledWith(username);
    expect(component.profile).toEqual(component.emptyUserProfile()); // making emptyUserProfile public for testing purpose 
    expect(component.repos).toEqual([]);
    expect(component.error).toEqual('User Not Found !');
  }));

  it('should initialize with default values', () => {
    expect(component.profile).toEqual(component.emptyUserProfile());
    expect(component.repos).toEqual([]);
    expect(component.username).toEqual('');
    expect(component.currentPage).toEqual(1);
    expect(component.itemsPerPage).toEqual(10);
    expect(component.error).toBeNull();
  });

  

  //  testing nextPage and previousPage
  it('should increment currentPage when nextPage is called', () => {
    const initialPage = component.currentPage;
    component.nextPage();
    expect(component.currentPage).toEqual(initialPage + 1);
  });

  it('should not decrement currentPage when previousPage is called if currentPage is 1', () => {
    component.currentPage = 1;
    const initialPage = component.currentPage;
    component.previousPage();
    expect(component.currentPage).toEqual(initialPage);
  });
  
  

  it('should not decrement currentPage when previousPage is called if currentPage is 1', () => {
    component.currentPage = 1;
    component.previousPage();
    expect(component.currentPage).toEqual(1);
  });
});
