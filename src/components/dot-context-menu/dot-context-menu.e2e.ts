import { newE2EPage } from '@stencil/core/testing';

describe('dot-context-menu', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<dot-context-menu></dot-context-menu>');
    const element = await page.find('dot-context-menu');
    expect(element).toHaveClass('hydrated');
  });{cursor}
});
