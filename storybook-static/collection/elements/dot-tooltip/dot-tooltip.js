import { Component, Prop, Element } from '@stencil/core';
import { getElement, getPosition, fadeIn } from './utils';
export class DotTooltip {
    constructor() {
        this.position = 'center bottom';
        this.showing = false;
    }
    connectedCallback() {
        const selector = `#${this.for}`;
        this.targetEl = this.el.parentElement
            ? this.el.parentElement.querySelector(selector)
            : this.el.offsetParent.shadowRoot.querySelector(selector);
        this.bindEvents();
    }
    disconnectedCallback() {
        this.unBindEvents();
    }
    appendTooltip() {
        this.tooltipEl = getElement(this.content);
        document.body.appendChild(this.tooltipEl);
        const [x, y] = this.position.split(' ');
        const { left, top } = getPosition({
            tooltipEl: this.tooltipEl,
            targetEl: this.targetEl,
            position: {
                x: x,
                y: y
            }
        });
        this.tooltipEl.style.left = `${left}px`;
        this.tooltipEl.style.top = `${top}px`;
        fadeIn(this.tooltipEl);
    }
    bindEvents() {
        this.targetEl.addEventListener('mouseenter', this.showTooltip.bind(this));
        this.targetEl.addEventListener('mouseleave', this.removeToolTip.bind(this));
        window.addEventListener('scroll', this.removeToolTip.bind(this));
    }
    showTooltip() {
        this.showing = true;
        if (this.delay) {
            setTimeout(() => {
                if (this.showing) {
                    this.appendTooltip();
                }
            }, this.delay);
        }
        else {
            this.appendTooltip();
        }
    }
    removeToolTip() {
        this.showing = false;
        if (this.tooltipEl) {
            document.body.removeChild(this.tooltipEl);
            this.tooltipEl = null;
        }
    }
    unBindEvents() {
        this.targetEl.removeEventListener('mouseenter', this.showTooltip.bind(this));
        this.targetEl.removeEventListener('mouseleave', this.removeToolTip.bind(this));
        window.removeEventListener('scroll', this.removeToolTip.bind(this));
    }
    render() {
        return null;
    }
    static get is() { return "dot-tooltip"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["dot-tooltip.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["dot-tooltip.css"]
    }; }
    static get properties() { return {
        "content": {
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
            "attribute": "content",
            "reflect": false
        },
        "for": {
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
            "attribute": "for",
            "reflect": false
        },
        "delay": {
            "type": "number",
            "mutable": false,
            "complexType": {
                "original": "number",
                "resolved": "number",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "delay",
            "reflect": false
        },
        "position": {
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
            "attribute": "position",
            "reflect": false,
            "defaultValue": "'center bottom'"
        }
    }; }
    static get elementRef() { return "el"; }
}
