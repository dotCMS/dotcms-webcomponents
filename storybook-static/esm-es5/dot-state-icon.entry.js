import { r as registerInstance, h, H as Host } from './index-ea58b93f.js';
var dotStateIconCss = ":host{--sucess-color:#27b970;position:relative;display:inline-block}div{border-radius:50%;border:solid 2px;-webkit-box-sizing:border-box;box-sizing:border-box;height:var(--size);width:var(--size)}.published,.revision:after{background-color:var(--sucess-color)}.archived,.revision{position:relative}.archived:before,.revision:before{-webkit-box-sizing:border-box;box-sizing:border-box;background-color:currentColor;content:\"\";height:2px;position:absolute;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);width:calc(var(--size) - 2px);z-index:1}.revision{-webkit-transform:rotate(90deg);transform:rotate(90deg)}.revision:after{border-bottom-left-radius:var(--size);border-top-left-radius:var(--size);bottom:25%;content:\"\";height:100%;left:25%;position:absolute;-webkit-transform:rotate(90deg);transform:rotate(90deg);width:50%}";
var DotStateIcon = /** @class */ (function () {
    function DotStateIcon(hostRef) {
        registerInstance(this, hostRef);
        this.state = null;
        this.size = '16px';
        this.labels = {
            archived: 'Archived',
            published: 'Published',
            revision: 'Revision',
            draft: 'Draft'
        };
    }
    DotStateIcon.prototype.render = function () {
        var state = this.state ? this.getType(this.state) : '';
        var name = this.labels[state];
        return (h(Host, { "aria-label": name, style: {
                '--size': this.size
            } }, h("span", null, h("div", { class: state, id: "icon" }), h("dot-tooltip", { content: name, for: "icon" }))));
    };
    DotStateIcon.prototype.getType = function (_a) {
        var live = _a.live, working = _a.working, deleted = _a.deleted, hasLiveVersion = _a.hasLiveVersion;
        if (this.isTrue(deleted)) {
            return 'archived'; // crossed
        }
        if (live.toString() === 'true') {
            if (this.isTrue(hasLiveVersion) && this.isTrue(working)) {
                return 'published'; // full
            }
        }
        else {
            if (this.isTrue(hasLiveVersion)) {
                return 'revision'; // half
            }
        }
        return 'draft'; // empty
    };
    DotStateIcon.prototype.isTrue = function (value) {
        return value ? value.toString() === 'true' : false;
    };
    return DotStateIcon;
}());
DotStateIcon.style = dotStateIconCss;
export { DotStateIcon as dot_state_icon };
