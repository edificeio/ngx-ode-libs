import { Component, NgModule } from "@angular/core";
import { DropdownModule } from "../dropdown.module";
// import { ListModule } from '@clementcreusat/ngx-ode-ui.list/src/list.module';
import { ListModule } from "@clementcreusat/ngx-ode-ui.list/list.module";

@Component({
  selector: "dropdown-composition-2",
  template: `<ode-dropdown
    ngIf="isDropdownVisible"
    [name]="name"
    [isDropdownOpened]="isDropdownOpened"
    (onDropdown)="onDropdown()"
    ><ode-list [loading]="loading" [model]="model"></ode-list
  ></ode-dropdown>`,
})
class DropdownCompositionComponent {
  loading = true;
  model: any = [1, 2, 3, 4, 5, 6];
  name = "Structure";
  isDropdownOpened = true;
  isDropdownVisible = true;
  onDropdown() {
    alert("on click");
    this.isDropdownOpened = !this.isDropdownOpened;
  }
}

@NgModule({
  declarations: [DropdownCompositionComponent],
  imports: [DropdownModule, ListModule],
  bootstrap: [DropdownCompositionComponent],
})
export class DropdownOpenCompositionModule {}

// <ode-list [loading]="loading" [model]="model"></ode-list>
