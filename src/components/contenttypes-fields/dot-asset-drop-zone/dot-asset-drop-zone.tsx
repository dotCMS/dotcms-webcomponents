/**
 * Represent a dotcms DotAssetDropZone control.
 *
 * @export
 * @class DotAssetDropZone
 */
import { Component, EventEmitter, h, Host, Prop, State, Event } from '@stencil/core';
import '@material/mwc-icon';
import '@material/mwc-dialog';
import '@material/mwc-button';
import { DotUploadService } from '../dot-form/services/dot-upload.service';
import { DotCMSTempFile } from 'dotcms-models';
import { DotAssetService } from '../../../services/dot-asset/dot-asset.service';
import { DotHttpErrorResponse } from '../../../models/dot-http-error-response.model';

enum DotDropStatus {
    DROP = 'drop',
    DRAGENTER = 'drag-enter',
    CLEAR = ''
}

@Component({
    tag: 'dot-asset-drop-zone',
    styleUrl: 'dot-asset-drop-zone.scss',
    shadow: true
})
export class DotAssetDropZone {
    /** URL to endpoint to create dotAssets*/
    @Prop() dotAssetsURL = '/api/v1/workflow/actions/default/fire/NEW';

    @Prop() maxFileSize = '';

    /** Legend to be shown when dropping files */
    @Prop() dropFilesText = 'Drop Files to Upload';

    /** Legend to be shown when uploading files */
    @Prop() uploadFileText = 'Uploading Files...';

    /** Labels to be shown in error dialog */
    @Prop()
    dialogLabels = {
        closeButton: 'Close',
        uploadErrorHeader: 'Uploading File Results',
        dotAssetErrorHeader: '$0 of $1 uploaded file(s) failed'
    };

    /** Legend to be shown when creating dotAssets */
    @Prop() createAssetsText = 'Creating DotAssets';

    /** Error to be shown when try to upload a bigger size file than allowed*/
    @Prop() multiMaxSizeErrorLabel = 'One or more of the files exceeds the maximum file size';

    /** Error to be shown when try to upload a bigger size file than allowed*/
    @Prop() singeMaxSizeErrorLabel = 'The file exceeds the maximum file size';

    /** Emit an array of response with the DotAssets just created */
    @Event() uploadComplete: EventEmitter<Response[] | DotHttpErrorResponse[]>;

    @State() dropState: DotDropStatus = DotDropStatus.CLEAR;
    @State() progressIndicator = 0;
    @State() progressBarText = '';

    private dropEventTarget = null;
    private errorMessage = '';
    private dialogHeader = '';

    render() {
        return (
            <Host
                ondrop={(event: DragEvent) => this.dropHandler(event)}
                ondragenter={(event: DragEvent) => this.dragEnterHandler(event)}
                ondragleave={(event: DragEvent) => this.dragOutHandler(event)}
                ondragover={(event: DragEvent) => this.dragOverHandler(event)}
            >
                <div class={`${this.dropState} dot-asset-drop-zone__overlay`} />
                <div class={`${this.dropState} dot-asset-drop-zone__indicators`}>
                    <div class="dot-asset-drop-zone__icon">
                        <mwc-icon>get_app</mwc-icon>
                        <span>{this.dropFilesText}</span>
                    </div>
                    <dot-progress-bar
                        progress={this.progressIndicator}
                        text={this.progressBarText}
                    />
                    <mwc-dialog
                        heading={this.dialogHeader}
                        open={!!this.errorMessage}
                        onClosing={() => this.hideOverlay()}
                    >
                        {this.errorMessage}
                        <mwc-button dense unelevated slot="primaryAction" dialogAction="close">
                            {this.dialogLabels.closeButton}
                        </mwc-button>
                    </mwc-dialog>
                </div>
                <slot />
            </Host>
        );
    }

    private dragEnterHandler(event: DragEvent) {
        event.preventDefault();
        this.dropEventTarget = event.target;
        this.dropState = DotDropStatus.DRAGENTER;
    }

    private dragOutHandler(event: DragEvent) {
        event.preventDefault();
        // avoid problems with child elements
        if (event.target === this.dropEventTarget) {
            this.dropState = DotDropStatus.CLEAR;
        }
    }

    private dropHandler(event: DragEvent) {
        event.preventDefault();
        this.dropState = DotDropStatus.DROP;
        this.uploadTemFiles(event);
    }

    private dragOverHandler(event: DragEvent) {
        event.preventDefault();
    }

    private uploadTemFiles(event: DragEvent) {
        const uploadService = new DotUploadService();
        const files: File[] = [];
        this.updateProgressBar(0, this.uploadFileText);
        if (event.dataTransfer.items) {
            Array.from(event.dataTransfer.items).map((item: DataTransferItem) => {
                if (item.kind === 'file') {
                    files.push(item.getAsFile());
                }
            });
        } else {
            Array.from(event.dataTransfer.files).map((file: File) => {
                files.push(file);
            });
        }

        uploadService
            .uploadBinaryFile(files, this.updateProgressBar.bind(this), this.maxFileSize)
            .then((data: DotCMSTempFile | DotCMSTempFile[]) => {
                this.createDotAsset(Array.isArray(data) ? data : [data]);
            })
            .catch(({ message }: DotHttpErrorResponse) => {
                this.dialogHeader = this.dialogLabels ? this.dialogLabels.uploadErrorHeader : '';
                this.errorMessage = this.isMaxsizeError(message) ? (
                    <span>{this.multiMaxSizeErrorLabel}</span>
                ) : (
                    <span>{message}</span>
                );
            })
            .finally(() => {
                this.updateProgressBar(0, '');
            });
    }

    private createDotAsset(files: DotCMSTempFile[]) {
        const assetService = new DotAssetService();
        this.updateProgressBar(0, `${this.createAssetsText} ${files.length}/0`);
        assetService
            .create({
                files: files,
                updateCallback: filesCreated => {
                    this.updateDotAssetProgress(files.length, filesCreated);
                },
                url: this.dotAssetsURL
            })
            .then((response: Response[]) => {
                this.hideOverlay();
                this.uploadComplete.emit(response);
            })
            .catch((errors: DotHttpErrorResponse[]) => {
                this.dialogHeader = this.dialogLabels.dotAssetErrorHeader
                    .replace('$0', errors.length.toString())
                    .replace('$1', files.length.toString());
                this.errorMessage = this.formatErrorMessage(errors);
                this.uploadComplete.emit(errors);
            })
            .finally(() => {
                this.updateProgressBar(0, this.uploadFileText);
            });
    }

    private updateProgressBar(progress: number, text?: string) {
        this.progressIndicator = progress;
        if (text) {
            this.progressBarText = text;
        }
    }

    private updateDotAssetProgress(files: number, filesCreated: number) {
        this.updateProgressBar(
            filesCreated / files * 100,
            `${this.createAssetsText} ${files}/${filesCreated}`
        );
    }

    private hideOverlay() {
        this.errorMessage = '';
        this.dropState = DotDropStatus.CLEAR;
    }

    private isMaxsizeError(error: string): boolean {
        return error.includes('The maximum file size for this field is');
    }

    private formatErrorMessage(errors: DotHttpErrorResponse[]) {
        return (
            <ul class="dot-asset-drop-zone__error-list">
                {errors.map((err: DotHttpErrorResponse) => {
                    return <li>{err.message}</li>;
                })}
            </ul>
        );
    }
}
