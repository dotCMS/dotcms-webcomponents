var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { r as registerInstance, c as createEvent, h, H as Host } from './index-ea58b93f.js';
import { c as css, d as directive, n as noChange, N as NodePart, t as templateFactory, _ as __decorate, p as property, L as LitElement, h as html, b as customElement } from './lit-element-99e05d63.js';
import { s as supportsCssVariables, a as MDCRippleFoundation, m as matches } from './foundation-e10f6dc2.js';
import { a as applyPassive } from './events-2663c3d0.js';
/**
@license
Copyright 2018 Google Inc. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
var style = css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["@keyframes mdc-ripple-fg-radius-in{from{animation-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transform:translate(var(--mdc-ripple-fg-translate-start, 0)) scale(1)}to{transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))}}@keyframes mdc-ripple-fg-opacity-in{from{animation-timing-function:linear;opacity:0}to{opacity:var(--mdc-ripple-fg-opacity, 0)}}@keyframes mdc-ripple-fg-opacity-out{from{animation-timing-function:linear;opacity:var(--mdc-ripple-fg-opacity, 0)}to{opacity:0}}"], ["@keyframes mdc-ripple-fg-radius-in{from{animation-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transform:translate(var(--mdc-ripple-fg-translate-start, 0)) scale(1)}to{transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))}}@keyframes mdc-ripple-fg-opacity-in{from{animation-timing-function:linear;opacity:0}to{opacity:var(--mdc-ripple-fg-opacity, 0)}}@keyframes mdc-ripple-fg-opacity-out{from{animation-timing-function:linear;opacity:var(--mdc-ripple-fg-opacity, 0)}to{opacity:0}}"])));
/**
@license
Copyright 2018 Google Inc. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
var supportsCssVariablesWin = supportsCssVariables(window);
/**
 * force the ripple directive to share API names with `mwc-ripple` after Closure
 * Compiler.
 */
var RippleIntermediate = /** @class */ (function () {
    function RippleIntermediate(foundation) {
        this.foundation = foundation;
    }
    RippleIntermediate.prototype.startPress = function () {
        this.foundation.activate();
    };
    RippleIntermediate.prototype.endPress = function () {
        this.foundation.deactivate();
    };
    RippleIntermediate.prototype.startFocus = function () {
        this.foundation.handleFocus();
    };
    RippleIntermediate.prototype.endFocus = function () {
        this.foundation.handleBlur();
    };
    RippleIntermediate.prototype.destroy = function () {
        this.foundation.destroy();
    };
    RippleIntermediate.prototype.setUnbounded = function (value) {
        this.foundation.setUnbounded(value);
    };
    return RippleIntermediate;
}());
// NOTE: This is a workaround for
// https://bugs.webkit.org/show_bug.cgi?id=173027. Since keyframes on
// pseudo-elements (:after) are not supported in Shadow DOM, we put the keyframe
// style into the <head> element.
var isSafari = navigator.userAgent.match(/Safari/);
var didApplyRippleStyle = false;
var applyRippleStyle = function () {
    didApplyRippleStyle = true;
    var styleElement = document.createElement('style');
    var part = new NodePart({ templateFactory: templateFactory });
    part.appendInto(styleElement);
    part.setValue(style);
    part.commit();
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    document.head.appendChild(styleElement);
};
/**
 * Applied a ripple to the node specified by {surfaceNode}.
 * @param options {RippleNodeOptions}
 */
var rippleNode = function (options) {
    if (isSafari && !didApplyRippleStyle) {
        applyRippleStyle();
    }
    // TODO(sorvell): This directive requires bringing css yourself. We probably
    // need to do this because of ShadyCSS, but on Safari, the keyframes styling
    // must be global. Perhaps this directive could fix that.
    var surfaceNode = options.surfaceNode;
    var interactionNode = options.interactionNode || surfaceNode;
    // only style interaction node if not in the same root
    if (interactionNode.getRootNode() !== surfaceNode.getRootNode()) {
        if (interactionNode.style.position === '') {
            interactionNode.style.position = 'relative';
        }
    }
    var adapter = {
        browserSupportsCssVars: function () { return supportsCssVariablesWin; },
        isUnbounded: function () { return options.unbounded === undefined ? true : options.unbounded; },
        isSurfaceActive: function () { return matches(interactionNode, ':active'); },
        isSurfaceDisabled: function () { return Boolean(interactionNode.hasAttribute('disabled')); },
        addClass: function (className) { return surfaceNode.classList.add(className); },
        removeClass: function (className) { return surfaceNode.classList.remove(className); },
        containsEventTarget: function (target) { return interactionNode.contains(target); },
        registerInteractionHandler: function (type, handler) { return interactionNode.addEventListener(type, handler, applyPassive()); },
        deregisterInteractionHandler: function (type, handler) { return interactionNode.removeEventListener(type, handler, applyPassive()); },
        registerDocumentInteractionHandler: function (evtType, handler) {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            return document.documentElement.addEventListener(evtType, handler, applyPassive());
        },
        deregisterDocumentInteractionHandler: function (evtType, handler) {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            return document.documentElement.removeEventListener(evtType, handler, applyPassive());
        },
        registerResizeHandler: function (handler) { return window.addEventListener('resize', handler); },
        deregisterResizeHandler: function (handler) { return window.removeEventListener('resize', handler); },
        updateCssVariable: function (varName, value) { return surfaceNode.style.setProperty(varName, value); },
        computeBoundingRect: function () { return surfaceNode.getBoundingClientRect(); },
        getWindowPageOffset: function () { return ({ x: window.pageXOffset, y: window.pageYOffset }); },
    };
    var rippleFoundation = new MDCRippleFoundation(adapter);
    rippleFoundation.init();
    return new RippleIntermediate(rippleFoundation);
};
var rippleInteractionNodes = new WeakMap();
/**
 * A directive that applies a Material ripple to a part node. The directive
 * should be applied to a PropertyPart.
 * @param options {RippleOptions}
 */
var ripple = directive(function (options) {
    if (options === void 0) { options = {}; }
    return function (part) {
        var surfaceNode = part.committer.element;
        var interactionNode = options.interactionNode || surfaceNode;
        var rippleFoundation = part.value;
        // if the interaction node changes, destroy and invalidate the foundation.
        var existingInteractionNode = rippleInteractionNodes.get(rippleFoundation);
        if (existingInteractionNode !== undefined &&
            existingInteractionNode !== interactionNode) {
            rippleFoundation.destroy();
            rippleFoundation = noChange;
        }
        // make the ripple, if needed
        if (rippleFoundation === noChange) {
            rippleFoundation =
                rippleNode(Object.assign({}, options, { surfaceNode: surfaceNode }));
            rippleInteractionNodes.set(rippleFoundation, interactionNode);
            part.setValue(rippleFoundation);
            // otherwise update settings as needed.
        }
        else {
            if (options.unbounded !== undefined) {
                rippleFoundation
                    .setUnbounded(options.unbounded);
            }
            if (options.disabled !== undefined) {
                rippleFoundation
                    .setUnbounded(options.disabled);
            }
        }
        if (options.active === true) {
            rippleFoundation.startPress();
        }
        else if (options.active === false) {
            rippleFoundation.endPress();
        }
    };
});
/** @soyCompatible */
var IconButtonBase = /** @class */ (function (_super) {
    __extends(IconButtonBase, _super);
    function IconButtonBase() {
        var _this = _super.apply(this, arguments) || this;
        _this.disabled = false;
        _this.icon = '';
        _this.label = '';
        return _this;
    }
    /** @soyCompatible */
    IconButtonBase.prototype.render = function () {
        return html(templateObject_2 || (templateObject_2 = __makeTemplateObject(["<button\n    .ripple=\"", "\"\n    class=\"mdc-icon-button\"\n    aria-label=\"", "\"\n    ?disabled=\"", "\">\n    <i class=\"material-icons\">", "</i>\n    <slot></slot>\n  </button>"], ["<button\n    .ripple=\"", "\"\n    class=\"mdc-icon-button\"\n    aria-label=\"", "\"\n    ?disabled=\"", "\">\n    <i class=\"material-icons\">", "</i>\n    <slot></slot>\n  </button>"])), ripple(), this.label || this.icon, this.disabled, this.icon);
    };
    return IconButtonBase;
}(LitElement));
__decorate([
    property({ type: Boolean, reflect: true })
], IconButtonBase.prototype, "disabled", void 0);
__decorate([
    property({ type: String })
], IconButtonBase.prototype, "icon", void 0);
__decorate([
    property({ type: String })
], IconButtonBase.prototype, "label", void 0);
/**
@license
Copyright 2018 Google Inc. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
var style$1 = css(templateObject_3 || (templateObject_3 = __makeTemplateObject([".material-icons{font-family:var(--mdc-icon-font, \"Material Icons\");font-weight:normal;font-style:normal;font-size:var(--mdc-icon-size, 24px);line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;-moz-osx-font-smoothing:grayscale;font-feature-settings:\"liga\"}.mdc-icon-button{display:inline-block;position:relative;box-sizing:border-box;border:none;outline:none;background-color:transparent;fill:currentColor;color:inherit;font-size:24px;text-decoration:none;cursor:pointer;user-select:none;width:48px;height:48px;padding:12px}.mdc-icon-button svg,.mdc-icon-button img{width:24px;height:24px}.mdc-icon-button:disabled{color:rgba(0,0,0,.38);color:var(--mdc-theme-text-disabled-on-light, rgba(0, 0, 0, 0.38))}.mdc-icon-button:disabled{cursor:default;pointer-events:none}.mdc-icon-button__icon{display:inline-block}.mdc-icon-button__icon.mdc-icon-button__icon--on{display:none}.mdc-icon-button--on .mdc-icon-button__icon{display:none}.mdc-icon-button--on .mdc-icon-button__icon.mdc-icon-button__icon--on{display:inline-block}@keyframes mdc-ripple-fg-radius-in{from{animation-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transform:translate(var(--mdc-ripple-fg-translate-start, 0)) scale(1)}to{transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))}}@keyframes mdc-ripple-fg-opacity-in{from{animation-timing-function:linear;opacity:0}to{opacity:var(--mdc-ripple-fg-opacity, 0)}}@keyframes mdc-ripple-fg-opacity-out{from{animation-timing-function:linear;opacity:var(--mdc-ripple-fg-opacity, 0)}to{opacity:0}}.mdc-icon-button{--mdc-ripple-fg-size: 0;--mdc-ripple-left: 0;--mdc-ripple-top: 0;--mdc-ripple-fg-scale: 1;--mdc-ripple-fg-translate-end: 0;--mdc-ripple-fg-translate-start: 0;-webkit-tap-highlight-color:rgba(0,0,0,0)}.mdc-icon-button::before,.mdc-icon-button::after{position:absolute;border-radius:50%;opacity:0;pointer-events:none;content:\"\"}.mdc-icon-button::before{transition:opacity 15ms linear,background-color 15ms linear;z-index:1}.mdc-icon-button.mdc-ripple-upgraded::before{transform:scale(var(--mdc-ripple-fg-scale, 1))}.mdc-icon-button.mdc-ripple-upgraded::after{top:0;left:0;transform:scale(0);transform-origin:center center}.mdc-icon-button.mdc-ripple-upgraded--unbounded::after{top:var(--mdc-ripple-top, 0);left:var(--mdc-ripple-left, 0)}.mdc-icon-button.mdc-ripple-upgraded--foreground-activation::after{animation:mdc-ripple-fg-radius-in 225ms forwards,mdc-ripple-fg-opacity-in 75ms forwards}.mdc-icon-button.mdc-ripple-upgraded--foreground-deactivation::after{animation:mdc-ripple-fg-opacity-out 150ms;transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))}.mdc-icon-button::before,.mdc-icon-button::after{top:calc(50% - 50%);left:calc(50% - 50%);width:100%;height:100%}.mdc-icon-button.mdc-ripple-upgraded::before,.mdc-icon-button.mdc-ripple-upgraded::after{top:var(--mdc-ripple-top, calc(50% - 50%));left:var(--mdc-ripple-left, calc(50% - 50%));width:var(--mdc-ripple-fg-size, 100%);height:var(--mdc-ripple-fg-size, 100%)}.mdc-icon-button.mdc-ripple-upgraded::after{width:var(--mdc-ripple-fg-size, 100%);height:var(--mdc-ripple-fg-size, 100%)}.mdc-icon-button::before,.mdc-icon-button::after{background-color:#000}.mdc-icon-button:hover::before{opacity:.04}.mdc-icon-button.mdc-ripple-upgraded--background-focused::before,.mdc-icon-button:not(.mdc-ripple-upgraded):focus::before{transition-duration:75ms;opacity:.12}.mdc-icon-button:not(.mdc-ripple-upgraded)::after{transition:opacity 150ms linear}.mdc-icon-button:not(.mdc-ripple-upgraded):active::after{transition-duration:75ms;opacity:.12}.mdc-icon-button.mdc-ripple-upgraded{--mdc-ripple-fg-opacity: 0.12}:host{display:inline-block;outline:none}:host([disabled]){pointer-events:none}:host,.mdc-icon-button{vertical-align:top}.mdc-icon-button{width:var(--mdc-icon-button-size, 48px);height:var(--mdc-icon-button-size, 48px);padding:calc((var(--mdc-icon-button-size, 48px) - var(--mdc-icon-size, 24px)) / 2)}.mdc-icon-button>i{position:absolute;top:0;padding-top:inherit}.mdc-icon-button i,.mdc-icon-button svg,.mdc-icon-button img,.mdc-icon-button ::slotted(*){display:block;width:var(--mdc-icon-size, 24px);height:var(--mdc-icon-size, 24px)}.mdc-ripple-upgraded:focus::before,.mdc-ripple-upgraded:focus::after{background-color:currentColor;background-color:var(--mdc-theme-on-primary, currentColor);opacity:0.12;opacity:var(--mdc-icon-button-ripple-opacity, 0.12)}"], [".material-icons{font-family:var(--mdc-icon-font, \"Material Icons\");font-weight:normal;font-style:normal;font-size:var(--mdc-icon-size, 24px);line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;-moz-osx-font-smoothing:grayscale;font-feature-settings:\"liga\"}.mdc-icon-button{display:inline-block;position:relative;box-sizing:border-box;border:none;outline:none;background-color:transparent;fill:currentColor;color:inherit;font-size:24px;text-decoration:none;cursor:pointer;user-select:none;width:48px;height:48px;padding:12px}.mdc-icon-button svg,.mdc-icon-button img{width:24px;height:24px}.mdc-icon-button:disabled{color:rgba(0,0,0,.38);color:var(--mdc-theme-text-disabled-on-light, rgba(0, 0, 0, 0.38))}.mdc-icon-button:disabled{cursor:default;pointer-events:none}.mdc-icon-button__icon{display:inline-block}.mdc-icon-button__icon.mdc-icon-button__icon--on{display:none}.mdc-icon-button--on .mdc-icon-button__icon{display:none}.mdc-icon-button--on .mdc-icon-button__icon.mdc-icon-button__icon--on{display:inline-block}@keyframes mdc-ripple-fg-radius-in{from{animation-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transform:translate(var(--mdc-ripple-fg-translate-start, 0)) scale(1)}to{transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))}}@keyframes mdc-ripple-fg-opacity-in{from{animation-timing-function:linear;opacity:0}to{opacity:var(--mdc-ripple-fg-opacity, 0)}}@keyframes mdc-ripple-fg-opacity-out{from{animation-timing-function:linear;opacity:var(--mdc-ripple-fg-opacity, 0)}to{opacity:0}}.mdc-icon-button{--mdc-ripple-fg-size: 0;--mdc-ripple-left: 0;--mdc-ripple-top: 0;--mdc-ripple-fg-scale: 1;--mdc-ripple-fg-translate-end: 0;--mdc-ripple-fg-translate-start: 0;-webkit-tap-highlight-color:rgba(0,0,0,0)}.mdc-icon-button::before,.mdc-icon-button::after{position:absolute;border-radius:50%;opacity:0;pointer-events:none;content:\"\"}.mdc-icon-button::before{transition:opacity 15ms linear,background-color 15ms linear;z-index:1}.mdc-icon-button.mdc-ripple-upgraded::before{transform:scale(var(--mdc-ripple-fg-scale, 1))}.mdc-icon-button.mdc-ripple-upgraded::after{top:0;left:0;transform:scale(0);transform-origin:center center}.mdc-icon-button.mdc-ripple-upgraded--unbounded::after{top:var(--mdc-ripple-top, 0);left:var(--mdc-ripple-left, 0)}.mdc-icon-button.mdc-ripple-upgraded--foreground-activation::after{animation:mdc-ripple-fg-radius-in 225ms forwards,mdc-ripple-fg-opacity-in 75ms forwards}.mdc-icon-button.mdc-ripple-upgraded--foreground-deactivation::after{animation:mdc-ripple-fg-opacity-out 150ms;transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))}.mdc-icon-button::before,.mdc-icon-button::after{top:calc(50% - 50%);left:calc(50% - 50%);width:100%;height:100%}.mdc-icon-button.mdc-ripple-upgraded::before,.mdc-icon-button.mdc-ripple-upgraded::after{top:var(--mdc-ripple-top, calc(50% - 50%));left:var(--mdc-ripple-left, calc(50% - 50%));width:var(--mdc-ripple-fg-size, 100%);height:var(--mdc-ripple-fg-size, 100%)}.mdc-icon-button.mdc-ripple-upgraded::after{width:var(--mdc-ripple-fg-size, 100%);height:var(--mdc-ripple-fg-size, 100%)}.mdc-icon-button::before,.mdc-icon-button::after{background-color:#000}.mdc-icon-button:hover::before{opacity:.04}.mdc-icon-button.mdc-ripple-upgraded--background-focused::before,.mdc-icon-button:not(.mdc-ripple-upgraded):focus::before{transition-duration:75ms;opacity:.12}.mdc-icon-button:not(.mdc-ripple-upgraded)::after{transition:opacity 150ms linear}.mdc-icon-button:not(.mdc-ripple-upgraded):active::after{transition-duration:75ms;opacity:.12}.mdc-icon-button.mdc-ripple-upgraded{--mdc-ripple-fg-opacity: 0.12}:host{display:inline-block;outline:none}:host([disabled]){pointer-events:none}:host,.mdc-icon-button{vertical-align:top}.mdc-icon-button{width:var(--mdc-icon-button-size, 48px);height:var(--mdc-icon-button-size, 48px);padding:calc((var(--mdc-icon-button-size, 48px) - var(--mdc-icon-size, 24px)) / 2)}.mdc-icon-button>i{position:absolute;top:0;padding-top:inherit}.mdc-icon-button i,.mdc-icon-button svg,.mdc-icon-button img,.mdc-icon-button ::slotted(*){display:block;width:var(--mdc-icon-size, 24px);height:var(--mdc-icon-size, 24px)}.mdc-ripple-upgraded:focus::before,.mdc-ripple-upgraded:focus::after{background-color:currentColor;background-color:var(--mdc-theme-on-primary, currentColor);opacity:0.12;opacity:var(--mdc-icon-button-ripple-opacity, 0.12)}"])));
/**
@license
Copyright 2018 Google Inc. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
/** @soyCompatible */
var IconButton = /** @class */ (function (_super) {
    __extends(IconButton, _super);
    function IconButton() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return IconButton;
}(IconButtonBase));
IconButton.styles = style$1;
IconButton = __decorate([
    customElement('mwc-icon-button')
], IconButton);
var dotSelectButtonCss = ".active{color:var(--color-main);pointer-events:none}";
var DotSelectButton = /** @class */ (function () {
    function DotSelectButton(hostRef) {
        registerInstance(this, hostRef);
        this.selected = createEvent(this, "selected", 7);
        this.value = '';
        this.options = [];
    }
    DotSelectButton.prototype.render = function () {
        var _this = this;
        return (h(Host, null, this.options.map(function (option) {
            var active = option.label.toLocaleLowerCase() === _this.value.toLocaleLowerCase();
            return (h("mwc-icon-button", { class: {
                    active: active
                }, icon: option.icon, label: option.label, disabled: option.disabled, onClick: function () {
                    _this.setSelected(option);
                } }));
        })));
    };
    DotSelectButton.prototype.setSelected = function (option) {
        this.value = option.label;
        this.selected.emit(option.label.toLocaleLowerCase());
    };
    return DotSelectButton;
}());
DotSelectButton.style = dotSelectButtonCss;
export { DotSelectButton as dot_select_button };
var templateObject_1, templateObject_2, templateObject_3;
