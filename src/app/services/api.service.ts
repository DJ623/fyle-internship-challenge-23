import { HttpClient } from '@angular/common/http';
import { XmlParser } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  constructor(
    private httpClient: HttpClient
  ) { }

  getUser(username: string) {
    const url = `https://api.github.com/users/${username}`;
    return this.httpClient.get<any>(url);
  };

 

  getRepos(username: string, page: number, perPage: number) {
    const url = `https://api.github.com/users/${username}/repos?page=${page}&per_page=${perPage}`;
    return this.httpClient.get<any>(url);
  }


}
