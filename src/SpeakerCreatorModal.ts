import { App, Modal, Notice, Setting } from "obsidian";
import ConversationsPlugin from "./main";
import { ModalMode, SpeakerSettings } from "./types";
import { get_speaker_idx } from "./util";

export default class SpeakerCreatorModal extends Modal {
    plugin: ConversationsPlugin;
    mode: ModalMode;
    entry_idx: number;
    entry_settings: SpeakerSettings;

    constructor(plugin: ConversationsPlugin, mode: ModalMode, idx_name?: string) {
        super(plugin.app);
        this.plugin = plugin;
        this.mode = mode;

        switch (mode) {
            case ModalMode.New:
                this.entry_settings = {
                    name: "",
                    textColor: ""
                }
                break;
            case ModalMode.Edit:
                this.entry_idx = get_speaker_idx(plugin.settings, idx_name ? idx_name : "");
                const speaker: SpeakerSettings = plugin.settings.speakers[this.entry_idx];
                this.entry_settings = {
                    name: speaker.name,
                    textColor: speaker.textColor
                }
                break;
        }

        this.display();
    }

    display() {
        this.setTitle("Add a Speaker");

        new Setting(this.contentEl)
            .setName('Name')
            .addText((text) =>
                text
                    .setValue(this.entry_settings.name)
                    .onChange((value) => {
                        this.entry_settings.name = value;
                    })
            );

        new Setting(this.contentEl)
            .setName('textColor')
            .addText((text) => 
                text
                    .setPlaceholder("#FFFFFF")
                    .setValue(this.entry_settings.textColor)
                    .onChange((value) => {
                        this.entry_settings.textColor = value;
                    })
            );
        

        // Button to finalize entry addition / modification 
        new Setting(this.contentEl)
            .addButton((btn) =>
                btn
                    .setButtonText("Submit")
                    .setCta()
                    .onClick(() => {
                        this.finalize_entry();
                        this.close();
                    })
            );
    }

    finalize_entry() {
        switch (this.mode) {
            case ModalMode.New:
                this.plugin.settings.speakers.push(this.entry_settings);
                break;
            case ModalMode.Edit:
                this.plugin.settings.speakers[this.entry_idx] = this.entry_settings;
                break;
        }

        dispatchEvent(new CustomEvent("SpeakerSettingsModified"));
    }
}