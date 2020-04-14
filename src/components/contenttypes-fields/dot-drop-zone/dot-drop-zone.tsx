/**
 * Represent a dotcms DotDropZone control.
 *
 * @export
 * @class DotDropZone
 */
import { Component, h, Host, Prop, State } from '@stencil/core';
import '@material/mwc-icon';
import { DotUploadService } from '../dot-form/services/dot-upload.service';
import { DotCMSTempFile } from 'dotcms-models';

@Component({
    tag: 'dot-drop-zone',
    styleUrl: 'dot-drop-zone.scss'
})
export class DotDropZone {
    /** URL of the endpoint to upload temporary files */
    @Prop() uploadURL = '/api/v1/temp/';

    /** URL to endpoint to register multipart files */
    @Prop() assetsURL = '/api/v1/workflow/actions/fire';

    @State()
    classes = {
        drop: false,
        'drag-enter': false,
        'drag-leave': false
    };

    render() {
        return (
            <Host
                class={{ ...this.classes }}
                ondrop={(event: DragEvent) => this.dropHandler(event)}
                ondragenter={(event: DragEvent) => this.dragEnterHandler(event)}
                ondragleave={(event: DragEvent) => this.dragOutHandler(event)}
                ondragover={(event: DragEvent) => this.dragOverHandler(event)}
            >
                <mwc-icon style={{ '--mdc-icon-size': '50px', color: '#444' }}>get_app</mwc-icon>
            </Host>
        );
    }

    private dragEnterHandler(event: DragEvent) {
        event.preventDefault();
        this.classes = { ...this.classes, ...{ 'drag-enter': true } };
    }

    private dragOutHandler(event: DragEvent) {
        event.preventDefault();
        this.classes = { ...this.classes, ...{ 'drag-enter': false, drop: false } };
    }

    private dropHandler(event: DragEvent) {
        const files = [];
        event.preventDefault();
        const uploadService = new DotUploadService();
        console.log('dropHandler: ', event);
        this.classes = { ...this.classes, ...{ drop: true, 'drag-enter': false } };
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

        uploadService.uploadBinaryFile(files).then((data: DotCMSTempFile | DotCMSTempFile[]) => {
            if (Array.isArray(data)) {
                this.createDotAsset(data);
            } else {
                this.createDotAsset([data]);
            }
        });
    }

    private dragOverHandler(event: DragEvent) {
        event.preventDefault();
    }

    private createDotAsset(files: DotCMSTempFile[]) {
        console.log('files: ', files);
        let path = `http://localhost:8080/api/v1/workflow/actions/default/fire/NEW`;
        files.forEach((file: DotCMSTempFile) => {
            const data = {
                contentlet: {
                    baseType: 'dotAsset',
                    asset: file.id
                }
            };
            fetch(path, {
                method: 'PUT',
                headers: {
                    Origin: window.location.hostname,
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                body: JSON.stringify(data)
            }).then(async (response: Response) => {
                console.log(response);
            });
        });
    }
}
