import { E2EPage, newE2EPage } from '@stencil/core/testing';
import { DotContentState } from 'dotcms-models';

const state: DotContentState = {
    live: 'false',
    working: 'true',
    deleted: 'true',
    hasLiveVersion: 'false'
};

describe('dot-state-icon', () => {
    let page: E2EPage;
    let element;

    beforeEach(async () => {
        page = await newE2EPage({
            html: `<dot-state-icon></dot-state-icon>`
        });
        await page.waitForChanges();
    });

    it('should set archived attributes', async () => {
        element = await page.find('dot-state-icon');
        element.setProperty('state', state);
        element.setProperty('size', '14px');

        await page.waitForChanges();
        console.log('beto', element.outerHTML);


        const tooltip = await page.find('span');
        const icon = await page.find('dot-state-icon div');
        console.log('icon', icon);
        console.log('tooltip', tooltip);

        element = await page.find('dot-state-icon');
        // console.log('beto', element.outerHTML);
        await page.waitForChanges();


        console.log('icon', icon);
        // const tooltip = await page.find('dot-state-icon >>> dot-tooltip');

        // expect(icon.getAttribute('style')).toEqual({ '--size': '14px' });
        // expect(icon.getAttribute('class')).toEqual('archived');
        // expect(tooltip.getAttribute('content')).toEqual('Archived');
    });
});
