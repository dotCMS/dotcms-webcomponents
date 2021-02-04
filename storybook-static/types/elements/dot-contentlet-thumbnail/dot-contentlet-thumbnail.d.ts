import { DotContentletItem } from '../../models/dot-contentlet-item.model';
export declare class DotContentletThumbnail {
    height: string;
    width: string;
    alt: string;
    iconSize: string;
    contentlet: DotContentletItem;
    renderImage: boolean;
    componentWillLoad(): void;
    render(): any;
    private getImageURL;
    private switchToIcon;
}
