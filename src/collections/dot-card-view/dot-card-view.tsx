import {
    Component,
    h,
    Host,
    Prop,
    Event,
    EventEmitter,
    Method,
    Watch,
    Element
} from '@stencil/core';
import {
    DotCardContentletItem,
    DotCardContentletEvent
} from '../../models/dot-card-contentlet.model';
import { DotContentletItem } from '../../models/dot-contentlet-item.model';

const getValueAsArray = (value: string): string[] => {
    return value && typeof value === 'string' ? value.split(',') : [];
};

const getSelecttion = (items: DotCardContentletItem[], value: string): DotContentletItem[] => {
    if (items && items.length && value && typeof value === 'string') {
        return items
            .filter(({ data: { inode } }: DotCardContentletItem) =>
                value.split(',').includes(inode)
            )
            .map(({ data }: DotCardContentletItem) => data);
    }

    return [];
};

@Component({
    tag: 'dot-card-view',
    styleUrl: 'dot-card-view.scss',
    shadow: true
})
export class DotCardView {
    @Element() el: HTMLElement;
    @Prop() items: DotCardContentletItem[] = [];
    @Prop({
        reflect: true,
        mutable: true
    })
    value: string;

    @Event() selected: EventEmitter;
    @Event() cardClick: EventEmitter;

    private selection: DotContentletItem[] = [];

    private lastChecked;

    @Method()
    async getValue(): Promise<DotContentletItem[]> {
        return this.selection;
    }

    @Method()
    async clearValue(): Promise<void> {
        this.value = '';
        const cards = this.getCards();

        cards.forEach((card: HTMLDotCardContentletElement) => {
            card.checked = false;
        });
    }

    @Watch('items')
    watchItems(newValue: DotCardContentletItem[]) {
        this.selection = getSelecttion(newValue, this.value);
    }

    @Watch('value')
    watchValue(newValue: string) {
        this.selection = getSelecttion(this.items, newValue);
    }

    render() {
        const value = getValueAsArray(this.value);

        return (
            <Host>
                {this.items.map((item: DotCardContentletItem) => (
                    <dot-card-contentlet
                        onClick={(e: MouseEvent) => {
                            const cards = this.getCards();
                            const target = e.target as HTMLDotCardContentletElement;
                            let inBetween = false;

                            if (e.shiftKey && target.checked) {
                                cards.forEach((card) => {
                                    if (card === target || card === this.lastChecked) {
                                        inBetween = !inBetween;
                                    }

                                    if (inBetween) {
                                        card.checked = true;
                                    }
                                });
                            }

                            this.lastChecked = target;
                        }}
                        key={item.data.inode}
                        checked={value.includes(item.data.inode)}
                        onCheckboxChange={({
                            detail: { originalTarget, data }
                        }: CustomEvent<DotCardContentletEvent>) => {
                            if (originalTarget.checked) {
                                this.selection.push(data);
                            } else {
                                this.selection = this.selection.filter(
                                    (item: DotContentletItem) => item.identifier !== data.identifier
                                );
                            }

                            this.value = this.selection
                                .map(({ inode }: DotContentletItem) => inode)
                                .join(',');
                            this.selected.emit(this.selection);
                        }}
                        item={item}
                    />
                ))}
            </Host>
        );
    }

    private getCards(): NodeListOf<HTMLDotCardContentletElement> {
        return this.el.shadowRoot.querySelectorAll('dot-card-contentlet');
    }
}
