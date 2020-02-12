import { Component, Prop, h, Host, Event, EventEmitter } from '@stencil/core';
import { DotSelectButtonOption } from '../../models/dotSelectButtonOption';
import '@material/mwc-icon-button';


@Component({
    tag: 'dot-select-button',
    styleUrl: 'dot-select-button.scss',
    shadow: true
})
export class DotSelectButton {
    @Prop({ reflect: true })
    value = '';

    @Prop({ reflect: true })
    options: DotSelectButtonOption[] = [];

    @Event() selected: EventEmitter;

    render() {
        return (
            <Host>
                {this.options.map((option: DotSelectButtonOption) => {
                    return (
                        <mwc-icon-button
                            class={{ active: option.label === this.value }}
                            icon={option.icon}
                            label={option.label}
                            disabled={option.disabled}
                            onClick={() => (option.disabled ? null : this.setSelected(option))}
                        />
                    );
                })}
            </Host>
        );
    }

    private setSelected(option) {
        this.value = option.label;
        this.selected.emit(option);
    }
}
