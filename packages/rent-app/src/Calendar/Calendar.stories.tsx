import React, { Fragment } from 'react';
import { storiesOf } from '@storybook/react';
import { momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import Calendar from './Calendar';
import { date, number, text } from '@storybook/addon-knobs';

storiesOf('Calendar', module)
    .addParameters({ jest: ['Calendar'] })
    .add('Static calendar', () => {
        const eventsList = [
            {
                id: 0,
                title: 'All Day Event very long title',
                allDay: true,
                start: new Date(2019, 9, 1),
                end: new Date(2019, 9, 2),
            },
            {
                id: 1,
                title: 'Long Event',
                start: new Date(2019, 9, 7),
                end: new Date(2019, 9, 10),
            },
            {
                id: 2,
                title: 'Right now Time Event',
                start: new Date(),
                end: new Date(),
            },
        ];

        return <Calendar events={eventsList} defaultDate={moment().toDate()} localizer={momentLocalizer(moment)} />;
    })
    .add('Dynamic calendar', () => {
        const numberOfEvents = number('Amount of events', 0, {}, 'settings');
        const event = '';
        const arr = Array(numberOfEvents).fill(event);

        const knobsList = arr.map((a, i) => (
            <div key={i}>
                {text(`Event title`, 'Title', `event-${i + 1}`)}
                {date(`Event start date`, new Date(), `event-${i + 1}`)}
                {date(`Event end date`, new Date(), `event-${i + 1}`)}
            </div>
        ));

        const eventsList = [];
        knobsList.map(({ props: { children } }, i) =>
            eventsList.push({
                id: i,
                title: children[0],
                start: new Date(children[1]),
                end: new Date(children[2]),
            }),
        );

        return (
            <Fragment>
                <Calendar events={eventsList} defaultDate={moment().toDate()} localizer={momentLocalizer(moment)} />
            </Fragment>
        );
    });
