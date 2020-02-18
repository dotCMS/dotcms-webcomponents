import { Component, h, Host, Prop } from '@stencil/core';
import { DotContentletItem } from '../../models/dot-contentlet-item.model';

@Component({
    tag: 'dot-contentlet-state-icon',
    styleUrl: 'dot-contentlet-state-icon.scss',
    shadow: true
})
export class DotContentletStateIcon {
    @Prop() contentlet: DotContentletItem;
    @Prop() size = '16px';

    render() {
        const className = this.getType(this.contentlet);
        return (
            <Host
                style={{
                    '--size': this.size
                }}
            >
                <div class={className}></div>
            </Host>
        );
    }

    private getType({ live, working, deleted }: DotContentletItem): string {
        const published = live === 'true';
        const draft = working === 'true';
        const archived = deleted === 'true';

        if (archived) {
            return 'archived';
        }

        if (published) {
            if (draft) {
                return 'drafted';
            }

            return 'published';
        }

        return 'draft';
    }
}
