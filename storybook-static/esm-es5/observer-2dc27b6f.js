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
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import { L as LitElement, d as directive, A as AttributePart, P as PropertyPart, _ as __decorate, p as property, i as internalProperty, h as html, q as query, c as css, b as customElement } from './lit-element-99e05d63.js';
import { m as matches, a as MDCRippleFoundation } from './foundation-e10f6dc2.js';
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
/**
 * Determines whether a node is an element.
 *
 * @param node Node to check
 */
var isNodeElement = function (node) {
    return node.nodeType === Node.ELEMENT_NODE;
};
function findAssignedElement(slot, selector) {
    for (var _i = 0, _a = slot.assignedNodes({ flatten: true }); _i < _a.length; _i++) {
        var node = _a[_i];
        if (isNodeElement(node)) {
            var el = node;
            if (matches(el, selector)) {
                return el;
            }
        }
    }
    return null;
}
function addHasRemoveClass(element) {
    return {
        addClass: function (className) {
            element.classList.add(className);
        },
        removeClass: function (className) {
            element.classList.remove(className);
        },
        hasClass: function (className) { return element.classList.contains(className); },
    };
}
var fn = function () { };
var optionsBlock = {
    get passive() {
        return false;
    }
};
document.addEventListener('x', fn, optionsBlock);
document.removeEventListener('x', fn);
var deepActiveElementPath = function (doc) {
    if (doc === void 0) { doc = window.document; }
    var activeElement = doc.activeElement;
    var path = [];
    if (!activeElement) {
        return path;
    }
    while (activeElement) {
        path.push(activeElement);
        if (activeElement.shadowRoot) {
            activeElement = activeElement.shadowRoot.activeElement;
        }
        else {
            break;
        }
    }
    return path;
};
var doesElementContainFocus = function (element) {
    var activePath = deepActiveElementPath();
    if (!activePath.length) {
        return false;
    }
    var deepActiveElement = activePath[activePath.length - 1];
    var focusEv = new Event('check-if-focused', { bubbles: true, composed: true });
    var composedPath = [];
    var listener = function (ev) {
        composedPath = ev.composedPath();
    };
    document.body.addEventListener('check-if-focused', listener);
    deepActiveElement.dispatchEvent(focusEv);
    document.body.removeEventListener('check-if-focused', listener);
    return composedPath.indexOf(element) !== -1;
};
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
var BaseElement = /** @class */ (function (_super) {
    __extends(BaseElement, _super);
    function BaseElement() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Create and attach the MDC Foundation to the instance
     */
    BaseElement.prototype.createFoundation = function () {
        if (this.mdcFoundation !== undefined) {
            this.mdcFoundation.destroy();
        }
        if (this.mdcFoundationClass) {
            this.mdcFoundation = new this.mdcFoundationClass(this.createAdapter());
            this.mdcFoundation.init();
        }
    };
    BaseElement.prototype.firstUpdated = function () {
        this.createFoundation();
    };
    return BaseElement;
}(LitElement));
/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
// IE11 doesn't support classList on SVG elements, so we emulate it with a Set
var ClassList = /** @class */ (function () {
    function ClassList(element) {
        this.classes = new Set();
        this.changed = false;
        this.element = element;
        var classList = (element.getAttribute('class') || '').split(/\s+/);
        for (var _i = 0, classList_1 = classList; _i < classList_1.length; _i++) {
            var cls = classList_1[_i];
            this.classes.add(cls);
        }
    }
    ClassList.prototype.add = function (cls) {
        this.classes.add(cls);
        this.changed = true;
    };
    ClassList.prototype.remove = function (cls) {
        this.classes.delete(cls);
        this.changed = true;
    };
    ClassList.prototype.commit = function () {
        if (this.changed) {
            var classString_1 = '';
            this.classes.forEach(function (cls) { return classString_1 += cls + ' '; });
            this.element.setAttribute('class', classString_1);
        }
    };
    return ClassList;
}());
/**
 * Stores the ClassInfo object applied to a given AttributePart.
 * Used to unset existing values when a new ClassInfo object is applied.
 */
var previousClassesCache = new WeakMap();
/**
 * A directive that applies CSS classes. This must be used in the `class`
 * attribute and must be the only part used in the attribute. It takes each
 * property in the `classInfo` argument and adds the property name to the
 * element's `class` if the property value is truthy; if the property value is
 * falsey, the property name is removed from the element's `class`. For example
 * `{foo: bar}` applies the class `foo` if the value of `bar` is truthy.
 * @param classInfo {ClassInfo}
 */
var classMap = directive(function (classInfo) { return function (part) {
    if (!(part instanceof AttributePart) || (part instanceof PropertyPart) ||
        part.committer.name !== 'class' || part.committer.parts.length > 1) {
        throw new Error('The `classMap` directive must be used in the `class` attribute ' +
            'and must be the only part in the attribute.');
    }
    var committer = part.committer;
    var element = committer.element;
    var previousClasses = previousClassesCache.get(part);
    if (previousClasses === undefined) {
        // Write static classes once
        // Use setAttribute() because className isn't a string on SVG elements
        element.setAttribute('class', committer.strings.join(' '));
        previousClassesCache.set(part, previousClasses = new Set());
    }
    var classList = (element.classList || new ClassList(element));
    // Remove old classes that no longer apply
    // We use forEach() instead of for-of so that re don't require down-level
    // iteration.
    previousClasses.forEach(function (name) {
        if (!(name in classInfo)) {
            classList.remove(name);
            previousClasses.delete(name);
        }
    });
    // Add or remove classes based on their classMap value
    for (var name in classInfo) {
        var value = classInfo[name];
        if (value != previousClasses.has(name)) {
            // We explicitly want a loose truthy check of `value` because it seems
            // more convenient that '' and 0 are skipped.
            if (value) {
                classList.add(name);
                previousClasses.add(name);
            }
            else {
                classList.remove(name);
                previousClasses.delete(name);
            }
        }
    }
    if (typeof classList.commit === 'function') {
        classList.commit();
    }
}; });
/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * Stores the StyleInfo object applied to a given AttributePart.
 * Used to unset existing values when a new StyleInfo object is applied.
 */
var previousStylePropertyCache = new WeakMap();
/**
 * A directive that applies CSS properties to an element.
 *
 * `styleMap` can only be used in the `style` attribute and must be the only
 * expression in the attribute. It takes the property names in the `styleInfo`
 * object and adds the property values as CSS properties. Property names with
 * dashes (`-`) are assumed to be valid CSS property names and set on the
 * element's style object using `setProperty()`. Names without dashes are
 * assumed to be camelCased JavaScript property names and set on the element's
 * style object using property assignment, allowing the style object to
 * translate JavaScript-style names to CSS property names.
 *
 * For example `styleMap({backgroundColor: 'red', 'border-top': '5px', '--size':
 * '0'})` sets the `background-color`, `border-top` and `--size` properties.
 *
 * @param styleInfo {StyleInfo}
 */
var styleMap = directive(function (styleInfo) { return function (part) {
    if (!(part instanceof AttributePart) || (part instanceof PropertyPart) ||
        part.committer.name !== 'style' || part.committer.parts.length > 1) {
        throw new Error('The `styleMap` directive must be used in the style attribute ' +
            'and must be the only part in the attribute.');
    }
    var committer = part.committer;
    var style = committer.element.style;
    var previousStyleProperties = previousStylePropertyCache.get(part);
    if (previousStyleProperties === undefined) {
        // Write static styles once
        style.cssText = committer.strings.join(' ');
        previousStylePropertyCache.set(part, previousStyleProperties = new Set());
    }
    // Remove old properties that no longer exist in styleInfo
    // We use forEach() instead of for-of so that re don't require down-level
    // iteration.
    previousStyleProperties.forEach(function (name) {
        if (!(name in styleInfo)) {
            previousStyleProperties.delete(name);
            if (name.indexOf('-') === -1) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                style[name] = null;
            }
            else {
                style.removeProperty(name);
            }
        }
    });
    // Add or update properties
    for (var name in styleInfo) {
        previousStyleProperties.add(name);
        if (name.indexOf('-') === -1) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            style[name] = styleInfo[name];
        }
        else {
            style.setProperty(name, styleInfo[name]);
        }
    }
}; });
/** @soyCompatible */
var RippleBase = /** @class */ (function (_super) {
    __extends(RippleBase, _super);
    function RippleBase() {
        var _this = _super.apply(this, arguments) || this;
        _this.primary = false;
        _this.accent = false;
        _this.unbounded = false;
        _this.disabled = false;
        _this.activated = false;
        _this.selected = false;
        _this.hovering = false;
        _this.bgFocused = false;
        _this.fgActivation = false;
        _this.fgDeactivation = false;
        _this.fgScale = '';
        _this.fgSize = '';
        _this.translateStart = '';
        _this.translateEnd = '';
        _this.leftPos = '';
        _this.topPos = '';
        _this.mdcFoundationClass = MDCRippleFoundation;
        return _this;
    }
    Object.defineProperty(RippleBase.prototype, "isActive", {
        get: function () {
            return (this.parentElement || this).matches(':active');
        },
        enumerable: false,
        configurable: true
    });
    RippleBase.prototype.createAdapter = function () {
        var _this = this;
        return {
            browserSupportsCssVars: function () { return true; },
            isUnbounded: function () { return _this.unbounded; },
            isSurfaceActive: function () { return _this.isActive; },
            isSurfaceDisabled: function () { return _this.disabled; },
            addClass: function (className) {
                switch (className) {
                    case 'mdc-ripple-upgraded--background-focused':
                        _this.bgFocused = true;
                        break;
                    case 'mdc-ripple-upgraded--foreground-activation':
                        _this.fgActivation = true;
                        break;
                    case 'mdc-ripple-upgraded--foreground-deactivation':
                        _this.fgDeactivation = true;
                        break;
                }
            },
            removeClass: function (className) {
                switch (className) {
                    case 'mdc-ripple-upgraded--background-focused':
                        _this.bgFocused = false;
                        break;
                    case 'mdc-ripple-upgraded--foreground-activation':
                        _this.fgActivation = false;
                        break;
                    case 'mdc-ripple-upgraded--foreground-deactivation':
                        _this.fgDeactivation = false;
                        break;
                }
            },
            containsEventTarget: function () { return true; },
            registerInteractionHandler: function () { return undefined; },
            deregisterInteractionHandler: function () { return undefined; },
            registerDocumentInteractionHandler: function () { return undefined; },
            deregisterDocumentInteractionHandler: function () { return undefined; },
            registerResizeHandler: function () { return undefined; },
            deregisterResizeHandler: function () { return undefined; },
            updateCssVariable: function (varName, value) {
                switch (varName) {
                    case '--mdc-ripple-fg-scale':
                        _this.fgScale = value;
                        break;
                    case '--mdc-ripple-fg-size':
                        _this.fgSize = value;
                        break;
                    case '--mdc-ripple-fg-translate-end':
                        _this.translateEnd = value;
                        break;
                    case '--mdc-ripple-fg-translate-start':
                        _this.translateStart = value;
                        break;
                    case '--mdc-ripple-left':
                        _this.leftPos = value;
                        break;
                    case '--mdc-ripple-top':
                        _this.topPos = value;
                        break;
                }
            },
            computeBoundingRect: function () { return (_this.parentElement || _this).getBoundingClientRect(); },
            getWindowPageOffset: function () { return ({ x: window.pageXOffset, y: window.pageYOffset }); },
        };
    };
    RippleBase.prototype.startPress = function (ev) {
        var _this = this;
        this.waitForFoundation(function () {
            _this.mdcFoundation.activate(ev);
        });
    };
    RippleBase.prototype.endPress = function () {
        var _this = this;
        this.waitForFoundation(function () {
            _this.mdcFoundation.deactivate();
        });
    };
    RippleBase.prototype.startFocus = function () {
        var _this = this;
        this.waitForFoundation(function () {
            _this.mdcFoundation.handleFocus();
        });
    };
    RippleBase.prototype.endFocus = function () {
        var _this = this;
        this.waitForFoundation(function () {
            _this.mdcFoundation.handleBlur();
        });
    };
    RippleBase.prototype.startHover = function () {
        this.hovering = true;
    };
    RippleBase.prototype.endHover = function () {
        this.hovering = false;
    };
    /**
     * Wait for the MDCFoundation to be created by `firstUpdated`
     */
    RippleBase.prototype.waitForFoundation = function (fn) {
        if (this.mdcFoundation) {
            fn();
        }
        else {
            this.updateComplete.then(fn);
        }
    };
    /** @soyCompatible */
    RippleBase.prototype.render = function () {
        /** @classMap */
        var classes = {
            'mdc-ripple-upgraded--unbounded': this.unbounded,
            'mdc-ripple-upgraded--background-focused': this.bgFocused,
            'mdc-ripple-upgraded--foreground-activation': this.fgActivation,
            'mdc-ripple-upgraded--foreground-deactivation': this.fgDeactivation,
            'hover': this.hovering,
            'primary': this.primary,
            'accent': this.accent,
            'disabled': this.disabled,
            'activated': this.activated,
            'selected': this.selected,
        };
        return html(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n        <div class=\"mdc-ripple-surface mdc-ripple-upgraded ", "\"\n          style=\"", "\"></div>"], ["\n        <div class=\"mdc-ripple-surface mdc-ripple-upgraded ", "\"\n          style=\"",
            "\"></div>"])), classMap(classes), styleMap({
            '--mdc-ripple-fg-scale': this.fgScale,
            '--mdc-ripple-fg-size': this.fgSize,
            '--mdc-ripple-fg-translate-end': this.translateEnd,
            '--mdc-ripple-fg-translate-start': this.translateStart,
            '--mdc-ripple-left': this.leftPos,
            '--mdc-ripple-top': this.topPos,
        }));
    };
    return RippleBase;
}(BaseElement));
__decorate([
    query('.mdc-ripple-surface')
], RippleBase.prototype, "mdcRoot", void 0);
__decorate([
    property({ type: Boolean })
], RippleBase.prototype, "primary", void 0);
__decorate([
    property({ type: Boolean })
], RippleBase.prototype, "accent", void 0);
__decorate([
    property({ type: Boolean })
], RippleBase.prototype, "unbounded", void 0);
__decorate([
    property({ type: Boolean })
], RippleBase.prototype, "disabled", void 0);
__decorate([
    property({ type: Boolean })
], RippleBase.prototype, "activated", void 0);
__decorate([
    property({ type: Boolean })
], RippleBase.prototype, "selected", void 0);
__decorate([
    internalProperty()
], RippleBase.prototype, "hovering", void 0);
__decorate([
    internalProperty()
], RippleBase.prototype, "bgFocused", void 0);
__decorate([
    internalProperty()
], RippleBase.prototype, "fgActivation", void 0);
__decorate([
    internalProperty()
], RippleBase.prototype, "fgDeactivation", void 0);
__decorate([
    internalProperty()
], RippleBase.prototype, "fgScale", void 0);
__decorate([
    internalProperty()
], RippleBase.prototype, "fgSize", void 0);
__decorate([
    internalProperty()
], RippleBase.prototype, "translateStart", void 0);
__decorate([
    internalProperty()
], RippleBase.prototype, "translateEnd", void 0);
__decorate([
    internalProperty()
], RippleBase.prototype, "leftPos", void 0);
__decorate([
    internalProperty()
], RippleBase.prototype, "topPos", void 0);
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
var style = css(templateObject_2 || (templateObject_2 = __makeTemplateObject(["@keyframes mdc-ripple-fg-radius-in{from{animation-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transform:translate(var(--mdc-ripple-fg-translate-start, 0)) scale(1)}to{transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))}}@keyframes mdc-ripple-fg-opacity-in{from{animation-timing-function:linear;opacity:0}to{opacity:var(--mdc-ripple-fg-opacity, 0)}}@keyframes mdc-ripple-fg-opacity-out{from{animation-timing-function:linear;opacity:var(--mdc-ripple-fg-opacity, 0)}to{opacity:0}}:host{display:block;position:absolute;top:0;bottom:0;left:0;right:0;width:100%;height:100%;pointer-events:none}.primary{--mdc-ripple-color: var(--mdc-theme-primary, #6200ee)}.accent{--mdc-ripple-color: var(--mdc-theme-secondary, #018786)}.mdc-ripple-surface{top:0;bottom:0;left:0;right:0;width:100%;height:100%;pointer-events:none;--mdc-ripple-fg-size: 0;--mdc-ripple-left: 0;--mdc-ripple-top: 0;--mdc-ripple-fg-scale: 1;--mdc-ripple-fg-translate-end: 0;--mdc-ripple-fg-translate-start: 0;-webkit-tap-highlight-color:rgba(0,0,0,0);position:relative;outline:none;overflow:hidden;--mdc-ripple-fg-opacity: var(--mdc-ripple-press-opacity, 0.12)}.mdc-ripple-surface::before,.mdc-ripple-surface::after{position:absolute;border-radius:50%;opacity:0;pointer-events:none;content:\"\"}.mdc-ripple-surface::before{transition:opacity 15ms linear,background-color 15ms linear;z-index:1}.mdc-ripple-surface.mdc-ripple-upgraded::before{transform:scale(var(--mdc-ripple-fg-scale, 1))}.mdc-ripple-surface.mdc-ripple-upgraded::after{top:0;left:0;transform:scale(0);transform-origin:center center}.mdc-ripple-surface.mdc-ripple-upgraded--unbounded::after{top:var(--mdc-ripple-top, 0);left:var(--mdc-ripple-left, 0)}.mdc-ripple-surface.mdc-ripple-upgraded--foreground-activation::after{animation:mdc-ripple-fg-radius-in 225ms forwards,mdc-ripple-fg-opacity-in 75ms forwards}.mdc-ripple-surface.mdc-ripple-upgraded--foreground-deactivation::after{animation:mdc-ripple-fg-opacity-out 150ms;transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))}.mdc-ripple-surface::before,.mdc-ripple-surface::after{top:calc(50% - 100%);left:calc(50% - 100%);width:200%;height:200%}.mdc-ripple-surface.mdc-ripple-upgraded::after{width:var(--mdc-ripple-fg-size, 100%);height:var(--mdc-ripple-fg-size, 100%)}.mdc-ripple-surface.mdc-ripple-upgraded--unbounded{overflow:visible}.mdc-ripple-surface.mdc-ripple-upgraded--unbounded::before,.mdc-ripple-surface.mdc-ripple-upgraded--unbounded::after{top:calc(50% - 50%);left:calc(50% - 50%);width:100%;height:100%}.mdc-ripple-surface.mdc-ripple-upgraded--unbounded.mdc-ripple-upgraded::before,.mdc-ripple-surface.mdc-ripple-upgraded--unbounded.mdc-ripple-upgraded::after{top:var(--mdc-ripple-top, calc(50% - 50%));left:var(--mdc-ripple-left, calc(50% - 50%));width:var(--mdc-ripple-fg-size, 100%);height:var(--mdc-ripple-fg-size, 100%)}.mdc-ripple-surface.mdc-ripple-upgraded--unbounded.mdc-ripple-upgraded::after{width:var(--mdc-ripple-fg-size, 100%);height:var(--mdc-ripple-fg-size, 100%)}.mdc-ripple-surface.hover::before{opacity:0.04;opacity:var(--mdc-ripple-hover-opacity, 0.04)}.mdc-ripple-surface.mdc-ripple-upgraded--background-focused::before{opacity:0.12;opacity:var(--mdc-ripple-focus-opacity, 0.12)}.mdc-ripple-surface::before,.mdc-ripple-surface::after{background-color:#000;background-color:var(--mdc-ripple-color, #000)}.mdc-ripple-surface.activated::before{opacity:0.12;opacity:var(--mdc-ripple-activated-opacity, 0.12)}.mdc-ripple-surface.activated.hover::before{opacity:.16;opacity:calc(var(--mdc-ripple-hover-opacity, 0.04) + var(--mdc-ripple-activated-opacity, 0.12))}.mdc-ripple-surface.activated.mdc-ripple-upgraded--background-focused::before{opacity:.24;opacity:calc(var(--mdc-ripple-focus-opacity, 0.12) + var(--mdc-ripple-activated-opacity, 0.12))}.mdc-ripple-surface.activated{--mdc-ripple-press-opacity: calc(var(--mdc-ripple-press-opacity, 0.12) + 0.12)}.mdc-ripple-surface.selected::before{opacity:0.08;opacity:var(--mdc-ripple-selected-opacity, 0.08)}.mdc-ripple-surface.selected.hover::before{opacity:.12;opacity:calc(var(--mdc-ripple-hover-opacity, 0.04) + var(--mdc-ripple-selected-opacity, 0.08))}.mdc-ripple-surface.selected.mdc-ripple-upgraded--background-focused::before{opacity:.2;opacity:calc(var(--mdc-ripple-focus-opacity, 0.12) + var(--mdc-ripple-selected-opacity, 0.08))}.mdc-ripple-surface.selected{--mdc-ripple-press-opacity: calc(var(--mdc-ripple-press-opacity, 0.12) + 0.08)}.mdc-ripple-surface.disabled{--mdc-ripple-color: transparent}.mdc-ripple-surface::before{z-index:1;z-index:var(--m-ripple-z-index, 1)}.mdc-ripple-surface::after{z-index:0;z-index:var(--m-ripple-z-index, 0)}"], ["@keyframes mdc-ripple-fg-radius-in{from{animation-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transform:translate(var(--mdc-ripple-fg-translate-start, 0)) scale(1)}to{transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))}}@keyframes mdc-ripple-fg-opacity-in{from{animation-timing-function:linear;opacity:0}to{opacity:var(--mdc-ripple-fg-opacity, 0)}}@keyframes mdc-ripple-fg-opacity-out{from{animation-timing-function:linear;opacity:var(--mdc-ripple-fg-opacity, 0)}to{opacity:0}}:host{display:block;position:absolute;top:0;bottom:0;left:0;right:0;width:100%;height:100%;pointer-events:none}.primary{--mdc-ripple-color: var(--mdc-theme-primary, #6200ee)}.accent{--mdc-ripple-color: var(--mdc-theme-secondary, #018786)}.mdc-ripple-surface{top:0;bottom:0;left:0;right:0;width:100%;height:100%;pointer-events:none;--mdc-ripple-fg-size: 0;--mdc-ripple-left: 0;--mdc-ripple-top: 0;--mdc-ripple-fg-scale: 1;--mdc-ripple-fg-translate-end: 0;--mdc-ripple-fg-translate-start: 0;-webkit-tap-highlight-color:rgba(0,0,0,0);position:relative;outline:none;overflow:hidden;--mdc-ripple-fg-opacity: var(--mdc-ripple-press-opacity, 0.12)}.mdc-ripple-surface::before,.mdc-ripple-surface::after{position:absolute;border-radius:50%;opacity:0;pointer-events:none;content:\"\"}.mdc-ripple-surface::before{transition:opacity 15ms linear,background-color 15ms linear;z-index:1}.mdc-ripple-surface.mdc-ripple-upgraded::before{transform:scale(var(--mdc-ripple-fg-scale, 1))}.mdc-ripple-surface.mdc-ripple-upgraded::after{top:0;left:0;transform:scale(0);transform-origin:center center}.mdc-ripple-surface.mdc-ripple-upgraded--unbounded::after{top:var(--mdc-ripple-top, 0);left:var(--mdc-ripple-left, 0)}.mdc-ripple-surface.mdc-ripple-upgraded--foreground-activation::after{animation:mdc-ripple-fg-radius-in 225ms forwards,mdc-ripple-fg-opacity-in 75ms forwards}.mdc-ripple-surface.mdc-ripple-upgraded--foreground-deactivation::after{animation:mdc-ripple-fg-opacity-out 150ms;transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))}.mdc-ripple-surface::before,.mdc-ripple-surface::after{top:calc(50% - 100%);left:calc(50% - 100%);width:200%;height:200%}.mdc-ripple-surface.mdc-ripple-upgraded::after{width:var(--mdc-ripple-fg-size, 100%);height:var(--mdc-ripple-fg-size, 100%)}.mdc-ripple-surface.mdc-ripple-upgraded--unbounded{overflow:visible}.mdc-ripple-surface.mdc-ripple-upgraded--unbounded::before,.mdc-ripple-surface.mdc-ripple-upgraded--unbounded::after{top:calc(50% - 50%);left:calc(50% - 50%);width:100%;height:100%}.mdc-ripple-surface.mdc-ripple-upgraded--unbounded.mdc-ripple-upgraded::before,.mdc-ripple-surface.mdc-ripple-upgraded--unbounded.mdc-ripple-upgraded::after{top:var(--mdc-ripple-top, calc(50% - 50%));left:var(--mdc-ripple-left, calc(50% - 50%));width:var(--mdc-ripple-fg-size, 100%);height:var(--mdc-ripple-fg-size, 100%)}.mdc-ripple-surface.mdc-ripple-upgraded--unbounded.mdc-ripple-upgraded::after{width:var(--mdc-ripple-fg-size, 100%);height:var(--mdc-ripple-fg-size, 100%)}.mdc-ripple-surface.hover::before{opacity:0.04;opacity:var(--mdc-ripple-hover-opacity, 0.04)}.mdc-ripple-surface.mdc-ripple-upgraded--background-focused::before{opacity:0.12;opacity:var(--mdc-ripple-focus-opacity, 0.12)}.mdc-ripple-surface::before,.mdc-ripple-surface::after{background-color:#000;background-color:var(--mdc-ripple-color, #000)}.mdc-ripple-surface.activated::before{opacity:0.12;opacity:var(--mdc-ripple-activated-opacity, 0.12)}.mdc-ripple-surface.activated.hover::before{opacity:.16;opacity:calc(var(--mdc-ripple-hover-opacity, 0.04) + var(--mdc-ripple-activated-opacity, 0.12))}.mdc-ripple-surface.activated.mdc-ripple-upgraded--background-focused::before{opacity:.24;opacity:calc(var(--mdc-ripple-focus-opacity, 0.12) + var(--mdc-ripple-activated-opacity, 0.12))}.mdc-ripple-surface.activated{--mdc-ripple-press-opacity: calc(var(--mdc-ripple-press-opacity, 0.12) + 0.12)}.mdc-ripple-surface.selected::before{opacity:0.08;opacity:var(--mdc-ripple-selected-opacity, 0.08)}.mdc-ripple-surface.selected.hover::before{opacity:.12;opacity:calc(var(--mdc-ripple-hover-opacity, 0.04) + var(--mdc-ripple-selected-opacity, 0.08))}.mdc-ripple-surface.selected.mdc-ripple-upgraded--background-focused::before{opacity:.2;opacity:calc(var(--mdc-ripple-focus-opacity, 0.12) + var(--mdc-ripple-selected-opacity, 0.08))}.mdc-ripple-surface.selected{--mdc-ripple-press-opacity: calc(var(--mdc-ripple-press-opacity, 0.12) + 0.08)}.mdc-ripple-surface.disabled{--mdc-ripple-color: transparent}.mdc-ripple-surface::before{z-index:1;z-index:var(--m-ripple-z-index, 1)}.mdc-ripple-surface::after{z-index:0;z-index:var(--m-ripple-z-index, 0)}"])));
/** @soyCompatible */
var Ripple = /** @class */ (function (_super) {
    __extends(Ripple, _super);
    function Ripple() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Ripple;
}(RippleBase));
Ripple.styles = style;
Ripple = __decorate([
    customElement('mwc-ripple')
], Ripple);
/**
@license
Copyright 2020 Google Inc. All Rights Reserved.

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
/**
 * Class that encapsulates the events handlers for `mwc-ripple`
 *
 *
 * Example:
 * ```
 * class XFoo extends LitElement {
 *   async getRipple() {
 *     this.renderRipple = true;
 *     await this.updateComplete;
 *     return this.renderRoot.querySelector('mwc-ripple');
 *   }
 *   rippleHandlers = new RippleHandlers(() => this.getRipple());
 *
 *   render() {
 *     return html`
 *       <div @mousedown=${this.rippleHandlers.startPress}></div>
 *       ${this.renderRipple ? html`<mwc-ripple></mwc-ripple>` : ''}
 *     `;
 *   }
 * }
 * ```
 */
var RippleHandlers = /** @class */ (function () {
    function RippleHandlers(
    /** Function that returns a `mwc-ripple` */
    rippleFn) {
        this.startPress = function (ev) {
            rippleFn().then(function (r) {
                r && r.startPress(ev);
            });
        };
        this.endPress = function () {
            rippleFn().then(function (r) {
                r && r.endPress();
            });
        };
        this.startFocus = function () {
            rippleFn().then(function (r) {
                r && r.startFocus();
            });
        };
        this.endFocus = function () {
            rippleFn().then(function (r) {
                r && r.endFocus();
            });
        };
        this.startHover = function () {
            rippleFn().then(function (r) {
                r && r.startHover();
            });
        };
        this.endHover = function () {
            rippleFn().then(function (r) {
                r && r.endHover();
            });
        };
    }
    return RippleHandlers;
}());
var observer = function (observer) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return function (proto, propName) {
        // if we haven't wrapped `updated` in this class, do so
        if (!proto.constructor._observers) {
            proto.constructor._observers = new Map();
            var userUpdated_1 = proto.updated;
            proto.updated = function (changedProperties) {
                var _this = this;
                userUpdated_1.call(this, changedProperties);
                changedProperties.forEach(function (v, k) {
                    var observer = _this.constructor._observers.get(k);
                    if (observer !== undefined) {
                        observer.call(_this, _this[k], v);
                    }
                });
            };
            // clone any existing observers (superclasses)
        }
        else if (!proto.constructor.hasOwnProperty('_observers')) {
            var observers = proto.constructor._observers;
            proto.constructor._observers = new Map();
            observers.forEach(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            function (v, k) { return proto.constructor._observers.set(k, v); });
        }
        // set this method
        proto.constructor._observers.set(propName, observer);
    };
};
export { BaseElement as B, RippleHandlers as R, deepActiveElementPath as a, addHasRemoveClass as b, classMap as c, doesElementContainFocus as d, findAssignedElement as f, isNodeElement as i, observer as o };
var templateObject_1, templateObject_2;
