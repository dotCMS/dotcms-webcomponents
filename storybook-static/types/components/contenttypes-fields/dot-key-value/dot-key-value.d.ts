import { EventEmitter } from '../../../stencil-public-runtime';
import { DotFieldStatus, DotFieldValueEvent, DotFieldStatusEvent, DotKeyValueField } from '../../../models';
export declare class DotKeyValueComponent {
    el: HTMLElement;
    /** Value of the field */
    value: string;
    /** Name that will be used as ID */
    name: string;
    /** (optional) Text to be rendered next to input field */
    label: string;
    /** (optional) Hint text that suggest a clue of the field */
    hint: string;
    /** (optional) Determine if it is mandatory */
    required: boolean;
    /** (optional) Text that will be shown when required is set and condition is not met */
    requiredMessage: string;
    /** (optional) Disables field's interaction */
    disabled: boolean;
    /** (optional) Placeholder for the key input text in the <key-value-form> */
    formKeyPlaceholder: string;
    /** (optional) Placeholder for the value input text in the <key-value-form> */
    formValuePlaceholder: string;
    /** (optional) The string to use in the key label in the <key-value-form> */
    formKeyLabel: string;
    /** (optional) The string to use in the value label in the <key-value-form> */
    formValueLabel: string;
    /** (optional) Label for the add button in the <key-value-form> */
    formAddButtonLabel: string;
    /** (optional) The string to use in the delete button of a key/value item */
    listDeleteLabel: string;
    status: DotFieldStatus;
    items: DotKeyValueField[];
    dotValueChange: EventEmitter<DotFieldValueEvent>;
    dotStatusChange: EventEmitter<DotFieldStatusEvent>;
    valueWatch(): void;
    /**
     * Reset properties of the field, clear value and emit events.
     */
    reset(): Promise<void>;
    deleteItemHandler(event: CustomEvent<number>): void;
    addItemHandler({ detail }: CustomEvent<DotKeyValueField>): void;
    componentWillLoad(): void;
    render(): any;
    private isDisabled;
    private blurHandler;
    private validateProps;
    private setOriginalStatus;
    private isValid;
    private showErrorMessage;
    private getErrorMessage;
    private refreshStatus;
    private emitStatusChange;
    private emitValueChange;
    private emitChanges;
}
