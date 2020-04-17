/**
 * Represent a dotcms DotDropZone control.
 *
 * @export
 * @class DotDropZone
 */
import { Component, EventEmitter, h, Host, Prop, State, Event } from '@stencil/core';
import '@material/mwc-icon';
import '@material/mwc-dialog';
import '@material/mwc-list';
import { DotUploadService } from '../dot-form/services/dot-upload.service';
import { DotCMSTempFile } from 'dotcms-models';
import { DotAssetService } from '../dot-form/services/dot-asset.service';
import { DotHttpErrorResponse } from '../../../models/dot-http-error-response.model';
import { DotHttpErrorFileResponse } from '../../../models/dot-http-error-file-response.model';

@Component({
    tag: 'dot-drop-zone',
    styleUrl: 'dot-drop-zone.scss'
})
export class DotDropZone {
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
        dotAssetErrorHeader: 'Creating DotAssets Results'
    };

    /** Legend to be shown when creating dotAssets */
    @Prop() createAssetsText = 'Creating DotAssets';

    /** Emit an array of response with the DotAssets just created */
    @Event() dotDropZoneUploadComplete: EventEmitter<Response[]>;

    @State()
    classes = {
        drop: false,
        'drag-enter': false
    };

    @State() progressIndicator = 0;
    @State() progressBarText = '';

    private dropEventTarget = null;
    private showDialog = false;
    private errorMessage = '';
    private dialogHeader = '';

    componentDidLoad(): void {
        const dialog = document.querySelector('mwc-dialog');
        dialog.addEventListener('closing', () => this.hideOverlay());
    }

    render() {
        return (
            <Host
                class={{ ...this.classes }}
                ondrop={(event: DragEvent) => this.dropHandler(event)}
                ondragenter={(event: DragEvent) => this.dragEnterHandler(event)}
                ondragleave={(event: DragEvent) => this.dragOutHandler(event)}
                ondragover={(event: DragEvent) => this.dragOverHandler(event)}
            >
                <div class="dot-drop-zone__overlay" />
                <div class="dot-drop-zone__indicators">
                    <div class="dot-drop-zone__icon">
                        <mwc-icon>get_app</mwc-icon>
                        <span>{this.dropFilesText}</span>
                    </div>
                    <dot-progress-bar
                        progress={this.progressIndicator}
                        text={this.progressBarText}
                    />
                    <mwc-dialog heading={this.dialogHeader} open={this.showDialog}>
                        <div innerHTML={this.errorMessage} />
                        <mwc-button slot="primaryAction" dialogAction="close">
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
        this.classes = { ...this.classes, ...{ 'drag-enter': true } };
    }

    private dragOutHandler(event: DragEvent) {
        event.preventDefault();
        // avoid problems with child elements
        if (event.target === this.dropEventTarget) {
            this.classes = { ...this.classes, ...{ 'drag-enter': false, drop: false } };
        }
    }

    private dropHandler(event: DragEvent) {
        event.preventDefault();
        this.classes = { ...this.classes, ...{ drop: true, 'drag-enter': false } };
        this.uploadTemFiles(event);
    }

    private dragOverHandler(event: DragEvent) {
        event.preventDefault();
    }

    private updateProgressBar(value: number, processed?: number) {
        this.progressIndicator = processed ? processed / value * 100 : value;
        if (processed) {
            this.progressBarText = `${this.createAssetsText} ${value}/${processed}`;
        }
    }

    private uploadTemFiles(event: DragEvent) {
        const uploadService = new DotUploadService();
        const files: File[] = [];
        this.progressBarText = this.uploadFileText;
        if (event.dataTransfer.items) {
            for (let i = 0; i < event.dataTransfer.items.length; i++) {
                if (event.dataTransfer.items[i].kind === 'file') {
                    const file: File = event.dataTransfer.items[i].getAsFile();
                    files.push(file);
                }
            }
        } else {
            for (let i = 0; i < event.dataTransfer.files.length; i++) {
                files.push(event.dataTransfer.files.length[0]);
            }
        }

        uploadService
            .uploadBinaryFile(files, this.updateProgressBar.bind(this), this.maxFileSize)
            .then((data: DotCMSTempFile | DotCMSTempFile[]) => {
                this.createDotAsset(Array.isArray(data) ? data : [data]);
            })
            .catch(({ message }: DotHttpErrorResponse) => {
                this.dialogHeader = this.dialogLabels ? this.dialogLabels.uploadErrorHeader : '';
                this.errorMessage = message;
                this.showDialog = true;
            })
            .finally(() => {
                this.progressIndicator = 0;
            });
    }

    private createDotAsset(files: DotCMSTempFile[]) {
        const assetService = new DotAssetService();
        this.progressBarText = `${this.createAssetsText} ${files.length}/0`;
        assetService
            .create(files, this.updateProgressBar.bind(this), this.dotAssetsURL)
            .then((response: Response[]) => {
                this.hideOverlay();
                this.dotDropZoneUploadComplete.emit(response);
            })
            .catch((errors: DotHttpErrorFileResponse[]) => {
                this.dialogHeader = `${errors.length} out of ${files.length} files fail on DotAsset creation`;
                this.errorMessage = '<mwc-list>';
                errors.forEach((error: DotHttpErrorFileResponse) => {
                    this.errorMessage += `<mwc-list-item disabled="true" >${error.fileName}: ${error.message}</mwc-list-item>`;
                });
                this.errorMessage += '</mwc-list>';
                this.showDialog = true;
            })
            .finally(() => {
                this.progressIndicator = 0;
            });
    }

    private hideOverlay() {
        this.showDialog = false;
        this.classes = { 'drag-enter': false, drop: false };
    }
}
