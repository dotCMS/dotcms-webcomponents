import { newE2EPage } from '@stencil/core/testing';

describe('dot-card-contentlet', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<dot-card-contentlet></dot-card-contentlet>');
    const element = await page.find('dot-card-contentlet');
    expect(element).toHaveClass('hydrated');
  });{cursor}
});
