/**
 * Represent a dotcms DotAssetDropZone control.
 *
 * @export
 * @class DotAssetDropZone
 */
import { EventEmitter } from '../../stencil-public-runtime';
import '@material/mwc-icon';
import '@material/mwc-dialog';
import '@material/mwc-button';
import { DotCMSContentlet } from 'dotcms-models';
import { DotHttpErrorResponse } from '../../models/dot-http-error-response.model';
declare enum DotDropStatus {
    DROP = "drop",
    DRAGENTER = "drag-enter",
    NONE = ""
}
export declare class DotAssetDropZone {
    /** URL to endpoint to create dotAssets*/
    dotAssetsURL: string;
    /** Specify the max size of each file to be uploaded*/
    maxFileSize: string;
    /** Specify the the folder where the dotAssets will be placed*/
    folder: string;
    /** Legend to be shown when dropping files */
    dropFilesText: string;
    /** Legend to be shown when uploading files */
    uploadFileText: string;
    /** Labels to be shown in error dialog */
    dialogLabels: {
        closeButton: string;
        uploadErrorHeader: string;
        dotAssetErrorHeader: string;
        errorHeader: string;
    };
    /** Legend to be shown when creating dotAssets */
    createAssetsText: string;
    /** Error to be shown when try to upload a bigger size file than allowed*/
    multiMaxSizeErrorLabel: string;
    /** Error to be shown when try to upload a bigger size file than allowed*/
    singeMaxSizeErrorLabel: string;
    /** Error to be shown when an error happened on the uploading process*/
    uploadErrorLabel: string;
    /** Emit an array of Contentlets just created or array of errors */
    uploadComplete: EventEmitter<DotCMSContentlet[] | DotHttpErrorResponse[]>;
    dropState: DotDropStatus;
    progressIndicator: number;
    progressBarText: string;
    private dropEventTarget;
    private errorMessage;
    private dialogHeader;
    render(): any;
    private dragEnterHandler;
    private dragOutHandler;
    private dropHandler;
    private dragOverHandler;
    private uploadTemFiles;
    private createDotAsset;
    private updateProgressBar;
    private updateDotAssetProgress;
    private hideOverlay;
    private isMaxsizeError;
    private formatErrorMessage;
    private showDialog;
    private hideDialog;
}
export {};
