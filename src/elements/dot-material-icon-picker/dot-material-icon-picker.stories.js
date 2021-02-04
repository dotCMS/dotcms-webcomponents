import readme from './readme.md';
import { text } from '@storybook/addon-knobs';
export default {
    title: 'Elements',
    parameters: {
        notes: readme
    }
};

export const MaterialIconPicker = () => {
    const props = [
        {
            name: 'name',
            content: text('Name', 'dotMaterialIconPicker')
        },
        {
            name: 'inputValue',
            content: text('InputValue', 'account_balance')
        }
    ];

    const dotMaterialIconPicker = document.createElement('dot-material-icon-picker');

    props.forEach(({ name, content }) => {
        dotMaterialIconPicker[name] = content;
    });

    return dotMaterialIconPicker;
};
