import { EventEmitter } from '../../../stencil-public-runtime';
import { DotFieldStatus, DotFieldValueEvent, DotFieldStatusEvent } from '../../../models';
/**
 * Represent a dotcms textarea control.
 *
 * @export
 * @class DotTextareaComponent
 */
export declare class DotTextareaComponent {
    el: HTMLElement;
    /** Value specifies the value of the <textarea> element */
    value: string;
    /** Name that will be used as ID */
    name: string;
    /** (optional) Text to be rendered next to <textarea> element */
    label: string;
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
    status: DotFieldStatus;
    dotValueChange: EventEmitter<DotFieldValueEvent>;
    dotStatusChange: EventEmitter<DotFieldStatusEvent>;
    /**
     * Reset properties of the field, clear value and emit events.
     *
     * @memberof DotTextareaComponent
     */
    reset(): Promise<void>;
    componentWillLoad(): void;
    componentDidLoad(): void;
    regexCheckWatch(): void;
    valueWatch(): void;
    render(): any;
    private validateProps;
    private getDisabledAtt;
    private getRequiredAttr;
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
