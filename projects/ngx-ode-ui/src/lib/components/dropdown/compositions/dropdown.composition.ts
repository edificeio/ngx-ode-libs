import { Component, NgModule } from "@angular/core";
import { DropdownModule } from "../dropdown.module";

@Component({
  selector: "dropdown-composition-1",
  template: `<ode-dropdown
    ngIf="isDropdownVisible"
    [name]="name"
    [isDropdownOpened]="isDropdownOpened"
    (onDropdown)="onDropdown()"
  ></ode-dropdown>`,
})
class DropdownCompositionComponent {
  name = "Structure";
  isDropdownVisible = false;
  isDropdownOpened = false;
  onDropdown() {
    alert("on click");
    this.isDropdownOpened = !this.isDropdownOpened;
  }
}

@NgModule({
  declarations: [DropdownCompositionComponent],
  imports: [DropdownModule],
  bootstrap: [DropdownCompositionComponent],
})
export class DropdownCompositionModule {}
