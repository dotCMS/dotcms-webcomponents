import {Component, h, Host, Prop, State} from '@stencil/core';
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

    @Prop()
    contentlet: DotContentletItem;

    @State() hasImage: boolean;

    render() {
        this.hasImage =  this.contentlet?.hasTitleImage === 'true' || false;
        return (
            <Host>
                {this.hasImage ? (
                    <img
                        src={this.getImageURL()}
                        alt={this.alt}
                        aria-label={this.alt}
                        onError={() => {this.switchToIcon()}}
                    />
                ) : (
                    <dot-contentlet-icon
                        icon={this.contentlet?.__icon__}
                        size={this.iconSize}
                        aria-label={this.alt}
                    />
                )}
            </Host>
        );
    }

    private getImageURL(): string {
        return `/contentAsset/image/${this.contentlet
            .inode}/fileAsset/filter/Thumbnail/thumbnail_w/${this.width}/thumbnail_h/${this
            .height}/`;
    }

    private switchToIcon(): any {
        this.hasImage = false;

    }
}
