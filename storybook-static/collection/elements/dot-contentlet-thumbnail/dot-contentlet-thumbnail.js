import { Component, h, Host, Prop, State } from '@stencil/core';
export class DotContentletThumbnail {
    constructor() {
        this.height = '';
        this.width = '';
        this.alt = '';
        this.iconSize = '';
    }
    componentWillLoad() {
        var _a, _b;
        this.renderImage =
            ((_a = this.contentlet) === null || _a === void 0 ? void 0 : _a.hasTitleImage) === 'true' ||
                ((_b = this.contentlet) === null || _b === void 0 ? void 0 : _b.mimeType) === 'application/pdf';
    }
    render() {
        var _a;
        const image = this.contentlet ? `url(${this.getImageURL()})` : '';
        return (h(Host, null, this.renderImage ? (h("div", { class: "thumbnail", style: { 'background-image': image } },
            h("img", { src: this.getImageURL(), alt: this.alt, "aria-label": this.alt, onError: () => {
                    this.switchToIcon();
                } }))) : (h("dot-contentlet-icon", { icon: (_a = this.contentlet) === null || _a === void 0 ? void 0 : _a.__icon__, size: this.iconSize, "aria-label": this.alt }))));
    }
    getImageURL() {
        return this.contentlet.mimeType === 'application/pdf'
            ? `/contentAsset/image/${this.contentlet.inode}/${this.contentlet.titleImage}/pdf_page/1/resize_w/250/quality_q/45`
            : `/dA/${this.contentlet.inode}/500w/20q`;
    }
    switchToIcon() {
        this.renderImage = false;
    }
    static get is() { return "dot-contentlet-thumbnail"; }
    static get originalStyleUrls() { return {
        "$": ["dot-contentlet-thumbnail.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["dot-contentlet-thumbnail.css"]
    }; }
    static get properties() { return {
        "height": {
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
                "text": ""
            },
            "attribute": "height",
            "reflect": true,
            "defaultValue": "''"
        },
        "width": {
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
                "text": ""
            },
            "attribute": "width",
            "reflect": true,
            "defaultValue": "''"
        },
        "alt": {
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
                "text": ""
            },
            "attribute": "alt",
            "reflect": true,
            "defaultValue": "''"
        },
        "iconSize": {
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
                "text": ""
            },
            "attribute": "icon-size",
            "reflect": true,
            "defaultValue": "''"
        },
        "contentlet": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "DotContentletItem",
                "resolved": "DotContentletItem",
                "references": {
                    "DotContentletItem": {
                        "location": "import",
                        "path": "../../models/dot-contentlet-item.model"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            }
        }
    }; }
    static get states() { return {
        "renderImage": {}
    }; }
}
