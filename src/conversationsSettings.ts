import ConversationsPlugin from "./main";
import { App, PluginSettingTab, Setting } from "obsidian";

export class ConversationsSettingsTab extends PluginSettingTab {
    plugin: ConversationsPlugin;

    constructor(app: App, plugin: ConversationsPlugin) {
        super(app, plugin);
        this.plugin = plugin;
    }

    display(): void {
        let { containerEl } = this;
        populate_settings(containerEl, this.plugin);
    }
}

function populate_settings(container_element: HTMLElement, plugin: ConversationsPlugin): void {
    container_element.empty();

    new Setting(container_element)
      .setName('Date format')
      .setDesc('Default date format')
      .addText((text) =>
        text
          .setPlaceholder('MMMM dd, yyyy')
          .setValue(plugin.settings.dateFormat)
          .onChange(async (value) => {
            plugin.settings.dateFormat = value;
            await plugin.saveSettings();
          })
      );
}