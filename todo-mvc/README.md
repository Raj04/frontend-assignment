# Todos

A simple, single-page todo list app built with plain HTML, CSS and JavaScript. No frameworks, no build step, no dependencies.

## Features

- **Add tasks** by typing in the input and pressing **Enter**, or by clicking anywhere outside the input while it contains text.
- **Complete tasks** by ticking the checkbox next to a task. Completed tasks are struck through and greyed out.
- **Delete tasks** with the *Delete* button that appears when you hover over a row.
- **Toggle all** with the chevron on the left of the input. The first click marks every task complete; the next click marks every task active again.
- **Filter tasks** with the *All*, *Active* and *Completed* buttons in the footer. The selected filter is highlighted.
- **Items left counter** in the footer shows how many tasks are still active.
- **Clear Completed** removes every completed task. The button is hidden when there are no completed tasks.
- The footer is hidden until the first task is added.

## Getting started

No installation is needed.

1. Clone or download this folder.
2. Open `index.html` in any modern browser.

Alternatively, serve the folder with any static server, for example:

```bash
npx serve .
```

## Project structure

```
todo-mvc/
├── index.html      # Markup: input, task list and footer
├── index.css       # Styles
├── index.js        # All application logic
├── REQUIREMENTS.md # Original assignment requirements
└── README.md
```

## How it works

- Tasks are kept in an in-memory array, `currentTasks`, where each task is an object of the form `{ id, task, completed }`. The `id` is generated with `crypto.randomUUID()`.
- `renderAll(tasks)` rebuilds the `<ul id="task-list">` from whatever array it is given. The filter buttons call it with a filtered subset, so the list shows only the matching tasks.
- `countIncompleteItems()` updates the "items left" text and the visibility of *Clear Completed*.
- Tasks are not saved anywhere. Reloading the page clears the list.

## Known limitations

- Tasks are not persisted. Refreshing the page removes them all.
- Adding a task re-renders the full list, so the active filter is not kept. The filter button stays highlighted, but all tasks are shown.
- *Toggle all* uses a single flag rather than the current state of the tasks, so it can get out of step if individual tasks are changed afterwards.
- Submitting an empty or whitespace-only task shows an alert.
- The `console.log` call on load in `index.js` is left in for debugging.

## Requirements

The app covers the requirements in [REQUIREMENTS.md](REQUIREMENTS.md):

1. An input field to enter a task.
2. Submitting with Enter or by clicking outside adds the task to the list, with a count of tasks left and a per-row delete action. Clicking a task's checkbox marks it complete.
3. Status filters for All, Active and Completed.
4. A Clear Completed action.
5. Clicking outside the input with text in it adds the task.
6. A complete-all action.
