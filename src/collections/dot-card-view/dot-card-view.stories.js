import readme from './readme.md';
export default {
    title: 'Collections',
    parameters: {
        notes: readme
    }
};
export const CardView = () => {
    const cardView = document.createElement('dot-card-view');
    cardView.items = [
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
    ]

    return cardView;
};
