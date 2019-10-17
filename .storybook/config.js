import { configure, addDecorator } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
const { withPropsTable } = require('storybook-addon-react-docgen');

import results from '../.jest-test-results.json';
import { withTests } from '@storybook/addon-jest';

const req = require.context('../packages', true, /\.stories\.tsx$/);
function loadStories() {
    addDecorator(withKnobs);
    addDecorator(withPropsTable);
    addDecorator(withTests({ results }));

    req.keys().forEach((filename) => req(filename));
}

configure(loadStories, module);
