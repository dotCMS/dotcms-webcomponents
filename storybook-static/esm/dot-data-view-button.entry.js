import { r as registerInstance, h } from './index-ea58b93f.js';

const dotDataViewButtonCss = "";

const DotDataViewButton = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    render() {
        return (h("dot-select-button", { value: this.value, options: [
                { label: 'List', icon: 'format_list_bulleted' },
                { label: 'Card', icon: 'grid_on' }
            ] }));
    }
};
DotDataViewButton.style = dotDataViewButtonCss;

export { DotDataViewButton as dot_data_view_button };
