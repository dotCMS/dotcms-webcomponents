import { Component, h } from '@stencil/core';
export class DotCard {
    render() {
        return (h("slot", null));
    }
    static get is() { return "dot-card"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["dot-card.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["dot-card.css"]
    }; }
}
