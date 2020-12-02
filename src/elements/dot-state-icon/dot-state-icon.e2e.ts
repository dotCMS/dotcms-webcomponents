import { newE2EPage } from '@stencil/core/testing';

describe('dot-state-icon', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<dot-state-icon></dot-state-icon>');
    const element = await page.find('dot-state-icon');
    expect(element).toHaveClass('hydrated');
  });
});
