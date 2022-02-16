/* import {
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
export class DropdownComponent extends OdeComponent implements OnInit {
  constructor(injector: Injector) {
    super(injector);
  }

  @Input() name: string = "";
  @Input() isDropdownOpened: boolean = false;

  @Output() onDropdown: EventEmitter<void> = new EventEmitter<void>();

  ngOnInit(): void {
    super.ngOnInit();
  }
}
 */

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
  @Input() name: string = "";
  @Input() model = [];
  @Input() isDropdownOpened: boolean = false;

  @Output() onDropdown: EventEmitter<void> = new EventEmitter<void>();
}
