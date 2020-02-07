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
                    <img
                        src={this.getImageURL()}
                        alt={this.alt}
                        aria-label={this.alt}
                        onError={() => {
                            this.switchToIcon();
                        }}
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
        return `/dA/${this.contentlet.identifier}/${this.width}`;
    }

    private switchToIcon(): any {
        this.renderImage = false;
    }
}
