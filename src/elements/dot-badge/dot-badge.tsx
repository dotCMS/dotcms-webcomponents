import { Component, h, Host, Prop } from '@stencil/core';

@Component({
    tag: 'dot-badge',
    styleUrl: 'dot-badge.scss',
    shadow: true
})
export class DotBadge {
    @Prop() bgColor: string = null;
    @Prop() color: string = null;
    @Prop() size: string = null;

    render() {
        return (
            <Host
                style={{
                    '--bg-color': this.bgColor,
                    '--color': this.color,
                    '--font-size': this.size
                }}
            >
                <slot />
            </Host>
        );
    }
}
