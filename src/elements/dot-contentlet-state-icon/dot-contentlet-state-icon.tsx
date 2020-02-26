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
    @Prop() labels = {
        archived: 'Archived',
        published: 'Published',
        revision: 'Revision',
        draft: 'Draft'
    };

    render() {
        const state = this.getType(this.contentlet);
        const name = this.labels[state];
        return (
            <Host
                aria-label={name}
                style={{
                    '--size': this.size
                }}
            >
                <div class={state} id="icon"></div>
                <dot-tooltip content={name} for="icon" />
            </Host>
        );
    }

    private getType({ live, working, deleted, hasLiveVersion }: DotContentletItem): string {
        if (deleted === 'true') {
            return 'archived'; // crossed
        }

        if (live === 'true') {
            if (hasLiveVersion === 'true' && working === 'true') {
                return 'published'; // full
            }
        } else {
            if (hasLiveVersion === 'true') {
                return 'revision'; // half
            }
        }

        return 'draft'; // empty
    }
}
