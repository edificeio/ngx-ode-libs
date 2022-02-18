import { Component, NgModule } from '@angular/core';
import { ListModule } from '../list.module';

@Component({
  selector: 'ode-list-composition-3',
  template: `<ode-list [model]="model" [isSearchActive]="isSearchActive" [loading]="loading" [noResultsLabel]="noResultsLabel" [searchInput]="searchInput"></ode-list>`
})
class ListCompositionComponent {
    model:any = [
        { id: "1", title: "Task 1" },
        { id: "2", title: "Task 2" },
        { id: "3", title: "Task 3" },
        { id: "4", title: "Task 4" },
        { id: "5", title: "Task 5" },
        { id: "6", title: "Task 6" },
    ]
  loading:boolean = false;
  isSearchActive:boolean = true;
  searchInput:boolean = true;
  noResultsLabel:string = 'Aucun résultat';
}

@NgModule({
  declarations: [ListCompositionComponent],
  imports: [ListModule],
  bootstrap: [ListCompositionComponent]
})
export class ListCompleteCompositionModule {}
