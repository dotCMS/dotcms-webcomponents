import { EventEmitter } from '../../stencil-public-runtime';
import { DotCardContentletItem } from '../../models/dot-card-contentlet.model';
import { DotContentletItem } from '../../models/dot-contentlet-item.model';
export declare class DotCardView {
    el: HTMLElement;
    items: DotCardContentletItem[];
    value: string;
    selected: EventEmitter;
    cardClick: EventEmitter;
    private selection;
    private cards;
    private lastChecked;
    watchItems(newValue: DotCardContentletItem[]): void;
    watchValue(newValue: string): void;
    getValue(): Promise<DotContentletItem[]>;
    clearValue(): Promise<void>;
    componentDidLoad(): void;
    private clearMenu;
    render(): any;
    private setValue;
    private getCards;
}
