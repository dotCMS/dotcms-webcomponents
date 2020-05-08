import { newSpecPage } from '@stencil/core/testing';
import { DotAssetDropZone } from './dot-asset-drop-zone';
import { SpecPage } from '@stencil/core/internal';
import { Icon } from '@material/mwc-icon/mwc-icon';
import { Dialog } from '@material/mwc-dialog/mwc-dialog';
import { Button } from '@material/mwc-button/mwc-button';

describe('dot-asset-drop-zone', () => {
    let page: SpecPage;
    let element: Element;

    beforeEach(async () => {
        page = await newSpecPage({
            components: [DotAssetDropZone, Icon, Dialog, Button],
            html: `<dot-asset-drop-zone />`
        });
    });

    it('testing', () => {
        element = page.body.querySelector('dot-asset-drop-zone');

        const textFile = new File([''], 'text.txt');
        const image = new File([''], 'dummy.jpg');
        // const fileDropEvent: DragEvent = {
        //     preventDefault: () => {},
        //     dataTransfer: { files: [file, file, file], dropEffect: false }
        // };

        const dataTransferItemList: DataTransferItemList = new DataTransferItemList();
        dataTransferItemList.add(textFile);
        dataTransferItemList.add(image);

        const dragEvent: DragEvent = new DragEvent('drop', {
            dataTransfer: {
                dropEffect: 'none',
                effectAllowed: 'none',
                files: new FileList(),
                clearData: null,
                items: dataTransferItemList,
                types: null,
                getData: null,
                setData: null,
                setDragImage: null
            }
        });

        element.dispatchEvent(dragEvent);

        // const event = {
        //     dataTransfer: {
        //         items: [
        //             {
        //                 webkitGetAsEntry: () => {
        //                     return { isFile: true };
        //                 },
        //                 getAsFile: () => null,
        //                 kind: null,
        //                 type: null,
        //                 getAsString: null
        //             },
        //             {
        //                 webkitGetAsEntry: () => {
        //                     return { isFile: true };
        //                 },
        //                 getAsFile: () => null,
        //                 kind: null,
        //                 type: null,
        //                 getAsString: null
        //             }
        //         ]
        //     }
        // };
    });
});
