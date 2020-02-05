import { Component, h, Host, Prop } from '@stencil/core';
import { DotContentletItem } from '../../models/dot-contentlet-item.model';

@Component({
    tag: 'dot-contentlet-thumbnail',
    styleUrl: 'dot-contentlet-thumbnail.scss'
})
export class DotContentletThumbnail {
    @Prop({ reflect: true })
    height = '';

    @Prop({ reflect: true })
    width = '';

    @Prop({ reflect: true })
    alt = '';

    @Prop({ reflect: true })
    iconSize = '';

    @Prop() contentlet: DotContentletItem;

    render() {
        return (
            <Host>
                {this.contentlet.hasTitleImage === 'true' ? (
                    <img
                        src={this.getImageURL()}
                        alt={this.alt}
                        style={{ width: this.width, height: this.height }}
                    />
                ) : (
                    <dot-contentlet-icon icon={this.contentlet.__icon__} size={this.iconSize} />
                )}
            </Host>
        );
    }

    private getImageURL(): string {
        return `/contentAsset/image/${this.contentlet.inode}/fileAsset/crop_h/${this
            .height}/crop_w/${this.width}/fp/.50,.50/`;
    }
}
