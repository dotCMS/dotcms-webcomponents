import { addDecorator } from '@storybook/html';


const styles = 'padding: 2em'
const storyAsString = (story) => `<div style="${styles}">${story}</div>`;
const storyAsNode = (story) => {
    const wrapper = document.createElement('div');
    wrapper.style = styles;
    wrapper.appendChild(story);
    return wrapper;
};

addDecorator((story) => {
    const tale = story();
    return typeof tale === 'string' ? storyAsString(tale) : storyAsNode(tale);
});
