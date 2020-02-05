import { Component, h, Element, Host, Prop } from '@stencil/core';
import { Menu } from '@material/mwc-menu';
import { DotContextMenuOption } from '../../models/dot-context-menu.model';

import '@material/mwc-menu';
import '@material/mwc-list/mwc-list-item';
import '@material/mwc-icon';

export interface MenuAction {
    index: number;
}

@Component({
    tag: 'dot-context-menu',
    styleUrl: 'dot-context-menu.scss',
    shadow: true
})
export class DotContextMenu {
    @Element() el: HTMLElement;

    @Prop() options: DotContextMenuOption<MenuAction>[] = [];

    menu: Menu;
    button: HTMLElement;

    componentDidLoad() {
        const button = this.el.shadowRoot.querySelector('button');
        this.menu = this.el.shadowRoot.querySelector('mwc-menu');
        this.menu.anchor = button;
    }

    render() {
        return (
            <Host>
                <button
                    onClick={(e: MouseEvent) => {
                        e.stopPropagation();
                        this.menu.open = true;
                    }}
                >
                    <mwc-icon>more_vert</mwc-icon>
                </button>
                <mwc-menu
                    onAction={(e: CustomEvent<MenuAction>) => {
                        this.options[e.detail.index].action(e);
                    }}
                >
                    {this.options.map(({ label }: DotContextMenuOption<MenuAction>) => (
                        <mwc-list-item>{label}</mwc-list-item>
                    ))}
                </mwc-menu>
            </Host>
        );
    }
}
