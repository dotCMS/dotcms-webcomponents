import { withKnobs, object } from '@storybook/addon-knobs';
import readme from './readme.md';

export default {
    title: 'Elements/Contentlet State Icon',
    decorators: [withKnobs],
    parameters: {
        notes: readme
    }
};

export const Draft = () => {
    const props = [
        {
            name: 'contentlet',
            content: object('Contentlet', {
                live: 'false',
                working: 'true',
                deleted: 'false'
            })
        }
    ];

    const contentletStateIcon = document.createElement('dot-contentlet-state-icon');

    props.forEach(({ name, content }) => {
        contentletStateIcon[name] = content;
    });

    return contentletStateIcon;
};

export const Archived = () => {
    const props = [
        {
            name: 'contentlet',
            content: object('Contentlet', {
                live: 'false',
                working: 'true',
                deleted: 'true'
            })
        }
    ];

    const contentletStateIcon = document.createElement('dot-contentlet-state-icon');

    props.forEach(({ name, content }) => {
        contentletStateIcon[name] = content;
    });

    return contentletStateIcon;
};

export const Drafted = () => {
    const props = [
        {
            name: 'contentlet',
            content: object('Contentlet', {
                live: 'true',
                working: 'true',
                deleted: 'false'
            })
        }
    ];

    const contentletStateIcon = document.createElement('dot-contentlet-state-icon');

    props.forEach(({ name, content }) => {
        contentletStateIcon[name] = content;
    });

    return contentletStateIcon;
};

export const Published = () => {
    const props = [
        {
            name: 'contentlet',
            content: object('Contentlet', {
                live: 'true',
                working: 'false',
                deleted: 'false'
            })
        }
    ];

    const contentletStateIcon = document.createElement('dot-contentlet-state-icon');

    props.forEach(({ name, content }) => {
        contentletStateIcon[name] = content;
    });

    return contentletStateIcon;
};

