import { HostBinding } from '@angular/core';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Injector } from '@angular/core';
import { OdeComponent } from 'ngx-ode-core';

export type MessageType = 'info' | 'success' | 'warning' | 'danger';

export const icons = {
    info : 'fa-question-circle',
    warning : 'fa-exclamation-circle',
    danger : 'fa-ban',
    success : 'fa-check-circle'
};

@Component({
    selector: 'message-box',
    templateUrl: './message-box.component.html',
    styleUrls: ['./message-box.component.scss']
})
export class MessageBoxComponent extends OdeComponent implements OnInit {
    constructor(
        private eltRef: ElementRef,
        injector: Injector)  {
          super(injector);
        }

    @Input() type: MessageType;
    @Input() header: string;

    // type (string | [string,Object])[] enable to pass an array of String where String is i18n key
    // or an array of tuple<String, Object> where String is i18n key and Object is 118n params
    private _messages: [string, {}][];
    @Input() set messages(value: (string | [string, {}])[]) {
        this._messages = [];

        for (const message of value) {
            if (typeof message == 'string') {
                this._messages.push([message, {}]);
            }
            else if (typeof message == 'object') {
                this._messages.push(message);
            }
        }
    }
    get messages() {
        return this._messages;
    }

    private _position: 'absolute' | 'inherit' = 'inherit';
    @Input() set position(value: 'absolute' | 'inherit') {
        this._position = value;
    }

    /**
     * `gravity` set the relative position of the message box if its position is 'absolute'.
     * No effect when position is 'inherit'.
     */
    @Input() gravity: 'left' | 'right' = 'left';
    @HostBinding('class.gravity-left') get isGravityLeft() { return this.gravity === 'left' }
    @HostBinding('class.gravity-right') get isGravityRight() { return this.gravity === 'right' }

    hidden = false;
    @Output('onHide') hideEvent: EventEmitter<void>;
    canHide(): boolean {
        if (this._position == 'absolute') {
            return true;
        }
        return false;
    }
    hide(): void {
        this.hidden = true;
        this.hideEvent.emit();
    }

    ngOnInit(): void {
        super.ngOnInit();
        if (this.type == undefined) {
            throw new Error('MessageSticker : type\' property must be set');
        }
        this.eltRef.nativeElement.style.position = this._position;
        if (this._position == 'absolute') {
            this.eltRef.nativeElement.style.width = '450px';
            // TODO: Maybe use a static counter to push on top the last open MessageBox ?
            this.eltRef.nativeElement.style.zIndex = '10';
        }

    }
}

