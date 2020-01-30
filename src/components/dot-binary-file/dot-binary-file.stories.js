import readme from './readme.md';

export default {
    title: "Custom Fields",
    parameters: {
        notes: readme
    }
};

export const BinaryFile = () => `<dot-binary-file label="Label" />`;
