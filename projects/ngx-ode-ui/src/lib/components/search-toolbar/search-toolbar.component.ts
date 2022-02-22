import { Component, EventEmitter, Injector, Input, Output } from "@angular/core";
import { OdeComponent } from "ngx-ode-core";

/**
 * Search Toolbar component.
 * Used within List component, Search Toolbar will display following information:
 * - Label of the search filter section (example: 'Search by')
 * - List of search type filters (example: 'Name', 'Email' , ...)
 * - Number of items returned by the search
 *
```
<ode-search-toolbar
  [label]="'user.searchType.label'"
  [searchTypes]="searchTypes"
  [nbItem]="nbUser || 0"
  [nbItemLabel]="'list.results.users'"
  (selectSearchType)="handleSelectSearchType($event)"
>
</ode-search-toolbar>
```
 */

@Component({
  selector: 'ode-search-toolbar',
  templateUrl: './search-toolbar.component.html',
  styleUrls: ['./search-toolbar.component.scss']
})
export class SearchToolbarComponent extends OdeComponent {

  @Input() label: string;
  @Input() searchTypes: Array<{label: string, value: string}>;
  @Input() nbItem: number = 0;
  @Input() nbItemLabel: string;
  @Output() selectSearchType: EventEmitter<string> = new EventEmitter();

  selectedSearchTypeValue: string;

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
      if (this.searchTypes && this.searchTypes.length > 0) {
        this.selectedSearchTypeValue = this.searchTypes[0].value;
      }
  }

  public handleSearchTypeClick(searchTypeValue: string): void {
    this.selectedSearchTypeValue = searchTypeValue;
    this.selectSearchType.emit(searchTypeValue);
  }
}
