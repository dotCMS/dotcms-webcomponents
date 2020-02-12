import { Component, h, Prop } from '@stencil/core';
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

    private legacyIconMap = {
        page: 'insert_drive_file',
        gear: 'settings',
        content: 'event_note',
        form: 'format_list_bulleted',
        persona: 'person',
        ukn: 'insert_drive_file',
        folder: 'folder',

        // Video files
        asf: 'videocam',
        avi: 'videocam',
        mov: 'videocam',
        mp4: 'videocam',
        mpg: 'videocam',
        ogg: 'videocam',
        ogv: 'videocam',
        rm: 'videocam',
        vob: 'videocam',

        // Data Files
        csv: 'insert_drive_file',
        numbers: 'insert_drive_file',
        wks: 'insert_drive_file',
        xls: 'insert_drive_file',
        xlsx: 'insert_drive_file',

        // Image Files
        bmp: 'image',
        image: 'image',
        jpeg: 'image',
        jpg: 'image',
        pct: 'image',
        png: 'image',
        gif: 'image',
        webp: 'image',
        svg: 'image',

        // PDF Files
        pdf: 'insert_drive_file',

        // Powerpoint Files
        keynote: 'insert_drive_file',
        ppt: 'insert_drive_file',
        pptx: 'insert_drive_file',

        // Word
        doc: 'insert_drive_file',
        docx: 'insert_drive_file',

        // Audio
        aac: 'audiotrack',
        aif: 'audiotrack',
        iff: 'audiotrack',
        m3u: 'audiotrack',
        mid: 'audiotrack',
        mp3: 'audiotrack',
        mpa: 'audiotrack',
        ra: 'audiotrack',
        wav: 'audiotrack',
        wma: 'audiotrack',

        vtl: 'code',
        css: 'code',
        js: 'code',
        html: 'code',
        scss: 'code'
    };

    render() {
        return <mwc-icon style={{ '--mdc-icon-size': this.size }}>{this.getIconName()}</mwc-icon>;
    }

    private getIconName(): string {
        const iconName = this.icon.replace('Icon', '');
        return this.legacyIconMap[iconName] || this.legacyIconMap['ukn'];
    }
}
