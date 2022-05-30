import { OdeComponent } from 'ngx-ode-core';
import { Component, ContentChild, EventEmitter, Input, Output, TemplateRef, Injector } from '@angular/core';

/**
 * ListCheckableComponent is an alternative to the ListComponent to easily select rows by using a checkbox.
 * 
 * 
```
<ode-list-checkable
      [readOnly]="a_boolean"
      [model]="an_array_of_items"
      [filters]=""
      [sort]="'+displayName'"
      [limit]="a_number"
      [noResultsLabel]="text_to_display_when_no_item_in_model"
      [isChecked]="a_lambda_which_takes_1_item_argument_and_returns_a_boolean"
      [areAllChecked]="a_lambda_with_no_argument_which_returns_a_boolean"
      [ngClass]="a_lambda_which_takes_1_item_argument_and_returns_an_object"
      (onCheck)="emits_an_$event_like_{item:any; checked:boolean}"
      (listChange)=""
      (scrolledDown)=""
      >

    <ng-template let-item>
      <span>{{item.displayName|translate}}</span>
    </ng-template>
    
</ode-list-checkable>
`̀``
 */

type OnCheckData = {item:any, checked:boolean};

@Component({
    selector: 'ode-list-checkable',
    templateUrl: './list-checkable.component.html',
    styleUrls: ['./list-checkable.component.scss']
})
export class ListCheckableComponent extends OdeComponent {
    @Input() model = [];
    @Input() filters;
    @Input() sort;
    @Input() limit: number;
    @Input() noResultsLabel = 'list.results.no.items';
    @Input() readOnly: boolean = false;

    @Output() onCheck: EventEmitter<OnCheckData> = new EventEmitter();
    @Output() listChange: EventEmitter<any> = new EventEmitter();
    @Output() scrolledDown: EventEmitter<void> = new EventEmitter();

    @ContentChild(TemplateRef) templateRef: TemplateRef<any>;

    @Input() areAllChecked = () => false;
    @Input() isChecked = (arg?: any) => false;
    @Input() isDisabled = (arg?: any) => false;
    @Input() ngClass = (arg?: any) => ({});

    /* Store pipe */
    self = this;
    _storedElements = [];
    set storedElements(list) {
        this._storedElements = list;
        this.listChange.emit(list);
    }
    get storedElements() {
        return this._storedElements;
    }

    constructor(injector: Injector) {
        super(injector);
    }

    public toggleAll( checkAll:boolean ) {
        this.model.forEach( item => {
            const isChecked = this.isChecked(item);
            if( !this.isDisabled(item)
                 && ((isChecked && !checkAll) || (!isChecked && checkAll)) ) {
                this.onCheck.emit( {item:item, checked:checkAll} );
            }
        })
    }

}
