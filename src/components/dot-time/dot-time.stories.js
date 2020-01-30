import readme from './readme.md';

export default {
    title: 'Custom Fields',
    parameters: {
        notes: readme
    }
};

export const Time = () => `<dot-time label="Time"  />`;

