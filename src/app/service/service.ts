import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { Joke } from "../model/joke";
@Injectable({
    providedIn: 'root',
  })
  export class JokeService{
    private baseUrl="http://localhost:8080"

    constructor(private httpClient : HttpClient){}

    getAllCategories(): Observable<any> {
        return this.httpClient.get<any>(this.baseUrl+"/categories");
    }
    getFirstRandomJoke()
    {
      return this.httpClient.get<Joke>(this.baseUrl);
    }
    getByCategory(data:any): Observable<Joke> {
      return this.httpClient.get<Joke>(this.baseUrl+"/search?query="+data);
  }
  }