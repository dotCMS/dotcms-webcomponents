'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-674736da.js');

const dotProgressBarCss = "dot-progress-bar{text-align:center}dot-progress-bar div{color:var(--color-sec);border:1px solid var(--color-sec);border-radius:var(--border-radius);height:32px;width:100%;position:relative;margin-bottom:4px}dot-progress-bar div:before{content:\"\";background-color:var(--color-sec);width:calc(var(--progress-width, 0) * 1%);display:-ms-flexbox;display:flex;position:absolute;left:0px;bottom:0px;top:0px;max-width:100%;-webkit-transition:width 100ms;transition:width 100ms}dot-progress-bar span{color:var(--color-sec)}";

const DotProgressBar = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        /** text to be show bellow the progress bar*/
        this.text = 'Uploading Files...';
        /** indicates the progress to be show, a value 1 to 100 */
        this.progress = 0;
    }
    render() {
        return (index.h(index.Host, null, index.h("div", { style: { '--progress-width': this.progress.toString() } }), index.h("span", null, this.text)));
    }
};
DotProgressBar.style = dotProgressBarCss;

exports.dot_progress_bar = DotProgressBar;
