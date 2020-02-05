import { withKnobs, object } from '@storybook/addon-knobs';
import { withActions } from '@storybook/addon-actions';

import readme from './readme.md';
export default {
    title: 'Components/Card',
    decorators: [withKnobs, withActions('selected')],
    parameters: {
        notes: readme
    }
};
export const Contentlet = () => {
    const props = [
        {
            name: 'contentlet',
            content: object('Contentlet', {
                title: 'Hola Mundo'
            })
        }
    ];

    const cardContentlet = document.createElement('dot-card-contentlet');
    props.forEach(({ name, content }) => {
        cardContentlet[name] = content;
    });

    return cardContentlet;
};
