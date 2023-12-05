import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

interface UserProfile {
  login: string;
  avatar_url: string;
  bio: string;
  email: string;
  followers: number;
  following: number;
}

interface Repository {
  name: string;
  description: string;
  topics: string[];
  html_url: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  profile: UserProfile = this.emptyUserProfile();
  repos: Repository[] = [];
  username: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 10;
  values: number[] = Array.from({ length: 100 }, (_, i) => i + 1);
  error: string | null = null;
  flag : boolean = false;

  constructor(private apiService: ApiService) {}

  findProfile(username: string, page: number) {
    if (username.length > 0) {
      this.error = null; // Reset error on each new search

      this.apiService.getUser(username).subscribe({
        next: (profile: UserProfile) => {
          console.log(profile);
          this.profile = profile;
          this.fetchRepos(username, page);
        },
        error: (error) => {
          console.error('Error fetching Profile', error);
          this.profile = this.emptyUserProfile();
          this.error = 'User Not Found !';
        }
      });
    } else {
      console.log('Empty username entered');
      this.profile = this.emptyUserProfile(); // Reset profile
      this.repos = []; // Reset repos
      this.error = 'Empty username entered';
      
      
    }
  }

  fetchRepos(username: string, page: number) {
    this.apiService.getRepos(username, page, this.itemsPerPage).subscribe({
      next: (repos: Repository[]) => {
        console.log(repos);
        this.repos = repos;
      },
      error: (error) => {
        console.error('Error fetching repositories:', error);
        this.error = 'Error fetching repositories';
        
      }
    });
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.findProfile(this.username, this.currentPage);
    }
  }

  nextPage() {
    this.currentPage++;
    this.findProfile(this.username, this.currentPage);
  }

  onItemsPerPageChange() {
    this.currentPage = 1; // Reset to the first page when items per page changes
    this.findProfile(this.username, this.currentPage);
  }

  
  emptyUserProfile(): UserProfile {
    return {
      login: '',
      avatar_url: '',
      bio: '',
      email: '',
      followers: 0,
      following: 0
    };
  }

  ngOnInit() {}
}
