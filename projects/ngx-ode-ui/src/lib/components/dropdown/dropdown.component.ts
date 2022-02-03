import { Component, OnInit, Input, Output, EventEmitter, Injector } from '@angular/core';
import { OdeComponent } from 'ngx-ode-core';

/**
 * DropdownComponent is an alternative to the MonoSelectComponent.
 * Accept everything inside <ng-content> but should work with <ode-list> component
 * 
 * Simple Dropdown Component without search:
 * [isSearchActive] can be set to false to disable search input in <ode-list>
```
<ode-dropdown
    [name]="option_name"
    [isDropdownOpened]="a_boolean"
    (onDropdown)="toggle_func"
  >
  <ode-list
    [model]="model"
    [filters]="filters"
    (onSelect)="func_to_select_elem($event)"
    (inputChange)="a_string_for_input_value = $event"
    noResultsLabel="text_to_display"
    searchPlaceholder="default_placeholder_text"
    >
      <ng-template let-item>
        <div>{{ item.name }}</div>
      </ng-template>
    </ode-list>
  </ode-dropdown>
`̀``
 */

@Component({
  selector: 'ode-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent extends OdeComponent implements OnInit {

  constructor(injector: Injector) {
    super(injector);
  }

  @Input() name: string = '';
  @Input() isDropdownOpened: boolean = false;

  @Output() onDropdown: EventEmitter<void> =  new EventEmitter<void>();

  ngOnInit(): void {
    super.ngOnInit();
  }

}
