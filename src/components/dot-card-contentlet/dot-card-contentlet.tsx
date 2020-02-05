import { Component, h, Element, Prop, Event, EventEmitter } from '@stencil/core';
import '@material/mwc-checkbox';
import '@material/mwc-formfield';
import { DotContentletItem } from '../../models/dot-contentlet-item.model';

@Component({
    tag: 'dot-card-contentlet',
    styleUrl: 'dot-card-contentlet.scss',
    shadow: true
})
export class DotCardContentlet {
    @Element() el: HTMLElement;

    @Prop() contentlet: DotContentletItem;

    @Event() selected: EventEmitter;

    private checkbox: HTMLInputElement;
    private options = [
        {
            label: 'Publish',
            action: (e) => {
                console.log(e);
            }
        },
        {
            label: 'Archived',
            action: (e) => {
                console.log(e);
            }
        }
    ];

    componentDidLoad() {
        this.checkbox = this.el.shadowRoot
            .querySelector('mwc-checkbox')
            .shadowRoot.querySelector('input');
    }

    render() {
        const title = this.contentlet?.title;
        return (
            <dot-card
                onClick={() => {
                    this.handleClick();
                }}
            >
                <dot-context-menu options={this.options} />
                <section>
                    <img src="https://placeimg.com/640/480/any" alt={title} />
                </section>
                <header>
                    <mwc-checkbox
                        value="true"
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                        onChange={() => {
                            if (this.checkbox.checked) {
                                this.selected.emit(this.contentlet);
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
