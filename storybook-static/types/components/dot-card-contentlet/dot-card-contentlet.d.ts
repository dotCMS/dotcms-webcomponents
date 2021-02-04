import { EventEmitter } from '../../stencil-public-runtime';
import { DotCardContentletItem, DotCardContentletEvent } from '../../models/dot-card-contentlet.model';
import '@material/mwc-checkbox';
import '@material/mwc-formfield';
export declare class DotCardContentlet {
    el: HTMLDotCardContentletElement;
    item: DotCardContentletItem;
    thumbnailSize: string;
    iconSize: string;
    checked: boolean;
    checkboxChange: EventEmitter<DotCardContentletEvent>;
    contextMenuClick: EventEmitter<MouseEvent>;
    private menu;
    private isShiftKey;
    showMenu(x: number, y: number): Promise<void>;
    hideMenu(): Promise<void>;
    componentDidLoad(): void;
    render(): any;
    private getContentState;
}
