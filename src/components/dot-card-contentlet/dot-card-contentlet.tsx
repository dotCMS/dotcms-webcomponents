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

    componentDidLoad() {
        this.checkbox = this.el.shadowRoot
            .querySelector('mwc-checkbox')
            .shadowRoot.querySelector('input');
    }

    render() {
        const contentlet = this.item.data;
        const title = contentlet?.title;
        return (
            <dot-card>
                <dot-contentlet-thumbnail
                    contentlet={contentlet}
                    width="250"
                    height="250"
                    alt={title}
                    iconSize="64px"
                />
                <header>
                    <div class="main">
                        <mwc-checkbox
                            checked={this.checked}
                            onClick={(e) => {
                                e.stopPropagation();
                            }}
                            onChange={() => {
                                this.checked = this.checkbox.checked;
                                this.checkboxChange.emit({
                                    data: contentlet,
                                    checked: this.checkbox.checked
                                });
                            }}
                        />
                        <label>{title}</label>
                    </div>
                    <div class="extra">
                        <div class="state">
                            <dot-contentlet-state-icon contentlet={contentlet} size="16px" />
                            <dot-badge bordered="true">{contentlet.language}</dot-badge>
                            {contentlet.locked === 'true' ? (
                                <dot-contentlet-lock-icon
                                    contentlet={contentlet}
                                    style={{ color: '#EC4B41' }}
                                />
                            ) : null}
                        </div>
                        {this.item?.actions?.length ? (
                            <dot-context-menu
                                onClick={(e) => e.stopPropagation()}
                                options={this.item.actions}
                            />
                        ) : null}
                    </div>
                </header>
            </dot-card>
        );
    }
}
