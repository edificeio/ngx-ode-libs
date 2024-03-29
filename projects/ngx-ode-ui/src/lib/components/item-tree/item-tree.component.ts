import { OdeComponent } from 'ngx-ode-core';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ContentChild, TemplateRef, Injector } from '@angular/core';

@Component({
    selector: 'ode-item-tree',
    templateUrl: './item-tree.component.html'
})
export class ItemTreeComponent<T> extends OdeComponent implements OnInit {

    constructor(injector: Injector) {
        super(injector);
    }

    /**** Inputs ****/

    // Items
    @Input() items: Array<any> = [];

    // Property containing the list of child objects.
    @Input('children') childrenProperty = 'children';
    // Property to display in the list
    @Input('display') displayProperty = 'label';
    @Input() displayTemplate: TemplateRef<any>;
    // Filter pipe argument
    @Input() filter: (Object | string | Function) = '';
    // OrderBy pipe argument
    @Input() order: (Array<any> | string | Function) = [];
    // Reverse the order pipe
    @Input() reverse: any = false;
    // Flatten the tree on the specified properties
    @Input()
    set flatten(flattenProps: Array<string>) {
        if (!this.isFlattened() && flattenProps.length > 0) {
            this._selectedItem = this._lastSelectedItem;
        } else if (this.isFlattened && flattenProps.length < 1) {
            this.flagIfParent();
        }
        this._flattenProps = flattenProps;
    }
    get flatten(): Array<string> {
        return this._flattenProps;
    }
    private _flattenProps: Array<string> = [];

    // Disable the opener icon
    @Input() disableOpener = false;

    // Use checkboxes instead of selecting items
    @Input() checkboxMode = false;

    /**** Outputs ****/

    @Output() onSelect: EventEmitter<T> = new EventEmitter<T>();

    @Output() onCheck: EventEmitter<T> = new EventEmitter<T>();

    /**** View ****/

    @ViewChild(ItemTreeComponent) childItemTree: ItemTreeComponent<T>;

    /**** Internal Logic ****/

    @Input('lastSelected') _lastSelectedItem: T;
    private _selectedItem: T;
    @Input('depth') _depth = 0;
    private unfolded: T[] = [];

    ngOnInit() {
        super.ngOnInit();
        this.flagIfParent();
    }

    public selectItem(item: T) {
        this._selectedItem = item;
        if (this.childItemTree) {
            delete this.childItemTree._selectedItem;
        }
        const idx = this.unfolded.indexOf(item);
        if (!this.disableOpener && idx < 0) {
            this.unfolded.push(item);
        } else {
          this.unfolded.splice(idx, 1);
        }
        this.bubbleSelect(item);
    }

    public checkItem(item: T) {
        this.onCheck.emit(item);
    }

    public bubbleSelect(item: T) {
        this._lastSelectedItem = item;
        this.onSelect.emit(item);
    }

    public isSelected(item) {
        return (this.disableOpener ? this._selectedItem : this._lastSelectedItem) === item;
    }

    public toggleFold(event: Event, item: T) {
        event.stopPropagation();
        const idx = this.unfolded.indexOf(item);
        if (idx < 0) {
            this.unfolded.push(item);
        } else {
            this.unfolded.splice(idx, 1);
        }
    }

    public isFolded(item: T) {
        return this.disableOpener ? !this.isSelected(item) : this.unfolded.indexOf(item) < 0;
    }

    public display(item: T) {
        return this.displayProperty && item[this.displayProperty];
    }

    public getChildren(item) {
        return item[this.childrenProperty] || [];
    }

    public hasChildren(item) {
        return this.getChildren(item).length > 0;
    }

    isFlattened() {
        return this._flattenProps.length;
    }

    private flagIfParent() {
        if (!this._lastSelectedItem) {
            return;
        }

        const findSubItem = (item, target) => {
            if (item === target) {
                return true;
            }
            if (this.hasChildren(item)) {
                return this.getChildren(item).find(subItem => {
                    return findSubItem(subItem, target);
                });
            }
            return false;
        };

        for (const i in this.items) {
            const item = this.items[i];

            if (item === this._lastSelectedItem ||
                    findSubItem(item, this._lastSelectedItem)) {
                this._selectedItem = item;
                this.unfolded = [item];
                break;
            }
        }

        this.changeDetector.markForCheck();
    }

}
