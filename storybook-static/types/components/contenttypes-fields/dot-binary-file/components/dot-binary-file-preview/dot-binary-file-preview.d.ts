import { EventEmitter } from '../../../../../stencil-public-runtime';
/**
 * Represent a dotcms text field for the binary file preview.
 *
 * @export
 * @class DotBinaryFilePreviewComponent
 */
export declare class DotBinaryFilePreviewComponent {
    el: HTMLElement;
    /** file name to be displayed */
    fileName: string;
    /** (optional) file URL to be displayed */
    previewUrl: string;
    /** (optional) Delete button's label */
    deleteLabel: string;
    /** Emit when the file is deleted */
    delete: EventEmitter;
    render(): any;
    private clearFile;
    private getPreviewElement;
    private getExtention;
}
