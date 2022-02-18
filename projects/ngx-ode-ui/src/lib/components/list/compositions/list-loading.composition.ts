import { Component, NgModule } from '@angular/core';
import { ListModule } from '../list.module';

@Component({
  selector: 'ode-list-composition',
  template: `<ode-list [model]="model" [isSearchActive]="isSearchActive" [loading]="loading" [noResultsLabel]="noResultsLabel" [searchInput]="searchInput"></ode-list>`
})
class ListCompositionComponent {
  model:any = [1, 2, 3, 4, 5, 6];
  loading:boolean = true;
  isSearchActive:boolean = true;
  searchInput:boolean = true;
  noResultsLabel:string = '';
}

@NgModule({
  declarations: [ListCompositionComponent],
  imports: [ListModule],
  bootstrap: [ListCompositionComponent]
})
export class ListLoadingCompositionModule {}
