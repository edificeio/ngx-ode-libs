import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  Injector,
} from "@angular/core";
import { OdeComponent } from "ngx-ode-core";

@Component({
  selector: "ode-dropdown",
  templateUrl: "./dropdown.component.html",
  styleUrls: ["./dropdown.component.scss"],
})
export class DropdownComponent {
  constructor(injector: Injector) {
    //super(injector);
  }

  @Input()
  name: string = "";

  @Input()
  isDropdownOpened: boolean = false;

  @Output()
  onDropdown: EventEmitter<void> = new EventEmitter<void>();

  onToggleDropdown() {
    this.isDropdownOpened = !this.isDropdownOpened;
    this.onDropdown.emit();
  }
}
