import { configure, addDecorator } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
const { withPropsTable } = require('storybook-addon-react-docgen');



const req = require.context('../packages', true, /\.stories\.tsx$/);
function loadStories() {
    addDecorator(withKnobs);
    addDecorator(withPropsTable);
    req.keys().forEach((filename) => req(filename));
}

configure(loadStories, module);
