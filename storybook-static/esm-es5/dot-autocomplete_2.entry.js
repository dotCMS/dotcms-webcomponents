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
import { r as registerInstance, c as createEvent, h, g as getElement, H as Host } from './index-ea58b93f.js';
import { c as createCommonjsModule, a as commonjsGlobal } from './_commonjsHelpers-7b8ed50b.js';
var autoComplete = createCommonjsModule(function (module, exports) {
    (function (global, factory) {
        module.exports = factory();
    }(commonjsGlobal, (function () {
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
            }
        }
        function _defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor)
                    descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }
        function _createClass(Constructor, protoProps, staticProps) {
            if (protoProps)
                _defineProperties(Constructor.prototype, protoProps);
            if (staticProps)
                _defineProperties(Constructor, staticProps);
            return Constructor;
        }
        var dataAttribute = "data-id";
        var select = {
            resultsList: "autoComplete_list",
            result: "autoComplete_result",
            highlight: "autoComplete_highlighted",
            selectedResult: "autoComplete_selected"
        };
        var keys = {
            ENTER: 13,
            ARROW_UP: 38,
            ARROW_DOWN: 40
        };
        var getInput = function getInput(selector) {
            return typeof selector === "string" ? document.querySelector(selector) : selector();
        };
        var createResultsList = function createResultsList(renderResults) {
            var resultsList = document.createElement(renderResults.element);
            resultsList.setAttribute("id", select.resultsList);
            if (renderResults.container) {
                renderResults.container(resultsList);
            }
            renderResults.destination.insertAdjacentElement(renderResults.position, resultsList);
            return resultsList;
        };
        var highlight = function highlight(value) {
            return "<span class=".concat(select.highlight, ">").concat(value, "</span>");
        };
        var addResultsToList = function addResultsToList(resultsList, dataSrc, resultItem) {
            var fragment = document.createDocumentFragment();
            dataSrc.forEach(function (event, record) {
                var result = document.createElement(resultItem.element);
                var resultIndex = dataSrc[record].index;
                result.setAttribute(dataAttribute, resultIndex);
                result.setAttribute("class", select.result);
                resultItem.content ? resultItem.content(event, result) : result.innerHTML = event.match || event;
                fragment.appendChild(result);
            });
            resultsList.appendChild(fragment);
        };
        var clearResults = function clearResults(resultsList) {
            return resultsList.innerHTML = "";
        };
        var onSelection = function onSelection(event, field, resultsList, feedback, resultsValues, selection) {
            feedback({
                event: event,
                query: field instanceof HTMLInputElement ? field.value : field.innerHTML,
                matches: resultsValues.matches,
                results: resultsValues.list.map(function (record) {
                    return record.value;
                }),
                selection: resultsValues.list.find(function (value) {
                    if (event.keyCode === keys.ENTER) {
                        return value.index === Number(selection.getAttribute(dataAttribute));
                    }
                    else if (event.type === "mousedown") {
                        return value.index === Number(event.currentTarget.getAttribute(dataAttribute));
                    }
                })
            });
            clearResults(resultsList);
        };
        var navigation = function navigation(input, resultsList, feedback, resultsValues) {
            var li = resultsList.childNodes, liLength = li.length - 1;
            var liSelected = undefined, next;
            var removeSelection = function removeSelection(direction) {
                liSelected.classList.remove(select.selectedResult);
                if (direction === 1) {
                    next = liSelected.nextSibling;
                }
                else {
                    next = liSelected.previousSibling;
                }
            };
            var highlightSelection = function highlightSelection(current) {
                liSelected = current;
                liSelected.classList.add(select.selectedResult);
            };
            input.onkeydown = function (event) {
                if (li.length > 0) {
                    switch (event.keyCode) {
                        case keys.ARROW_UP:
                            if (liSelected) {
                                removeSelection(0);
                                if (next) {
                                    highlightSelection(next);
                                }
                                else {
                                    highlightSelection(li[liLength]);
                                }
                            }
                            else {
                                highlightSelection(li[liLength]);
                            }
                            break;
                        case keys.ARROW_DOWN:
                            if (liSelected) {
                                removeSelection(1);
                                if (next) {
                                    highlightSelection(next);
                                }
                                else {
                                    highlightSelection(li[0]);
                                }
                            }
                            else {
                                highlightSelection(li[0]);
                            }
                            break;
                        case keys.ENTER:
                            if (liSelected) {
                                onSelection(event, input, resultsList, feedback, resultsValues, liSelected);
                            }
                    }
                }
            };
            li.forEach(function (selection) {
                selection.onmousedown = function (event) {
                    return onSelection(event, input, resultsList, feedback, resultsValues);
                };
            });
        };
        var autoCompleteView = {
            getInput: getInput,
            createResultsList: createResultsList,
            highlight: highlight,
            addResultsToList: addResultsToList,
            navigation: navigation,
            clearResults: clearResults
        };
        var CustomEventPolyfill = function CustomEventPolyfill(event, params) {
            params = params || {
                bubbles: false,
                cancelable: false,
                detail: undefined
            };
            var evt = document.createEvent("CustomEvent");
            evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
            return evt;
        };
        CustomEventPolyfill.prototype = window.Event.prototype;
        var CustomEventWrapper = typeof window.CustomEvent === "function" && window.CustomEvent || CustomEventPolyfill;
        var initElementClosestPolyfill = function initElementClosestPolyfill() {
            if (!Element.prototype.matches) {
                Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
            }
            if (!Element.prototype.closest) {
                Element.prototype.closest = function (s) {
                    var el = this;
                    do {
                        if (el.matches(s)) {
                            return el;
                        }
                        el = el.parentElement || el.parentNode;
                    } while (el !== null && el.nodeType === 1);
                    return null;
                };
            }
        };
        var Polyfill = {
            CustomEventWrapper: CustomEventWrapper,
            initElementClosestPolyfill: initElementClosestPolyfill
        };
        var autoComplete = function () {
            function autoComplete(config) {
                _classCallCheck(this, autoComplete);
                var _config$selector = config.selector, selector = _config$selector === void 0 ? "#autoComplete" : _config$selector, _config$data = config.data, key = _config$data.key, _src = _config$data.src, _config$data$cache = _config$data.cache, cache = _config$data$cache === void 0 ? true : _config$data$cache, query = config.query, _config$trigger = config.trigger;
                _config$trigger = _config$trigger === void 0 ? {} : _config$trigger;
                var _config$trigger$event = _config$trigger.event, event = _config$trigger$event === void 0 ? ["input"] : _config$trigger$event, _config$trigger$condi = _config$trigger.condition, condition = _config$trigger$condi === void 0 ? false : _config$trigger$condi, _config$searchEngine = config.searchEngine, searchEngine = _config$searchEngine === void 0 ? "strict" : _config$searchEngine, _config$threshold = config.threshold, threshold = _config$threshold === void 0 ? 0 : _config$threshold, _config$debounce = config.debounce, debounce = _config$debounce === void 0 ? 0 : _config$debounce, _config$resultsList = config.resultsList;
                _config$resultsList = _config$resultsList === void 0 ? {} : _config$resultsList;
                var _config$resultsList$r = _config$resultsList.render, render = _config$resultsList$r === void 0 ? false : _config$resultsList$r, _config$resultsList$c = _config$resultsList.container, container = _config$resultsList$c === void 0 ? false : _config$resultsList$c, destination = _config$resultsList.destination, _config$resultsList$p = _config$resultsList.position, position = _config$resultsList$p === void 0 ? "afterend" : _config$resultsList$p, _config$resultsList$e = _config$resultsList.element, resultsListElement = _config$resultsList$e === void 0 ? "ul" : _config$resultsList$e, _config$resultsList$n = _config$resultsList.navigation, navigation = _config$resultsList$n === void 0 ? false : _config$resultsList$n, _config$sort = config.sort, sort = _config$sort === void 0 ? false : _config$sort, placeHolder = config.placeHolder, _config$maxResults = config.maxResults, maxResults = _config$maxResults === void 0 ? 5 : _config$maxResults, _config$resultItem = config.resultItem;
                _config$resultItem = _config$resultItem === void 0 ? {} : _config$resultItem;
                var _config$resultItem$co = _config$resultItem.content, content = _config$resultItem$co === void 0 ? false : _config$resultItem$co, _config$resultItem$el = _config$resultItem.element, resultItemElement = _config$resultItem$el === void 0 ? "li" : _config$resultItem$el, noResults = config.noResults, _config$highlight = config.highlight, highlight = _config$highlight === void 0 ? false : _config$highlight, onSelection = config.onSelection;
                var resultsListView = render ? autoCompleteView.createResultsList({
                    container: container,
                    destination: destination || autoCompleteView.getInput(selector),
                    position: position,
                    element: resultsListElement
                }) : null;
                this.selector = selector;
                this.data = {
                    src: function src() {
                        return typeof _src === "function" ? _src() : _src;
                    },
                    key: key,
                    cache: cache
                };
                this.query = query;
                this.trigger = {
                    event: event,
                    condition: condition
                };
                this.searchEngine = searchEngine === "loose" ? "loose" : typeof searchEngine === "function" ? searchEngine : "strict";
                this.threshold = threshold;
                this.debounce = debounce;
                this.resultsList = {
                    render: render,
                    view: resultsListView,
                    navigation: navigation
                };
                this.sort = sort;
                this.placeHolder = placeHolder;
                this.maxResults = maxResults;
                this.resultItem = {
                    content: content,
                    element: resultItemElement
                };
                this.noResults = noResults;
                this.highlight = highlight;
                this.onSelection = onSelection;
                this.init();
            }
            _createClass(autoComplete, [{
                    key: "search",
                    value: function search(query, record) {
                        var recordLowerCase = record.toLowerCase();
                        if (this.searchEngine === "loose") {
                            query = query.replace(/ /g, "");
                            var match = [];
                            var searchPosition = 0;
                            for (var number = 0; number < recordLowerCase.length; number++) {
                                var recordChar = record[number];
                                if (searchPosition < query.length && recordLowerCase[number] === query[searchPosition]) {
                                    recordChar = this.highlight ? autoCompleteView.highlight(recordChar) : recordChar;
                                    searchPosition++;
                                }
                                match.push(recordChar);
                            }
                            if (searchPosition !== query.length) {
                                return false;
                            }
                            return match.join("");
                        }
                        else {
                            if (recordLowerCase.includes(query)) {
                                var pattern = new RegExp("".concat(query), "i");
                                query = pattern.exec(record);
                                return this.highlight ? record.replace(query, autoCompleteView.highlight(query)) : record;
                            }
                        }
                    }
                }, {
                    key: "listMatchedResults",
                    value: function listMatchedResults(data) {
                        var _this = this;
                        return new Promise(function (resolve) {
                            var resList = [];
                            data.filter(function (record, index) {
                                var search = function search(key) {
                                    var recordValue = key ? record[key] : record;
                                    if (recordValue) {
                                        var match = typeof _this.searchEngine === "function" ? _this.searchEngine(_this.queryValue, recordValue) : _this.search(_this.queryValue, recordValue);
                                        if (match && key) {
                                            resList.push({
                                                key: key,
                                                index: index,
                                                match: match,
                                                value: record
                                            });
                                        }
                                        else if (match && !key) {
                                            resList.push({
                                                index: index,
                                                match: match,
                                                value: record
                                            });
                                        }
                                    }
                                };
                                if (_this.data.key) {
                                    var _iteratorNormalCompletion = true;
                                    var _didIteratorError = false;
                                    var _iteratorError = undefined;
                                    try {
                                        for (var _iterator = _this.data.key[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                                            var key = _step.value;
                                            search(key);
                                        }
                                    }
                                    catch (err) {
                                        _didIteratorError = true;
                                        _iteratorError = err;
                                    }
                                    finally {
                                        try {
                                            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                                                _iterator["return"]();
                                            }
                                        }
                                        finally {
                                            if (_didIteratorError) {
                                                throw _iteratorError;
                                            }
                                        }
                                    }
                                }
                                else {
                                    search();
                                }
                            });
                            var list = _this.sort ? resList.sort(_this.sort).slice(0, _this.maxResults) : resList.slice(0, _this.maxResults);
                            return resolve({
                                matches: resList.length,
                                list: list
                            });
                        });
                    }
                }, {
                    key: "ignite",
                    value: function ignite() {
                        var _this2 = this;
                        var input = autoCompleteView.getInput(this.selector);
                        if (this.placeHolder) {
                            input.setAttribute("placeholder", this.placeHolder);
                        }
                        var debounce = function debounce(func, delay) {
                            var inDebounce;
                            return function () {
                                var context = this;
                                var args = arguments;
                                clearTimeout(inDebounce);
                                inDebounce = setTimeout(function () {
                                    return func.apply(context, args);
                                }, delay);
                            };
                        };
                        var exec = function exec(event) {
                            var inputValue = input instanceof HTMLInputElement || input instanceof HTMLTextAreaElement ? input.value.toLowerCase() : input.innerHTML.toLowerCase();
                            var queryValue = _this2.queryValue = _this2.query && _this2.query.manipulate ? _this2.query.manipulate(inputValue) : inputValue;
                            var renderResultsList = _this2.resultsList.render;
                            var triggerCondition = _this2.trigger.condition ? _this2.trigger.condition(queryValue) : queryValue.length > _this2.threshold && queryValue.replace(/ /g, "").length;
                            var eventEmitter = function eventEmitter(event, results) {
                                input.dispatchEvent(new Polyfill.CustomEventWrapper("autoComplete", {
                                    bubbles: true,
                                    detail: {
                                        event: event,
                                        input: inputValue,
                                        query: queryValue,
                                        matches: results ? results.matches : null,
                                        results: results ? results.list : null
                                    },
                                    cancelable: true
                                }));
                            };
                            if (renderResultsList) {
                                var resultsList = _this2.resultsList.view;
                                var clearResults = autoCompleteView.clearResults(resultsList);
                                if (triggerCondition) {
                                    _this2.listMatchedResults(_this2.dataStream, event).then(function (list) {
                                        eventEmitter(event, list);
                                        if (_this2.resultsList.render) {
                                            if (list.list.length === 0 && _this2.noResults) {
                                                _this2.noResults();
                                            }
                                            else {
                                                autoCompleteView.addResultsToList(resultsList, list.list, _this2.resultItem);
                                                if (_this2.onSelection) {
                                                    _this2.resultsList.navigation ? _this2.resultsList.navigation(event, input, resultsList, _this2.onSelection, list) : autoCompleteView.navigation(input, resultsList, _this2.onSelection, list);
                                                }
                                            }
                                        }
                                    });
                                }
                                else {
                                    eventEmitter(event);
                                }
                            }
                            else if (!renderResultsList && triggerCondition) {
                                _this2.listMatchedResults(_this2.dataStream, event).then(function (list) {
                                    eventEmitter(event, list);
                                });
                            }
                        };
                        var run = function run(event) {
                            Promise.resolve(_this2.data.cache ? _this2.dataStream : _this2.data.src()).then(function (data) {
                                _this2.dataStream = data;
                                exec(event);
                            });
                        };
                        this.trigger.event.forEach(function (eventType) {
                            input.addEventListener(eventType, debounce(function (event) {
                                return run(event);
                            }, _this2.debounce));
                        });
                    }
                }, {
                    key: "init",
                    value: function init() {
                        var _this3 = this;
                        if (this.data.cache) {
                            Promise.resolve(this.data.src()).then(function (data) {
                                _this3.dataStream = data;
                                _this3.ignite();
                            });
                        }
                        else {
                            this.ignite();
                        }
                        Polyfill.initElementClosestPolyfill();
                    }
                }]);
            return autoComplete;
        }();
        return autoComplete;
    })));
});
var dotAutocompleteCss = "dot-autocomplete input{-webkit-box-sizing:border-box;box-sizing:border-box;width:200px}dot-autocomplete ul{background-color:#fff;list-style:none;margin:0;max-height:300px;overflow:auto;padding:0;position:absolute;width:200px}dot-autocomplete ul li{background-color:#fff;border-top:0;border:solid 1px #ccc;-webkit-box-sizing:border-box;box-sizing:border-box;cursor:pointer;padding:0.25rem}dot-autocomplete ul li:first-child{border-top:solid 1px #ccc}dot-autocomplete ul li:focus{background-color:lightyellow;outline:0}dot-autocomplete ul li .autoComplete_highlighted{font-weight:bold}";
var DotAutocompleteComponent = /** @class */ (function () {
    function class_1(hostRef) {
        registerInstance(this, hostRef);
        this.selection = createEvent(this, "selection", 7);
        this.enter = createEvent(this, "enter", 7);
        this.lostFocus = createEvent(this, "lostFocus", 7);
        /** (optional) Disables field's interaction */
        this.disabled = false;
        /** (optional) text to show when no value is set */
        this.placeholder = '';
        /** (optional)  Min characters to start search in the autocomplete input */
        this.threshold = 0;
        /** (optional)  Max results to show after a autocomplete search */
        this.maxResults = 0;
        /** (optional) Duraction in ms to start search into the autocomplete */
        this.debounce = 300;
        /** Function or array of string to get the data to use for the autocomplete search */
        this.data = null;
        this.id = "autoComplete" + new Date().getTime();
        this.keyEvent = {
            Enter: this.emitEnter.bind(this),
            Escape: this.clean.bind(this)
        };
    }
    class_1.prototype.componentDidLoad = function () {
        if (this.data) {
            this.initAutocomplete();
        }
    };
    class_1.prototype.render = function () {
        var _this_1 = this;
        return (h("input", { autoComplete: "off", disabled: this.disabled || null, id: this.id, onBlur: function (event) { return _this_1.handleBlur(event); }, onKeyDown: function (event) { return _this_1.handleKeyDown(event); }, placeholder: this.placeholder || null }));
    };
    class_1.prototype.watchThreshold = function () {
        this.initAutocomplete();
    };
    class_1.prototype.watchData = function () {
        this.initAutocomplete();
    };
    class_1.prototype.watchMaxResults = function () {
        this.initAutocomplete();
    };
    class_1.prototype.handleKeyDown = function (event) {
        var value = this.getInputElement().value;
        if (value && this.keyEvent[event.key]) {
            event.preventDefault();
            this.keyEvent[event.key](value);
        }
    };
    class_1.prototype.handleBlur = function (event) {
        var _this_1 = this;
        event.preventDefault();
        setTimeout(function () {
            if (document.activeElement.parentElement !== _this_1.getResultList()) {
                _this_1.clean();
                _this_1.lostFocus.emit(event);
            }
        }, 0);
    };
    class_1.prototype.clean = function () {
        this.getInputElement().value = '';
        this.cleanOptions();
    };
    class_1.prototype.cleanOptions = function () {
        this.getResultList().innerHTML = '';
    };
    class_1.prototype.emitselect = function (select) {
        this.clean();
        this.selection.emit(select);
    };
    class_1.prototype.emitEnter = function (select) {
        if (select) {
            this.clean();
            this.enter.emit(select);
        }
    };
    class_1.prototype.getInputElement = function () {
        return this.el.querySelector("#" + this.id);
    };
    class_1.prototype.initAutocomplete = function () {
        var _this_1 = this;
        this.clearList();
        // tslint:disable-next-line:no-unused-expression
        new autoComplete({
            data: {
                src: function () { return __awaiter(_this_1, void 0, void 0, function () { return __generator(this, function (_a) {
                    return [2 /*return*/, this.getData()];
                }); }); }
            },
            sort: function (a, b) {
                if (a.match < b.match) {
                    return -1;
                }
                if (a.match > b.match) {
                    return 1;
                }
                return 0;
            },
            placeHolder: this.placeholder,
            selector: "#" + this.id,
            threshold: this.threshold,
            searchEngine: 'strict',
            highlight: true,
            maxResults: this.maxResults,
            debounce: this.debounce,
            resultsList: {
                container: function () { return _this_1.getResultListId(); },
                destination: this.getInputElement(),
                position: 'afterend'
            },
            resultItem: function (_a) {
                var match = _a.match;
                return match;
            },
            onSelection: function (_a) {
                var event = _a.event, selection = _a.selection;
                event.preventDefault();
                _this_1.focusOnInput();
                _this_1.emitselect(selection.value);
            }
        });
    };
    class_1.prototype.clearList = function () {
        var list = this.getResultList();
        if (list) {
            list.remove();
        }
    };
    class_1.prototype.focusOnInput = function () {
        this.getInputElement().focus();
    };
    class_1.prototype.getResultList = function () {
        return this.el.querySelector("#" + this.getResultListId());
    };
    class_1.prototype.getResultListId = function () {
        return this.id + "_results_list";
    };
    class_1.prototype.getData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var autocomplete, data, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        autocomplete = this.getInputElement();
                        autocomplete.setAttribute('placeholder', 'Loading...');
                        if (!(typeof this.data === 'function')) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.data()];
                    case 1:
                        _a = _b.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _a = [];
                        _b.label = 3;
                    case 3:
                        data = _a;
                        autocomplete.setAttribute('placeholder', this.placeholder || '');
                        return [2 /*return*/, data];
                }
            });
        });
    };
    Object.defineProperty(class_1.prototype, "el", {
        get: function () { return getElement(this); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(class_1, "watchers", {
        get: function () {
            return {
                "threshold": ["watchThreshold"],
                "data": ["watchData"],
                "maxResults": ["watchMaxResults"]
            };
        },
        enumerable: false,
        configurable: true
    });
    return class_1;
}());
DotAutocompleteComponent.style = dotAutocompleteCss;
var dotChipCss = "dot-chip span{margin-right:0.25rem}dot-chip button{cursor:pointer}";
var DotChipComponent = /** @class */ (function () {
    function DotChipComponent(hostRef) {
        registerInstance(this, hostRef);
        this.remove = createEvent(this, "remove", 7);
        /** Chip's label */
        this.label = '';
        /** (optional) Delete button's label */
        this.deleteLabel = 'Delete';
        /** (optional) If is true disabled the delete button */
        this.disabled = false;
    }
    DotChipComponent.prototype.render = function () {
        var _this_1 = this;
        var label = this.label ? this.deleteLabel + " " + this.label : null;
        return (h(Host, null, h("span", null, this.label), h("button", { type: "button", "aria-label": label, disabled: this.disabled, onClick: function () { return _this_1.remove.emit(_this_1.label); } }, this.deleteLabel)));
    };
    Object.defineProperty(DotChipComponent.prototype, "el", {
        get: function () { return getElement(this); },
        enumerable: false,
        configurable: true
    });
    return DotChipComponent;
}());
DotChipComponent.style = dotChipCss;
export { DotAutocompleteComponent as dot_autocomplete, DotChipComponent as dot_chip };
