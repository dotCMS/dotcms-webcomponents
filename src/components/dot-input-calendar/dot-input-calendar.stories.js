import readme from './readme.md';

export default {
    title: 'Custom Fields',
    parameters: {
        notes: readme
    }
};

export const InputCalendar = () => `<dot-input-calendar type="time" />`;
