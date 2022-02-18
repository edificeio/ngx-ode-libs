// import { OdeComponent } from 'ngx-ode-core';
import {
  Component,
  ContentChild,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
  Injector,
} from "@angular/core";

@Component({
  selector: "ode-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent {
  constructor(injector: Injector) {}

  set storedElements(list) {
    this._storedElements = list;
    this.listChange.emit(list);
  }

  get storedElements() {
    return this._storedElements;
  }

  /* Store pipe */
  self = this;
  // _storedElements = [];
  _storedElements = [];

  @Input() model: any = [];
  @Input() filters: any;
  @Input() inputFilter: any;
  @Input() sort: any;
  @Input() limit?: number;
  @Input() searchPlaceholder = "search";
  @Input() noResultsLabel = "list.results.no.items";
  @Input() isSearchActive = true;
  @Input() searchInput: boolean = false;
  @Input() infiniteScrollThrottle: number = 10;
  @Input() loading: boolean = false;
  @Input() searchSubmit: () => void = () => console.log("test");

  @Output() inputChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() onSelect: EventEmitter<any> = new EventEmitter();
  @Output() listChange: EventEmitter<any> = new EventEmitter();
  @Output() scrolledDown: EventEmitter<any> = new EventEmitter();

  @ContentChild(TemplateRef, { static: false }) templateRef?: TemplateRef<any>;
  @Input() isSelected = (arg?: any) => false;
  @Input() isDisabled = (arg?: any) => false;
  @Input() ngClass = (arg?: any) => ({});

  ngOnInit(): void {
    this._storedElements = this.model;
  }
}
