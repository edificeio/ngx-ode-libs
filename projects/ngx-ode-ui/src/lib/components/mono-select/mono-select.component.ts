import { Component, ElementRef, forwardRef, Input, Injector } from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {SelectOption} from '../multi-select/multi-select.component';
import { OdeComponent } from 'ngx-ode-core';

@Component({
    selector: 'ode-mono-select',
    templateUrl: './mono-select.component.html',
    providers: [{
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MonoSelectComponent),
      multi: true
    }],
    host: {
        '(document:click)': 'onClickOnDocument($event)',
        '(click)': 'onClickOnHost()'
    }
})
export class MonoSelectComponent<K> extends OdeComponent implements ControlValueAccessor {
    @Input()
    public placeholder = 'monoselect.placeholder.default';

    @Input()
    public options: Array<SelectOption<K>> = [];

    @Input()
    public trackByFn: (optionValue: K) => number | string;

    @Input()
    public translateOptions: boolean = true;

    public opened = false;

    public selectedOption: SelectOption<K> = null;

    @Input()
    public disabled = false;

    public optionClicked(option?: SelectOption<K>) {
        this.selectedOption = option;
        this.opened = false;
        this.onChange(this.selectedOption != null ? this.selectedOption.value : null);
    }

    constructor(private elementRef: ElementRef, injector: Injector) {
        super(injector);
    }

    public onClickOnDocument(event: MouseEvent) {
        if (this.opened &&
            !this.elementRef.nativeElement.querySelector('.lct-form-select').contains(event.target)) {
            this.opened = false;
        }
        return true;
    }

    public onClickOnHost() {
        if (!this.opened && !this.disabled) {
            this.opened = true;
        } else {
            this.opened = false;
        }
    }

    private onChange = (_: K) => {
    }

    private onTouched = () => {
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    writeValue(obj: K): void {
        this.selectedOption = this.options.find(option => option.value === obj);
        this.onChange(this.selectedOption ? this.selectedOption.value : null);
    }
}
