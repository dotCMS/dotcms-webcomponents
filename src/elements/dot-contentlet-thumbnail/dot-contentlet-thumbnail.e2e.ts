import { E2EPage, newE2EPage } from '@stencil/core/testing';
import { contentletMock } from '../../test';

describe('dot-contentlet-thumbnail', () => {
    let page: E2EPage;

    beforeEach(async () => {
        page = await newE2EPage({
            html: `<dot-contentlet-thumbnail \>`
        });
    });

    describe('@Elements', () => {
        describe('empty', () => {
            it('should show dot-contentlet-icon', async () => {
                const contentletIcon = await page.find(
                    'dot-contentlet-thumbnail  dot-contentlet-icon'
                );
                expect(contentletIcon).not.toBeNull();
            });

            it('should hide image', async () => {
                const image = await page.find('dot-contentlet-thumbnail img');
                expect(image).toBeNull();
            });
        });

        describe('filled', () => {
            let element;

            beforeEach(async () => {
                element = await page.find('dot-contentlet-thumbnail');
                element.setProperty('contentlet', contentletMock);
                element.setProperty('height', '100px');
                element.setProperty('width', '100px');
                element.setProperty('alt', 'Alt test');
                element.setProperty('iconSize', '30px');
                await page.waitForChanges();
            });

            it('should show image', async () => {
                await page.waitForChanges();
                const image = await page.find('dot-contentlet-thumbnail img');

                expect(image.getAttribute('src')).toEqual(
                    '/contentAsset/image/c68db8ec-b523-41b7-82bd-fcb7533d3cfa/fileAsset/filter/Thumbnail/thumbnail_w/100px/thumbnail_h/100px/'
                );
                expect(image.getAttribute('alt')).toEqual('Alt test');
                expect(image.getAttribute('aria-label')).toEqual('Alt test');
            });

            it('should show dot-contentlet-icon', async () => {
                element.setProperty('contentlet', { ...contentletMock, hasTitleImage: 'false' });
                await page.waitForChanges();
                const icon = await page.find('dot-contentlet-icon');
                expect(await icon.getAttribute('icon')).toEqual(contentletMock.__icon__);
                expect(await icon.getAttribute('size')).toEqual('30px');
                expect(await icon.getAttribute('aria-label')).toEqual('Alt test');
            });
        });
    });
});
