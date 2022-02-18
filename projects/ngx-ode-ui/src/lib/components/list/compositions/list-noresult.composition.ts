import { Component, NgModule } from "@angular/core";
import { ListModule } from "../list.module";

@Component({
  selector: "ode-list-composition-2",
  template: `<ode-list
    [model]="model"
    [isSearchActive]="isSearchActive"
    [loading]="loading"
    [noResultsLabel]="noResultsLabel"
    [searchInput]="searchInput"
  ></ode-list>`,
})
class ListCompositionComponent {
  model: any = [];
  loading: boolean = false;
  isSearchActive: boolean = true;
  searchInput: boolean = true;
  noResultsLabel: string = "Aucun résultat";
}

@NgModule({
  declarations: [ListCompositionComponent],
  imports: [ListModule],
  bootstrap: [ListCompositionComponent],
})
export class ListNoResultCompositionModule {}
