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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { r as registerInstance, c as createEvent, h, H as Host } from './index-ea58b93f.js';
import { e as __extends, f as __assign, _ as __decorate, q as query, p as property, h as html, c as css, b as customElement, a as queryAsync, i as internalProperty, j as eventOptions, L as LitElement } from './lit-element-99e05d63.js';
import { M as MDCFoundation, m as matches, c as closest } from './foundation-e10f6dc2.js';
import { o as observer, B as BaseElement, b as addHasRemoveClass, c as classMap, R as RippleHandlers } from './observer-2dc27b6f.js';
import './mwc-icon-3d3b91be.js';
import { a as applyPassive } from './events-2663c3d0.js';
import { f as fallbackErrorMessages, D as DotUploadService } from './dot-upload.service-e9475d4b.js';
/**
 * @license
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
(function () {
    var _a, _b, _c;
    /* Symbols for private properties */
    var _blockingElements = Symbol();
    var _alreadyInertElements = Symbol();
    var _topElParents = Symbol();
    var _siblingsToRestore = Symbol();
    var _parentMO = Symbol();
    /* Symbols for private static methods */
    var _topChanged = Symbol();
    var _swapInertedSibling = Symbol();
    var _inertSiblings = Symbol();
    var _restoreInertedSiblings = Symbol();
    var _getParents = Symbol();
    var _getDistributedChildren = Symbol();
    var _isInertable = Symbol();
    var _handleMutations = Symbol();
    var BlockingElementsImpl = /** @class */ (function () {
        function BlockingElementsImpl() {
            /**
             * The blocking elements.
             */
            this[_a] = [];
            /**
             * Used to keep track of the parents of the top element, from the element
             * itself up to body. When top changes, the old top might have been removed
             * from the document, so we need to memoize the inerted parents' siblings
             * in order to restore their inerteness when top changes.
             */
            this[_b] = [];
            /**
             * Elements that are already inert before the first blocking element is
             * pushed.
             */
            this[_c] = new Set();
        }
        BlockingElementsImpl.prototype.destructor = function () {
            // Restore original inertness.
            this[_restoreInertedSiblings](this[_topElParents]);
            // Note we don't want to make these properties nullable on the class,
            // since then we'd need non-null casts in many places. Calling a method on
            // a BlockingElements instance after calling destructor will result in an
            // exception.
            var nullable = this;
            nullable[_blockingElements] = null;
            nullable[_topElParents] = null;
            nullable[_alreadyInertElements] = null;
        };
        Object.defineProperty(BlockingElementsImpl.prototype, "top", {
            get: function () {
                var elems = this[_blockingElements];
                return elems[elems.length - 1] || null;
            },
            enumerable: false,
            configurable: true
        });
        BlockingElementsImpl.prototype.push = function (element) {
            if (!element || element === this.top) {
                return;
            }
            // Remove it from the stack, we'll bring it to the top.
            this.remove(element);
            this[_topChanged](element);
            this[_blockingElements].push(element);
        };
        BlockingElementsImpl.prototype.remove = function (element) {
            var i = this[_blockingElements].indexOf(element);
            if (i === -1) {
                return false;
            }
            this[_blockingElements].splice(i, 1);
            // Top changed only if the removed element was the top element.
            if (i === this[_blockingElements].length) {
                this[_topChanged](this.top);
            }
            return true;
        };
        BlockingElementsImpl.prototype.pop = function () {
            var top = this.top;
            top && this.remove(top);
            return top;
        };
        BlockingElementsImpl.prototype.has = function (element) {
            return this[_blockingElements].indexOf(element) !== -1;
        };
        /**
         * Sets `inert` to all document elements except the new top element, its
         * parents, and its distributed content.
         */
        BlockingElementsImpl.prototype[(_a = _blockingElements, _b = _topElParents, _c = _alreadyInertElements, _topChanged)] = function (newTop) {
            var toKeepInert = this[_alreadyInertElements];
            var oldParents = this[_topElParents];
            // No new top, reset old top if any.
            if (!newTop) {
                this[_restoreInertedSiblings](oldParents);
                toKeepInert.clear();
                this[_topElParents] = [];
                return;
            }
            var newParents = this[_getParents](newTop);
            // New top is not contained in the main document!
            if (newParents[newParents.length - 1].parentNode !== document.body) {
                throw Error('Non-connected element cannot be a blocking element');
            }
            // Cast here because we know we'll call _inertSiblings on newParents
            // below.
            this[_topElParents] = newParents;
            var toSkip = this[_getDistributedChildren](newTop);
            // No previous top element.
            if (!oldParents.length) {
                this[_inertSiblings](newParents, toSkip, toKeepInert);
                return;
            }
            var i = oldParents.length - 1;
            var j = newParents.length - 1;
            // Find common parent. Index 0 is the element itself (so stop before it).
            while (i > 0 && j > 0 && oldParents[i] === newParents[j]) {
                i--;
                j--;
            }
            // If up the parents tree there are 2 elements that are siblings, swap
            // the inerted sibling.
            if (oldParents[i] !== newParents[j]) {
                this[_swapInertedSibling](oldParents[i], newParents[j]);
            }
            // Restore old parents siblings inertness.
            i > 0 && this[_restoreInertedSiblings](oldParents.slice(0, i));
            // Make new parents siblings inert.
            j > 0 && this[_inertSiblings](newParents.slice(0, j), toSkip, null);
        };
        /**
         * Swaps inertness between two sibling elements.
         * Sets the property `inert` over the attribute since the inert spec
         * doesn't specify if it should be reflected.
         * https://html.spec.whatwg.org/multipage/interaction.html#inert
         */
        BlockingElementsImpl.prototype[_swapInertedSibling] = function (oldInert, newInert) {
            var siblingsToRestore = oldInert[_siblingsToRestore];
            // oldInert is not contained in siblings to restore, so we have to check
            // if it's inertable and if already inert.
            if (this[_isInertable](oldInert) && !oldInert.inert) {
                oldInert.inert = true;
                siblingsToRestore.add(oldInert);
            }
            // If newInert was already between the siblings to restore, it means it is
            // inertable and must be restored.
            if (siblingsToRestore.has(newInert)) {
                newInert.inert = false;
                siblingsToRestore.delete(newInert);
            }
            newInert[_parentMO] = oldInert[_parentMO];
            newInert[_siblingsToRestore] = siblingsToRestore;
            oldInert[_parentMO] = undefined;
            oldInert[_siblingsToRestore] = undefined;
        };
        /**
         * Restores original inertness to the siblings of the elements.
         * Sets the property `inert` over the attribute since the inert spec
         * doesn't specify if it should be reflected.
         * https://html.spec.whatwg.org/multipage/interaction.html#inert
         */
        BlockingElementsImpl.prototype[_restoreInertedSiblings] = function (elements) {
            for (var _d = 0, elements_1 = elements; _d < elements_1.length; _d++) {
                var element = elements_1[_d];
                var mo = element[_parentMO];
                mo.disconnect();
                element[_parentMO] = undefined;
                var siblings = element[_siblingsToRestore];
                for (var _e = 0, siblings_1 = siblings; _e < siblings_1.length; _e++) {
                    var sibling = siblings_1[_e];
                    sibling.inert = false;
                }
                element[_siblingsToRestore] = undefined;
            }
        };
        /**
         * Inerts the siblings of the elements except the elements to skip. Stores
         * the inerted siblings into the element's symbol `_siblingsToRestore`.
         * Pass `toKeepInert` to collect the already inert elements.
         * Sets the property `inert` over the attribute since the inert spec
         * doesn't specify if it should be reflected.
         * https://html.spec.whatwg.org/multipage/interaction.html#inert
         */
        BlockingElementsImpl.prototype[_inertSiblings] = function (elements, toSkip, toKeepInert) {
            for (var _d = 0, elements_2 = elements; _d < elements_2.length; _d++) {
                var element = elements_2[_d];
                // Assume element is not a Document, so it must have a parentNode.
                var parent = element.parentNode;
                var children = parent.children;
                var inertedSiblings = new Set();
                for (var j = 0; j < children.length; j++) {
                    var sibling = children[j];
                    // Skip the input element, if not inertable or to be skipped.
                    if (sibling === element || !this[_isInertable](sibling) ||
                        (toSkip && toSkip.has(sibling))) {
                        continue;
                    }
                    // Should be collected since already inerted.
                    if (toKeepInert && sibling.inert) {
                        toKeepInert.add(sibling);
                    }
                    else {
                        sibling.inert = true;
                        inertedSiblings.add(sibling);
                    }
                }
                // Store the siblings that were inerted.
                element[_siblingsToRestore] = inertedSiblings;
                // Observe only immediate children mutations on the parent.
                var mo = new MutationObserver(this[_handleMutations].bind(this));
                element[_parentMO] = mo;
                var parentToObserve = parent;
                // If we're using the ShadyDOM polyfill, then our parent could be a
                // shady root, which is an object that acts like a ShadowRoot, but isn't
                // actually a node in the real DOM. Observe the real DOM parent instead.
                var maybeShadyRoot = parentToObserve;
                if (maybeShadyRoot.__shady && maybeShadyRoot.host) {
                    parentToObserve = maybeShadyRoot.host;
                }
                mo.observe(parentToObserve, {
                    childList: true,
                });
            }
        };
        /**
         * Handles newly added/removed nodes by toggling their inertness.
         * It also checks if the current top Blocking Element has been removed,
         * notifying and removing it.
         */
        BlockingElementsImpl.prototype[_handleMutations] = function (mutations) {
            var parents = this[_topElParents];
            var toKeepInert = this[_alreadyInertElements];
            for (var _d = 0, mutations_1 = mutations; _d < mutations_1.length; _d++) {
                var mutation = mutations_1[_d];
                // If the target is a shadowRoot, get its host as we skip shadowRoots when
                // computing _topElParents.
                var target = mutation.target.host || mutation.target;
                var idx = target === document.body ?
                    parents.length :
                    parents.indexOf(target);
                var inertedChild = parents[idx - 1];
                var inertedSiblings = inertedChild[_siblingsToRestore];
                // To restore.
                for (var i = 0; i < mutation.removedNodes.length; i++) {
                    var sibling = mutation.removedNodes[i];
                    if (sibling === inertedChild) {
                        console.info('Detected removal of the top Blocking Element.');
                        this.pop();
                        return;
                    }
                    if (inertedSiblings.has(sibling)) {
                        sibling.inert = false;
                        inertedSiblings.delete(sibling);
                    }
                }
                // To inert.
                for (var i = 0; i < mutation.addedNodes.length; i++) {
                    var sibling = mutation.addedNodes[i];
                    if (!this[_isInertable](sibling)) {
                        continue;
                    }
                    if (toKeepInert && sibling.inert) {
                        toKeepInert.add(sibling);
                    }
                    else {
                        sibling.inert = true;
                        inertedSiblings.add(sibling);
                    }
                }
            }
        };
        /**
         * Returns if the element is inertable.
         */
        BlockingElementsImpl.prototype[_isInertable] = function (element) {
            return false === /^(style|template|script)$/.test(element.localName);
        };
        /**
         * Returns the list of newParents of an element, starting from element
         * (included) up to `document.body` (excluded).
         */
        BlockingElementsImpl.prototype[_getParents] = function (element) {
            var parents = [];
            var current = element;
            // Stop to body.
            while (current && current !== document.body) {
                // Skip shadow roots.
                if (current.nodeType === Node.ELEMENT_NODE) {
                    parents.push(current);
                }
                // ShadowDom v1
                if (current.assignedSlot) {
                    // Collect slots from deepest slot to top.
                    while (current = current.assignedSlot) {
                        parents.push(current);
                    }
                    // Continue the search on the top slot.
                    current = parents.pop();
                    continue;
                }
                current = current.parentNode ||
                    current.host;
            }
            return parents;
        };
        /**
         * Returns the distributed children of the element's shadow root.
         * Returns null if the element doesn't have a shadow root.
         */
        BlockingElementsImpl.prototype[_getDistributedChildren] = function (element) {
            var shadowRoot = element.shadowRoot;
            if (!shadowRoot) {
                return null;
            }
            var result = new Set();
            var i;
            var j;
            var nodes;
            var slots = shadowRoot.querySelectorAll('slot');
            if (slots.length && slots[0].assignedNodes) {
                for (i = 0; i < slots.length; i++) {
                    nodes = slots[i].assignedNodes({
                        flatten: true,
                    });
                    for (j = 0; j < nodes.length; j++) {
                        if (nodes[j].nodeType === Node.ELEMENT_NODE) {
                            result.add(nodes[j]);
                        }
                    }
                }
                // No need to search for <content>.
            }
            return result;
        };
        return BlockingElementsImpl;
    }());
    document.$blockingElements =
        new BlockingElementsImpl();
})();
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
        descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
} } return function (Constructor, protoProps, staticProps) { if (protoProps)
    defineProperties(Constructor.prototype, protoProps); if (staticProps)
    defineProperties(Constructor, staticProps); return Constructor; }; }();
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
} }
/**
 * This work is licensed under the W3C Software and Document License
 * (http://www.w3.org/Consortium/Legal/2015/copyright-software-and-document).
 */
(function () {
    // Return early if we're not running inside of the browser.
    if (typeof window === 'undefined') {
        return;
    }
    // Convenience function for converting NodeLists.
    /** @type {typeof Array.prototype.slice} */
    var slice = Array.prototype.slice;
    /**
     * IE has a non-standard name for "matches".
     * @type {typeof Element.prototype.matches}
     */
    var matches = Element.prototype.matches || Element.prototype.msMatchesSelector;
    /** @type {string} */
    var _focusableElementsString = ['a[href]', 'area[href]', 'input:not([disabled])', 'select:not([disabled])', 'textarea:not([disabled])', 'button:not([disabled])', 'details', 'summary', 'iframe', 'object', 'embed', '[contenteditable]'].join(',');
    /**
     * `InertRoot` manages a single inert subtree, i.e. a DOM subtree whose root element has an `inert`
     * attribute.
     *
     * Its main functions are:
     *
     * - to create and maintain a set of managed `InertNode`s, including when mutations occur in the
     *   subtree. The `makeSubtreeUnfocusable()` method handles collecting `InertNode`s via registering
     *   each focusable node in the subtree with the singleton `InertManager` which manages all known
     *   focusable nodes within inert subtrees. `InertManager` ensures that a single `InertNode`
     *   instance exists for each focusable node which has at least one inert root as an ancestor.
     *
     * - to notify all managed `InertNode`s when this subtree stops being inert (i.e. when the `inert`
     *   attribute is removed from the root node). This is handled in the destructor, which calls the
     *   `deregister` method on `InertManager` for each managed inert node.
     */
    var InertRoot = function () {
        /**
         * @param {!Element} rootElement The Element at the root of the inert subtree.
         * @param {!InertManager} inertManager The global singleton InertManager object.
         */
        function InertRoot(rootElement, inertManager) {
            _classCallCheck(this, InertRoot);
            /** @type {!InertManager} */
            this._inertManager = inertManager;
            /** @type {!Element} */
            this._rootElement = rootElement;
            /**
             * @type {!Set<!InertNode>}
             * All managed focusable nodes in this InertRoot's subtree.
             */
            this._managedNodes = new Set();
            // Make the subtree hidden from assistive technology
            if (this._rootElement.hasAttribute('aria-hidden')) {
                /** @type {?string} */
                this._savedAriaHidden = this._rootElement.getAttribute('aria-hidden');
            }
            else {
                this._savedAriaHidden = null;
            }
            this._rootElement.setAttribute('aria-hidden', 'true');
            // Make all focusable elements in the subtree unfocusable and add them to _managedNodes
            this._makeSubtreeUnfocusable(this._rootElement);
            // Watch for:
            // - any additions in the subtree: make them unfocusable too
            // - any removals from the subtree: remove them from this inert root's managed nodes
            // - attribute changes: if `tabindex` is added, or removed from an intrinsically focusable
            //   element, make that node a managed node.
            this._observer = new MutationObserver(this._onMutation.bind(this));
            this._observer.observe(this._rootElement, { attributes: true, childList: true, subtree: true });
        }
        /**
         * Call this whenever this object is about to become obsolete.  This unwinds all of the state
         * stored in this object and updates the state of all of the managed nodes.
         */
        _createClass(InertRoot, [{
                key: 'destructor',
                value: function destructor() {
                    this._observer.disconnect();
                    if (this._rootElement) {
                        if (this._savedAriaHidden !== null) {
                            this._rootElement.setAttribute('aria-hidden', this._savedAriaHidden);
                        }
                        else {
                            this._rootElement.removeAttribute('aria-hidden');
                        }
                    }
                    this._managedNodes.forEach(function (inertNode) {
                        this._unmanageNode(inertNode.node);
                    }, this);
                    // Note we cast the nulls to the ANY type here because:
                    // 1) We want the class properties to be declared as non-null, or else we
                    //    need even more casts throughout this code. All bets are off if an
                    //    instance has been destroyed and a method is called.
                    // 2) We don't want to cast "this", because we want type-aware optimizations
                    //    to know which properties we're setting.
                    this._observer = /** @type {?} */ null;
                    this._rootElement = /** @type {?} */ null;
                    this._managedNodes = /** @type {?} */ null;
                    this._inertManager = /** @type {?} */ null;
                }
                /**
                 * @return {!Set<!InertNode>} A copy of this InertRoot's managed nodes set.
                 */
            }, {
                key: '_makeSubtreeUnfocusable',
                /**
                 * @param {!Node} startNode
                 */
                value: function _makeSubtreeUnfocusable(startNode) {
                    var _this2 = this;
                    composedTreeWalk(startNode, function (node) {
                        return _this2._visitNode(node);
                    });
                    var activeElement = document.activeElement;
                    if (!document.body.contains(startNode)) {
                        // startNode may be in shadow DOM, so find its nearest shadowRoot to get the activeElement.
                        var node = startNode;
                        /** @type {!ShadowRoot|undefined} */
                        var root = undefined;
                        while (node) {
                            if (node.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
                                root = /** @type {!ShadowRoot} */ node;
                                break;
                            }
                            node = node.parentNode;
                        }
                        if (root) {
                            activeElement = root.activeElement;
                        }
                    }
                    if (startNode.contains(activeElement)) {
                        activeElement.blur();
                        // In IE11, if an element is already focused, and then set to tabindex=-1
                        // calling blur() will not actually move the focus.
                        // To work around this we call focus() on the body instead.
                        if (activeElement === document.activeElement) {
                            document.body.focus();
                        }
                    }
                }
                /**
                 * @param {!Node} node
                 */
            }, {
                key: '_visitNode',
                value: function _visitNode(node) {
                    if (node.nodeType !== Node.ELEMENT_NODE) {
                        return;
                    }
                    var element = /** @type {!Element} */ node;
                    // If a descendant inert root becomes un-inert, its descendants will still be inert because of
                    // this inert root, so all of its managed nodes need to be adopted by this InertRoot.
                    if (element !== this._rootElement && element.hasAttribute('inert')) {
                        this._adoptInertRoot(element);
                    }
                    if (matches.call(element, _focusableElementsString) || element.hasAttribute('tabindex')) {
                        this._manageNode(element);
                    }
                }
                /**
                 * Register the given node with this InertRoot and with InertManager.
                 * @param {!Node} node
                 */
            }, {
                key: '_manageNode',
                value: function _manageNode(node) {
                    var inertNode = this._inertManager.register(node, this);
                    this._managedNodes.add(inertNode);
                }
                /**
                 * Unregister the given node with this InertRoot and with InertManager.
                 * @param {!Node} node
                 */
            }, {
                key: '_unmanageNode',
                value: function _unmanageNode(node) {
                    var inertNode = this._inertManager.deregister(node, this);
                    if (inertNode) {
                        this._managedNodes['delete'](inertNode);
                    }
                }
                /**
                 * Unregister the entire subtree starting at `startNode`.
                 * @param {!Node} startNode
                 */
            }, {
                key: '_unmanageSubtree',
                value: function _unmanageSubtree(startNode) {
                    var _this3 = this;
                    composedTreeWalk(startNode, function (node) {
                        return _this3._unmanageNode(node);
                    });
                }
                /**
                 * If a descendant node is found with an `inert` attribute, adopt its managed nodes.
                 * @param {!Element} node
                 */
            }, {
                key: '_adoptInertRoot',
                value: function _adoptInertRoot(node) {
                    var inertSubroot = this._inertManager.getInertRoot(node);
                    // During initialisation this inert root may not have been registered yet,
                    // so register it now if need be.
                    if (!inertSubroot) {
                        this._inertManager.setInert(node, true);
                        inertSubroot = this._inertManager.getInertRoot(node);
                    }
                    inertSubroot.managedNodes.forEach(function (savedInertNode) {
                        this._manageNode(savedInertNode.node);
                    }, this);
                }
                /**
                 * Callback used when mutation observer detects subtree additions, removals, or attribute changes.
                 * @param {!Array<!MutationRecord>} records
                 * @param {!MutationObserver} self
                 */
            }, {
                key: '_onMutation',
                value: function _onMutation(records, self) {
                    records.forEach(function (record) {
                        var target = /** @type {!Element} */ record.target;
                        if (record.type === 'childList') {
                            // Manage added nodes
                            slice.call(record.addedNodes).forEach(function (node) {
                                this._makeSubtreeUnfocusable(node);
                            }, this);
                            // Un-manage removed nodes
                            slice.call(record.removedNodes).forEach(function (node) {
                                this._unmanageSubtree(node);
                            }, this);
                        }
                        else if (record.type === 'attributes') {
                            if (record.attributeName === 'tabindex') {
                                // Re-initialise inert node if tabindex changes
                                this._manageNode(target);
                            }
                            else if (target !== this._rootElement && record.attributeName === 'inert' && target.hasAttribute('inert')) {
                                // If a new inert root is added, adopt its managed nodes and make sure it knows about the
                                // already managed nodes from this inert subroot.
                                this._adoptInertRoot(target);
                                var inertSubroot = this._inertManager.getInertRoot(target);
                                this._managedNodes.forEach(function (managedNode) {
                                    if (target.contains(managedNode.node)) {
                                        inertSubroot._manageNode(managedNode.node);
                                    }
                                });
                            }
                        }
                    }, this);
                }
            }, {
                key: 'managedNodes',
                get: function get() {
                    return new Set(this._managedNodes);
                }
                /** @return {boolean} */
            }, {
                key: 'hasSavedAriaHidden',
                get: function get() {
                    return this._savedAriaHidden !== null;
                }
                /** @param {?string} ariaHidden */
            }, {
                key: 'savedAriaHidden',
                set: function set(ariaHidden) {
                    this._savedAriaHidden = ariaHidden;
                }
                /** @return {?string} */
                ,
                get: function get() {
                    return this._savedAriaHidden;
                }
            }]);
        return InertRoot;
    }();
    /**
     * `InertNode` initialises and manages a single inert node.
     * A node is inert if it is a descendant of one or more inert root elements.
     *
     * On construction, `InertNode` saves the existing `tabindex` value for the node, if any, and
     * either removes the `tabindex` attribute or sets it to `-1`, depending on whether the element
     * is intrinsically focusable or not.
     *
     * `InertNode` maintains a set of `InertRoot`s which are descendants of this `InertNode`. When an
     * `InertRoot` is destroyed, and calls `InertManager.deregister()`, the `InertManager` notifies the
     * `InertNode` via `removeInertRoot()`, which in turn destroys the `InertNode` if no `InertRoot`s
     * remain in the set. On destruction, `InertNode` reinstates the stored `tabindex` if one exists,
     * or removes the `tabindex` attribute if the element is intrinsically focusable.
     */
    var InertNode = function () {
        /**
         * @param {!Node} node A focusable element to be made inert.
         * @param {!InertRoot} inertRoot The inert root element associated with this inert node.
         */
        function InertNode(node, inertRoot) {
            _classCallCheck(this, InertNode);
            /** @type {!Node} */
            this._node = node;
            /** @type {boolean} */
            this._overrodeFocusMethod = false;
            /**
             * @type {!Set<!InertRoot>} The set of descendant inert roots.
             *    If and only if this set becomes empty, this node is no longer inert.
             */
            this._inertRoots = new Set([inertRoot]);
            /** @type {?number} */
            this._savedTabIndex = null;
            /** @type {boolean} */
            this._destroyed = false;
            // Save any prior tabindex info and make this node untabbable
            this.ensureUntabbable();
        }
        /**
         * Call this whenever this object is about to become obsolete.
         * This makes the managed node focusable again and deletes all of the previously stored state.
         */
        _createClass(InertNode, [{
                key: 'destructor',
                value: function destructor() {
                    this._throwIfDestroyed();
                    if (this._node && this._node.nodeType === Node.ELEMENT_NODE) {
                        var element = /** @type {!Element} */ this._node;
                        if (this._savedTabIndex !== null) {
                            element.setAttribute('tabindex', this._savedTabIndex);
                        }
                        else {
                            element.removeAttribute('tabindex');
                        }
                        // Use `delete` to restore native focus method.
                        if (this._overrodeFocusMethod) {
                            delete element.focus;
                        }
                    }
                    // See note in InertRoot.destructor for why we cast these nulls to ANY.
                    this._node = /** @type {?} */ null;
                    this._inertRoots = /** @type {?} */ null;
                    this._destroyed = true;
                }
                /**
                 * @type {boolean} Whether this object is obsolete because the managed node is no longer inert.
                 * If the object has been destroyed, any attempt to access it will cause an exception.
                 */
            }, {
                key: '_throwIfDestroyed',
                /**
                 * Throw if user tries to access destroyed InertNode.
                 */
                value: function _throwIfDestroyed() {
                    if (this.destroyed) {
                        throw new Error('Trying to access destroyed InertNode');
                    }
                }
                /** @return {boolean} */
            }, {
                key: 'ensureUntabbable',
                /** Save the existing tabindex value and make the node untabbable and unfocusable */
                value: function ensureUntabbable() {
                    if (this.node.nodeType !== Node.ELEMENT_NODE) {
                        return;
                    }
                    var element = /** @type {!Element} */ this.node;
                    if (matches.call(element, _focusableElementsString)) {
                        if ( /** @type {!HTMLElement} */element.tabIndex === -1 && this.hasSavedTabIndex) {
                            return;
                        }
                        if (element.hasAttribute('tabindex')) {
                            this._savedTabIndex = /** @type {!HTMLElement} */ element.tabIndex;
                        }
                        element.setAttribute('tabindex', '-1');
                        if (element.nodeType === Node.ELEMENT_NODE) {
                            element.focus = function () { };
                            this._overrodeFocusMethod = true;
                        }
                    }
                    else if (element.hasAttribute('tabindex')) {
                        this._savedTabIndex = /** @type {!HTMLElement} */ element.tabIndex;
                        element.removeAttribute('tabindex');
                    }
                }
                /**
                 * Add another inert root to this inert node's set of managing inert roots.
                 * @param {!InertRoot} inertRoot
                 */
            }, {
                key: 'addInertRoot',
                value: function addInertRoot(inertRoot) {
                    this._throwIfDestroyed();
                    this._inertRoots.add(inertRoot);
                }
                /**
                 * Remove the given inert root from this inert node's set of managing inert roots.
                 * If the set of managing inert roots becomes empty, this node is no longer inert,
                 * so the object should be destroyed.
                 * @param {!InertRoot} inertRoot
                 */
            }, {
                key: 'removeInertRoot',
                value: function removeInertRoot(inertRoot) {
                    this._throwIfDestroyed();
                    this._inertRoots['delete'](inertRoot);
                    if (this._inertRoots.size === 0) {
                        this.destructor();
                    }
                }
            }, {
                key: 'destroyed',
                get: function get() {
                    return ( /** @type {!InertNode} */this._destroyed);
                }
            }, {
                key: 'hasSavedTabIndex',
                get: function get() {
                    return this._savedTabIndex !== null;
                }
                /** @return {!Node} */
            }, {
                key: 'node',
                get: function get() {
                    this._throwIfDestroyed();
                    return this._node;
                }
                /** @param {?number} tabIndex */
            }, {
                key: 'savedTabIndex',
                set: function set(tabIndex) {
                    this._throwIfDestroyed();
                    this._savedTabIndex = tabIndex;
                }
                /** @return {?number} */
                ,
                get: function get() {
                    this._throwIfDestroyed();
                    return this._savedTabIndex;
                }
            }]);
        return InertNode;
    }();
    /**
     * InertManager is a per-document singleton object which manages all inert roots and nodes.
     *
     * When an element becomes an inert root by having an `inert` attribute set and/or its `inert`
     * property set to `true`, the `setInert` method creates an `InertRoot` object for the element.
     * The `InertRoot` in turn registers itself as managing all of the element's focusable descendant
     * nodes via the `register()` method. The `InertManager` ensures that a single `InertNode` instance
     * is created for each such node, via the `_managedNodes` map.
     */
    var InertManager = function () {
        /**
         * @param {!Document} document
         */
        function InertManager(document) {
            _classCallCheck(this, InertManager);
            if (!document) {
                throw new Error('Missing required argument; InertManager needs to wrap a document.');
            }
            /** @type {!Document} */
            this._document = document;
            /**
             * All managed nodes known to this InertManager. In a map to allow looking up by Node.
             * @type {!Map<!Node, !InertNode>}
             */
            this._managedNodes = new Map();
            /**
             * All inert roots known to this InertManager. In a map to allow looking up by Node.
             * @type {!Map<!Node, !InertRoot>}
             */
            this._inertRoots = new Map();
            /**
             * Observer for mutations on `document.body`.
             * @type {!MutationObserver}
             */
            this._observer = new MutationObserver(this._watchForInert.bind(this));
            // Add inert style.
            addInertStyle(document.head || document.body || document.documentElement);
            // Wait for document to be loaded.
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', this._onDocumentLoaded.bind(this));
            }
            else {
                this._onDocumentLoaded();
            }
        }
        /**
         * Set whether the given element should be an inert root or not.
         * @param {!Element} root
         * @param {boolean} inert
         */
        _createClass(InertManager, [{
                key: 'setInert',
                value: function setInert(root, inert) {
                    if (inert) {
                        if (this._inertRoots.has(root)) {
                            // element is already inert
                            return;
                        }
                        var inertRoot = new InertRoot(root, this);
                        root.setAttribute('inert', '');
                        this._inertRoots.set(root, inertRoot);
                        // If not contained in the document, it must be in a shadowRoot.
                        // Ensure inert styles are added there.
                        if (!this._document.body.contains(root)) {
                            var parent = root.parentNode;
                            while (parent) {
                                if (parent.nodeType === 11) {
                                    addInertStyle(parent);
                                }
                                parent = parent.parentNode;
                            }
                        }
                    }
                    else {
                        if (!this._inertRoots.has(root)) {
                            // element is already non-inert
                            return;
                        }
                        var _inertRoot = this._inertRoots.get(root);
                        _inertRoot.destructor();
                        this._inertRoots['delete'](root);
                        root.removeAttribute('inert');
                    }
                }
                /**
                 * Get the InertRoot object corresponding to the given inert root element, if any.
                 * @param {!Node} element
                 * @return {!InertRoot|undefined}
                 */
            }, {
                key: 'getInertRoot',
                value: function getInertRoot(element) {
                    return this._inertRoots.get(element);
                }
                /**
                 * Register the given InertRoot as managing the given node.
                 * In the case where the node has a previously existing inert root, this inert root will
                 * be added to its set of inert roots.
                 * @param {!Node} node
                 * @param {!InertRoot} inertRoot
                 * @return {!InertNode} inertNode
                 */
            }, {
                key: 'register',
                value: function register(node, inertRoot) {
                    var inertNode = this._managedNodes.get(node);
                    if (inertNode !== undefined) {
                        // node was already in an inert subtree
                        inertNode.addInertRoot(inertRoot);
                    }
                    else {
                        inertNode = new InertNode(node, inertRoot);
                    }
                    this._managedNodes.set(node, inertNode);
                    return inertNode;
                }
                /**
                 * De-register the given InertRoot as managing the given inert node.
                 * Removes the inert root from the InertNode's set of managing inert roots, and remove the inert
                 * node from the InertManager's set of managed nodes if it is destroyed.
                 * If the node is not currently managed, this is essentially a no-op.
                 * @param {!Node} node
                 * @param {!InertRoot} inertRoot
                 * @return {?InertNode} The potentially destroyed InertNode associated with this node, if any.
                 */
            }, {
                key: 'deregister',
                value: function deregister(node, inertRoot) {
                    var inertNode = this._managedNodes.get(node);
                    if (!inertNode) {
                        return null;
                    }
                    inertNode.removeInertRoot(inertRoot);
                    if (inertNode.destroyed) {
                        this._managedNodes['delete'](node);
                    }
                    return inertNode;
                }
                /**
                 * Callback used when document has finished loading.
                 */
            }, {
                key: '_onDocumentLoaded',
                value: function _onDocumentLoaded() {
                    // Find all inert roots in document and make them actually inert.
                    var inertElements = slice.call(this._document.querySelectorAll('[inert]'));
                    inertElements.forEach(function (inertElement) {
                        this.setInert(inertElement, true);
                    }, this);
                    // Comment this out to use programmatic API only.
                    this._observer.observe(this._document.body || this._document.documentElement, { attributes: true, subtree: true, childList: true });
                }
                /**
                 * Callback used when mutation observer detects attribute changes.
                 * @param {!Array<!MutationRecord>} records
                 * @param {!MutationObserver} self
                 */
            }, {
                key: '_watchForInert',
                value: function _watchForInert(records, self) {
                    var _this = this;
                    records.forEach(function (record) {
                        switch (record.type) {
                            case 'childList':
                                slice.call(record.addedNodes).forEach(function (node) {
                                    if (node.nodeType !== Node.ELEMENT_NODE) {
                                        return;
                                    }
                                    var inertElements = slice.call(node.querySelectorAll('[inert]'));
                                    if (matches.call(node, '[inert]')) {
                                        inertElements.unshift(node);
                                    }
                                    inertElements.forEach(function (inertElement) {
                                        this.setInert(inertElement, true);
                                    }, _this);
                                }, _this);
                                break;
                            case 'attributes':
                                if (record.attributeName !== 'inert') {
                                    return;
                                }
                                var target = /** @type {!Element} */ record.target;
                                var inert = target.hasAttribute('inert');
                                _this.setInert(target, inert);
                                break;
                        }
                    }, this);
                }
            }]);
        return InertManager;
    }();
    /**
     * Recursively walk the composed tree from |node|.
     * @param {!Node} node
     * @param {(function (!Element))=} callback Callback to be called for each element traversed,
     *     before descending into child nodes.
     * @param {?ShadowRoot=} shadowRootAncestor The nearest ShadowRoot ancestor, if any.
     */
    function composedTreeWalk(node, callback, shadowRootAncestor) {
        if (node.nodeType == Node.ELEMENT_NODE) {
            var element = /** @type {!Element} */ node;
            if (callback) {
                callback(element);
            }
            // Descend into node:
            // If it has a ShadowRoot, ignore all child elements - these will be picked
            // up by the <content> or <shadow> elements. Descend straight into the
            // ShadowRoot.
            var shadowRoot = /** @type {!HTMLElement} */ element.shadowRoot;
            if (shadowRoot) {
                composedTreeWalk(shadowRoot, callback);
                return;
            }
            // If it is a <content> element, descend into distributed elements - these
            // are elements from outside the shadow root which are rendered inside the
            // shadow DOM.
            if (element.localName == 'content') {
                var content = /** @type {!HTMLContentElement} */ element;
                // Verifies if ShadowDom v0 is supported.
                var distributedNodes = content.getDistributedNodes ? content.getDistributedNodes() : [];
                for (var i = 0; i < distributedNodes.length; i++) {
                    composedTreeWalk(distributedNodes[i], callback);
                }
                return;
            }
            // If it is a <slot> element, descend into assigned nodes - these
            // are elements from outside the shadow root which are rendered inside the
            // shadow DOM.
            if (element.localName == 'slot') {
                var slot = /** @type {!HTMLSlotElement} */ element;
                // Verify if ShadowDom v1 is supported.
                var _distributedNodes = slot.assignedNodes ? slot.assignedNodes({ flatten: true }) : [];
                for (var _i = 0; _i < _distributedNodes.length; _i++) {
                    composedTreeWalk(_distributedNodes[_i], callback);
                }
                return;
            }
        }
        // If it is neither the parent of a ShadowRoot, a <content> element, a <slot>
        // element, nor a <shadow> element recurse normally.
        var child = node.firstChild;
        while (child != null) {
            composedTreeWalk(child, callback);
            child = child.nextSibling;
        }
    }
    /**
     * Adds a style element to the node containing the inert specific styles
     * @param {!Node} node
     */
    function addInertStyle(node) {
        if (node.querySelector('style#inert-style, link#inert-style')) {
            return;
        }
        var style = document.createElement('style');
        style.setAttribute('id', 'inert-style');
        style.textContent = '\n' + '[inert] {\n' + '  pointer-events: none;\n' + '  cursor: default;\n' + '}\n' + '\n' + '[inert], [inert] * {\n' + '  -webkit-user-select: none;\n' + '  -moz-user-select: none;\n' + '  -ms-user-select: none;\n' + '  user-select: none;\n' + '}\n';
        node.appendChild(style);
    }
    /** @type {!InertManager} */
    var inertManager = new InertManager(document);
    if (!Element.prototype.hasOwnProperty('inert')) {
        Object.defineProperty(Element.prototype, 'inert', {
            enumerable: true,
            /** @this {!Element} */
            get: function get() {
                return this.hasAttribute('inert');
            },
            /** @this {!Element} */
            set: function set(inert) {
                inertManager.setInert(this, inert);
            }
        });
    }
})();
/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var cssClasses = {
    CLOSING: 'mdc-dialog--closing',
    OPEN: 'mdc-dialog--open',
    OPENING: 'mdc-dialog--opening',
    SCROLLABLE: 'mdc-dialog--scrollable',
    SCROLL_LOCK: 'mdc-dialog-scroll-lock',
    STACKED: 'mdc-dialog--stacked',
};
var strings = {
    ACTION_ATTRIBUTE: 'data-mdc-dialog-action',
    BUTTON_DEFAULT_ATTRIBUTE: 'data-mdc-dialog-button-default',
    BUTTON_SELECTOR: '.mdc-dialog__button',
    CLOSED_EVENT: 'MDCDialog:closed',
    CLOSE_ACTION: 'close',
    CLOSING_EVENT: 'MDCDialog:closing',
    CONTAINER_SELECTOR: '.mdc-dialog__container',
    CONTENT_SELECTOR: '.mdc-dialog__content',
    DESTROY_ACTION: 'destroy',
    INITIAL_FOCUS_ATTRIBUTE: 'data-mdc-dialog-initial-focus',
    OPENED_EVENT: 'MDCDialog:opened',
    OPENING_EVENT: 'MDCDialog:opening',
    SCRIM_SELECTOR: '.mdc-dialog__scrim',
    SUPPRESS_DEFAULT_PRESS_SELECTOR: [
        'textarea',
        '.mdc-menu .mdc-list-item',
    ].join(', '),
    SURFACE_SELECTOR: '.mdc-dialog__surface',
};
var numbers = {
    DIALOG_ANIMATION_CLOSE_TIME_MS: 75,
    DIALOG_ANIMATION_OPEN_TIME_MS: 150,
};
/**
 * @license
 * Copyright 2017 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var MDCDialogFoundation = /** @class */ (function (_super) {
    __extends(MDCDialogFoundation, _super);
    function MDCDialogFoundation(adapter) {
        var _this = _super.call(this, __assign(__assign({}, MDCDialogFoundation.defaultAdapter), adapter)) || this;
        _this.isOpen_ = false;
        _this.animationFrame_ = 0;
        _this.animationTimer_ = 0;
        _this.layoutFrame_ = 0;
        _this.escapeKeyAction_ = strings.CLOSE_ACTION;
        _this.scrimClickAction_ = strings.CLOSE_ACTION;
        _this.autoStackButtons_ = true;
        _this.areButtonsStacked_ = false;
        return _this;
    }
    Object.defineProperty(MDCDialogFoundation, "cssClasses", {
        get: function () {
            return cssClasses;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MDCDialogFoundation, "strings", {
        get: function () {
            return strings;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MDCDialogFoundation, "numbers", {
        get: function () {
            return numbers;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MDCDialogFoundation, "defaultAdapter", {
        get: function () {
            return {
                addBodyClass: function () { return undefined; },
                addClass: function () { return undefined; },
                areButtonsStacked: function () { return false; },
                clickDefaultButton: function () { return undefined; },
                eventTargetMatches: function () { return false; },
                getActionFromEvent: function () { return ''; },
                getInitialFocusEl: function () { return null; },
                hasClass: function () { return false; },
                isContentScrollable: function () { return false; },
                notifyClosed: function () { return undefined; },
                notifyClosing: function () { return undefined; },
                notifyOpened: function () { return undefined; },
                notifyOpening: function () { return undefined; },
                releaseFocus: function () { return undefined; },
                removeBodyClass: function () { return undefined; },
                removeClass: function () { return undefined; },
                reverseButtons: function () { return undefined; },
                trapFocus: function () { return undefined; },
            };
        },
        enumerable: true,
        configurable: true
    });
    MDCDialogFoundation.prototype.init = function () {
        if (this.adapter.hasClass(cssClasses.STACKED)) {
            this.setAutoStackButtons(false);
        }
    };
    MDCDialogFoundation.prototype.destroy = function () {
        if (this.isOpen_) {
            this.close(strings.DESTROY_ACTION);
        }
        if (this.animationTimer_) {
            clearTimeout(this.animationTimer_);
            this.handleAnimationTimerEnd_();
        }
        if (this.layoutFrame_) {
            cancelAnimationFrame(this.layoutFrame_);
            this.layoutFrame_ = 0;
        }
    };
    MDCDialogFoundation.prototype.open = function () {
        var _this = this;
        this.isOpen_ = true;
        this.adapter.notifyOpening();
        this.adapter.addClass(cssClasses.OPENING);
        // Wait a frame once display is no longer "none", to establish basis for animation
        this.runNextAnimationFrame_(function () {
            _this.adapter.addClass(cssClasses.OPEN);
            _this.adapter.addBodyClass(cssClasses.SCROLL_LOCK);
            _this.layout();
            _this.animationTimer_ = setTimeout(function () {
                _this.handleAnimationTimerEnd_();
                _this.adapter.trapFocus(_this.adapter.getInitialFocusEl());
                _this.adapter.notifyOpened();
            }, numbers.DIALOG_ANIMATION_OPEN_TIME_MS);
        });
    };
    MDCDialogFoundation.prototype.close = function (action) {
        var _this = this;
        if (action === void 0) {
            action = '';
        }
        if (!this.isOpen_) {
            // Avoid redundant close calls (and events), e.g. from keydown on elements that inherently emit click
            return;
        }
        this.isOpen_ = false;
        this.adapter.notifyClosing(action);
        this.adapter.addClass(cssClasses.CLOSING);
        this.adapter.removeClass(cssClasses.OPEN);
        this.adapter.removeBodyClass(cssClasses.SCROLL_LOCK);
        cancelAnimationFrame(this.animationFrame_);
        this.animationFrame_ = 0;
        clearTimeout(this.animationTimer_);
        this.animationTimer_ = setTimeout(function () {
            _this.adapter.releaseFocus();
            _this.handleAnimationTimerEnd_();
            _this.adapter.notifyClosed(action);
        }, numbers.DIALOG_ANIMATION_CLOSE_TIME_MS);
    };
    MDCDialogFoundation.prototype.isOpen = function () {
        return this.isOpen_;
    };
    MDCDialogFoundation.prototype.getEscapeKeyAction = function () {
        return this.escapeKeyAction_;
    };
    MDCDialogFoundation.prototype.setEscapeKeyAction = function (action) {
        this.escapeKeyAction_ = action;
    };
    MDCDialogFoundation.prototype.getScrimClickAction = function () {
        return this.scrimClickAction_;
    };
    MDCDialogFoundation.prototype.setScrimClickAction = function (action) {
        this.scrimClickAction_ = action;
    };
    MDCDialogFoundation.prototype.getAutoStackButtons = function () {
        return this.autoStackButtons_;
    };
    MDCDialogFoundation.prototype.setAutoStackButtons = function (autoStack) {
        this.autoStackButtons_ = autoStack;
    };
    MDCDialogFoundation.prototype.layout = function () {
        var _this = this;
        if (this.layoutFrame_) {
            cancelAnimationFrame(this.layoutFrame_);
        }
        this.layoutFrame_ = requestAnimationFrame(function () {
            _this.layoutInternal_();
            _this.layoutFrame_ = 0;
        });
    };
    /** Handles click on the dialog root element. */
    MDCDialogFoundation.prototype.handleClick = function (evt) {
        var isScrim = this.adapter.eventTargetMatches(evt.target, strings.SCRIM_SELECTOR);
        // Check for scrim click first since it doesn't require querying ancestors.
        if (isScrim && this.scrimClickAction_ !== '') {
            this.close(this.scrimClickAction_);
        }
        else {
            var action = this.adapter.getActionFromEvent(evt);
            if (action) {
                this.close(action);
            }
        }
    };
    /** Handles keydown on the dialog root element. */
    MDCDialogFoundation.prototype.handleKeydown = function (evt) {
        var isEnter = evt.key === 'Enter' || evt.keyCode === 13;
        if (!isEnter) {
            return;
        }
        var action = this.adapter.getActionFromEvent(evt);
        if (action) {
            // Action button callback is handled in `handleClick`,
            // since space/enter keydowns on buttons trigger click events.
            return;
        }
        var isDefault = !this.adapter.eventTargetMatches(evt.target, strings.SUPPRESS_DEFAULT_PRESS_SELECTOR);
        if (isEnter && isDefault) {
            this.adapter.clickDefaultButton();
        }
    };
    /** Handles keydown on the document. */
    MDCDialogFoundation.prototype.handleDocumentKeydown = function (evt) {
        var isEscape = evt.key === 'Escape' || evt.keyCode === 27;
        if (isEscape && this.escapeKeyAction_ !== '') {
            this.close(this.escapeKeyAction_);
        }
    };
    MDCDialogFoundation.prototype.layoutInternal_ = function () {
        if (this.autoStackButtons_) {
            this.detectStackedButtons_();
        }
        this.detectScrollableContent_();
    };
    MDCDialogFoundation.prototype.handleAnimationTimerEnd_ = function () {
        this.animationTimer_ = 0;
        this.adapter.removeClass(cssClasses.OPENING);
        this.adapter.removeClass(cssClasses.CLOSING);
    };
    /**
     * Runs the given logic on the next animation frame, using setTimeout to factor in Firefox reflow behavior.
     */
    MDCDialogFoundation.prototype.runNextAnimationFrame_ = function (callback) {
        var _this = this;
        cancelAnimationFrame(this.animationFrame_);
        this.animationFrame_ = requestAnimationFrame(function () {
            _this.animationFrame_ = 0;
            clearTimeout(_this.animationTimer_);
            _this.animationTimer_ = setTimeout(callback, 0);
        });
    };
    MDCDialogFoundation.prototype.detectStackedButtons_ = function () {
        // Remove the class first to let us measure the buttons' natural positions.
        this.adapter.removeClass(cssClasses.STACKED);
        var areButtonsStacked = this.adapter.areButtonsStacked();
        if (areButtonsStacked) {
            this.adapter.addClass(cssClasses.STACKED);
        }
        if (areButtonsStacked !== this.areButtonsStacked_) {
            this.adapter.reverseButtons();
            this.areButtonsStacked_ = areButtonsStacked;
        }
    };
    MDCDialogFoundation.prototype.detectScrollableContent_ = function () {
        // Remove the class first to let us measure the natural height of the content.
        this.adapter.removeClass(cssClasses.SCROLLABLE);
        if (this.adapter.isContentScrollable()) {
            this.adapter.addClass(cssClasses.SCROLLABLE);
        }
    };
    return MDCDialogFoundation;
}(MDCFoundation));
var blockingElements = document.$blockingElements;
var DialogBase = /** @class */ (function (_super_1) {
    __extends(DialogBase, _super_1);
    function DialogBase() {
        var _this_1 = _super_1.apply(this, arguments) || this;
        _this_1.hideActions = false;
        _this_1.stacked = false;
        _this_1.heading = '';
        _this_1.scrimClickAction = 'close';
        _this_1.escapeKeyAction = 'close';
        _this_1.open = false;
        _this_1.defaultAction = 'close';
        _this_1.actionAttribute = 'dialogAction';
        _this_1.initialFocusAttribute = 'dialogInitialFocus';
        _this_1.mdcFoundationClass = MDCDialogFoundation;
        _this_1.boundLayout = null;
        _this_1.boundHandleClick = null;
        _this_1.boundHandleKeydown = null;
        _this_1.boundHandleDocumentKeydown = null;
        return _this_1;
    }
    Object.defineProperty(DialogBase.prototype, "primaryButton", {
        get: function () {
            var assignedNodes = this.primarySlot.assignedNodes();
            assignedNodes = assignedNodes.filter(function (node) { return node instanceof HTMLElement; });
            var button = assignedNodes[0];
            return button ? button : null;
        },
        enumerable: false,
        configurable: true
    });
    DialogBase.prototype.emitNotification = function (name, action) {
        var init = { detail: action ? { action: action } : {} };
        var ev = new CustomEvent(name, init);
        this.dispatchEvent(ev);
    };
    DialogBase.prototype.getInitialFocusEl = function () {
        var initFocusSelector = "[" + this.initialFocusAttribute + "]";
        // only search light DOM. This typically handles all the cases
        var lightDomQs = this.querySelector(initFocusSelector);
        if (lightDomQs) {
            return lightDomQs;
        }
        // if not in light dom, search each flattened distributed node.
        var primarySlot = this.primarySlot;
        var primaryNodes = primarySlot.assignedNodes({ flatten: true });
        var primaryFocusElement = this.searchNodeTreesForAttribute(primaryNodes, this.initialFocusAttribute);
        if (primaryFocusElement) {
            return primaryFocusElement;
        }
        var secondarySlot = this.secondarySlot;
        var secondaryNodes = secondarySlot.assignedNodes({ flatten: true });
        var secondaryFocusElement = this.searchNodeTreesForAttribute(secondaryNodes, this.initialFocusAttribute);
        if (secondaryFocusElement) {
            return secondaryFocusElement;
        }
        var contentSlot = this.contentSlot;
        var contentNodes = contentSlot.assignedNodes({ flatten: true });
        var initFocusElement = this.searchNodeTreesForAttribute(contentNodes, this.initialFocusAttribute);
        return initFocusElement;
    };
    DialogBase.prototype.searchNodeTreesForAttribute = function (nodes, attribute) {
        for (var _d = 0, nodes_1 = nodes; _d < nodes_1.length; _d++) {
            var node = nodes_1[_d];
            if (!(node instanceof HTMLElement)) {
                continue;
            }
            if (node.hasAttribute(attribute)) {
                return node;
            }
            else {
                var selection = node.querySelector("[" + attribute + "]");
                if (selection) {
                    return selection;
                }
            }
        }
        return null;
    };
    DialogBase.prototype.createAdapter = function () {
        var _this_1 = this;
        return Object.assign(Object.assign({}, addHasRemoveClass(this.mdcRoot)), { addBodyClass: function () { return document.body.style.overflow = 'hidden'; }, removeBodyClass: function () { return document.body.style.overflow = ''; }, areButtonsStacked: function () { return _this_1.stacked; }, clickDefaultButton: function () {
                var primary = _this_1.primaryButton;
                if (primary) {
                    primary.click();
                }
            }, eventTargetMatches: function (target, selector) { return target ? matches(target, selector) : false; }, getActionFromEvent: function (e) {
                if (!e.target) {
                    return '';
                }
                var element = closest(e.target, "[" + _this_1.actionAttribute + "]");
                var action = element && element.getAttribute(_this_1.actionAttribute);
                return action;
            }, getInitialFocusEl: function () {
                return _this_1.getInitialFocusEl();
            }, isContentScrollable: function () {
                var el = _this_1.contentElement;
                return el ? el.scrollHeight > el.offsetHeight : false;
            }, notifyClosed: function (action) { return _this_1.emitNotification('closed', action); }, notifyClosing: function (action) {
                if (!_this_1.closingDueToDisconnect) {
                    // Don't set our open state to closed just because we were
                    // disconnected. That way if we get reconnected, we'll know to
                    // re-open.
                    _this_1.open = false;
                }
                _this_1.emitNotification('closing', action);
            }, notifyOpened: function () { return _this_1.emitNotification('opened'); }, notifyOpening: function () {
                _this_1.open = true;
                _this_1.emitNotification('opening');
            }, reverseButtons: function () { }, releaseFocus: function () {
                blockingElements.remove(_this_1);
            }, trapFocus: function (el) {
                blockingElements.push(_this_1);
                if (el) {
                    el.focus();
                }
            } });
    };
    DialogBase.prototype.render = function () {
        var _d;
        var classes = (_d = {},
            _d[cssClasses.STACKED] = this.stacked,
            _d);
        var heading = html(templateObject_1 || (templateObject_1 = __makeTemplateObject([""], [""])));
        if (this.heading) {
            heading = this.renderHeading();
        }
        var actionsClasses = {
            'mdc-dialog__actions': !this.hideActions,
        };
        return html(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    <div class=\"mdc-dialog ", "\"\n        role=\"alertdialog\"\n        aria-modal=\"true\"\n        aria-labelledby=\"title\"\n        aria-describedby=\"content\">\n      <div class=\"mdc-dialog__container\">\n        <div class=\"mdc-dialog__surface\">\n          ", "\n          <div id=\"content\" class=\"mdc-dialog__content\">\n            <slot id=\"contentSlot\"></slot>\n          </div>\n          <footer\n              id=\"actions\"\n              class=\"", "\">\n            <span>\n              <slot name=\"secondaryAction\"></slot>\n            </span>\n            <span>\n             <slot name=\"primaryAction\"></slot>\n            </span>\n          </footer>\n        </div>\n      </div>\n      <div class=\"mdc-dialog__scrim\"></div>\n    </div>"], ["\n    <div class=\"mdc-dialog ", "\"\n        role=\"alertdialog\"\n        aria-modal=\"true\"\n        aria-labelledby=\"title\"\n        aria-describedby=\"content\">\n      <div class=\"mdc-dialog__container\">\n        <div class=\"mdc-dialog__surface\">\n          ", "\n          <div id=\"content\" class=\"mdc-dialog__content\">\n            <slot id=\"contentSlot\"></slot>\n          </div>\n          <footer\n              id=\"actions\"\n              class=\"", "\">\n            <span>\n              <slot name=\"secondaryAction\"></slot>\n            </span>\n            <span>\n             <slot name=\"primaryAction\"></slot>\n            </span>\n          </footer>\n        </div>\n      </div>\n      <div class=\"mdc-dialog__scrim\"></div>\n    </div>"])), classMap(classes), heading, classMap(actionsClasses));
    };
    DialogBase.prototype.renderHeading = function () {
        return html(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n      <h2 id=\"title\" class=\"mdc-dialog__title\">", "</h2>"], ["\n      <h2 id=\"title\" class=\"mdc-dialog__title\">", "</h2>"])), this.heading);
    };
    DialogBase.prototype.firstUpdated = function () {
        _super_1.prototype.firstUpdated.call(this);
        this.mdcFoundation.setAutoStackButtons(true);
    };
    DialogBase.prototype.connectedCallback = function () {
        _super_1.prototype.connectedCallback.call(this);
        if (this.open && this.mdcFoundation && !this.mdcFoundation.isOpen()) {
            // We probably got disconnected while we were still open. Re-open,
            // matching the behavior of native <dialog>.
            this.setEventListeners();
            this.mdcFoundation.open();
        }
    };
    DialogBase.prototype.disconnectedCallback = function () {
        _super_1.prototype.disconnectedCallback.call(this);
        if (this.open && this.mdcFoundation) {
            // If this dialog is opened and then disconnected, we want to close
            // the foundation, so that 1) any pending timers are cancelled
            // (in particular for trapFocus), and 2) if we reconnect, we can open
            // the foundation again to retrigger animations and focus.
            this.removeEventListeners();
            this.closingDueToDisconnect = true;
            this.mdcFoundation.close(this.currentAction || this.defaultAction);
            this.closingDueToDisconnect = false;
            this.currentAction = undefined;
            // When we close normally, the releaseFocus callback handles removing
            // ourselves from the blocking elements stack. However, that callback
            // happens on a delay, and when we are closing due to a disconnect we
            // need to remove ourselves before the blocking element polyfill's
            // mutation observer notices and logs a warning, since it's not valid to
            // be in the blocking elements stack while disconnected.
            blockingElements.remove(this);
        }
    };
    DialogBase.prototype.forceLayout = function () {
        this.mdcFoundation.layout();
    };
    DialogBase.prototype.focus = function () {
        var initialFocusEl = this.getInitialFocusEl();
        initialFocusEl && initialFocusEl.focus();
    };
    DialogBase.prototype.blur = function () {
        if (!this.shadowRoot) {
            return;
        }
        var activeEl = this.shadowRoot.activeElement;
        if (activeEl) {
            if (activeEl instanceof HTMLElement) {
                activeEl.blur();
            }
        }
        else {
            var root = this.getRootNode();
            var activeEl_1 = root instanceof Document ? root.activeElement : null;
            if (activeEl_1 instanceof HTMLElement) {
                activeEl_1.blur();
            }
        }
    };
    DialogBase.prototype.setEventListeners = function () {
        var _this_1 = this;
        this.boundHandleClick = this.mdcFoundation.handleClick.bind(this.mdcFoundation);
        this.boundLayout = function () {
            if (_this_1.open) {
                _this_1.mdcFoundation.layout.bind(_this_1.mdcFoundation);
            }
        };
        this.boundHandleKeydown = this.mdcFoundation.handleKeydown.bind(this.mdcFoundation);
        this.boundHandleDocumentKeydown =
            this.mdcFoundation.handleDocumentKeydown.bind(this.mdcFoundation);
        this.mdcRoot.addEventListener('click', this.boundHandleClick);
        window.addEventListener('resize', this.boundLayout, applyPassive());
        window.addEventListener('orientationchange', this.boundLayout, applyPassive());
        this.mdcRoot.addEventListener('keydown', this.boundHandleKeydown, applyPassive());
        document.addEventListener('keydown', this.boundHandleDocumentKeydown, applyPassive());
    };
    DialogBase.prototype.removeEventListeners = function () {
        if (this.boundHandleClick) {
            this.mdcRoot.removeEventListener('click', this.boundHandleClick);
        }
        if (this.boundLayout) {
            window.removeEventListener('resize', this.boundLayout);
            window.removeEventListener('orientationchange', this.boundLayout);
        }
        if (this.boundHandleKeydown) {
            this.mdcRoot.removeEventListener('keydown', this.boundHandleKeydown);
        }
        if (this.boundHandleDocumentKeydown) {
            this.mdcRoot.removeEventListener('keydown', this.boundHandleDocumentKeydown);
        }
    };
    DialogBase.prototype.close = function () {
        this.open = false;
    };
    DialogBase.prototype.show = function () {
        this.open = true;
    };
    return DialogBase;
}(BaseElement));
__decorate([
    query('.mdc-dialog')
], DialogBase.prototype, "mdcRoot", void 0);
__decorate([
    query('slot[name="primaryAction"]')
], DialogBase.prototype, "primarySlot", void 0);
__decorate([
    query('slot[name="secondaryAction"]')
], DialogBase.prototype, "secondarySlot", void 0);
__decorate([
    query('#contentSlot')
], DialogBase.prototype, "contentSlot", void 0);
__decorate([
    query('.mdc-dialog__content')
], DialogBase.prototype, "contentElement", void 0);
__decorate([
    query('.mdc-container')
], DialogBase.prototype, "conatinerElement", void 0);
__decorate([
    property({ type: Boolean })
], DialogBase.prototype, "hideActions", void 0);
__decorate([
    property({ type: Boolean }),
    observer(function () {
        this.forceLayout();
    })
], DialogBase.prototype, "stacked", void 0);
__decorate([
    property({ type: String })
], DialogBase.prototype, "heading", void 0);
__decorate([
    property({ type: String }),
    observer(function (newAction) {
        this.mdcFoundation.setScrimClickAction(newAction);
    })
], DialogBase.prototype, "scrimClickAction", void 0);
__decorate([
    property({ type: String }),
    observer(function (newAction) {
        this.mdcFoundation.setEscapeKeyAction(newAction);
    })
], DialogBase.prototype, "escapeKeyAction", void 0);
__decorate([
    property({ type: Boolean, reflect: true }),
    observer(function (isOpen) {
        // Check isConnected because we could have been disconnected before first
        // update. If we're now closed, then we shouldn't start the MDC foundation
        // opening animation. If we're now closed, then we've already closed the
        // foundation in disconnectedCallback.
        if (this.mdcFoundation && this.isConnected) {
            if (isOpen) {
                this.setEventListeners();
                this.mdcFoundation.open();
            }
            else {
                this.removeEventListeners();
                this.mdcFoundation.close(this.currentAction || this.defaultAction);
                this.currentAction = undefined;
            }
        }
    })
], DialogBase.prototype, "open", void 0);
__decorate([
    property()
], DialogBase.prototype, "defaultAction", void 0);
__decorate([
    property()
], DialogBase.prototype, "actionAttribute", void 0);
__decorate([
    property()
], DialogBase.prototype, "initialFocusAttribute", void 0);
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
var style = css(templateObject_4 || (templateObject_4 = __makeTemplateObject([".mdc-elevation-overlay{position:absolute;border-radius:inherit;opacity:0;pointer-events:none;transition:opacity 280ms cubic-bezier(0.4, 0, 0.2, 1);background-color:#fff}.mdc-dialog,.mdc-dialog__scrim{position:fixed;top:0;left:0;align-items:center;justify-content:center;box-sizing:border-box;width:100%;height:100%}.mdc-dialog{display:none;z-index:7}.mdc-dialog .mdc-dialog__surface{background-color:#fff;background-color:var(--mdc-theme-surface, #fff)}.mdc-dialog .mdc-dialog__scrim{background-color:rgba(0,0,0,.32)}.mdc-dialog .mdc-dialog__title{color:rgba(0,0,0,.87)}.mdc-dialog .mdc-dialog__content{color:rgba(0,0,0,.6)}.mdc-dialog.mdc-dialog--scrollable .mdc-dialog__title,.mdc-dialog.mdc-dialog--scrollable .mdc-dialog__actions{border-color:rgba(0,0,0,.12)}.mdc-dialog .mdc-dialog__content{padding:20px 24px 20px 24px}.mdc-dialog .mdc-dialog__surface{min-width:280px}@media(max-width: 592px){.mdc-dialog .mdc-dialog__surface{max-width:calc(100vw - 32px)}}@media(min-width: 592px){.mdc-dialog .mdc-dialog__surface{max-width:560px}}.mdc-dialog .mdc-dialog__surface{max-height:calc(100% - 32px)}.mdc-dialog .mdc-dialog__surface{border-radius:4px;border-radius:var(--mdc-shape-medium, 4px)}.mdc-dialog__scrim{opacity:0;z-index:-1}.mdc-dialog__container{display:flex;flex-direction:row;align-items:center;justify-content:space-around;box-sizing:border-box;height:100%;transform:scale(0.8);opacity:0;pointer-events:none}.mdc-dialog__surface{position:relative;box-shadow:0px 11px 15px -7px rgba(0, 0, 0, 0.2),0px 24px 38px 3px rgba(0, 0, 0, 0.14),0px 9px 46px 8px rgba(0,0,0,.12);display:flex;flex-direction:column;flex-grow:0;flex-shrink:0;box-sizing:border-box;max-width:100%;max-height:100%;pointer-events:auto;overflow-y:auto}.mdc-dialog__surface .mdc-elevation-overlay{width:100%;height:100%;top:0;left:0}.mdc-dialog[dir=rtl] .mdc-dialog__surface,[dir=rtl] .mdc-dialog .mdc-dialog__surface{text-align:right}.mdc-dialog__title{display:block;margin-top:0;line-height:normal;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-headline6-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:1.25rem;font-size:var(--mdc-typography-headline6-font-size, 1.25rem);line-height:2rem;line-height:var(--mdc-typography-headline6-line-height, 2rem);font-weight:500;font-weight:var(--mdc-typography-headline6-font-weight, 500);letter-spacing:0.0125em;letter-spacing:var(--mdc-typography-headline6-letter-spacing, 0.0125em);text-decoration:inherit;text-decoration:var(--mdc-typography-headline6-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-headline6-text-transform, inherit);position:relative;flex-shrink:0;box-sizing:border-box;margin:0;padding:0 24px 9px;border-bottom:1px solid transparent}.mdc-dialog__title::before{display:inline-block;width:0;height:40px;content:\"\";vertical-align:0}.mdc-dialog[dir=rtl] .mdc-dialog__title,[dir=rtl] .mdc-dialog .mdc-dialog__title{text-align:right}.mdc-dialog--scrollable .mdc-dialog__title{padding-bottom:15px}.mdc-dialog__content{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-body1-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:1rem;font-size:var(--mdc-typography-body1-font-size, 1rem);line-height:1.5rem;line-height:var(--mdc-typography-body1-line-height, 1.5rem);font-weight:400;font-weight:var(--mdc-typography-body1-font-weight, 400);letter-spacing:0.03125em;letter-spacing:var(--mdc-typography-body1-letter-spacing, 0.03125em);text-decoration:inherit;text-decoration:var(--mdc-typography-body1-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-body1-text-transform, inherit);flex-grow:1;box-sizing:border-box;margin:0;overflow:auto;-webkit-overflow-scrolling:touch}.mdc-dialog__content>:first-child{margin-top:0}.mdc-dialog__content>:last-child{margin-bottom:0}.mdc-dialog__title+.mdc-dialog__content{padding-top:0}.mdc-dialog--scrollable .mdc-dialog__title+.mdc-dialog__content{padding-top:8px;padding-bottom:8px}.mdc-dialog__content .mdc-list:first-child:last-child{padding:6px 0 0}.mdc-dialog--scrollable .mdc-dialog__content .mdc-list:first-child:last-child{padding:0}.mdc-dialog__actions{display:flex;position:relative;flex-shrink:0;flex-wrap:wrap;align-items:center;justify-content:flex-end;box-sizing:border-box;min-height:52px;margin:0;padding:8px;border-top:1px solid transparent}.mdc-dialog--stacked .mdc-dialog__actions{flex-direction:column;align-items:flex-end}.mdc-dialog__button{margin-left:8px;margin-right:0;max-width:100%;text-align:right}[dir=rtl] .mdc-dialog__button,.mdc-dialog__button[dir=rtl]{margin-left:0;margin-right:8px}.mdc-dialog__button:first-child{margin-left:0;margin-right:0}[dir=rtl] .mdc-dialog__button:first-child,.mdc-dialog__button:first-child[dir=rtl]{margin-left:0;margin-right:0}.mdc-dialog[dir=rtl] .mdc-dialog__button,[dir=rtl] .mdc-dialog .mdc-dialog__button{text-align:left}.mdc-dialog--stacked .mdc-dialog__button:not(:first-child){margin-top:12px}.mdc-dialog--open,.mdc-dialog--opening,.mdc-dialog--closing{display:flex}.mdc-dialog--opening .mdc-dialog__scrim{transition:opacity 150ms linear}.mdc-dialog--opening .mdc-dialog__container{transition:opacity 75ms linear,transform 150ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mdc-dialog--closing .mdc-dialog__scrim,.mdc-dialog--closing .mdc-dialog__container{transition:opacity 75ms linear}.mdc-dialog--closing .mdc-dialog__container{transform:none}.mdc-dialog--open .mdc-dialog__scrim{opacity:1}.mdc-dialog--open .mdc-dialog__container{transform:none;opacity:1}.mdc-dialog-scroll-lock{overflow:hidden}#actions:not(.mdc-dialog__actions){display:none}.mdc-dialog__surface{box-shadow:var(--mdc-dialog-box-shadow, 0px 11px 15px -7px rgba(0, 0, 0, 0.2), 0px 24px 38px 3px rgba(0, 0, 0, 0.14), 0px 9px 46px 8px rgba(0, 0, 0, 0.12))}@media(min-width: 560px){.mdc-dialog .mdc-dialog__surface{max-width:560px;max-width:var(--mdc-dialog-max-width, 560px)}}.mdc-dialog .mdc-dialog__scrim{background-color:rgba(0, 0, 0, 0.32);background-color:var(--mdc-dialog-scrim-color, rgba(0, 0, 0, 0.32))}.mdc-dialog .mdc-dialog__title{color:rgba(0, 0, 0, 0.87);color:var(--mdc-dialog-heading-ink-color, rgba(0, 0, 0, 0.87))}.mdc-dialog .mdc-dialog__content{color:rgba(0, 0, 0, 0.6);color:var(--mdc-dialog-content-ink-color, rgba(0, 0, 0, 0.6))}.mdc-dialog.mdc-dialog--scrollable .mdc-dialog__title,.mdc-dialog.mdc-dialog--scrollable .mdc-dialog__actions{border-color:rgba(0, 0, 0, 0.12);border-color:var(--mdc-dialog-scroll-divider-color, rgba(0, 0, 0, 0.12))}.mdc-dialog .mdc-dialog__surface{min-width:280px;min-width:var(--mdc-dialog-min-width, 280px)}.mdc-dialog .mdc-dialog__surface{max-height:var(--mdc-dialog-max-height, calc(100% - 32px))}#actions ::slotted(*){margin-left:8px;margin-right:0;max-width:100%;text-align:right}[dir=rtl] #actions ::slotted(*),#actions ::slotted(*)[dir=rtl]{margin-left:0;margin-right:8px}.mdc-dialog[dir=rtl] #actions ::slotted(*),[dir=rtl] .mdc-dialog #actions ::slotted(*){text-align:left}.mdc-dialog--stacked #actions{flex-direction:column-reverse}.mdc-dialog--stacked #actions *:not(:last-child) ::slotted(*){flex-basis:1e-9px;margin-top:12px}"], [".mdc-elevation-overlay{position:absolute;border-radius:inherit;opacity:0;pointer-events:none;transition:opacity 280ms cubic-bezier(0.4, 0, 0.2, 1);background-color:#fff}.mdc-dialog,.mdc-dialog__scrim{position:fixed;top:0;left:0;align-items:center;justify-content:center;box-sizing:border-box;width:100%;height:100%}.mdc-dialog{display:none;z-index:7}.mdc-dialog .mdc-dialog__surface{background-color:#fff;background-color:var(--mdc-theme-surface, #fff)}.mdc-dialog .mdc-dialog__scrim{background-color:rgba(0,0,0,.32)}.mdc-dialog .mdc-dialog__title{color:rgba(0,0,0,.87)}.mdc-dialog .mdc-dialog__content{color:rgba(0,0,0,.6)}.mdc-dialog.mdc-dialog--scrollable .mdc-dialog__title,.mdc-dialog.mdc-dialog--scrollable .mdc-dialog__actions{border-color:rgba(0,0,0,.12)}.mdc-dialog .mdc-dialog__content{padding:20px 24px 20px 24px}.mdc-dialog .mdc-dialog__surface{min-width:280px}@media(max-width: 592px){.mdc-dialog .mdc-dialog__surface{max-width:calc(100vw - 32px)}}@media(min-width: 592px){.mdc-dialog .mdc-dialog__surface{max-width:560px}}.mdc-dialog .mdc-dialog__surface{max-height:calc(100% - 32px)}.mdc-dialog .mdc-dialog__surface{border-radius:4px;border-radius:var(--mdc-shape-medium, 4px)}.mdc-dialog__scrim{opacity:0;z-index:-1}.mdc-dialog__container{display:flex;flex-direction:row;align-items:center;justify-content:space-around;box-sizing:border-box;height:100%;transform:scale(0.8);opacity:0;pointer-events:none}.mdc-dialog__surface{position:relative;box-shadow:0px 11px 15px -7px rgba(0, 0, 0, 0.2),0px 24px 38px 3px rgba(0, 0, 0, 0.14),0px 9px 46px 8px rgba(0,0,0,.12);display:flex;flex-direction:column;flex-grow:0;flex-shrink:0;box-sizing:border-box;max-width:100%;max-height:100%;pointer-events:auto;overflow-y:auto}.mdc-dialog__surface .mdc-elevation-overlay{width:100%;height:100%;top:0;left:0}.mdc-dialog[dir=rtl] .mdc-dialog__surface,[dir=rtl] .mdc-dialog .mdc-dialog__surface{text-align:right}.mdc-dialog__title{display:block;margin-top:0;line-height:normal;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-headline6-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:1.25rem;font-size:var(--mdc-typography-headline6-font-size, 1.25rem);line-height:2rem;line-height:var(--mdc-typography-headline6-line-height, 2rem);font-weight:500;font-weight:var(--mdc-typography-headline6-font-weight, 500);letter-spacing:0.0125em;letter-spacing:var(--mdc-typography-headline6-letter-spacing, 0.0125em);text-decoration:inherit;text-decoration:var(--mdc-typography-headline6-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-headline6-text-transform, inherit);position:relative;flex-shrink:0;box-sizing:border-box;margin:0;padding:0 24px 9px;border-bottom:1px solid transparent}.mdc-dialog__title::before{display:inline-block;width:0;height:40px;content:\"\";vertical-align:0}.mdc-dialog[dir=rtl] .mdc-dialog__title,[dir=rtl] .mdc-dialog .mdc-dialog__title{text-align:right}.mdc-dialog--scrollable .mdc-dialog__title{padding-bottom:15px}.mdc-dialog__content{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-body1-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:1rem;font-size:var(--mdc-typography-body1-font-size, 1rem);line-height:1.5rem;line-height:var(--mdc-typography-body1-line-height, 1.5rem);font-weight:400;font-weight:var(--mdc-typography-body1-font-weight, 400);letter-spacing:0.03125em;letter-spacing:var(--mdc-typography-body1-letter-spacing, 0.03125em);text-decoration:inherit;text-decoration:var(--mdc-typography-body1-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-body1-text-transform, inherit);flex-grow:1;box-sizing:border-box;margin:0;overflow:auto;-webkit-overflow-scrolling:touch}.mdc-dialog__content>:first-child{margin-top:0}.mdc-dialog__content>:last-child{margin-bottom:0}.mdc-dialog__title+.mdc-dialog__content{padding-top:0}.mdc-dialog--scrollable .mdc-dialog__title+.mdc-dialog__content{padding-top:8px;padding-bottom:8px}.mdc-dialog__content .mdc-list:first-child:last-child{padding:6px 0 0}.mdc-dialog--scrollable .mdc-dialog__content .mdc-list:first-child:last-child{padding:0}.mdc-dialog__actions{display:flex;position:relative;flex-shrink:0;flex-wrap:wrap;align-items:center;justify-content:flex-end;box-sizing:border-box;min-height:52px;margin:0;padding:8px;border-top:1px solid transparent}.mdc-dialog--stacked .mdc-dialog__actions{flex-direction:column;align-items:flex-end}.mdc-dialog__button{margin-left:8px;margin-right:0;max-width:100%;text-align:right}[dir=rtl] .mdc-dialog__button,.mdc-dialog__button[dir=rtl]{margin-left:0;margin-right:8px}.mdc-dialog__button:first-child{margin-left:0;margin-right:0}[dir=rtl] .mdc-dialog__button:first-child,.mdc-dialog__button:first-child[dir=rtl]{margin-left:0;margin-right:0}.mdc-dialog[dir=rtl] .mdc-dialog__button,[dir=rtl] .mdc-dialog .mdc-dialog__button{text-align:left}.mdc-dialog--stacked .mdc-dialog__button:not(:first-child){margin-top:12px}.mdc-dialog--open,.mdc-dialog--opening,.mdc-dialog--closing{display:flex}.mdc-dialog--opening .mdc-dialog__scrim{transition:opacity 150ms linear}.mdc-dialog--opening .mdc-dialog__container{transition:opacity 75ms linear,transform 150ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mdc-dialog--closing .mdc-dialog__scrim,.mdc-dialog--closing .mdc-dialog__container{transition:opacity 75ms linear}.mdc-dialog--closing .mdc-dialog__container{transform:none}.mdc-dialog--open .mdc-dialog__scrim{opacity:1}.mdc-dialog--open .mdc-dialog__container{transform:none;opacity:1}.mdc-dialog-scroll-lock{overflow:hidden}#actions:not(.mdc-dialog__actions){display:none}.mdc-dialog__surface{box-shadow:var(--mdc-dialog-box-shadow, 0px 11px 15px -7px rgba(0, 0, 0, 0.2), 0px 24px 38px 3px rgba(0, 0, 0, 0.14), 0px 9px 46px 8px rgba(0, 0, 0, 0.12))}@media(min-width: 560px){.mdc-dialog .mdc-dialog__surface{max-width:560px;max-width:var(--mdc-dialog-max-width, 560px)}}.mdc-dialog .mdc-dialog__scrim{background-color:rgba(0, 0, 0, 0.32);background-color:var(--mdc-dialog-scrim-color, rgba(0, 0, 0, 0.32))}.mdc-dialog .mdc-dialog__title{color:rgba(0, 0, 0, 0.87);color:var(--mdc-dialog-heading-ink-color, rgba(0, 0, 0, 0.87))}.mdc-dialog .mdc-dialog__content{color:rgba(0, 0, 0, 0.6);color:var(--mdc-dialog-content-ink-color, rgba(0, 0, 0, 0.6))}.mdc-dialog.mdc-dialog--scrollable .mdc-dialog__title,.mdc-dialog.mdc-dialog--scrollable .mdc-dialog__actions{border-color:rgba(0, 0, 0, 0.12);border-color:var(--mdc-dialog-scroll-divider-color, rgba(0, 0, 0, 0.12))}.mdc-dialog .mdc-dialog__surface{min-width:280px;min-width:var(--mdc-dialog-min-width, 280px)}.mdc-dialog .mdc-dialog__surface{max-height:var(--mdc-dialog-max-height, calc(100% - 32px))}#actions ::slotted(*){margin-left:8px;margin-right:0;max-width:100%;text-align:right}[dir=rtl] #actions ::slotted(*),#actions ::slotted(*)[dir=rtl]{margin-left:0;margin-right:8px}.mdc-dialog[dir=rtl] #actions ::slotted(*),[dir=rtl] .mdc-dialog #actions ::slotted(*){text-align:left}.mdc-dialog--stacked #actions{flex-direction:column-reverse}.mdc-dialog--stacked #actions *:not(:last-child) ::slotted(*){flex-basis:1e-9px;margin-top:12px}"])));
var Dialog = /** @class */ (function (_super_1) {
    __extends(Dialog, _super_1);
    function Dialog() {
        return _super_1 !== null && _super_1.apply(this, arguments) || this;
    }
    return Dialog;
}(DialogBase));
Dialog.styles = style;
Dialog = __decorate([
    customElement('mwc-dialog')
], Dialog);
/** @soyCompatible */
var ButtonBase = /** @class */ (function (_super_1) {
    __extends(ButtonBase, _super_1);
    function ButtonBase() {
        var _this_1 = _super_1.apply(this, arguments) || this;
        _this_1.raised = false;
        _this_1.unelevated = false;
        _this_1.outlined = false;
        _this_1.dense = false;
        _this_1.disabled = false;
        _this_1.trailingIcon = false;
        _this_1.fullwidth = false;
        _this_1.icon = '';
        _this_1.label = '';
        _this_1.shouldRenderRipple = false;
        _this_1.rippleHandlers = new RippleHandlers(function () {
            _this_1.shouldRenderRipple = true;
            return _this_1.ripple;
        });
        return _this_1;
    }
    /** @soyCompatible */
    ButtonBase.prototype.renderRipple = function () {
        var filled = this.raised || this.unelevated;
        return html(templateObject_6 || (templateObject_6 = __makeTemplateObject(["", ""], ["",
            ""])), this.shouldRenderRipple ? html(templateObject_5 || (templateObject_5 = __makeTemplateObject(["<mwc-ripple .primary=\"", "\" .disabled=\"", "\"></mwc-ripple>"], ["<mwc-ripple .primary=\"", "\" .disabled=\"", "\"></mwc-ripple>"])), !filled, this.disabled) :
            '');
    };
    ButtonBase.prototype.createRenderRoot = function () {
        return this.attachShadow({ mode: 'open', delegatesFocus: true });
    };
    ButtonBase.prototype.focus = function () {
        var buttonElement = this.buttonElement;
        if (buttonElement) {
            this.rippleHandlers.startFocus();
            buttonElement.focus();
        }
    };
    ButtonBase.prototype.blur = function () {
        var buttonElement = this.buttonElement;
        if (buttonElement) {
            this.rippleHandlers.endFocus();
            buttonElement.blur();
        }
    };
    /** @soyCompatible */
    ButtonBase.prototype.render = function () {
        /** @classMap */
        var classes = {
            'mdc-button--raised': this.raised,
            'mdc-button--unelevated': this.unelevated,
            'mdc-button--outlined': this.outlined,
            'mdc-button--dense': this.dense,
        };
        return html(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n      <button\n          id=\"button\"\n          class=\"mdc-button ", "\"\n          ?disabled=\"", "\"\n          aria-label=\"", "\"\n          @focus=\"", "\"\n          @blur=\"", "\"\n          @mousedown=\"", "\"\n          @mouseup=\"", "\"\n          @mouseenter=\"", "\"\n          @mouseleave=\"", "\"\n          @touchstart=\"", "\"\n          @touchend=\"", "\"\n          @touchcancel=\"", "\">\n        ", "\n        <span class=\"leading-icon\">\n          <slot name=\"icon\">\n            ", "\n          </slot>\n        </span>\n        <span class=\"mdc-button__label\">", "</span>\n        <slot></slot>\n        <span class=\"trailing-icon\">\n          <slot name=\"trailingIcon\">\n            ", "\n          </slot>\n        </span>\n      </button>"], ["\n      <button\n          id=\"button\"\n          class=\"mdc-button ", "\"\n          ?disabled=\"", "\"\n          aria-label=\"", "\"\n          @focus=\"", "\"\n          @blur=\"", "\"\n          @mousedown=\"", "\"\n          @mouseup=\"", "\"\n          @mouseenter=\"", "\"\n          @mouseleave=\"", "\"\n          @touchstart=\"", "\"\n          @touchend=\"", "\"\n          @touchcancel=\"", "\">\n        ", "\n        <span class=\"leading-icon\">\n          <slot name=\"icon\">\n            ", "\n          </slot>\n        </span>\n        <span class=\"mdc-button__label\">", "</span>\n        <slot></slot>\n        <span class=\"trailing-icon\">\n          <slot name=\"trailingIcon\">\n            ", "\n          </slot>\n        </span>\n      </button>"])), classMap(classes), this.disabled, this.label || this.icon, this.handleRippleFocus, this.handleRippleBlur, this.handleRippleActivate, this.handleRippleDeactivate, this.handleRippleMouseEnter, this.handleRippleMouseLeave, this.handleRippleActivate, this.handleRippleDeactivate, this.handleRippleDeactivate, this.renderRipple(), this.icon && !this.trailingIcon ? this.renderIcon() : '', this.label, this.icon && this.trailingIcon ? this.renderIcon() : '');
    };
    /** @soyCompatible */
    ButtonBase.prototype.renderIcon = function () {
        return html(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n    <mwc-icon class=\"mdc-button__icon\">\n      ", "\n    </mwc-icon>"], ["\n    <mwc-icon class=\"mdc-button__icon\">\n      ", "\n    </mwc-icon>"])), this.icon);
    };
    ButtonBase.prototype.handleRippleActivate = function (evt) {
        this.rippleHandlers.startPress(evt);
    };
    ButtonBase.prototype.handleRippleDeactivate = function () {
        this.rippleHandlers.endPress();
    };
    ButtonBase.prototype.handleRippleMouseEnter = function () {
        this.rippleHandlers.startHover();
    };
    ButtonBase.prototype.handleRippleMouseLeave = function () {
        this.rippleHandlers.endHover();
    };
    ButtonBase.prototype.handleRippleFocus = function () {
        this.rippleHandlers.startFocus();
    };
    ButtonBase.prototype.handleRippleBlur = function () {
        this.rippleHandlers.endFocus();
    };
    return ButtonBase;
}(LitElement));
__decorate([
    property({ type: Boolean })
], ButtonBase.prototype, "raised", void 0);
__decorate([
    property({ type: Boolean })
], ButtonBase.prototype, "unelevated", void 0);
__decorate([
    property({ type: Boolean })
], ButtonBase.prototype, "outlined", void 0);
__decorate([
    property({ type: Boolean })
], ButtonBase.prototype, "dense", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ButtonBase.prototype, "disabled", void 0);
__decorate([
    property({ type: Boolean, attribute: 'trailingicon' })
], ButtonBase.prototype, "trailingIcon", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ButtonBase.prototype, "fullwidth", void 0);
__decorate([
    property({ type: String })
], ButtonBase.prototype, "icon", void 0);
__decorate([
    property({ type: String })
], ButtonBase.prototype, "label", void 0);
__decorate([
    query('#button')
], ButtonBase.prototype, "buttonElement", void 0);
__decorate([
    queryAsync('mwc-ripple')
], ButtonBase.prototype, "ripple", void 0);
__decorate([
    internalProperty()
], ButtonBase.prototype, "shouldRenderRipple", void 0);
__decorate([
    eventOptions({ passive: true })
], ButtonBase.prototype, "handleRippleActivate", null);
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
var style$1 = css(templateObject_9 || (templateObject_9 = __makeTemplateObject([".mdc-touch-target-wrapper{display:inline}.mdc-elevation-overlay{position:absolute;border-radius:inherit;opacity:0;pointer-events:none;transition:opacity 280ms cubic-bezier(0.4, 0, 0.2, 1);background-color:#fff}.mdc-button{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-button-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:0.875rem;font-size:var(--mdc-typography-button-font-size, 0.875rem);line-height:2.25rem;line-height:var(--mdc-typography-button-line-height, 2.25rem);font-weight:500;font-weight:var(--mdc-typography-button-font-weight, 500);letter-spacing:0.0892857143em;letter-spacing:var(--mdc-typography-button-letter-spacing, 0.0892857143em);text-decoration:none;text-decoration:var(--mdc-typography-button-text-decoration, none);text-transform:uppercase;text-transform:var(--mdc-typography-button-text-transform, uppercase);padding:0 8px 0 8px;position:relative;display:inline-flex;align-items:center;justify-content:center;box-sizing:border-box;min-width:64px;border:none;outline:none;line-height:inherit;user-select:none;-webkit-appearance:none;overflow:visible;vertical-align:middle;border-radius:4px;border-radius:var(--mdc-shape-small, 4px);height:36px}.mdc-button .mdc-elevation-overlay{width:100%;height:100%;top:0;left:0}.mdc-button::-moz-focus-inner{padding:0;border:0}.mdc-button:active{outline:none}.mdc-button:hover{cursor:pointer}.mdc-button:disabled{cursor:default;pointer-events:none}.mdc-button .mdc-button__ripple{border-radius:4px;border-radius:var(--mdc-shape-small, 4px)}.mdc-button:not(:disabled){background-color:transparent}.mdc-button:disabled{background-color:transparent}.mdc-button .mdc-button__icon{margin-left:0;margin-right:8px;display:inline-block;width:18px;height:18px;font-size:18px;vertical-align:top}[dir=rtl] .mdc-button .mdc-button__icon,.mdc-button .mdc-button__icon[dir=rtl]{margin-left:8px;margin-right:0}.mdc-button .mdc-button__touch{position:absolute;top:50%;right:0;height:48px;left:0;transform:translateY(-50%)}.mdc-button:not(:disabled){color:#6200ee;color:var(--mdc-theme-primary, #6200ee)}.mdc-button:disabled{color:rgba(0,0,0,.38)}.mdc-button__label+.mdc-button__icon{margin-left:8px;margin-right:0}[dir=rtl] .mdc-button__label+.mdc-button__icon,.mdc-button__label+.mdc-button__icon[dir=rtl]{margin-left:0;margin-right:8px}svg.mdc-button__icon{fill:currentColor}.mdc-button--raised .mdc-button__icon,.mdc-button--unelevated .mdc-button__icon,.mdc-button--outlined .mdc-button__icon{margin-left:-4px;margin-right:8px}[dir=rtl] .mdc-button--raised .mdc-button__icon,.mdc-button--raised .mdc-button__icon[dir=rtl],[dir=rtl] .mdc-button--unelevated .mdc-button__icon,.mdc-button--unelevated .mdc-button__icon[dir=rtl],[dir=rtl] .mdc-button--outlined .mdc-button__icon,.mdc-button--outlined .mdc-button__icon[dir=rtl]{margin-left:8px;margin-right:-4px}.mdc-button--raised .mdc-button__label+.mdc-button__icon,.mdc-button--unelevated .mdc-button__label+.mdc-button__icon,.mdc-button--outlined .mdc-button__label+.mdc-button__icon{margin-left:8px;margin-right:-4px}[dir=rtl] .mdc-button--raised .mdc-button__label+.mdc-button__icon,.mdc-button--raised .mdc-button__label+.mdc-button__icon[dir=rtl],[dir=rtl] .mdc-button--unelevated .mdc-button__label+.mdc-button__icon,.mdc-button--unelevated .mdc-button__label+.mdc-button__icon[dir=rtl],[dir=rtl] .mdc-button--outlined .mdc-button__label+.mdc-button__icon,.mdc-button--outlined .mdc-button__label+.mdc-button__icon[dir=rtl]{margin-left:-4px;margin-right:8px}.mdc-button--raised,.mdc-button--unelevated{padding:0 16px 0 16px}.mdc-button--raised:not(:disabled),.mdc-button--unelevated:not(:disabled){background-color:#6200ee;background-color:var(--mdc-theme-primary, #6200ee)}.mdc-button--raised:not(:disabled),.mdc-button--unelevated:not(:disabled){color:#fff;color:var(--mdc-theme-on-primary, #fff)}.mdc-button--raised:disabled,.mdc-button--unelevated:disabled{background-color:rgba(0,0,0,.12)}.mdc-button--raised:disabled,.mdc-button--unelevated:disabled{color:rgba(0,0,0,.38)}.mdc-button--raised{box-shadow:0px 3px 1px -2px rgba(0, 0, 0, 0.2),0px 2px 2px 0px rgba(0, 0, 0, 0.14),0px 1px 5px 0px rgba(0,0,0,.12);transition:box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-button--raised:hover,.mdc-button--raised:focus{box-shadow:0px 2px 4px -1px rgba(0, 0, 0, 0.2),0px 4px 5px 0px rgba(0, 0, 0, 0.14),0px 1px 10px 0px rgba(0,0,0,.12)}.mdc-button--raised:active{box-shadow:0px 5px 5px -3px rgba(0, 0, 0, 0.2),0px 8px 10px 1px rgba(0, 0, 0, 0.14),0px 3px 14px 2px rgba(0,0,0,.12)}.mdc-button--raised:disabled{box-shadow:0px 0px 0px 0px rgba(0, 0, 0, 0.2),0px 0px 0px 0px rgba(0, 0, 0, 0.14),0px 0px 0px 0px rgba(0,0,0,.12)}.mdc-button--outlined{padding:0 15px 0 15px;border-width:1px;border-style:solid}.mdc-button--outlined .mdc-button__ripple{top:-1px;left:-1px;border:1px solid transparent}.mdc-button--outlined .mdc-button__touch{left:-1px;width:calc(100% + 2 * 1px)}.mdc-button--outlined:not(:disabled){border-color:rgba(0,0,0,.12)}.mdc-button--outlined:disabled{border-color:rgba(0,0,0,.12)}.mdc-button--touch{margin-top:6px;margin-bottom:6px}.trailing-icon ::slotted(*),.trailing-icon .mdc-button__icon,.leading-icon ::slotted(*),.leading-icon .mdc-button__icon{margin-left:0;margin-right:8px;display:inline-block;width:18px;height:18px;font-size:18px;vertical-align:top}[dir=rtl] .trailing-icon ::slotted(*),.trailing-icon ::slotted(*)[dir=rtl],[dir=rtl] .trailing-icon .mdc-button__icon,.trailing-icon .mdc-button__icon[dir=rtl],[dir=rtl] .leading-icon ::slotted(*),.leading-icon ::slotted(*)[dir=rtl],[dir=rtl] .leading-icon .mdc-button__icon,.leading-icon .mdc-button__icon[dir=rtl]{margin-left:8px;margin-right:0}.trailing-icon ::slotted(*),.trailing-icon .mdc-button__icon{margin-left:8px;margin-right:0}[dir=rtl] .trailing-icon ::slotted(*),.trailing-icon ::slotted(*)[dir=rtl],[dir=rtl] .trailing-icon .mdc-button__icon,.trailing-icon .mdc-button__icon[dir=rtl]{margin-left:0;margin-right:8px}.mdc-button--raised{box-shadow:var(--mdc-button-raised-box-shadow, 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12))}.mdc-button--raised:hover,.mdc-button--raised:focus{box-shadow:var(--mdc-button-raised-box-shadow-hover, 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12))}.mdc-button--raised:active{box-shadow:var(--mdc-button-raised-box-shadow-active, 0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12))}.mdc-button--raised:disabled{box-shadow:var(--mdc-button-raised-box-shadow-disabled, 0px 0px 0px 0px rgba(0, 0, 0, 0.2), 0px 0px 0px 0px rgba(0, 0, 0, 0.14), 0px 0px 0px 0px rgba(0, 0, 0, 0.12))}:host{display:inline-flex;outline:none;vertical-align:top}:host([disabled]){pointer-events:none}:host([fullwidth]){width:100%}.mdc-button{flex:auto;overflow:hidden;padding:0 var(--mdc-button-horizontal-padding, 8px) 0 var(--mdc-button-horizontal-padding, 8px)}.mdc-button.mdc-button--raised,.mdc-button.mdc-button--unelevated{padding:0 var(--mdc-button-horizontal-padding, 16px) 0 var(--mdc-button-horizontal-padding, 16px)}.mdc-button.mdc-button--raised mwc-ripple,.mdc-button.mdc-button--unelevated mwc-ripple{--mdc-ripple-color: var(--mdc-theme-on-primary, #fff);--mdc-ripple-hover-opacity: .08;--mdc-ripple-press-opacity: .24;--mdc-ripple-focus-opacity: .24}.mdc-button.mdc-button--outlined{padding:0 calc(var(--mdc-button-horizontal-padding, 16px) - var(--mdc-button-outline-width, 1px)) 0 calc(var(--mdc-button-horizontal-padding, 16px) - var(--mdc-button-outline-width, 1px));border-width:var(--mdc-button-outline-width, 1px);border-color:var(--mdc-button-outline-color, var(--mdc-theme-primary, #6200ee))}.mdc-button.mdc-button--outlined mwc-ripple{top:-1px;left:-1px;border:1px solid transparent}.mdc-button.mdc-button--dense{height:28px;margin-top:0;margin-bottom:0}.mdc-button.mdc-button--dense .mdc-button__touch{display:none}:host([disabled]) .mdc-button.mdc-button--raised,:host([disabled]) .mdc-button.mdc-button--unelevated{background-color:var(--mdc-button-disabled-fill-color, rgba(0, 0, 0, 0.12));color:var(--mdc-button-disabled-ink-color, rgba(0, 0, 0, 0.38))}:host([disabled]) .mdc-button:not(.mdc-button--raised):not(.mdc-button--unelevated){color:var(--mdc-button-disabled-ink-color, rgba(0, 0, 0, 0.38))}:host([disabled]) .mdc-button.mdc-button--outlined{border-color:var(--mdc-button-disabled-ink-color, rgba(0, 0, 0, 0.38));border-color:var(--mdc-button-disabled-outline-color, var(--mdc-button-disabled-ink-color, rgba(0, 0, 0, 0.38)))}"], [".mdc-touch-target-wrapper{display:inline}.mdc-elevation-overlay{position:absolute;border-radius:inherit;opacity:0;pointer-events:none;transition:opacity 280ms cubic-bezier(0.4, 0, 0.2, 1);background-color:#fff}.mdc-button{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-button-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:0.875rem;font-size:var(--mdc-typography-button-font-size, 0.875rem);line-height:2.25rem;line-height:var(--mdc-typography-button-line-height, 2.25rem);font-weight:500;font-weight:var(--mdc-typography-button-font-weight, 500);letter-spacing:0.0892857143em;letter-spacing:var(--mdc-typography-button-letter-spacing, 0.0892857143em);text-decoration:none;text-decoration:var(--mdc-typography-button-text-decoration, none);text-transform:uppercase;text-transform:var(--mdc-typography-button-text-transform, uppercase);padding:0 8px 0 8px;position:relative;display:inline-flex;align-items:center;justify-content:center;box-sizing:border-box;min-width:64px;border:none;outline:none;line-height:inherit;user-select:none;-webkit-appearance:none;overflow:visible;vertical-align:middle;border-radius:4px;border-radius:var(--mdc-shape-small, 4px);height:36px}.mdc-button .mdc-elevation-overlay{width:100%;height:100%;top:0;left:0}.mdc-button::-moz-focus-inner{padding:0;border:0}.mdc-button:active{outline:none}.mdc-button:hover{cursor:pointer}.mdc-button:disabled{cursor:default;pointer-events:none}.mdc-button .mdc-button__ripple{border-radius:4px;border-radius:var(--mdc-shape-small, 4px)}.mdc-button:not(:disabled){background-color:transparent}.mdc-button:disabled{background-color:transparent}.mdc-button .mdc-button__icon{margin-left:0;margin-right:8px;display:inline-block;width:18px;height:18px;font-size:18px;vertical-align:top}[dir=rtl] .mdc-button .mdc-button__icon,.mdc-button .mdc-button__icon[dir=rtl]{margin-left:8px;margin-right:0}.mdc-button .mdc-button__touch{position:absolute;top:50%;right:0;height:48px;left:0;transform:translateY(-50%)}.mdc-button:not(:disabled){color:#6200ee;color:var(--mdc-theme-primary, #6200ee)}.mdc-button:disabled{color:rgba(0,0,0,.38)}.mdc-button__label+.mdc-button__icon{margin-left:8px;margin-right:0}[dir=rtl] .mdc-button__label+.mdc-button__icon,.mdc-button__label+.mdc-button__icon[dir=rtl]{margin-left:0;margin-right:8px}svg.mdc-button__icon{fill:currentColor}.mdc-button--raised .mdc-button__icon,.mdc-button--unelevated .mdc-button__icon,.mdc-button--outlined .mdc-button__icon{margin-left:-4px;margin-right:8px}[dir=rtl] .mdc-button--raised .mdc-button__icon,.mdc-button--raised .mdc-button__icon[dir=rtl],[dir=rtl] .mdc-button--unelevated .mdc-button__icon,.mdc-button--unelevated .mdc-button__icon[dir=rtl],[dir=rtl] .mdc-button--outlined .mdc-button__icon,.mdc-button--outlined .mdc-button__icon[dir=rtl]{margin-left:8px;margin-right:-4px}.mdc-button--raised .mdc-button__label+.mdc-button__icon,.mdc-button--unelevated .mdc-button__label+.mdc-button__icon,.mdc-button--outlined .mdc-button__label+.mdc-button__icon{margin-left:8px;margin-right:-4px}[dir=rtl] .mdc-button--raised .mdc-button__label+.mdc-button__icon,.mdc-button--raised .mdc-button__label+.mdc-button__icon[dir=rtl],[dir=rtl] .mdc-button--unelevated .mdc-button__label+.mdc-button__icon,.mdc-button--unelevated .mdc-button__label+.mdc-button__icon[dir=rtl],[dir=rtl] .mdc-button--outlined .mdc-button__label+.mdc-button__icon,.mdc-button--outlined .mdc-button__label+.mdc-button__icon[dir=rtl]{margin-left:-4px;margin-right:8px}.mdc-button--raised,.mdc-button--unelevated{padding:0 16px 0 16px}.mdc-button--raised:not(:disabled),.mdc-button--unelevated:not(:disabled){background-color:#6200ee;background-color:var(--mdc-theme-primary, #6200ee)}.mdc-button--raised:not(:disabled),.mdc-button--unelevated:not(:disabled){color:#fff;color:var(--mdc-theme-on-primary, #fff)}.mdc-button--raised:disabled,.mdc-button--unelevated:disabled{background-color:rgba(0,0,0,.12)}.mdc-button--raised:disabled,.mdc-button--unelevated:disabled{color:rgba(0,0,0,.38)}.mdc-button--raised{box-shadow:0px 3px 1px -2px rgba(0, 0, 0, 0.2),0px 2px 2px 0px rgba(0, 0, 0, 0.14),0px 1px 5px 0px rgba(0,0,0,.12);transition:box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-button--raised:hover,.mdc-button--raised:focus{box-shadow:0px 2px 4px -1px rgba(0, 0, 0, 0.2),0px 4px 5px 0px rgba(0, 0, 0, 0.14),0px 1px 10px 0px rgba(0,0,0,.12)}.mdc-button--raised:active{box-shadow:0px 5px 5px -3px rgba(0, 0, 0, 0.2),0px 8px 10px 1px rgba(0, 0, 0, 0.14),0px 3px 14px 2px rgba(0,0,0,.12)}.mdc-button--raised:disabled{box-shadow:0px 0px 0px 0px rgba(0, 0, 0, 0.2),0px 0px 0px 0px rgba(0, 0, 0, 0.14),0px 0px 0px 0px rgba(0,0,0,.12)}.mdc-button--outlined{padding:0 15px 0 15px;border-width:1px;border-style:solid}.mdc-button--outlined .mdc-button__ripple{top:-1px;left:-1px;border:1px solid transparent}.mdc-button--outlined .mdc-button__touch{left:-1px;width:calc(100% + 2 * 1px)}.mdc-button--outlined:not(:disabled){border-color:rgba(0,0,0,.12)}.mdc-button--outlined:disabled{border-color:rgba(0,0,0,.12)}.mdc-button--touch{margin-top:6px;margin-bottom:6px}.trailing-icon ::slotted(*),.trailing-icon .mdc-button__icon,.leading-icon ::slotted(*),.leading-icon .mdc-button__icon{margin-left:0;margin-right:8px;display:inline-block;width:18px;height:18px;font-size:18px;vertical-align:top}[dir=rtl] .trailing-icon ::slotted(*),.trailing-icon ::slotted(*)[dir=rtl],[dir=rtl] .trailing-icon .mdc-button__icon,.trailing-icon .mdc-button__icon[dir=rtl],[dir=rtl] .leading-icon ::slotted(*),.leading-icon ::slotted(*)[dir=rtl],[dir=rtl] .leading-icon .mdc-button__icon,.leading-icon .mdc-button__icon[dir=rtl]{margin-left:8px;margin-right:0}.trailing-icon ::slotted(*),.trailing-icon .mdc-button__icon{margin-left:8px;margin-right:0}[dir=rtl] .trailing-icon ::slotted(*),.trailing-icon ::slotted(*)[dir=rtl],[dir=rtl] .trailing-icon .mdc-button__icon,.trailing-icon .mdc-button__icon[dir=rtl]{margin-left:0;margin-right:8px}.mdc-button--raised{box-shadow:var(--mdc-button-raised-box-shadow, 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12))}.mdc-button--raised:hover,.mdc-button--raised:focus{box-shadow:var(--mdc-button-raised-box-shadow-hover, 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12))}.mdc-button--raised:active{box-shadow:var(--mdc-button-raised-box-shadow-active, 0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12))}.mdc-button--raised:disabled{box-shadow:var(--mdc-button-raised-box-shadow-disabled, 0px 0px 0px 0px rgba(0, 0, 0, 0.2), 0px 0px 0px 0px rgba(0, 0, 0, 0.14), 0px 0px 0px 0px rgba(0, 0, 0, 0.12))}:host{display:inline-flex;outline:none;vertical-align:top}:host([disabled]){pointer-events:none}:host([fullwidth]){width:100%}.mdc-button{flex:auto;overflow:hidden;padding:0 var(--mdc-button-horizontal-padding, 8px) 0 var(--mdc-button-horizontal-padding, 8px)}.mdc-button.mdc-button--raised,.mdc-button.mdc-button--unelevated{padding:0 var(--mdc-button-horizontal-padding, 16px) 0 var(--mdc-button-horizontal-padding, 16px)}.mdc-button.mdc-button--raised mwc-ripple,.mdc-button.mdc-button--unelevated mwc-ripple{--mdc-ripple-color: var(--mdc-theme-on-primary, #fff);--mdc-ripple-hover-opacity: .08;--mdc-ripple-press-opacity: .24;--mdc-ripple-focus-opacity: .24}.mdc-button.mdc-button--outlined{padding:0 calc(var(--mdc-button-horizontal-padding, 16px) - var(--mdc-button-outline-width, 1px)) 0 calc(var(--mdc-button-horizontal-padding, 16px) - var(--mdc-button-outline-width, 1px));border-width:var(--mdc-button-outline-width, 1px);border-color:var(--mdc-button-outline-color, var(--mdc-theme-primary, #6200ee))}.mdc-button.mdc-button--outlined mwc-ripple{top:-1px;left:-1px;border:1px solid transparent}.mdc-button.mdc-button--dense{height:28px;margin-top:0;margin-bottom:0}.mdc-button.mdc-button--dense .mdc-button__touch{display:none}:host([disabled]) .mdc-button.mdc-button--raised,:host([disabled]) .mdc-button.mdc-button--unelevated{background-color:var(--mdc-button-disabled-fill-color, rgba(0, 0, 0, 0.12));color:var(--mdc-button-disabled-ink-color, rgba(0, 0, 0, 0.38))}:host([disabled]) .mdc-button:not(.mdc-button--raised):not(.mdc-button--unelevated){color:var(--mdc-button-disabled-ink-color, rgba(0, 0, 0, 0.38))}:host([disabled]) .mdc-button.mdc-button--outlined{border-color:var(--mdc-button-disabled-ink-color, rgba(0, 0, 0, 0.38));border-color:var(--mdc-button-disabled-outline-color, var(--mdc-button-disabled-ink-color, rgba(0, 0, 0, 0.38)))}"])));
/** @soyCompatible */
var Button = /** @class */ (function (_super_1) {
    __extends(Button, _super_1);
    function Button() {
        return _super_1 !== null && _super_1.apply(this, arguments) || this;
    }
    return Button;
}(ButtonBase));
Button.styles = style$1;
Button = __decorate([
    customElement('mwc-button')
], Button);
var DotAssetService = /** @class */ (function () {
    function DotAssetService() {
    }
    /**
     * Create DotAssets based on options passed in DotAssetCreateOptions
     * @param options
     *
     * @memberof DotAssetService
     */
    DotAssetService.prototype.create = function (options) {
        var _this_1 = this;
        var promises = [];
        var filesCreated = 1;
        options.files.map(function (file) {
            var data = {
                contentlet: {
                    baseType: 'dotAsset',
                    asset: file.id,
                    hostFolder: options.folder,
                    indexPolicy: 'WAIT_FOR'
                }
            };
            promises.push(fetch(options.url, {
                method: 'PUT',
                headers: {
                    Origin: window.location.hostname,
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                body: JSON.stringify(data)
            })
                .then(function (response) {
                options.updateCallback(filesCreated++);
                return response;
            })
                .catch(function (e) { return e; }));
        });
        return Promise.all(promises).then(function (response) { return __awaiter(_this_1, void 0, void 0, function () {
            var errors, data, _d, response_1, res, _e, _f, message, _a_1;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        errors = [];
                        data = [];
                        _d = 0, response_1 = response;
                        _g.label = 1;
                    case 1:
                        if (!(_d < response_1.length)) return [3 /*break*/, 8];
                        res = response_1[_d];
                        _f = (_e = data).push;
                        return [4 /*yield*/, res.json()];
                    case 2:
                        _f.apply(_e, [(_g.sent()).entity]);
                        if (!(res.status !== 200)) return [3 /*break*/, 7];
                        message = '';
                        _g.label = 3;
                    case 3:
                        _g.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, res.json()];
                    case 4:
                        message = (_g.sent()).errors[0].message;
                        return [3 /*break*/, 6];
                    case 5:
                        _a_1 = _g.sent();
                        message = fallbackErrorMessages[res.status];
                        return [3 /*break*/, 6];
                    case 6:
                        errors.push({
                            message: message,
                            status: res.status
                        });
                        _g.label = 7;
                    case 7:
                        _d++;
                        return [3 /*break*/, 1];
                    case 8:
                        if (errors.length) {
                            throw errors;
                        }
                        else {
                            return [2 /*return*/, data];
                        }
                        return [2 /*return*/];
                }
            });
        }); });
    };
    return DotAssetService;
}());
var dotAssetDropZoneCss = "dot-asset-drop-zone .dot-asset-drop-zone__indicators{--mdc-dialog-scrim-color:transparent;-ms-flex-align:center;align-items:center;background-color:rgba(255, 255, 255, 0.8);border:3px solid transparent;bottom:0;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-pack:center;justify-content:center;left:0;opacity:0;pointer-events:none;position:absolute;right:0;top:0;-webkit-transition:opacity 250ms ease-in;transition:opacity 250ms ease-in;z-index:1002}dot-asset-drop-zone .dot-asset-drop-zone__indicators.drag-enter{pointer-events:all;border:3px dashed var(--color-sec);opacity:1}dot-asset-drop-zone .dot-asset-drop-zone__indicators.drag-enter .dot-asset-drop-zone__icon{display:block}dot-asset-drop-zone .dot-asset-drop-zone__indicators.drop{pointer-events:all;border:3px dashed #7e7a86;opacity:1}dot-asset-drop-zone .dot-asset-drop-zone__indicators.drop dot-progress-bar{display:block}dot-asset-drop-zone .dot-asset-drop-zone__indicators .dot-asset-drop-zone__icon{display:none}dot-asset-drop-zone .dot-asset-drop-zone__indicators .dot-asset-drop-zone__icon span{display:block;color:var(--color-sec);margin-top:-20px;font-size:20px;text-align:center}dot-asset-drop-zone .dot-asset-drop-zone__indicators dot-progress-bar{width:200px;display:none}dot-asset-drop-zone .dot-asset-drop-zone__indicators dot-progress-bar span{font-size:16px}dot-asset-drop-zone .dot-asset-drop-zone__error-list{list-style-position:inside;padding:0;margin-left:0}dot-asset-drop-zone mwc-icon{color:var(--color-sec);--mdc-icon-size:200px}dot-asset-drop-zone mwc-button{--mdc-theme-primary:var(--color-main);--mdc-theme-secondary:var(--color-sec)}";
var DotDropStatus;
(function (DotDropStatus) {
    DotDropStatus["DROP"] = "drop";
    DotDropStatus["DRAGENTER"] = "drag-enter";
    DotDropStatus["NONE"] = "";
})(DotDropStatus || (DotDropStatus = {}));
var DotAssetDropZone = /** @class */ (function () {
    function DotAssetDropZone(hostRef) {
        registerInstance(this, hostRef);
        this.uploadComplete = createEvent(this, "uploadComplete", 7);
        /** URL to endpoint to create dotAssets*/
        this.dotAssetsURL = '/api/v1/workflow/actions/default/fire/PUBLISH';
        /** Specify the max size of each file to be uploaded*/
        this.maxFileSize = '';
        /** Specify the the folder where the dotAssets will be placed*/
        this.folder = '';
        /** Legend to be shown when dropping files */
        this.dropFilesText = 'Drop Files to Upload';
        /** Legend to be shown when uploading files */
        this.uploadFileText = 'Uploading Files...';
        /** Labels to be shown in error dialog */
        this.dialogLabels = {
            closeButton: 'Close',
            uploadErrorHeader: 'Uploading File Results',
            dotAssetErrorHeader: '$0 of $1 uploaded file(s) failed',
            errorHeader: 'Error'
        };
        /** Legend to be shown when creating dotAssets */
        this.createAssetsText = 'Creating DotAssets';
        /** Error to be shown when try to upload a bigger size file than allowed*/
        this.multiMaxSizeErrorLabel = 'One or more of the files exceeds the maximum file size';
        /** Error to be shown when try to upload a bigger size file than allowed*/
        this.singeMaxSizeErrorLabel = 'The file exceeds the maximum file size';
        /** Error to be shown when an error happened on the uploading process*/
        this.uploadErrorLabel = 'Drop action not allowed.';
        this.dropState = DotDropStatus.NONE;
        this.progressIndicator = 0;
        this.progressBarText = '';
        this.dropEventTarget = null;
        this.errorMessage = '';
        this.dialogHeader = '';
    }
    DotAssetDropZone.prototype.render = function () {
        var _this_1 = this;
        return (h(Host, { ondrop: function (event) { return _this_1.dropHandler(event); }, ondragenter: function (event) { return _this_1.dragEnterHandler(event); }, ondragleave: function (event) { return _this_1.dragOutHandler(event); }, ondragover: function (event) { return _this_1.dragOverHandler(event); } }, h("div", { class: this.dropState + " dot-asset-drop-zone__indicators" }, h("div", { class: "dot-asset-drop-zone__icon" }, h("mwc-icon", null, "get_app"), h("span", null, this.dropFilesText)), h("dot-progress-bar", { progress: this.progressIndicator, text: this.progressBarText }), h("mwc-dialog", { heading: this.dialogHeader, open: !!this.errorMessage, onClosing: function () { return _this_1.hideOverlay(); } }, this.errorMessage, h("mwc-button", { dense: true, unelevated: true, slot: "primaryAction", dialogAction: "close" }, this.dialogLabels.closeButton))), h("slot", null)));
    };
    DotAssetDropZone.prototype.dragEnterHandler = function (event) {
        event.preventDefault();
        this.dropEventTarget = event.target;
        this.dropState = DotDropStatus.DRAGENTER;
    };
    DotAssetDropZone.prototype.dragOutHandler = function (event) {
        event.preventDefault();
        // avoid problems with child elements
        if (event.target === this.dropEventTarget) {
            this.dropState = DotDropStatus.NONE;
        }
    };
    DotAssetDropZone.prototype.dropHandler = function (event) {
        event.preventDefault();
        this.dropState = DotDropStatus.DROP;
        this.uploadTemFiles(event);
    };
    DotAssetDropZone.prototype.dragOverHandler = function (event) {
        event.preventDefault();
    };
    DotAssetDropZone.prototype.uploadTemFiles = function (event) {
        var _this_1 = this;
        var uploadService = new DotUploadService();
        var files = [];
        this.updateProgressBar(0, this.uploadFileText);
        if (event.dataTransfer.items) {
            for (var _d = 0, _e = Array.from(event.dataTransfer.items); _d < _e.length; _d++) {
                var item = _e[_d];
                try {
                    if (item.webkitGetAsEntry().isFile) {
                        files.push(item.getAsFile());
                    }
                    else {
                        this.showDialog(this.dialogLabels.errorHeader, this.uploadErrorLabel);
                        files = [];
                        break;
                    }
                }
                catch (_a) {
                    this.showDialog(this.dialogLabels.errorHeader, this.uploadErrorLabel);
                    files = [];
                }
            }
        }
        else {
            Array.from(event.dataTransfer.files).map(function (file) {
                files.push(file);
            });
        }
        if (files.length) {
            uploadService
                .uploadBinaryFile(files, this.updateProgressBar.bind(this), this.maxFileSize)
                .then(function (data) {
                _this_1.createDotAsset(Array.isArray(data) ? data : [data]);
            })
                .catch(function (_d) {
                var message = _d.message;
                _this_1.showDialog(_this_1.dialogLabels ? _this_1.dialogLabels.uploadErrorHeader : '', _this_1.isMaxsizeError(message) ? (h("span", null, _this_1.multiMaxSizeErrorLabel)) : (h("span", null, message)));
            })
                .finally(function () {
                _this_1.updateProgressBar(0, '');
            });
        }
    };
    DotAssetDropZone.prototype.createDotAsset = function (files) {
        var _this_1 = this;
        var assetService = new DotAssetService();
        this.updateProgressBar(0, this.createAssetsText + " 0/" + files.length);
        assetService
            .create({
            files: files,
            updateCallback: function (filesCreated) {
                _this_1.updateDotAssetProgress(files.length, filesCreated);
            },
            url: this.dotAssetsURL,
            folder: this.folder
        })
            .then(function (response) {
            _this_1.hideOverlay();
            debugger;
            _this_1.uploadComplete.emit(response);
        })
            .catch(function (errors) {
            _this_1.showDialog(_this_1.dialogLabels.dotAssetErrorHeader
                .replace('$0', errors.length.toString())
                .replace('$1', files.length.toString()), _this_1.formatErrorMessage(errors));
            _this_1.uploadComplete.emit(errors);
        })
            .finally(function () {
            _this_1.updateProgressBar(0, _this_1.uploadFileText);
        });
    };
    DotAssetDropZone.prototype.updateProgressBar = function (progress, text) {
        this.progressIndicator = progress;
        if (text) {
            this.progressBarText = text;
        }
    };
    DotAssetDropZone.prototype.updateDotAssetProgress = function (totalFiles, filesCreated) {
        this.updateProgressBar((filesCreated / totalFiles) * 100, this.createAssetsText + " " + filesCreated + "/" + totalFiles);
    };
    DotAssetDropZone.prototype.hideOverlay = function () {
        this.hideDialog();
        this.dropState = DotDropStatus.NONE;
    };
    DotAssetDropZone.prototype.isMaxsizeError = function (error) {
        return error.includes('The maximum file size for this field is');
    };
    DotAssetDropZone.prototype.formatErrorMessage = function (errors) {
        return (h("ul", { class: "dot-asset-drop-zone__error-list" }, errors.map(function (err) {
            return h("li", null, err.message);
        })));
    };
    DotAssetDropZone.prototype.showDialog = function (header, message) {
        this.dialogHeader = header;
        this.errorMessage = message;
    };
    DotAssetDropZone.prototype.hideDialog = function () {
        this.dialogHeader = '';
        this.errorMessage = '';
    };
    return DotAssetDropZone;
}());
DotAssetDropZone.style = dotAssetDropZoneCss;
export { DotAssetDropZone as dot_asset_drop_zone };
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9;
