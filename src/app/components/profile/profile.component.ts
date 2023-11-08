import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { EmailValidator, FormsModule } from '@angular/forms';

interface UserProfile {
  login: string;
  avatar_url: string;
  bio: string;
  email : string;
  followers : number;
  following : number;
  // other properties
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  profile : UserProfile = {
    login: '',
    avatar_url: '',
    bio: '',
    email : '',
    followers : 0,
    following : 0

    // Initialize other properties as needed
  }; ;
  repos : any[] = [];
  username : string = '';
  currentPage: number = 1;
  itemsPerPage: number = 10;

  constructor(private apiService : ApiService)
  { }

  searchRepositories() {
    if (this.username) {
      this.findProfile(this.username, this.currentPage);
    }
  }

  findProfile(username: string, page: number)
  {
    this.apiService.getUser(username).subscribe(data => {
      console.log(data);
      this.profile = data;
    });

    this.apiService.getRepos(username,page,this.itemsPerPage).subscribe(repo => {
      console.log(repo);
      this.repos = repo;
      
    })
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

  ngOnInit() {
  }


}
