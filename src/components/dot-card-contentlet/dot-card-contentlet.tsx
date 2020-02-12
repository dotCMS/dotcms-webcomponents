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

    @Event() valueChange: EventEmitter<DotCardContentletEvent>;

    private checkbox: HTMLInputElement;

    componentDidLoad() {
        this.checkbox = this.el.shadowRoot
            .querySelector('mwc-checkbox')
            .shadowRoot.querySelector('input');
    }

    render() {
        const title = this.item?.data?.title;
        return (
            <dot-card
                onClick={() => {
                    this.handleClick();
                }}
            >
                {this.item?.actions?.length ? (
                    <dot-context-menu
                        onClick={(e) => e.stopPropagation()}
                        options={this.item.actions}
                    />
                ) : null}
                <dot-contentlet-thumbnail
                    contentlet={this.item?.data}
                    width="250"
                    height="250"
                    alt={title}
                    iconSize="64px"
                />
                <header>
                    <mwc-checkbox
                        checked={this.checked}
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                        onChange={() => {
                            this.checked = this.checkbox.checked;
                            this.valueChange.emit({
                                data: this.item.data,
                                checked: this.checkbox.checked
                            });
                        }}
                    ></mwc-checkbox>
                    <label>{title}</label>
                </header>
            </dot-card>
        );
    }

    private handleClick() {
        this.checkbox.click();
    }
}
