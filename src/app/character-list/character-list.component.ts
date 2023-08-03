import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Character } from "./character-list.model";
import { CharacterListService } from "./character-list.service";

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss']
})
export class CharacterListComponent implements OnInit {
  // @ts-ignore
  characters$: Observable<Character[]>;
  currentPage = 1;

  constructor(public characterListService: CharacterListService) {}

  ngOnInit(): void {
    this.characters$ = this.characterListService.getCharactersByPage(this.currentPage);
  }

  onInput(searchText: string): void {
    this.characters$ = this.characterListService.characterSearch(searchText);
  }

  changePage(page: number): void {
    this.characters$ = this.characterListService.getCharactersByPage(page);
    this.currentPage = page;
  }
}

