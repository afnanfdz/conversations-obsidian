export interface ConversationsPluginSettings {
  speakers: SpeakerSettings[];
}

export interface SpeakerSettings {
  name: string;
  textColor: string;
}

export const DEFAULT_SETTINGS: ConversationsPluginSettings = {
  speakers: []
};

export const enum ModalMode {
  New,
  Edit
}