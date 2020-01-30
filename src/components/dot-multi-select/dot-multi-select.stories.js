import readme from './readme.md';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';

export default {
    title: "Custom Fields",
    decorators: [withKnobs],
    parameters: {
        notes: readme
    }
};

export const MultiSelect = () => {
    const props = [
        {
            name: 'value',
            content: text('Value', '')
        },
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
            name: 'requiredMessage',
            content: text('Required Message', '')
        },
        {
            name: 'disabled',
            content: boolean('Disabled', false)
        },
        {
            name: 'size',
            content: text('Size', '')
        }
    ];

    const datetime = document.createElement('dot-multi-select');

    props.forEach(({ name, content }) => {
        datetime[name] = content;
    });

    return datetime;
};
