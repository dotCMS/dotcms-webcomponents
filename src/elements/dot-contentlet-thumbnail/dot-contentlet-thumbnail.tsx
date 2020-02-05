import { Component, h, Host, Prop } from '@stencil/core';
import { DotContentlet } from '../../models/dot-Contentlet';

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

    @Prop() contentlet: DotContentlet;

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
                    <dot-file-icon icon={this.contentlet.__icon__} size={this.iconSize} />
                )}
            </Host>
        );
    }

    private getImageURL(): string {
        return (
            '/dA/' + this.contentlet.inode + '/titleImage/' + this.width + 'w/' + this.height + 'h'
        );
    }
}
