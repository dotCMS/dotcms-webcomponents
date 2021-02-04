import { EventEmitter } from '../../../stencil-public-runtime';
import { DotFieldStatus, DotFieldValueEvent, DotFieldStatusEvent } from '../../../models';
/**
 * Represent a dotcms input control.
 *
 * @export
 * @class DotTextfieldComponent
 */
export declare class DotTextfieldComponent {
    el: HTMLElement;
    /** Value specifies the value of the <input> element */
    value: string;
    /** Name that will be used as ID */
    name: string;
    /** (optional) Text to be rendered next to input field */
    label: string;
    /** (optional) Placeholder specifies a short hint that describes the expected value of the input field */
    placeholder: string;
    /** (optional) Hint text that suggest a clue of the field */
    hint: string;
    /** (optional) Determine if it is mandatory */
    required: boolean;
    /** (optional) Text that be shown when required is set and condition not met */
    requiredMessage: string;
    /** (optional) Text that be shown when the Regular Expression condition not met */
    validationMessage: string;
    /** (optional) Disables field's interaction */
    disabled: boolean;
    /** (optional) Regular expresion that is checked against the value to determine if is valid  */
    regexCheck: string;
    /** type specifies the type of <input> element to display */
    type: string;
    status: DotFieldStatus;
    dotValueChange: EventEmitter<DotFieldValueEvent>;
    dotStatusChange: EventEmitter<DotFieldStatusEvent>;
    /**
     * Reset properties of the field, clear value and emit events.
     */
    reset(): Promise<void>;
    componentWillLoad(): void;
    componentDidLoad(): void;
    regexCheckWatch(): void;
    typeWatch(): void;
    render(): any;
    private validateProps;
    private isValid;
    private isValueRequired;
    private isRegexValid;
    private shouldShowErrorMessage;
    private getErrorMessage;
    private blurHandler;
    private setValue;
    private emitStatusChange;
    private emitValueChange;
}
