import { Component, h, Host, Prop } from '@stencil/core';
import { DotContentState } from 'dotcms-models';

@Component({
    tag: 'dot-state-icon',
    styleUrl: 'dot-state-icon.scss',
    shadow: true
})
export class DotStateIcon {
    @Prop({ reflect: true })
    state: DotContentState = null;
    @Prop({ reflect: true })
    size = '16px';
    @Prop({ reflect: true })
    labels = {
        archived: 'Archived',
        published: 'Published',
        revision: 'Revision',
        draft: 'Draft'
    };

    render() {
        const state = this.state ? this.getType(this.state) : '';
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
        if (deleted.toString() === 'true') {
            return 'archived'; // crossed
        }

        if (live.toString() === 'true') {
            if (hasLiveVersion.toString() === 'true' && working.toString() === 'true') {
                return 'published'; // full
            }
        } else {
            if (hasLiveVersion.toString() === 'true') {
                return 'revision'; // half
            }
        }

        return 'draft'; // empty
    }
}
