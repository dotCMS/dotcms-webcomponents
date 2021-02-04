import { DotContextMenuOption } from '../../models/dot-context-menu.model';
import '@material/mwc-menu';
import '@material/mwc-list/mwc-list-item';
import '@material/mwc-icon';
import { DotContextMenuAction } from '../../models/dot-context-menu-action.model';
export declare class DotContextMenu {
    el: HTMLElement;
    options: DotContextMenuOption<DotContextMenuAction>[];
    fontSize: string;
    state: {
        x: number;
        y: number;
        position: string;
        show: boolean;
    };
    hide(): Promise<void>;
    show(x: number, y: number, position?: string): Promise<void>;
    render(): any;
}
