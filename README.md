# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

-   [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

Run with "npm run dev" dfkljgh

# Features:

## Calendar Functionality

-   Calendar has arrows at the top to scroll through the months
-   Clicking 'Change View' switches between a weekly view and month view
-   Menu button opens a menu that allows the user to customize holiday prefrences, search for holidays, and toggle dark mode
-   Today's date is emphasized with a shadow
-   Clicking the month at the top returns you to the current month

## Holidays

-   Clicking on a holiday opens two links, a link that gives information about the holiday and its history and a link to an American Greetings card/product that is applicable to that holiday
-   Hovering over federal holidays displays information about that holiday in a pop up view window

## Events

-   Events can be added to a day by clicking on add event icon in the bottom right of each day
-   A name, description, location, start time, end time, color and recurrence options can be given to each event
-   To edit or delete an existing event, click on the event itself and change any information about the event or click delete
-   To clear the events, go to the menu and click delete all events

## Day View

-   Clicking on the top portion of a day (the portion right above the holiday where there is a blank space and then a number) opens the day view for that day
-   In this view, the user can scroll through through there day and view all existing events laid out in an hour by hour view
-   Events can still be editied from this view by clicking on them
-   In this view, if the event is long enough the description and location of the event as while as the end time can be seen, unlike in the month view

## Shortcuts

-   'Tab + t' returns to todays date
-   'Tab + m' opens the menu
-   'Tab + v' changes the view between month view and week view
-   'Tab + h' toggles the holidays on and off
-   'Tab + d' toggles dark mode on and off
-   'Tab + >' goes to the next month
-   'Tab + <' goes to the previous month
