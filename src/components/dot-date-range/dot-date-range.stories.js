import readme from './readme.md';

export default {
    title: 'Custom Fields',
    parameters: {
        notes: readme
    }
};

export const DateRange = () => `<dot-date-range label="Date Range" />`;
