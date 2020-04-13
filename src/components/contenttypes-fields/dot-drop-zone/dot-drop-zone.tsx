/**
 * Represent a dotcms DotDropZone control.
 *
 * @export
 * @class DotDropZone
 */
import { Component, h, Host, Prop, State } from '@stencil/core';

@Component({
    tag: 'dot-drop-zone',
    styleUrl: 'dot-drop-zone.scss'
})
export class DotDropZone {
    /** URL of the endpoint to upload temporary files */
    @Prop() uploadURL = '/api/v1/temp/';

    /** URL to endpoint to register multipart files */
    @Prop() assetsURL = '/api/v1/workflow/actions/fire';

    @State()
    classes = {
        drop: false,
        'drag-enter': false,
        'drag-leave': false
    };

    render() {
        return (
            <Host
                class={{ ...this.classes }}
                ondrop={(event: Event) => this.dropHandler(event)}
                ondragenter={(event: Event) => this.dragEnterHandler(event)}
                ondragleave={(event: Event) => this.dragOutHandler(event)}
            >
                <div />
            </Host>
        );
    }

    private dragEnterHandler(event) {
        console.log('dragEnterHandler: ', event);
        event.preventDefault();
        this.classes = { ...this.classes, ...{ 'drag-enter': true } };
    }

    private dragOutHandler(event) {
        console.log('dragOutHandler: ', event);
        this.classes = { ...this.classes, ...{ 'drag-enter': false, drop: false } };
        event.preventDefault();
    }

    private dropHandler(event: Event) {
        console.log('dropHandler: ', event);
        this.classes['drop'] = true;
        this.classes = { ...this.classes, ...{ drop: true } };
        event.preventDefault();
        event.stopPropagation();
    }

    // private dragOverHandler(event) {
    //     console.log('dragOverHandler: ', event);
    //     event.preventDefault();
    // }
}
