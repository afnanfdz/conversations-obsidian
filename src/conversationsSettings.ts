import ConversationsPlugin from "./main";
import { App, ButtonComponent, Modal, PluginSettingTab, Setting } from "obsidian";
import SpeakerCreatorModal from "./SpeakerCreatorModal";
import { ModalMode } from "./types";
import { get_speaker_idx } from "./util";

export class ConversationsSettingsTab extends PluginSettingTab {
  plugin: ConversationsPlugin;

  constructor(plugin: ConversationsPlugin) {
      super(plugin.app, plugin);
      this.plugin = plugin;

      addEventListener("SpeakerSettingsModified", async (_e: CustomEvent) => {
        await this.plugin.saveSettings();
        this.display();
      });
  }

  display(): void {
      let { containerEl } = this;
      populate_settings(containerEl, this.plugin);
  }
}

function populate_settings(container_element: HTMLElement, plugin: ConversationsPlugin): void {
    container_element.empty();

    plugin.settings.speakers.forEach((speaker) => {
      new Setting(container_element)
        .setName(speaker.name)
        .setDesc("todo")
        .addExtraButton(
          bt => {
            bt
              .setIcon('pencil')
              .onClick(async () => {
                new SpeakerCreatorModal(plugin, ModalMode.Edit, speaker.name).open();
              })
          }
        )
        .addExtraButton(
          bt => {
            bt
              .setIcon('trash')
              .onClick(async () => {
                delete_speaker(plugin, speaker.name);
              })
          }
        )
    });

    new Setting(container_element)
      .setName("Button")
      .setDesc("Add a speaker")
      .addButton(cb => {
        cb
          .setIcon("plus")
          .onClick(async () => {
            new SpeakerCreatorModal(plugin, ModalMode.New).open();
          })
      });
}

function delete_speaker(plugin: ConversationsPlugin, name: string) {
  const idx = get_speaker_idx(plugin.settings, name);
  plugin.settings.speakers.splice(idx, 1);
  dispatchEvent(new CustomEvent("SpeakerSettingsModified"));
}