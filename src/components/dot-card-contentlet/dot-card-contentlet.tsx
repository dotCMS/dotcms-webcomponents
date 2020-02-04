import { Component, h, Element } from '@stencil/core';
import '@material/mwc-checkbox';
import { Checkbox } from '@material/mwc-checkbox';
import '@material/mwc-formfield';

@Component({
    tag: 'dot-card-contentlet',
    styleUrl: 'dot-card-contentlet.scss',
    shadow: true
})
export class DotCardContentlet {
    @Element() el: HTMLElement;
    private checkbox: Checkbox;

    componentDidLoad() {
        this.checkbox = this.el.shadowRoot.querySelector('mwc-checkbox');
    }

    render() {
        return (
            <dot-card>
                <header>
                    <mwc-checkbox
                        onChange={(e) => {
                            console.log(e);
                        }}
                    ></mwc-checkbox>
                    <label
                        onClick={() => {
                            this.checkbox.click();
                        }}
                    >
                        Hola Mundo
                    </label>
                </header>
            </dot-card>
        );
    }
}
