import { Plugin } from 'obsidian';
import { ConversationsPluginSettings, DEFAULT_SETTINGS } from  './types'
import { ConversationsPostProcessor } from './conversationsPostProcessor';
import { ConversationsSettingsTab } from './conversationsSettings';


export default class ConversationsPlugin extends Plugin {
  settings: ConversationsPluginSettings;

  async onload() {
    await this.loadSettings();
    this.addSettingTab(new ConversationsSettingsTab(this));
    this.registerMarkdownPostProcessor(ConversationsPostProcessor);
  }

  async onunload() {}

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }

  async onExternalSettingsChange() {
    this.registerMarkdownPostProcessor(ConversationsPostProcessor);
  }
}