import { Component, h, Host, Prop } from '@stencil/core';
export class DotStateIcon {
    constructor() {
        this.state = null;
        this.size = '16px';
        this.labels = {
            archived: 'Archived',
            published: 'Published',
            revision: 'Revision',
            draft: 'Draft'
        };
    }
    render() {
        const state = this.state ? this.getType(this.state) : '';
        const name = this.labels[state];
        return (h(Host, { "aria-label": name, style: {
                '--size': this.size
            } },
            h("span", null,
                h("div", { class: state, id: "icon" }),
                h("dot-tooltip", { content: name, for: "icon" }))));
    }
    getType({ live, working, deleted, hasLiveVersion }) {
        if (this.isTrue(deleted)) {
            return 'archived'; // crossed
        }
        if (live.toString() === 'true') {
            if (this.isTrue(hasLiveVersion) && this.isTrue(working)) {
                return 'published'; // full
            }
        }
        else {
            if (this.isTrue(hasLiveVersion)) {
                return 'revision'; // half
            }
        }
        return 'draft'; // empty
    }
    isTrue(value) {
        return value ? value.toString() === 'true' : false;
    }
    static get is() { return "dot-state-icon"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["dot-state-icon.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["dot-state-icon.css"]
    }; }
    static get properties() { return {
        "state": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "DotContentState",
                "resolved": "DotContentState",
                "references": {
                    "DotContentState": {
                        "location": "import",
                        "path": "dotcms-models"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "defaultValue": "null"
        },
        "size": {
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
            "attribute": "size",
            "reflect": true,
            "defaultValue": "'16px'"
        },
        "labels": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "{ archived: string; published: string; revision: string; draft: string; }",
                "resolved": "{ archived: string; published: string; revision: string; draft: string; }",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "defaultValue": "{\n        archived: 'Archived',\n        published: 'Published',\n        revision: 'Revision',\n        draft: 'Draft'\n    }"
        }
    }; }
}
