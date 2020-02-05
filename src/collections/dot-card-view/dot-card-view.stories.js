import { withKnobs, array } from '@storybook/addon-knobs';

import readme from './readme.md';
export default {
    title: 'Collections',
    decorators: [withKnobs],
    parameters: {
        notes: readme
    }
};
export const CardView = () => {
    const props = [
        {
            name: 'items',
            content: array('Items', [
                {
                    title: 'Hola Mundo'
                },
                {
                    title: 'Hello World'
                },
                {
                    title: 'File name'
                },
                {
                    title: 'Hola Mundo'
                },
                {
                    title: 'Hello World'
                },
                {
                    title: 'File name'
                },
                {
                    title: 'Hola Mundo'
                },
                {
                    title: 'Hello World'
                },
                {
                    title: 'File name'
                },
                {
                    title: 'Hola Mundo'
                },
                {
                    title: 'Hello World'
                },
                {
                    title: 'File name'
                }
            ])
        }
    ];

    const cardView = document.createElement('dot-card-view');
    props.forEach(({ name, content }) => {
        cardView[name] = content;
    });

    return cardView;
};
