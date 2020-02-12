import readme from "./readme.md";
import {text} from "@storybook/addon-knobs";


export default {
    title: 'Elements',
    parameters: {
        notes: readme
    }
};

const optionsMock  = [
    {
        label: 'Code',
        icon: 'code',
    },

    {
        label: 'Backup',
        icon: 'backup',
        disabled: true
    },
    {
        label: 'Help',
        icon: 'help',
    },

]


export const dotSwitch = () => {

    const props = [
        {
            name: 'value',
            content: text('Selected', 'code')
        }
    ];


    const dotSwitch = document.createElement('dot-switch');

    dotSwitch.options = optionsMock;

    props.forEach(({ name, content }) => {
        dotSwitch[name] = content;
    });

    return dotSwitch;

}
