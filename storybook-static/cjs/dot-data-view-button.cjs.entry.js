'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-674736da.js');

const dotDataViewButtonCss = "";

const DotDataViewButton = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
    }
    render() {
        return (index.h("dot-select-button", { value: this.value, options: [
                { label: 'List', icon: 'format_list_bulleted' },
                { label: 'Card', icon: 'grid_on' }
            ] }));
    }
};
DotDataViewButton.style = dotDataViewButtonCss;

exports.dot_data_view_button = DotDataViewButton;
