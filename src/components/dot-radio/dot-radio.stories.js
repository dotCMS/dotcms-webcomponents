import readme from './readme.md';

export default {
    title: "Custom Fields",
    parameters: {
        notes: readme
    }
};

export const Radio = () =>
    `<dot-radio label="Label" options="Pizza|pizza,Burguer|burguer,Sushi|sushi" />`;
