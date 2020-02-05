import { Component, h, Element, Prop, Event, EventEmitter } from '@stencil/core';
import { DotCardContentletItem } from '../../models/dot-card-contentlet.model';

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

    @Event() selected: EventEmitter;

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
                {this.item.actions?.length ? (
                    <dot-context-menu options={this.item.actions} />
                ) : null}
                <section>
                    <dot-contentlet-thumbnail
                        contentlet={this.item?.data}
                        width="220px"
                        height="150px"
                        alt={title}
                    />
                </section>
                <header>
                    <mwc-checkbox
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                        onChange={() => {
                            if (this.checkbox.checked) {
                                this.selected.emit(this.item);
                            } else {
                                this.selected.emit(null);
                            }
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
