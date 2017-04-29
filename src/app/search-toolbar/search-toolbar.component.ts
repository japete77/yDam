import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { SearchFilterItem } from './search-filter-item';
import { TranslateService } from "app/translate";

@Component({
  selector: 'app-search-toolbar',
  templateUrl: './search-toolbar.component.html',
  styleUrls: ['./search-toolbar.component.scss']
})
export class SearchToolbarComponent implements OnInit {

  @Output() clickMenuEvent: EventEmitter<void> = new EventEmitter<void>();
  @Output() searchEvent: EventEmitter<string> = new EventEmitter<string>();
  @Output() toggleCollectionsEvent: EventEmitter<void> = new EventEmitter<void>();
  @Output() toggleViewModeEvent: EventEmitter<string> = new EventEmitter<string>();

  searchText: string;
  searchFilters: SearchFilterItem[];

  showCollections: boolean;
  viewMode = 'view_list';
  collectionsStatusColor: string;

  private viewModeTypes: string[] = [ 'view_list', 'view_comfy' ];

  constructor(private translateService: TranslateService) {
    this.searchFilters = [
      {
        name: 'LoRes',
        selected: true,
        color: 'accent'
      },
      {
        name: 'Sports',
        selected: false,
        color: 'accent'
      },
      {
        name: 'Promo',
        selected: true,
        color: 'accent'
      }
    ];
  }

  ngOnInit() {
  }

  clickMenu(): void {
    this.clickMenuEvent.emit();
  }

  search(searchInputTerms: string): void {
    this.searchText = searchInputTerms;
    this.searchEvent.emit(searchInputTerms);
  }

  clear(): void {

  }

  bounce(): void {

  }

  toggleCollections(): void {
    this.showCollections = !this.showCollections;
    this.collectionsStatusColor = this.showCollections ? 'accent' : '';

    this.toggleCollectionsEvent.emit();
  }

  toggleView(): void {
    this.viewMode = this.viewModeTypes[(this.viewModeTypes.indexOf(this.viewMode) + 1) % this.viewModeTypes.length];
    this.toggleViewModeEvent.emit(this.viewMode);
  }

  toggleSearchFilter(index: number): void  {
    this.searchFilters[index].selected = !this.searchFilters[index].selected;

    // TODO: refresh search...
  }
}
