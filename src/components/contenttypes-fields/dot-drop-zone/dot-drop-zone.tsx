/**
 * Represent a dotcms DotDropZone control.
 *
 * @export
 * @class DotDropZone
 */
import { Component, EventEmitter, h, Host, Prop, State, Event } from '@stencil/core';
import '@material/mwc-icon';
import '@material/dialog';
import { DotUploadService } from '../dot-form/services/dot-upload.service';
import { DotCMSTempFile } from 'dotcms-models';
import { DotAssetService } from '../dot-form/services/dot-asset.service';
import { DotHttpErrorResponse } from '../../../models/dot-http-error-response.model';

@Component({
    tag: 'dot-drop-zone',
    styleUrl: 'dot-drop-zone.scss'
})
export class DotDropZone {
    /** URL to endpoint to create dotAssets*/
    @Prop() dotAssetsURL = 'http://localhost:8080/api/v1/workflow/actions/default/fire/NEW';

    @Prop() maxFileSize = '';

    /** Legend to be shown when dropping files */
    @Prop() dropFilesText = 'Drop Files to Upload';

    /** Legend to be shown when uploading files */
    @Prop() uploadFileText = 'Uploading Files...';

    /** Legend to be shown when creating dotAssets */
    @Prop() createAssetsText = 'Creating DotAssets';

    @Event() dotDropZoneUploadComplete: EventEmitter;

    @State()
    classes = {
        drop: false,
        'drag-enter': false
    };

    @State() uploadProgressIndicator = 1;

    private dropEventTarget = null;

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
                        progress={this.uploadProgressIndicator}
                        text={this.uploadFileText}
                    />
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
        console.log('dragOverHandler');
        event.preventDefault();
    }

    private updateProgress(value: number) {
        this.uploadProgressIndicator = value;
    }

    private uploadTemFiles(event: DragEvent) {
        // const dialog = new MDCDialog(document.querySelector('.mdc-dialog'));
        // dialog.open();
        const uploadService = new DotUploadService();
        const files = [];

        if (event.dataTransfer.items) {
            for (let i = 0; i < event.dataTransfer.items.length; i++) {
                if (event.dataTransfer.items[i].kind === 'file') {
                    const file = event.dataTransfer.items[i].getAsFile();
                    files.push(file);
                }
            }
        } else {
            for (let i = 0; i < event.dataTransfer.files.length; i++) {
                files.push(event.dataTransfer.files.length[0]);
            }
        }

        uploadService
            .uploadBinaryFile(files, this.updateProgress.bind(this), this.maxFileSize)
            .then((data: DotCMSTempFile | DotCMSTempFile[]) => {
                this.createDotAsset(Array.isArray(data) ? data : [data]);
            })
            .catch(({ message, status }: DotHttpErrorResponse) => {
                console.log(`${status} - ${message}`);
                //TODO: Send error notification
                return null;
            })
            .finally(() => {
                this.uploadProgressIndicator = 1;
            });
    }

    private createDotAsset(files: DotCMSTempFile[]) {
        const assetService = new DotAssetService();

        assetService
            .create(files, this.dotAssetsURL)
            .then((responses: Response[]) => {
                console.log('create success Response: ', responses);
                this.classes = { 'drag-enter': false, drop: false };
                this.dotDropZoneUploadComplete.emit(true);
            })
            .catch((errors: DotHttpErrorResponse[]) => {
                debugger;
                //TODO: Send error notification
                console.log(`Errors:  - ${errors}`);
                return null;
            })
            .finally(() => {
                this.uploadProgressIndicator = 1;
            });
    }
}
