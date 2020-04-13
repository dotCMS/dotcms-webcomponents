import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import readme from './readme.md';

export default {
    title: 'Content Types Fields',
    decorators: [withKnobs],
    parameters: {
        notes: readme
    }
};

export const DopZone = () => {
    const props = [
        {
            name: 'Text',
            content: text('Value', '')
        }
    ];

    const dropZone = document.createElement('dot-drop-zone');

    props.forEach(({ name, content }) => {
        dropZone[name] = content;
    });

    return dropZone;
};
