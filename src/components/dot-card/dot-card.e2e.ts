import { newE2EPage } from '@stencil/core/testing';

describe('dot-card', () => {
    it('renders', async () => {
        const page = await newE2EPage();

        await page.setContent('<dot-card></dot-card>');
        const element = await page.find('dot-card');
        expect(element).toHaveClass('hydrated');
    });
});
