import { Component, h, Host, Prop } from '@stencil/core';
import { DotContentletItem } from '../../models/dot-contentlet-item';

@Component({
    tag: 'dot-card-view',
    styleUrl: 'dot-card-view.scss',
    shadow: true
})
export class DotCardView {
    @Prop()
    items: DotContentletItem[] = [];

    render() {
        return (
            <Host>
                {this.items.map((item: DotContentletItem) => (
                    <dot-card-contentlet contentlet={item}></dot-card-contentlet>
                ))}
            </Host>
        );
    }
}
