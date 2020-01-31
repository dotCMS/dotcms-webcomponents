import { withKnobs, text, boolean } from '@storybook/addon-knobs';

import readme from './readme.md';

export default {
    title: "Custom Fields",
    decorators: [withKnobs],
    parameters: {
        notes: readme
    }
};

export const Checkbox = () => {
    const props = [
        {
            name: 'name',
            content: text('Name', 'field-name')
        },
        {
            name: 'label',
            content: text('Label', 'Label')
        },
        {
            name: 'hint',
            content: text('Hint', 'Hello Im a hint')
        },
        {
            name: 'options',
            content: text('Options', 'Pizza|pizza,Burguer|burguer,Sushi|sushi')
        },
        {
            name: 'required',
            content: boolean('Required', false)
        },
        {
            name: 'disabled',
            content: boolean('Disabled', false)
        },
        {
            name: 'requiredMessage',
            content: text('Required Message', '')
        },
        {
            name: 'value',
            content: text('Value', '')
        }
    ];

    const checkbox = document.createElement('dot-checkbox');

    props.forEach(({ name, content }) => {
        checkbox[name] = content;
    });

    return checkbox;
};
