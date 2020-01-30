import readme from './readme.md';

export default {
    title: "Custom Fields",
    parameters: {
        notes: readme
    }
};

export const Checkbox = () =>
    `<dot-checkbox label="Label" options="Pizza|pizza,Burguer|burguer,Sushi|sushi" />`;
