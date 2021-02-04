import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './index-ea58b93f.js';

const dotCardViewCss = ":host{display:grid;grid-template-columns:repeat(auto-fill, minmax(260px, 1fr));grid-gap:var(--basic-padding-2)}dot-card-contentlet{height:100%}dot-card-contentlet:before{content:\"\";display:inline-block;-ms-flex:0 0 0px;flex:0 0 0;height:0;padding-bottom:calc(100%)}";

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
const DotCardView = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.selected = createEvent(this, "selected", 7);
        this.cardClick = createEvent(this, "cardClick", 7);
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
    get el() { return getElement(this); }
    static get watchers() { return {
        "items": ["watchItems"],
        "value": ["watchValue"]
    }; }
};
DotCardView.style = dotCardViewCss;

export { DotCardView as dot_card_view };
