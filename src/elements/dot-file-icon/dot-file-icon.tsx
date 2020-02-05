import { Component, h, Prop } from '@stencil/core';
import { legacyIconMap } from '../../utils/legacy-icons-map';

@Component({
    tag: 'dot-file-icon',
    styleUrl: 'dot-file-icon.scss',
    shadow: true
})
export class DotFileIcon {
    @Prop({ reflect: true })
    icon = '';

    render() {
        return <i class="material-icons">{legacyIconMap[this.icon] || legacyIconMap['ukn']}</i>;
    }
}
