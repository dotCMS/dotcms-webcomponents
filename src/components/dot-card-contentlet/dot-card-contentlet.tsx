import { Component, h, Element, Prop, Event, EventEmitter } from '@stencil/core';
import '@material/mwc-checkbox';
import '@material/mwc-formfield';

@Component({
    tag: 'dot-card-contentlet',
    styleUrl: 'dot-card-contentlet.scss',
    shadow: true
})
export class DotCardContentlet {
    @Element() el: HTMLElement;

    @Prop() contentlet;

    @Event() selected: EventEmitter;

    private checkbox: HTMLInputElement;

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
                <section>
                    <img src="https://picsum.photos/600/400" alt={title} />
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
                    <label
                        onClick={(e) => {
                            e.stopPropagation();
                            this.handleClick();
                        }}
                    >
                        {title}
                    </label>
                </header>
            </dot-card>
        );
    }

    private handleClick() {
        this.checkbox.click();
    }
}
