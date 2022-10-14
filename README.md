# logseq-plugin-task-management-shortcuts

[![Github All Releases](https://img.shields.io/github/downloads/vipzhicheng/logseq-plugin-task-management-shortcuts/total.svg)](https://github.com/vipzhicheng/logseq-plugin-task-management-shortcuts/releases)

Add shortcuts for Logseq task management, mainly borrowed from [Heading Level Shortcuts](https://github.com/vipzhicheng/logseq-plugin-heading-level-shortcuts)

![Screencast](./screencast.gif)

## Installation

### Preparation

* Click the 3 dots in the righthand corner and go to `Settings`.
* Got to advanced and enable Developer mode.
* Restart the app.
* Click 3 dots and go to `Plugins`.

### Install plugins from Marketplace (recommended)

* Click `Marketplace` button and then click `Plugins`.
* Find the plugin and click `Install`.

### Install plugins manually

* Download released version assets from Github.
* Unzip it.
* Click `Load unpacked plugin`, and select destination directory to the unziped folder.

## Default shortcuts

* `ctrl+1`: Change to `TODO` task.
* `ctrl+2`: Change to `DOING` task.
* `ctrl+3`: Change to `DONE` task.
* `ctrl+4`: Change to `LATER` task.
* `ctrl+5`: Change to `NOW` task.
* `ctrl+6`: Change to `WAITING` task.
* `ctrl+7`: Change to `CANCELLED` task.
* `ctrl+0`: Change to non-task.

## Customization

You may want to change to binding order, remap actions or shortcuts. You can do this by manually editing plugin config file which is JSON format, and you can find it on Plugin page, locate it on the gear dropdown menu.

The default config seems like below.

```json
{
  "disabled": false,
  "keyBindings": {
    "0": "ctrl+0",
    "1": "ctrl+1",
    "2": "ctrl+2",
    "3": "ctrl+3",
    "4": "ctrl+4",
    "5": "ctrl+5",
    "6": "ctrl+6"
    "7": "ctrl+7"
  },
  "tasks": [
    "TODO",
    "DOING",
    "DONE",
    "LATER",
    "NOW",
    "WAITING",
    "CANCELLED"
  ],
  "settingsVersion": "v1"
}
```

You can adjust the tasks order, add new statuses which supported by Logseq, change key bindings there, and don't forget to save your changes. Note: the key `0` always means remove task tag. so 1~6 in `keyBindings` map to `tasks` array orderly.

Here is an example, not suggestion.

```json
{
  "disabled": false,
  "keyBindings": {
    "0": "a a",
    "1": "a s",
    "2": "a d",
    "3": "a f",
    "4": "a w",
    "5": "a e",
    "6": "a r"
  },
  "tasks": [
    "LATER",
    "NOW",
    "WAITING"
    "TODO",
    "DOING",
    "DONE",
  ],
  "settingsVersion": "v1"
}
```

## Licence
MIT
