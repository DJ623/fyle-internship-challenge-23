import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';
import { UserProfile, Repository } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });

    service = TestBed.inject(ApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getUser', () => {
    it('should return an Observable<UserProfile>', () => {
      const dummyUsername = 'example-user';
      const dummyUser: UserProfile = {
        login: 'example-user',
        avatar_url: 'https://example.com/avatar.jpg',
        bio: 'This is a bio',
        email: 'user@example.com',
        followers: 10,
        following: 5
      };

      service.getUser(dummyUsername).subscribe(user => {
        expect(user).toEqual(dummyUser);
      });

      // making api url as public only for testing purpose
      const req = httpTestingController.expectOne(`${service.apiUrl}/users/${dummyUsername}`);
      expect(req.request.method).toEqual('GET');
      req.flush(dummyUser);
    });

    // Add more tests for error handling, etc.
  });

  describe('getRepos', () => {
    it('should return an Observable<Repository[]>', () => {
      const dummyUsername = 'example-user';
      const dummyPage = 1;
      const dummyPerPage = 10;
      const dummyRepos: Repository[] = [
        { name: 'repo1', description: 'Description 1', topics: ['TypeScript'], html_url: 'https://example.com/repo1' },
        { name: 'repo2', description: 'Description 2', topics: ['JavaScript'], html_url: 'https://example.com/repo2' }
      ];

      service.getRepos(dummyUsername, dummyPage, dummyPerPage).subscribe(repos => {
        expect(repos).toEqual(dummyRepos);
      });

      const req = httpTestingController.expectOne(
        `${service.apiUrl}/users/${dummyUsername}/repos?page=${dummyPage}&per_page=${dummyPerPage}`
      );
      expect(req.request.method).toEqual('GET');
      req.flush(dummyRepos);
    });

    // Add more tests for error handling, etc.
  });
});
