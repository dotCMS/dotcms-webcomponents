import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import readme from './readme.md';

export default {
    title: 'Elements',
    decorators: [withKnobs],
    parameters: {
        notes: readme
    }
};

export const dotFileIcon = () => {
    const props = [
        {
            name: 'icon',
            content: text('Icon', '')
        },
    ];

    const fileIcon = document.createElement('dot-file-icon');

    props.forEach(({ name, content }) => {
        fileIcon[name] = content;
    });

    return fileIcon;
};
