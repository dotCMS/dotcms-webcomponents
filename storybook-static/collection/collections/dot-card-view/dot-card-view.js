import { Component, h, Host, Prop, Event, Method, Watch, Element } from '@stencil/core';
const getValueAsArray = (value) => {
    return value && typeof value === 'string' ? value.split(',') : [];
};
const getSelecttion = (items, value) => {
    if (items && items.length && value && typeof value === 'string') {
        return items
            .filter(({ data: { inode } }) => value.split(',').includes(inode))
            .map(({ data }) => data);
    }
    return [];
};
export class DotCardView {
    constructor() {
        this.items = [];
        this.selection = [];
    }
    watchItems(newValue) {
        this.selection = getSelecttion(newValue, this.value);
    }
    watchValue(newValue) {
        this.selection = getSelecttion(this.items, newValue);
    }
    async getValue() {
        return this.selection;
    }
    async clearValue() {
        this.value = '';
        const cards = this.getCards();
        cards.forEach((card) => {
            card.checked = false;
        });
    }
    componentDidLoad() {
        this.selection = getSelecttion(this.items, this.value);
        this.cards = this.getCards();
    }
    clearMenu() {
        this.cards.forEach((card) => {
            card.hideMenu();
        });
    }
    render() {
        const value = getValueAsArray(this.value);
        return (h(Host, null, this.items.map((item) => (h("dot-card-contentlet", { onContextMenu: async (e) => {
                e.preventDefault();
                const target = e.target;
                this.clearMenu();
                target.showMenu(e.x, e.y);
            }, onContextMenuClick: () => {
                this.clearMenu();
            }, onClick: () => {
                this.clearMenu();
                this.cardClick.emit(item.data);
            }, key: item.data.inode, checked: value.includes(item.data.inode), onCheckboxChange: ({ detail: { originalTarget, shiftKey } }) => {
                let inBetween = false;
                if (shiftKey && originalTarget.checked) {
                    this.cards.forEach((card) => {
                        if (card === originalTarget || card === this.lastChecked) {
                            inBetween = !inBetween;
                        }
                        if (inBetween) {
                            card.checked = true;
                            this.setValue(originalTarget, card.item.data);
                        }
                    });
                }
                this.lastChecked = originalTarget;
                this.setValue(originalTarget, item.data);
            }, item: item })))));
    }
    setValue(originalTarget, data) {
        if (originalTarget.checked) {
            this.selection.push(data);
        }
        else {
            this.selection = this.selection.filter(({ identifier }) => identifier !== data.identifier);
        }
        this.value = this.selection.map(({ inode }) => inode).join(',');
        this.selected.emit(this.selection);
    }
    getCards() {
        return this.el.shadowRoot.querySelectorAll('dot-card-contentlet');
    }
    static get is() { return "dot-card-view"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["dot-card-view.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["dot-card-view.css"]
    }; }
    static get properties() { return {
        "items": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "DotCardContentletItem[]",
                "resolved": "DotCardContentletItem[]",
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
            },
            "defaultValue": "[]"
        },
        "value": {
            "type": "string",
            "mutable": true,
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
            "attribute": "value",
            "reflect": true
        }
    }; }
    static get events() { return [{
            "method": "selected",
            "name": "selected",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }, {
            "method": "cardClick",
            "name": "cardClick",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }]; }
    static get methods() { return {
        "getValue": {
            "complexType": {
                "signature": "() => Promise<DotContentletItem[]>",
                "parameters": [],
                "references": {
                    "Promise": {
                        "location": "global"
                    },
                    "DotContentletItem": {
                        "location": "import",
                        "path": "../../models/dot-contentlet-item.model"
                    }
                },
                "return": "Promise<DotContentletItem[]>"
            },
            "docs": {
                "text": "",
                "tags": []
            }
        },
        "clearValue": {
            "complexType": {
                "signature": "() => Promise<void>",
                "parameters": [],
                "references": {
                    "Promise": {
                        "location": "global"
                    },
                    "HTMLDotCardContentletElement": {
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
    static get watchers() { return [{
            "propName": "items",
            "methodName": "watchItems"
        }, {
            "propName": "value",
            "methodName": "watchValue"
        }]; }
}
