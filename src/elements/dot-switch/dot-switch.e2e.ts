import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';
import { DotSwitchOption } from '../../models/dot-switch-option';

const optionsMock: DotSwitchOption[] = [
    {
        label: 'Code',
        icon: 'code'
    },
    {
        label: 'Backup',
        icon: 'backup',
        disabled: true
    },
    {
        label: 'Help',
        icon: 'help'
    }
];

describe('dot-switch', () => {
    let page: E2EPage;
    let dotSwitch: E2EElement;

    beforeEach(async () => {
        page = await newE2EPage({
            html: `<dot-switch></dot-switch>`
        });
        dotSwitch = await page.find('dot-switch');
        dotSwitch.setProperty('options', optionsMock);
        dotSwitch.setProperty('value', 'Code');
        await page.waitForChanges();
    });

    describe('@Elements', () => {
        it('should have mwc-icon-button elements', async () => {
            const buttons: E2EElement[] = await page.findAll('dot-switch >>> mwc-icon-button');
            expect(buttons.length).toEqual(3);
        });

        it('should set mwc-icon-button attributes', async () => {
            const buttons: E2EElement[] = await page.findAll('dot-switch >>> mwc-icon-button');
            expect(await buttons[1].getProperty('icon')).toEqual('backup');
            expect(await buttons[1].getProperty('label')).toEqual('Backup');
            expect(await buttons[1].getProperty('disabled')).toEqual(true);
        });

        it('should set active class if match value  mwc-icon-button attributes', async () => {
            const button: E2EElement = await page.find('dot-switch >>> mwc-icon-button');
            expect(button.classList.contains('active')).toBe(true);
        });
    });

    describe('@Events', () => {
        let buttons: E2EElement[];
        let event;
        beforeEach(async () => {
            buttons = await page.findAll('dot-switch >>> mwc-icon-button');
            event = await page.spyOnEvent('selected');
        });

        it('should not emit selected when disable', async () => {
            buttons[1].click();
            await page.waitForChanges();
            expect(event).not.toHaveReceivedEvent();
        });

        it('should emit selected option and set value', async () => {
            buttons[2].click();
            await page.waitForChanges();
            expect(event).toHaveReceivedEventDetail(optionsMock[2]);
            expect(await dotSwitch.getProperty('value')).toEqual(optionsMock[2].label);
        });
    });
});
