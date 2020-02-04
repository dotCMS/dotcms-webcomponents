import { Component, h, Element } from '@stencil/core';
import { MDCCheckbox } from '@material/checkbox';

@Component({
    tag: 'dot-card-contentlet',
    styleUrl: 'dot-card-contentlet.scss',
    shadow: true
})
export class DotCardContentlet {
    @Element() el: HTMLElement;

    componentDidLoad() {
        const checkboxEl = this.el.shadowRoot.querySelector('.mdc-checkbox');
        new MDCCheckbox(checkboxEl)
    }

    render() {
        return (
            <dot-card>
                <header>
                    <div class="mdc-checkbox">
                        <input type="checkbox" class="mdc-checkbox__native-control" />
                        <div class="mdc-checkbox__background">
                            <svg class="mdc-checkbox__checkmark" viewBox="0 0 24 24">
                                <path
                                    class="mdc-checkbox__checkmark-path"
                                    fill="none"
                                    d="M1.73,12.91 8.1,19.28 22.79,4.59"
                                />
                            </svg>
                            <div class="mdc-checkbox__mixedmark"></div>
                        </div>
                        <div class="mdc-checkbox__ripple"></div>
                    </div>
                    <h4>This is the card title</h4>
                </header>
            </dot-card>
        );
    }
}
