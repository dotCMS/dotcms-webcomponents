import { EventEmitter } from '../../../stencil-public-runtime';
import { DotFieldStatus, DotFieldValueEvent, DotFieldStatusEvent } from '../../../models';
export declare class DotTagsComponent {
    el: HTMLElement;
    /** Value formatted splitted with a comma, for example: tag-1,tag-2 */
    value: string;
    /** Name that will be used as ID */
    name: string;
    /** (optional) Text to be rendered next to input field */
    label: string;
    /** (optional) Hint text that suggest a clue of the field */
    hint: string;
    /** (optional) text to show when no value is set */
    placeholder: string;
    /** (optional) Determine if it is mandatory */
    required: boolean;
    /** (optional) Text that be shown when required is set and value is not set */
    requiredMessage: string;
    /** (optional) Disables field's interaction */
    disabled: boolean;
    /** Min characters to start search in the autocomplete input */
    threshold: number;
    /** Duraction in ms to start search into the autocomplete */
    debounce: number;
    /** Function or array of string to get the data to use for the autocomplete search */
    data: () => Promise<string[]> | string[];
    status: DotFieldStatus;
    dotValueChange: EventEmitter<DotFieldValueEvent>;
    dotStatusChange: EventEmitter<DotFieldStatusEvent>;
    /**
     * Reset properties of the filed, clear value and emit events.
     */
    reset(): Promise<void>;
    valueWatch(): void;
    componentWillLoad(): void;
    render(): any;
    private addTag;
    private blurHandler;
    private emitChanges;
    private emitStatusChange;
    private emitValueChange;
    private getErrorMessage;
    private getValues;
    private isDisabled;
    private isValid;
    private onEnterHandler;
    private onSelectHandler;
    private removeTag;
    private showErrorMessage;
    private updateStatus;
    private validateProps;
}
