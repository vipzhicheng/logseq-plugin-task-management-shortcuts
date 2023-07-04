import '@logseq/libs';

const settingsVersion = 'v2';
export const defaultSettings = {
  keyBindings: {
    1: 'ctrl+1',
    2: 'ctrl+2',
    3: 'ctrl+3',
    4: 'ctrl+4',
    5: 'ctrl+5',
    6: 'ctrl+6',
    7: 'ctrl+7',
    0: 'ctrl+0',
  },
  tasks: ['TODO', 'DOING', 'DONE', 'LATER', 'NOW', 'WAITING', 'CANCELLED'],
  settingsVersion,
  disabled: false,
};

export type DefaultSettingsType = typeof defaultSettings;

const initSettings = () => {
  let settings = logseq.settings;

  const shouldUpdateSettings =
    !settings || settings.settingsVersion != defaultSettings.settingsVersion;

  if (shouldUpdateSettings) {
    settings = defaultSettings;
    logseq.updateSettings(settings);
  }
};

const getSettings = (
  key: string | undefined,
  defaultValue: any = undefined
) => {
  let settings = logseq.settings;
  const merged = Object.assign(defaultSettings, settings);
  return key ? (merged[key] ? merged[key] : defaultValue) : merged;
};

async function main() {
  // settings
  initSettings();

  const keyBindings = getSettings('keyBindings', {});
  const tasks = getSettings('tasks', []);

  async function setTask(taskBindedId: number) {
    if (tasks.length < taskBindedId) {
      return;
    }

    const selected = await logseq.Editor.getSelectedBlocks();
    if (selected && selected?.length > 1) {
      for (let block of selected) {
        if (block?.uuid) {
          const regx = new RegExp(`^(${tasks.join('|')}) `, 'gm');
          let content = regx.test(block.content)
            ? block.content.replace(regx, '').trimStart()
            : block.content;
          if (taskBindedId > 0) {
            await logseq.Editor.updateBlock(
              block.uuid,
              tasks[taskBindedId - 1] + ' ' + content
            );
          } else {
            await logseq.Editor.updateBlock(block.uuid, content);
          }
        }
      }
    } else {
      const block = await logseq.Editor.getCurrentBlock();
      if (block?.uuid) {
        const regx = new RegExp(`^(${tasks.join('|')}) `, 'gm');
        let content = regx.test(block.content)
          ? block.content.replace(regx, '').trimStart()
          : block.content;
        if (taskBindedId > 0) {
          await logseq.Editor.updateBlock(
            block.uuid,
            tasks[taskBindedId - 1] + ' ' + content
          );
        } else {
          await logseq.Editor.updateBlock(block.uuid, content);
        }
      }
    }
  }

  for (let taskBindedId of [...new Array(tasks.length + 1).keys()]) {
    logseq.App.registerCommandPalette(
      {
        key: `task-management-shortcuts-task-${taskBindedId}`,
        label: `Set block to task ${taskBindedId}`,
        keybinding: {
          mode: 'global',
          binding: keyBindings[taskBindedId] || 'ctrl+' + taskBindedId,
        },
      },
      async () => {
        await setTask(taskBindedId);
      }
    );
  }
}

logseq.ready(main).catch(console.error);
