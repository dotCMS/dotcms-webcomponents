import readme from './readme.md';
import { text } from '@storybook/addon-knobs';
export default {
    title: 'Elements',
    parameters: {
        notes: readme
    }
};

export const MaterialIcon = () => {
    const props = [
        {
            name: 'name',
            content: text('Name', 'dotMaterialIcon')
        },
        {
            name: 'inputValue',
            content: text('InputValue', 'account_balance')
        }
    ];

    const dotMaterialIcon = document.createElement('dot-material-icon');

    props.forEach(({ name, content }) => {
        dotMaterialIcon[name] = content;
    });

    return dotMaterialIcon;
};
