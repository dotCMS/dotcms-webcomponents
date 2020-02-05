import { Component, h, Prop } from '@stencil/core';
import { legacyIconMap } from '../../utils/legacy-icons-map';
import '@material/mwc-icon';

/**
 * Represent a mapping of legacy icons if DotCMS
 *
 * @export
 * @class DotFileIcon
 */
@Component({
    tag: 'dot-contentlet-icon',
    styleUrl: 'dot-contentlet-icon.scss',
    shadow: true
})
export class DotContentletIcon {
    @Prop({ reflect: true })
    icon = '';

    @Prop({ reflect: true })
    size = '';

    render() {
        return <mwc-icon style={{ '--mdc-icon-size': this.size }}>{this.getIconName()}</mwc-icon>;
    }

    private getIconName(): string {
        const iconName = this.icon.replace('Icon', '');
        return legacyIconMap[iconName] || legacyIconMap['ukn'];
    }
}
