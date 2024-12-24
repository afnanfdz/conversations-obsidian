import { Plugin } from 'obsidian';
import { ConversationsPostProcessor } from 'src/conversationsPostProcessor';
import { ConversationsSettingsTab } from './conversationsSettings';

interface ConversationsPluginSettings {
  dateFormat: string;
}

const DEFAULT_SETTINGS: ConversationsPluginSettings = {
  dateFormat: "dd-mm-yyyy"
};

export default class ConversationsPlugin extends Plugin {
  settings: ConversationsPluginSettings;

  async onload() {
    await this.loadSettings();
    this.addSettingTab(new ConversationsSettingsTab(this.app, this));
    this.registerMarkdownPostProcessor(ConversationsPostProcessor);
  }

  async onunload() {}

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }
}