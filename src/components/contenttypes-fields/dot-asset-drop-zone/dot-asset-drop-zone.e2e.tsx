import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

xdescribe('dot-asset-drop-zone', () => {
    let page: E2EPage;
    let element: E2EElement;

    beforeEach(async () => {
        page = await newE2EPage({
            html: `<dot-asset-drop-zone></dot-asset-drop-zone>`
        });

        element = await page.find('dot-asset-drop-zone');
    });

    describe('@Props', () => {
        it('should set default initial values', async () => {
            await page.waitForChanges();
            expect(element).toBeDefined();
            expect(element.getProperty('dotAssetsURL')).toEqual(
                '/api/v1/workflow/actions/default/fire/NEW'
            );
            expect(element.getAttribute('maxFileSize')).toEqual('');
            expect(element.getAttribute('dropFilesText')).toEqual('Drop Files to Upload');
            expect(element.getAttribute('uploadFileText')).toEqual('Uploading Files...');
            expect(element.getAttribute('dialogLabels')).toEqual({
                closeButton: 'Close',
                uploadErrorHeader: 'Uploading File Results',
                dotAssetErrorHeader: '$0 out of $1 files fail on DotAsset creation'
            });
            expect(element.getAttribute('createAssetsText')).toEqual('Creating DotAssets');
            expect(element.getAttribute('multiMaxSizeErrorLabel')).toEqual(
                'One or more of the files exceeds the maximum file size'
            );
            expect(element.getAttribute('singeMaxSizeErrorLabel')).toEqual(
                'The file exceeds the maximum file size'
            );
        });
    });

    describe('@Events', () => {

        const dragEvent: DragEvent = null;
        it('should set default initial values', async () => {
            element.triggerEvent('ondragenter', dragEvent);
            await page.waitForChanges();
            console.log(element.innerHTML);
            let overlay = await page.find('.drag-enter.dot-asset-drop-zone__overlay');
            let indicators = await page.find('.drag-enter.dot-asset-drop-zone__indicators');

            expect(overlay).not.toBeNull()
            expect(indicators).not.toBeNull()
        });
    });
});
