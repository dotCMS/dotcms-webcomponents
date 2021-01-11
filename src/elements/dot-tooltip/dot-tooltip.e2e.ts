import { newE2EPage } from '@stencil/core/testing';

fdescribe('dot-tooltip', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<dot-tooltip></dot-tooltip>');
    const element = await page.find('dot-tooltip');
    expect(element).toHaveClass('hydrated');
  });
});
