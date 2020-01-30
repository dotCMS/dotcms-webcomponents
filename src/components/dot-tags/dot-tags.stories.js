import readme from './readme.md';

export default {
    title: "Custom Fields",
    parameters: {
        notes: readme
    }
};

export const Tags = () => {
    const tags = document.createElement('dot-tags');
    tags.data = async () => {
        return fetch('https://tarekraafat.github.io/autoComplete.js/demo/db/generic.json')
            .then((data) => data.json())
            .then((items) => items.map(({ food }) => food));
    };
    return tags;
};
