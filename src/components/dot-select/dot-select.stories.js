import readme from './readme.md';

export default {
    title: "Custom Fields",
    parameters: {
        notes: readme
    }
};

export const Select = () =>
    `<dot-select label="Label" options="Pizza|pizza,Burguer|burguer,Sushi|sushi" />`;
