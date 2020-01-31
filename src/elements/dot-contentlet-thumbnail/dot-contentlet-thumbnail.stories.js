import readme from './readme.md';

export default {
    title: 'Elements',
    parameters: {
        notes: readme
    }
};

export const ContentletThumbnail = () =>
    `<dot-contentlet-thumbnail />`;
