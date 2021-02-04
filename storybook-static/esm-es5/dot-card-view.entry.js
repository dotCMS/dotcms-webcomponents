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
import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './index-ea58b93f.js';
var dotCardViewCss = ":host{display:grid;grid-template-columns:repeat(auto-fill, minmax(260px, 1fr));grid-gap:var(--basic-padding-2)}dot-card-contentlet{height:100%}dot-card-contentlet:before{content:\"\";display:inline-block;-ms-flex:0 0 0px;flex:0 0 0;height:0;padding-bottom:calc(100%)}";
var getValueAsArray = function (value) {
    return value && typeof value === 'string' ? value.split(',') : [];
};
var getSelecttion = function (items, value) {
    if (items && items.length && value && typeof value === 'string') {
        return items
            .filter(function (_a) {
            var inode = _a.data.inode;
            return value.split(',').includes(inode);
        })
            .map(function (_a) {
            var data = _a.data;
            return data;
        });
    }
    return [];
};
var DotCardView = /** @class */ (function () {
    function class_1(hostRef) {
        registerInstance(this, hostRef);
        this.selected = createEvent(this, "selected", 7);
        this.cardClick = createEvent(this, "cardClick", 7);
        this.items = [];
        this.selection = [];
    }
    class_1.prototype.watchItems = function (newValue) {
        this.selection = getSelecttion(newValue, this.value);
    };
    class_1.prototype.watchValue = function (newValue) {
        this.selection = getSelecttion(this.items, newValue);
    };
    class_1.prototype.getValue = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.selection];
            });
        });
    };
    class_1.prototype.clearValue = function () {
        return __awaiter(this, void 0, void 0, function () {
            var cards;
            return __generator(this, function (_a) {
                this.value = '';
                cards = this.getCards();
                cards.forEach(function (card) {
                    card.checked = false;
                });
                return [2 /*return*/];
            });
        });
    };
    class_1.prototype.componentDidLoad = function () {
        this.selection = getSelecttion(this.items, this.value);
        this.cards = this.getCards();
    };
    class_1.prototype.clearMenu = function () {
        this.cards.forEach(function (card) {
            card.hideMenu();
        });
    };
    class_1.prototype.render = function () {
        var _this = this;
        var value = getValueAsArray(this.value);
        return (h(Host, null, this.items.map(function (item) { return (h("dot-card-contentlet", { onContextMenu: function (e) { return __awaiter(_this, void 0, void 0, function () {
                var target;
                return __generator(this, function (_a) {
                    e.preventDefault();
                    target = e.target;
                    this.clearMenu();
                    target.showMenu(e.x, e.y);
                    return [2 /*return*/];
                });
            }); }, onContextMenuClick: function () {
                _this.clearMenu();
            }, onClick: function () {
                _this.clearMenu();
                _this.cardClick.emit(item.data);
            }, key: item.data.inode, checked: value.includes(item.data.inode), onCheckboxChange: function (_a) {
                var _b = _a.detail, originalTarget = _b.originalTarget, shiftKey = _b.shiftKey;
                var inBetween = false;
                if (shiftKey && originalTarget.checked) {
                    _this.cards.forEach(function (card) {
                        if (card === originalTarget || card === _this.lastChecked) {
                            inBetween = !inBetween;
                        }
                        if (inBetween) {
                            card.checked = true;
                            _this.setValue(originalTarget, card.item.data);
                        }
                    });
                }
                _this.lastChecked = originalTarget;
                _this.setValue(originalTarget, item.data);
            }, item: item })); })));
    };
    class_1.prototype.setValue = function (originalTarget, data) {
        if (originalTarget.checked) {
            this.selection.push(data);
        }
        else {
            this.selection = this.selection.filter(function (_a) {
                var identifier = _a.identifier;
                return identifier !== data.identifier;
            });
        }
        this.value = this.selection.map(function (_a) {
            var inode = _a.inode;
            return inode;
        }).join(',');
        this.selected.emit(this.selection);
    };
    class_1.prototype.getCards = function () {
        return this.el.shadowRoot.querySelectorAll('dot-card-contentlet');
    };
    Object.defineProperty(class_1.prototype, "el", {
        get: function () { return getElement(this); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(class_1, "watchers", {
        get: function () {
            return {
                "items": ["watchItems"],
                "value": ["watchValue"]
            };
        },
        enumerable: false,
        configurable: true
    });
    return class_1;
}());
DotCardView.style = dotCardViewCss;
export { DotCardView as dot_card_view };
