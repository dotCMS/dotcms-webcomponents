import readme from './readme.md';
import { withKnobs, text, } from '@storybook/addon-knobs';

export default {
    title: 'Custom Fields',
    decorators: [withKnobs],
    parameters: {
        notes: readme
    }
};

export const ErrorMessage = () => `<dot-error-message>${text('Content', 'Hola')}</dot-error-message>`;
