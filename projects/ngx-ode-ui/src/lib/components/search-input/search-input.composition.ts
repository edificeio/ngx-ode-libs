import { Component, NgModule } from "@angular/core";
import { SearchInputModule } from "./search-input.module";

@Component({
  selector: "search-composition-cmp",
  template: `<ode-search-input
    [isSearchActive]="isSearchActive"
    [searchInput]="searchInput"
  ></ode-search-input>`,
})
class SearchCompositionComponent {
  isSearchActive: boolean = true;
  searchInput: boolean = true;
}

@NgModule({
  declarations: [SearchCompositionComponent],
  imports: [SearchInputModule],
  bootstrap: [SearchCompositionComponent],
})
export class SearchCompositionModule {}
