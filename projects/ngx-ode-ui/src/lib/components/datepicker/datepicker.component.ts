import { OdeComponent } from 'ngx-ode-core';
import { AfterViewInit, Component, ElementRef, EventEmitter, forwardRef,
  Input, OnDestroy, Output, Renderer2, ViewChild, Injector } from '@angular/core';

import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgModel } from '@angular/forms';

import {LabelsService} from '../../services/labels.service';
import Flatpickr from 'flatpickr';
import French from 'flatpickr/dist/l10n/fr.js';

// access ngmodel
const NOOP = () => {
};
export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DatepickerComponent),
    multi: true
};

@Component({
    selector: 'ode-date-picker',
    templateUrl: './datepicker.component.html',
    styleUrls: ['./datepicker.component.scss'],
    providers: [ CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR ]
})
export class DatepickerComponent extends OdeComponent implements OnDestroy, AfterViewInit, ControlValueAccessor {

    constructor(private renderer: Renderer2,
                private labelsService: LabelsService,
                injector: Injector) {
                    super(injector);
                }

    get value(): any {
        return this.innerValue;
    }

    set value(v: any) {
        let init = false;
        if (this.innerValue === undefined) {
            init = true;
        }
        if (v !== this.innerValue) {
            this.innerValue = v;
            this.onChangeCallback(v);
            if (!init) {
                this.changeDate.emit(v);
            }

        }
    }

    private innerValue: any = '';

    @ViewChild('datePickerElement')
    datePickerElement: ElementRef;

    @ViewChild('inputRef')
    inputElement: ElementRef;

    // instance flatpickr
    private datePickerInst: Flatpickr;

    @ViewChild(NgModel)
    model: NgModel;

    @Input()
    disabled = false;

    @Input()
    set readonly( val:boolean ) {
        this._readonly = val;
        if( this.datePickerInst && this.datePickerInst.altInput ) {
            // Apply the readonly attribute addition/removal to the visible input (wrapped)
            if( val ) this.datePickerInst.altInput.setAttribute('readonly', "");
            else      this.datePickerInst.altInput.removeAttribute('readonly');
        }
    }
    get readonly():boolean {
        return this._readonly;
    }
    _readonly = false;

    @Input()
    enableTime = false;

    @Input()
    placeholder = '';

    @Input()
    minDate;

    @Input()
    maxDate;

    @Output()
    changeDate: EventEmitter<string> = new EventEmitter<string>();

    private onChangeCallback: (_: any) => void = NOOP;
    private onTouchedCallback: () => void = NOOP;

    ngAfterViewInit(): void {
        super.ngAfterViewInit();
        // add attr data-input, mandatory for the picker to work in wrap mode
        this.renderer.setAttribute(this.inputElement.nativeElement, 'data-input', '');

        // disabled case
        if (this.disabled === true) {
            this.model.control.disable();
        }

        const navigatorLanguage = navigator.language.split('-')[0];
        let datePickerLocale = {};
        if (navigatorLanguage === 'fr') {
            datePickerLocale = French.fr;
        }

        // options for the flatpickr instance
        const options = {
            altInput: !this.disabled,
            altFormat: 'd/m/Y', // date format displayed to user
            dateFormat: 'Y-m-d', // date format sent to server
            allowInput: false,
            enableTime: this.enableTime,
            minDate: this.minDate,
            maxDate: this.maxDate,
            clickOpens: false,
            wrap: true, // to add input decoration (calendar icon and delete icon)
            locale: datePickerLocale
        };

        this.datePickerInst = new Flatpickr(this.datePickerElement.nativeElement, options);
        if( !this.disabled ) {
            this.datePickerInst.altInput.addEventListener('click', e => {
                if( !this.readonly ) {
                    this.datePickerInst.toggle();
                }
            });
        }

        // Force updating the date input readonly attribute :
        this.readonly = this._readonly;
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
        this.datePickerInst.destroy();
    }

    writeValue(value: any): void {
        if (value !== this.innerValue && this.datePickerInst) {
            this.innerValue = value;
            this.datePickerInst.setDate(value);
            this.onChangeCallback(value);
        }
    }

    registerOnChange(fn: any): void {
        this.onChangeCallback = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouchedCallback = fn;
    }

    labels(label) {
        return this.labelsService.getLabel(label);
    }
}
