import { Component, Prop, h, Host, Event, EventEmitter } from '@stencil/core';
import { DotSwitchOption } from '../../models/dot-switch-option';

import '@material/mwc-icon-button';

@Component({
    tag: 'dot-switch',
    styleUrl: 'dot-switch.scss',
    shadow: true
})
export class DotSwitch {
    @Prop({ reflect: true })
    value = '';

    @Prop({ reflect: true })
    options: DotSwitchOption[] = [];

    @Event() selected: EventEmitter;

    render() {
        return (
            <Host>
                {this.options.map((option: DotSwitchOption) => {
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
