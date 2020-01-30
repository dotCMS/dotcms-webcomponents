import readme from './readme.md';

export default {
    title: "Custom Fields",
    parameters: {
        notes: readme
    }
};

export const MultiSelect = () =>
    `<dot-multi-select label="Label" options="Pizza|pizza,Burguer|burguer,Sushi|sushi" />`;
