import { Component, h, Element, Host, Prop, Method, State } from '@stencil/core';
import '@material/mwc-menu';
import '@material/mwc-list/mwc-list-item';
import '@material/mwc-icon';
export class DotContextMenu {
    constructor() {
        this.options = [];
        this.fontSize = '16px';
        this.state = {
            x: 0,
            y: 0,
            position: 'relative',
            show: false
        };
    }
    async hide() {
        this.state = Object.assign(Object.assign({}, this.state), { show: false });
    }
    async show(x, y, position = 'inherit') {
        await this.hide();
        requestAnimationFrame(() => {
            this.state = {
                x,
                y,
                position,
                show: true
            };
        });
    }
    render() {
        return (h(Host, { style: { '--menu-item-font-size': this.fontSize, position: this.state.position } },
            h("button", { type: "button", onClick: async () => {
                    await this.show(0, 0, 'relative');
                } },
                h("mwc-icon", null, "more_vert")),
            h("mwc-menu", { open: this.state.show, x: this.state.x, y: this.state.y, onAction: (e) => {
                    this.state = Object.assign(Object.assign({}, this.state), { show: false });
                    this.options[e.detail.index].action(e);
                } }, this.options.map(({ label }) => (h("mwc-list-item", null, label))))));
    }
    static get is() { return "dot-context-menu"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["dot-context-menu.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["dot-context-menu.css"]
    }; }
    static get properties() { return {
        "options": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "DotContextMenuOption<DotContextMenuAction>[]",
                "resolved": "DotContextMenuOption<DotContextMenuAction>[]",
                "references": {
                    "DotContextMenuOption": {
                        "location": "import",
                        "path": "../../models/dot-context-menu.model"
                    },
                    "DotContextMenuAction": {
                        "location": "import",
                        "path": "../../models/dot-context-menu-action.model"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "defaultValue": "[]"
        },
        "fontSize": {
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
            "attribute": "font-size",
            "reflect": false,
            "defaultValue": "'16px'"
        }
    }; }
    static get states() { return {
        "state": {}
    }; }
    static get methods() { return {
        "hide": {
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
        },
        "show": {
            "complexType": {
                "signature": "(x: number, y: number, position?: string) => Promise<void>",
                "parameters": [{
                        "tags": [],
                        "text": ""
                    }, {
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
        }
    }; }
    static get elementRef() { return "el"; }
}
