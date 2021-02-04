import { r as registerInstance, h, H as Host } from './index-ea58b93f.js';

const dotStateIconCss = ":host{--sucess-color:#27b970;position:relative;display:inline-block}div{border-radius:50%;border:solid 2px;-webkit-box-sizing:border-box;box-sizing:border-box;height:var(--size);width:var(--size)}.published,.revision:after{background-color:var(--sucess-color)}.archived,.revision{position:relative}.archived:before,.revision:before{-webkit-box-sizing:border-box;box-sizing:border-box;background-color:currentColor;content:\"\";height:2px;position:absolute;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);width:calc(var(--size) - 2px);z-index:1}.revision{-webkit-transform:rotate(90deg);transform:rotate(90deg)}.revision:after{border-bottom-left-radius:var(--size);border-top-left-radius:var(--size);bottom:25%;content:\"\";height:100%;left:25%;position:absolute;-webkit-transform:rotate(90deg);transform:rotate(90deg);width:50%}";

const DotStateIcon = class {
    constructor(hostRef) {
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
    render() {
        const state = this.state ? this.getType(this.state) : '';
        const name = this.labels[state];
        return (h(Host, { "aria-label": name, style: {
                '--size': this.size
            } }, h("span", null, h("div", { class: state, id: "icon" }), h("dot-tooltip", { content: name, for: "icon" }))));
    }
    getType({ live, working, deleted, hasLiveVersion }) {
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
    }
    isTrue(value) {
        return value ? value.toString() === 'true' : false;
    }
};
DotStateIcon.style = dotStateIconCss;

export { DotStateIcon as dot_state_icon };
