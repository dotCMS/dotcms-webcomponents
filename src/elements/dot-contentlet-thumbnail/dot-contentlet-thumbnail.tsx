import { Component, h, Host, Prop, State } from '@stencil/core';
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

    @State() renderImage: boolean;

    componentWillLoad() {
        this.renderImage = this.contentlet?.hasTitleImage === 'true';
    }

    render() {
        return (
            <Host>
                {this.renderImage ? (
                    <div class="thumbnail" style={{ 'background-image': `url(${this.getImageURL()})` }}>
                        <img
                            src={this.getImageURL()}
                            alt={this.alt}
                            aria-label={this.alt}
                            onError={() => {
                                this.switchToIcon();
                            }}
                        />
                    </div>
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
        return this.contentlet.mimeType === 'application/pdf' ?
            `/contentAsset/image/${this.contentlet.inode}/fileAsset/pdf_page/1/resize_w/250/quality_q/45`
            : `/dA/${this.contentlet.inode}/500w/20q`;

    }

    private switchToIcon(): any {
        this.renderImage = false;
    }
}
