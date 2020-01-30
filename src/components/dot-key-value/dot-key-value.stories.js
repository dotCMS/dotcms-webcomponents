import readme from './readme.md';

export default {
    title: "Custom Fields",
    parameters: {
        notes: readme
    }
};

export const KeyValue = () => `<dot-key-value label="Label" />`;
