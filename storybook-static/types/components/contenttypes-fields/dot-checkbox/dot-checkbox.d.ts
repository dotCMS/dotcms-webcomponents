import { EventEmitter } from '../../../stencil-public-runtime';
import { DotOption, DotFieldStatus, DotFieldValueEvent, DotFieldStatusEvent } from '../../../models';
export declare class DotCheckboxComponent {
    el: HTMLElement;
    /** Name that will be used as ID */
    name: string;
    /** (optional) Text to be rendered next to input field */
    label: string;
    /** (optional) Hint text that suggest a clue of the field */
    hint: string;
    /** Value/Label checkbox options separated by comma, to be formatted as: Value|Label */
    options: string;
    /** (optional) Determine if it is mandatory */
    required: boolean;
    /** (optional) Disables field's interaction */
    disabled: boolean;
    /** (optional) Text that will be shown when required is set and condition is not met */
    requiredMessage: string;
    /** Value set from the checkbox option */
    value: string;
    _options: DotOption[];
    status: DotFieldStatus;
    dotValueChange: EventEmitter<DotFieldValueEvent>;
    dotStatusChange: EventEmitter<DotFieldStatusEvent>;
    componentWillLoad(): void;
    componentDidLoad(): void;
    optionsWatch(): void;
    valueWatch(): void;
    /**
     * Reset properties of the field, clear value and emit events.
     *
     * @memberof DotSelectComponent
     */
    reset(): Promise<void>;
    render(): any;
    private validateProps;
    private setValue;
    private getValueFromCheckInputs;
    private emitStatusChange;
    private isValid;
    private emitValueChange;
}
