import { E2EPage, newE2EPage } from '@stencil/core/testing';
import { legacyIconMap } from '../../utils/legacy-icons-map';

describe('dot-contentlet-icon', () => {
    let page: E2EPage;

    beforeEach(async () => {
        page = await newE2EPage({
            html: `<dot-contentlet-icon></dot-contentlet-icon>`
        });
    });

    describe('@Elements', () => {
        describe('empty', () => {
            it('should have material design web component', async () => {
                const materialIcon = await page.find('dot-contentlet-icon >>> mwc-icon');
                expect(materialIcon).not.toBeNull();
                // expect(materialIcon.getAttribute('style')).toBe({ '--mdc-icon-size': '' });
                expect(materialIcon.innerText).toBe(legacyIconMap['ukn']);

                // console.log('materialIcon.outerHTML', materialIcon.outerHTML);
                console.log('materialIcon.getProperty', await materialIcon.getProperty('style'));
                //expect(materialIcon).toEqualAttribute('style', null);
            });
        });

        describe('filled', () => {
            beforeEach(async () => {
                const element = await page.find('dot-contentlet-icon');
                element.setProperty('icon', 'asfIcon');
                element.setProperty('size', '30px');
                await page.waitForChanges();
            });

            it('should set icon type and size', async () => {
                const materialIcon = await page.find('dot-contentlet-icon >>> mwc-icon');
                console.log('materialIcon.getProperty', await materialIcon.getProperty('style'));
                console.log('materialIcon.outerHTML', materialIcon.outerHTML);
                console.log('materialIcon.getAttribute', materialIcon.getAttribute('style'));
                // expect(materialIcon.getAttribute('style')).toBe({ '--mdc-icon-size': '30px' });
                expect(materialIcon.innerText).toBe(legacyIconMap['asf']);
            });
        });
    });
});
