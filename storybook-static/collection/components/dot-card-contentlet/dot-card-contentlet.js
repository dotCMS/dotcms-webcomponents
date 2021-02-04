import { Component, h, Element, Prop, Event, Method } from '@stencil/core';
import '@material/mwc-checkbox';
import '@material/mwc-formfield';
export class DotCardContentlet {
    constructor() {
        this.thumbnailSize = '260';
        this.iconSize = '96px';
        this.isShiftKey = false;
    }
    async showMenu(x, y) {
        const { left, top } = this.el.getBoundingClientRect();
        this.menu.show(x - left, y - top);
    }
    async hideMenu() {
        this.menu.hide();
    }
    componentDidLoad() {
        this.menu = this.el.shadowRoot.querySelector('dot-context-menu');
    }
    render() {
        var _a, _b;
        const contentlet = this.item.data;
        const title = contentlet === null || contentlet === void 0 ? void 0 : contentlet.title;
        return (h("dot-card", null,
            h("dot-contentlet-thumbnail", { contentlet: contentlet, width: this.thumbnailSize, height: this.thumbnailSize, alt: title, iconSize: this.iconSize }),
            h("header", null,
                h("div", { class: "main" },
                    h("mwc-checkbox", { checked: this.checked, onClick: (e) => {
                            e.stopImmediatePropagation();
                            this.isShiftKey = e.shiftKey;
                        }, onChange: (e) => {
                            const target = e.target;
                            this.checked = target.checked;
                            this.menu.hide();
                            this.checkboxChange.emit({
                                originalTarget: this.el,
                                shiftKey: this.isShiftKey
                            });
                        } }),
                    h("label", { id: "label" }, title),
                    h("dot-tooltip", { position: "left top", delay: 400, content: title, for: "label" })),
                h("div", { class: "extra" },
                    h("div", { class: "state" },
                        h("dot-contentlet-state-icon", { state: this.getContentState(contentlet), size: "16px" }),
                        h("dot-badge", { bordered: true }, contentlet.language),
                        contentlet.locked === 'true' ? (h("dot-contentlet-lock-icon", { locked: JSON.parse(contentlet.locked) })) : null),
                    ((_b = (_a = this.item) === null || _a === void 0 ? void 0 : _a.actions) === null || _b === void 0 ? void 0 : _b.length) ? (h("dot-context-menu", { onClick: (e) => {
                            e.stopImmediatePropagation();
                            this.contextMenuClick.emit(e);
                        }, options: this.item.actions })) : null))));
    }
    getContentState({ live, working, deleted, hasLiveVersion }) {
        return { live, working, deleted, hasLiveVersion };
    }
    static get is() { return "dot-card-contentlet"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["dot-card-contentlet.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["dot-card-contentlet.css"]
    }; }
    static get properties() { return {
        "item": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "DotCardContentletItem",
                "resolved": "DotCardContentletItem",
                "references": {
                    "DotCardContentletItem": {
                        "location": "import",
                        "path": "../../models/dot-card-contentlet.model"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            }
        },
        "thumbnailSize": {
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
            "attribute": "thumbnail-size",
            "reflect": false,
            "defaultValue": "'260'"
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
            "reflect": false,
            "defaultValue": "'96px'"
        },
        "checked": {
            "type": "boolean",
            "mutable": true,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "checked",
            "reflect": true
        }
    }; }
    static get events() { return [{
            "method": "checkboxChange",
            "name": "checkboxChange",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "complexType": {
                "original": "DotCardContentletEvent",
                "resolved": "DotCardContentletEvent",
                "references": {
                    "DotCardContentletEvent": {
                        "location": "import",
                        "path": "../../models/dot-card-contentlet.model"
                    }
                }
            }
        }, {
            "method": "contextMenuClick",
            "name": "contextMenuClick",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "complexType": {
                "original": "MouseEvent",
                "resolved": "MouseEvent",
                "references": {
                    "MouseEvent": {
                        "location": "global"
                    }
                }
            }
        }]; }
    static get methods() { return {
        "showMenu": {
            "complexType": {
                "signature": "(x: number, y: number) => Promise<void>",
                "parameters": [{
                        "tags": [],
                        "text": ""
                    }, {
                        "tags": [],
                        "text": ""
                    }],
                "references": {
                    "Promise": {
                        "location": "global"
                    }
                },
                "return": "Promise<void>"
            },
            "docs": {
                "text": "",
                "tags": []
            }
        },
        "hideMenu": {
            "complexType": {
                "signature": "() => Promise<void>",
                "parameters": [],
                "references": {
                    "Promise": {
                        "location": "global"
                    }
                },
                "return": "Promise<void>"
            },
            "docs": {
                "text": "",
                "tags": []
            }
        }
    }; }
    static get elementRef() { return "el"; }
}
