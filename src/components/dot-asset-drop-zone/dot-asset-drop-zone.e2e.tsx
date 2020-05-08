import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

describe('dot-asset-drop-zone', () => {
    let page: E2EPage;
    let element: E2EElement;

    beforeEach(async () => {
        page = await newE2EPage({
            html: `<dot-asset-drop-zone></dot-asset-drop-zone>`
        });

        element = await page.find('dot-asset-drop-zone');
    });

    describe('@Events', () => {
        it('should show indicator on dragEnter', async () => {
            element.triggerEvent('dragenter');
            await page.waitForChanges();

            const indicator = await page.find(
                '.dot-asset-drop-zone__indicators.drag-enter .dot-asset-drop-zone__icon'
            );
            const icon = (await indicator.find('mwc-icon')).innerText;
            const message = (await indicator.find('span')).innerText;

            expect(icon).toEqual('get_app');
            expect(message).toEqual('Drop Files to Upload');
        });

        it('should hide indicator on dragLeave', async () => {
            element.triggerEvent('dragenter');
            await page.waitForChanges();
            element.triggerEvent('dragleave');
            await page.waitForChanges();
            const indicator = await page.find('.dot-asset-drop-zone__indicators.drag-enter');

            expect(indicator).toBeNull();
        });

        xit('should show upload progress bar on drop', async () => {});

        xit('should show creation asset progress bar', async () => {});

        xit('should emit event when done with the asset creation', async () => {});

        xdescribe('Errors', () => {
            xit('should show dialog, if file is bigger than allowed', async () => {});

            xit('should show dialog, if try to drop a folder', async () => {});

            xit('should show dialog, if fail to create dotAssets', async () => {});
        });
    });
});
