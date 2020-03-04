import { Component, h, Element, Prop, Event, EventEmitter } from '@stencil/core';
import {
    DotCardContentletItem,
    DotCardContentletEvent
} from '../../models/dot-card-contentlet.model';

import '@material/mwc-checkbox';
import '@material/mwc-formfield';

@Component({
    tag: 'dot-card-contentlet',
    styleUrl: 'dot-card-contentlet.scss',
    shadow: true
})
export class DotCardContentlet {
    @Element() el: HTMLElement;

    @Prop() item: DotCardContentletItem;

    @Prop({
        reflect: true,
        mutable: true
    })
    checked: boolean;

    @Event() checkboxChange: EventEmitter<DotCardContentletEvent>;

    private checkbox: HTMLInputElement;
    private menu: HTMLDotContextMenuElement;
    private elPosition = {
        top: 0,
        left: 0
    };

    componentDidLoad() {
        this.checkbox = this.el.shadowRoot
            .querySelector('mwc-checkbox')
            .shadowRoot.querySelector('input');

        this.menu = this.el.shadowRoot.querySelector('dot-context-menu');

        const { left, top } = this.el.getBoundingClientRect();
        this.elPosition = { left, top };
    }

    render() {
        const contentlet = this.item.data;
        const title = contentlet?.title;
        return (
            <dot-card
                onContextMenu={async (e: MouseEvent) => {
                    e.preventDefault();
                    await this.menu.show(e.x - this.elPosition.left, e.y - this.elPosition.top);
                }}
            >
                <dot-contentlet-thumbnail
                    contentlet={contentlet}
                    width="250"
                    height="250"
                    alt={title}
                    iconSize="72px"
                />
                <header>
                    <div class="main">
                        <mwc-checkbox
                            checked={this.checked}
                            onClick={(e) => {
                                e.stopPropagation();
                                this.menu.hide();
                            }}
                            onChange={() => {
                                this.checked = this.checkbox.checked;
                                this.checkboxChange.emit({
                                    data: contentlet,
                                    checked: this.checkbox.checked
                                });
                            }}
                        />
                        <label id="label">{title}</label>
                        <dot-tooltip position="left top" delay={400} content={title} for="label" />
                    </div>
                    <div class="extra">
                        <div class="state">
                            <dot-contentlet-state-icon contentlet={contentlet} size="16px" />
                            <dot-badge bordered={true}>{contentlet.language}</dot-badge>
                            {contentlet.locked === 'true' ? (
                                <dot-contentlet-lock-icon
                                    contentlet={contentlet}
                                    style={{ color: '#EC4B41' }}
                                />
                            ) : null}
                        </div>
                        {this.item?.actions?.length ? (
                            <dot-context-menu
                                onClick={(e: MouseEvent) => {
                                    e.stopImmediatePropagation();
                                }}
                                options={this.item.actions}
                            />
                        ) : null}
                    </div>
                </header>
            </dot-card>
        );
    }
}
