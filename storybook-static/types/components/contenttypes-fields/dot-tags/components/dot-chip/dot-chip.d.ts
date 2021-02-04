import { EventEmitter } from '../../../../../stencil-public-runtime';
export declare class DotChipComponent {
    el: HTMLElement;
    /** Chip's label */
    label: string;
    /** (optional) Delete button's label */
    deleteLabel: string;
    /** (optional) If is true disabled the delete button */
    disabled: boolean;
    remove: EventEmitter<String>;
    render(): any;
}
