import { r as registerInstance, h } from './index-ea58b93f.js';
var dotDataViewButtonCss = "";
var DotDataViewButton = /** @class */ (function () {
    function DotDataViewButton(hostRef) {
        registerInstance(this, hostRef);
    }
    DotDataViewButton.prototype.render = function () {
        return (h("dot-select-button", { value: this.value, options: [
                { label: 'List', icon: 'format_list_bulleted' },
                { label: 'Card', icon: 'grid_on' }
            ] }));
    };
    return DotDataViewButton;
}());
DotDataViewButton.style = dotDataViewButtonCss;
export { DotDataViewButton as dot_data_view_button };
