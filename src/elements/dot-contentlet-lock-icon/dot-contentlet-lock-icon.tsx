import { Component, h, Prop } from '@stencil/core';
import { DotContentletItem } from '../../models/dot-contentlet-item.model';
import '@material/mwc-icon';

@Component({
    tag: 'dot-contentlet-lock-icon',
    styleUrl: 'dot-contentlet-lock-icon.scss',
    shadow: true
})
export class DotContentletLockIcon {
    @Prop() contentlet: DotContentletItem;
    @Prop() size = '16px';

    render() {
        return (
            <mwc-icon style={{ '--mdc-icon-size': this.size }}>
                {this.contentlet.locked === 'true' ? 'locked' : 'lock_open'}
            </mwc-icon>
        );
    }
}
