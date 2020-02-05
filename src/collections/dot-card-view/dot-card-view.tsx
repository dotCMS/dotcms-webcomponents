import { Component, h, Host, Prop } from '@stencil/core';
import { DotCardContentletItem } from '../../models/dot-card-contentlet.model';

@Component({
    tag: 'dot-card-view',
    styleUrl: 'dot-card-view.scss',
    shadow: true
})
export class DotCardView {
    @Prop()
    items: DotCardContentletItem[] = [];

    render() {
        return (
            <Host>
                {this.items.map((item: DotCardContentletItem) => (
                    <dot-card-contentlet item={item}></dot-card-contentlet>
                ))}
            </Host>
        );
    }
}
