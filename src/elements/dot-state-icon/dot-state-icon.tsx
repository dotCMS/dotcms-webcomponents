import { Component, h, Host, Prop } from '@stencil/core';
import { DotContentState } from '../../models';

@Component({
    tag: 'dot-contentlet-state-icon',
    styleUrl: 'dot-state-icon.scss',
    shadow: true
})
export class DotStateIcon {
    @Prop() state: DotContentState;
    @Prop() size = '16px';
    @Prop()
    labels = {
        archived: 'Archived',
        published: 'Published',
        revision: 'Revision',
        draft: 'Draft'
    };

    render() {
        const state = this.getType(this.state);
        const name = this.labels[state];
        return (
            <Host
                aria-label={name}
                style={{
                    '--size': this.size
                }}
            >
                <span>
                    <div class={state} id="icon" />
                    <dot-tooltip content={name} for="icon" />
                </span>
            </Host>
        );
    }

    private getType({ live, working, deleted, hasLiveVersion }: DotContentState): string {
        if (deleted === 'true' || deleted == true) {
            return 'archived'; // crossed
        }

        if (live === 'true' || live == true) {
            if (
                (hasLiveVersion === 'true' || hasLiveVersion == true) &&
                (working === 'true' || working == true)
            ) {
                return 'published'; // full
            }
        } else {
            if (hasLiveVersion === 'true' || hasLiveVersion == true) {
                return 'revision'; // half
            }
        }

        return 'draft'; // empty
    }
}
