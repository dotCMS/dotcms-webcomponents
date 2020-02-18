import { newE2EPage } from '@stencil/core/testing';

describe('dot-contentlet-state-icon', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<dot-contentlet-state-icon></dot-contentlet-state-icon>');
    const element = await page.find('dot-contentlet-state-icon');
    expect(element).toHaveClass('hydrated');
  });{cursor}
});
