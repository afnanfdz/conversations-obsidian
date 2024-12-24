import { App, Modal, Notice, Setting } from "obsidian";
import ConversationsPlugin from "./main";
import { ModalMode, SpeakerSettings } from "./types";
import { get_speaker_idx, speaker_exists } from "./util";

export default class SpeakerCreatorModal extends Modal {
    plugin: ConversationsPlugin;
    mode: ModalMode;
    entry_idx: number;
    entry_settings: SpeakerSettings; 

    /**
     * 
     * @param plugin The Conversations plugin.
     * @param mode The mode of the modification (New or Edit).
     * @param idx_name The original name of the entry to be edited. This name will be searched, and if used, is assumed to exist in `data.json`.
     */
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

    /**
     * The bulk of the settings tab that's rendered on-screen.
     */
    display(): void {
        let title;
        switch (this.mode) {
            case ModalMode.New:
                title = "Add a Speaker";
                break;
            case ModalMode.Edit:
                title = "Edit a Speaker";
                break;
        }

        this.setTitle(title);

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
                        if (speaker_exists(this.plugin.settings, this.entry_settings.name)) {
                            new Notice("ERROR: Name already exists");
                        } else {
                            this.finalize_entry();
                            this.close();
                        }
                    })
            );
    }

    /**
     * Registers the modification just before closing.
     */
    finalize_entry(): void {
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