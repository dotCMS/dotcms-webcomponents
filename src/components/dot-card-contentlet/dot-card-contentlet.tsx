import { Component, h, Element, Prop, Event, EventEmitter, Watch } from '@stencil/core';
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
    @Element() el: HTMLDotCardContentletElement;

    @Prop() item: DotCardContentletItem;

    @Prop({
        reflect: true,
        mutable: true
    })
    checked: boolean;

    @Event() checkboxChange: EventEmitter<DotCardContentletEvent>;

    @Watch('checked')
    emitChecked(): void {
        this.checkboxChange.emit({
            originalTarget: this.el,
            shiftKey: this.isShiftKey
        });
    }

    private menu: HTMLDotContextMenuElement;
    private elPosition = {
        top: 0,
        left: 0
    };

    private isShiftKey = false;

    componentDidLoad() {
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
                            onClick={(e: MouseEvent) => {
                                e.stopImmediatePropagation();
                                this.isShiftKey = e.shiftKey;
                            }}
                            onChange={(e) => {
                                this.checked = e.target.checked;
                                this.menu.hide();
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
