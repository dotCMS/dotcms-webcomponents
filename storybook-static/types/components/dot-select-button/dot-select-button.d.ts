import { EventEmitter } from '../../stencil-public-runtime';
import { DotSelectButtonOption } from '../../models/dotSelectButtonOption';
import '@material/mwc-icon-button';
export declare class DotSelectButton {
    value: string;
    options: DotSelectButtonOption[];
    selected: EventEmitter<string>;
    render(): any;
    private setSelected;
}
