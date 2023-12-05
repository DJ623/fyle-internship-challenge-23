import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface UserProfile {
  login: string;
  avatar_url: string;
  bio: string;
  email: string;
  followers: number;
  following: number;
  // other properties
}

export interface Repository {
  name: string;
  description: string;
  topics: string[];
  html_url: string;
  // other properties
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // making api url as public only for testing purpose
   apiUrl = 'https://api.github.com';

  constructor(private httpClient: HttpClient) {}

  getUser(username: string): Observable<UserProfile> {
    const url = `${this.apiUrl}/users/${username}`;
    return this.httpClient.get<UserProfile>(url)
  }

  getRepos(username: string, page: number, perPage: number): Observable<Repository[]> {
    const url = `${this.apiUrl}/users/${username}/repos?page=${page}&per_page=${perPage}`;
    return this.httpClient.get<Repository[]>(url);
  }
}
