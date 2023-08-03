import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { swapiAPI } from '../shared/constants';
import { Character } from "./character-list.model";

@Injectable({
  providedIn: 'root'
})
export class CharacterListService {
  totalPageCount: number = 0;

  constructor(private http: HttpClient) { }

  characterSearch(searchCharacter: string): Observable<Character[]> {
    return this.http.get<any>(`${swapiAPI}/?search=${searchCharacter}`).pipe(
      map((res: any) => {
        return res.results.map((character: Character) => character);
      })
    );
  }

  getCharactersByPage(page: number): Observable<Character[]> {
    return this.http.get<any>(`${swapiAPI}?page=${page}`).pipe(
      map((res: any) => {
        this.totalPageCount = Math.floor(res.count / 10) ;
        return res.results.map((character: Character) => character);
      })
    );
  }

}
