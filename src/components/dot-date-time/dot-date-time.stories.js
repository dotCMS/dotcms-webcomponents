import readme from './readme.md';

export default {
    title: 'Custom Fields',
    parameters: {
        notes: readme
    }
};

export const DateTime = () => `<dot-date-time label="Date Time"  />`;

