/**
 * Represent a dotcms DotAssetDropZone control.
 *
 * @export
 * @class DotAssetDropZone
 */
import { Component, h, Host, Prop, State, Event } from '@stencil/core';
import '@material/mwc-icon';
import '@material/mwc-dialog';
import '@material/mwc-button';
import { DotUploadService } from '../contenttypes-fields/dot-form/services/dot-upload.service';
import { DotAssetService } from '../../services/dot-asset/dot-asset.service';
var DotDropStatus;
(function (DotDropStatus) {
    DotDropStatus["DROP"] = "drop";
    DotDropStatus["DRAGENTER"] = "drag-enter";
    DotDropStatus["NONE"] = "";
})(DotDropStatus || (DotDropStatus = {}));
export class DotAssetDropZone {
    constructor() {
        /** URL to endpoint to create dotAssets*/
        this.dotAssetsURL = '/api/v1/workflow/actions/default/fire/PUBLISH';
        /** Specify the max size of each file to be uploaded*/
        this.maxFileSize = '';
        /** Specify the the folder where the dotAssets will be placed*/
        this.folder = '';
        /** Legend to be shown when dropping files */
        this.dropFilesText = 'Drop Files to Upload';
        /** Legend to be shown when uploading files */
        this.uploadFileText = 'Uploading Files...';
        /** Labels to be shown in error dialog */
        this.dialogLabels = {
            closeButton: 'Close',
            uploadErrorHeader: 'Uploading File Results',
            dotAssetErrorHeader: '$0 of $1 uploaded file(s) failed',
            errorHeader: 'Error'
        };
        /** Legend to be shown when creating dotAssets */
        this.createAssetsText = 'Creating DotAssets';
        /** Error to be shown when try to upload a bigger size file than allowed*/
        this.multiMaxSizeErrorLabel = 'One or more of the files exceeds the maximum file size';
        /** Error to be shown when try to upload a bigger size file than allowed*/
        this.singeMaxSizeErrorLabel = 'The file exceeds the maximum file size';
        /** Error to be shown when an error happened on the uploading process*/
        this.uploadErrorLabel = 'Drop action not allowed.';
        this.dropState = DotDropStatus.NONE;
        this.progressIndicator = 0;
        this.progressBarText = '';
        this.dropEventTarget = null;
        this.errorMessage = '';
        this.dialogHeader = '';
    }
    render() {
        return (h(Host, { ondrop: (event) => this.dropHandler(event), ondragenter: (event) => this.dragEnterHandler(event), ondragleave: (event) => this.dragOutHandler(event), ondragover: (event) => this.dragOverHandler(event) },
            h("div", { class: `${this.dropState} dot-asset-drop-zone__indicators` },
                h("div", { class: "dot-asset-drop-zone__icon" },
                    h("mwc-icon", null, "get_app"),
                    h("span", null, this.dropFilesText)),
                h("dot-progress-bar", { progress: this.progressIndicator, text: this.progressBarText }),
                h("mwc-dialog", { heading: this.dialogHeader, open: !!this.errorMessage, onClosing: () => this.hideOverlay() },
                    this.errorMessage,
                    h("mwc-button", { dense: true, unelevated: true, slot: "primaryAction", dialogAction: "close" }, this.dialogLabels.closeButton))),
            h("slot", null)));
    }
    dragEnterHandler(event) {
        event.preventDefault();
        this.dropEventTarget = event.target;
        this.dropState = DotDropStatus.DRAGENTER;
    }
    dragOutHandler(event) {
        event.preventDefault();
        // avoid problems with child elements
        if (event.target === this.dropEventTarget) {
            this.dropState = DotDropStatus.NONE;
        }
    }
    dropHandler(event) {
        event.preventDefault();
        this.dropState = DotDropStatus.DROP;
        this.uploadTemFiles(event);
    }
    dragOverHandler(event) {
        event.preventDefault();
    }
    uploadTemFiles(event) {
        const uploadService = new DotUploadService();
        let files = [];
        this.updateProgressBar(0, this.uploadFileText);
        if (event.dataTransfer.items) {
            for (let item of Array.from(event.dataTransfer.items)) {
                try {
                    if (item.webkitGetAsEntry().isFile) {
                        files.push(item.getAsFile());
                    }
                    else {
                        this.showDialog(this.dialogLabels.errorHeader, this.uploadErrorLabel);
                        files = [];
                        break;
                    }
                }
                catch (_a) {
                    this.showDialog(this.dialogLabels.errorHeader, this.uploadErrorLabel);
                    files = [];
                }
            }
        }
        else {
            Array.from(event.dataTransfer.files).map((file) => {
                files.push(file);
            });
        }
        if (files.length) {
            uploadService
                .uploadBinaryFile(files, this.updateProgressBar.bind(this), this.maxFileSize)
                .then((data) => {
                this.createDotAsset(Array.isArray(data) ? data : [data]);
            })
                .catch(({ message }) => {
                this.showDialog(this.dialogLabels ? this.dialogLabels.uploadErrorHeader : '', this.isMaxsizeError(message) ? (h("span", null, this.multiMaxSizeErrorLabel)) : (h("span", null, message)));
            })
                .finally(() => {
                this.updateProgressBar(0, '');
            });
        }
    }
    createDotAsset(files) {
        const assetService = new DotAssetService();
        this.updateProgressBar(0, `${this.createAssetsText} 0/${files.length}`);
        assetService
            .create({
            files: files,
            updateCallback: (filesCreated) => {
                this.updateDotAssetProgress(files.length, filesCreated);
            },
            url: this.dotAssetsURL,
            folder: this.folder
        })
            .then((response) => {
            this.hideOverlay();
            debugger;
            this.uploadComplete.emit(response);
        })
            .catch((errors) => {
            this.showDialog(this.dialogLabels.dotAssetErrorHeader
                .replace('$0', errors.length.toString())
                .replace('$1', files.length.toString()), this.formatErrorMessage(errors));
            this.uploadComplete.emit(errors);
        })
            .finally(() => {
            this.updateProgressBar(0, this.uploadFileText);
        });
    }
    updateProgressBar(progress, text) {
        this.progressIndicator = progress;
        if (text) {
            this.progressBarText = text;
        }
    }
    updateDotAssetProgress(totalFiles, filesCreated) {
        this.updateProgressBar((filesCreated / totalFiles) * 100, `${this.createAssetsText} ${filesCreated}/${totalFiles}`);
    }
    hideOverlay() {
        this.hideDialog();
        this.dropState = DotDropStatus.NONE;
    }
    isMaxsizeError(error) {
        return error.includes('The maximum file size for this field is');
    }
    formatErrorMessage(errors) {
        return (h("ul", { class: "dot-asset-drop-zone__error-list" }, errors.map((err) => {
            return h("li", null, err.message);
        })));
    }
    showDialog(header, message) {
        this.dialogHeader = header;
        this.errorMessage = message;
    }
    hideDialog() {
        this.dialogHeader = '';
        this.errorMessage = '';
    }
    static get is() { return "dot-asset-drop-zone"; }
    static get originalStyleUrls() { return {
        "$": ["dot-asset-drop-zone.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["dot-asset-drop-zone.css"]
    }; }
    static get properties() { return {
        "dotAssetsURL": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "URL to endpoint to create dotAssets"
            },
            "attribute": "dot-assets-u-r-l",
            "reflect": false,
            "defaultValue": "'/api/v1/workflow/actions/default/fire/PUBLISH'"
        },
        "maxFileSize": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Specify the max size of each file to be uploaded"
            },
            "attribute": "max-file-size",
            "reflect": false,
            "defaultValue": "''"
        },
        "folder": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Specify the the folder where the dotAssets will be placed"
            },
            "attribute": "folder",
            "reflect": false,
            "defaultValue": "''"
        },
        "dropFilesText": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Legend to be shown when dropping files"
            },
            "attribute": "drop-files-text",
            "reflect": false,
            "defaultValue": "'Drop Files to Upload'"
        },
        "uploadFileText": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Legend to be shown when uploading files"
            },
            "attribute": "upload-file-text",
            "reflect": false,
            "defaultValue": "'Uploading Files...'"
        },
        "dialogLabels": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "{ closeButton: string; uploadErrorHeader: string; dotAssetErrorHeader: string; errorHeader: string; }",
                "resolved": "{ closeButton: string; uploadErrorHeader: string; dotAssetErrorHeader: string; errorHeader: string; }",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Labels to be shown in error dialog"
            },
            "defaultValue": "{\n        closeButton: 'Close',\n        uploadErrorHeader: 'Uploading File Results',\n        dotAssetErrorHeader: '$0 of $1 uploaded file(s) failed',\n        errorHeader: 'Error'\n    }"
        },
        "createAssetsText": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Legend to be shown when creating dotAssets"
            },
            "attribute": "create-assets-text",
            "reflect": false,
            "defaultValue": "'Creating DotAssets'"
        },
        "multiMaxSizeErrorLabel": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Error to be shown when try to upload a bigger size file than allowed"
            },
            "attribute": "multi-max-size-error-label",
            "reflect": false,
            "defaultValue": "'One or more of the files exceeds the maximum file size'"
        },
        "singeMaxSizeErrorLabel": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Error to be shown when try to upload a bigger size file than allowed"
            },
            "attribute": "singe-max-size-error-label",
            "reflect": false,
            "defaultValue": "'The file exceeds the maximum file size'"
        },
        "uploadErrorLabel": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Error to be shown when an error happened on the uploading process"
            },
            "attribute": "upload-error-label",
            "reflect": false,
            "defaultValue": "'Drop action not allowed.'"
        }
    }; }
    static get states() { return {
        "dropState": {},
        "progressIndicator": {},
        "progressBarText": {}
    }; }
    static get events() { return [{
            "method": "uploadComplete",
            "name": "uploadComplete",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "Emit an array of Contentlets just created or array of errors"
            },
            "complexType": {
                "original": "DotCMSContentlet[] | DotHttpErrorResponse[]",
                "resolved": "DotCMSContentlet[] | DotHttpErrorResponse[]",
                "references": {
                    "DotCMSContentlet": {
                        "location": "import",
                        "path": "dotcms-models"
                    },
                    "DotHttpErrorResponse": {
                        "location": "import",
                        "path": "../../models/dot-http-error-response.model"
                    }
                }
            }
        }]; }
}
