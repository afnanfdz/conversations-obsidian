import { ConversationsPluginSettings, SpeakerSettings } from "./types";

export function get_speaker_idx(settings: ConversationsPluginSettings, name: string): number {
    return settings.speakers.findIndex((speaker: SpeakerSettings) => speaker.name === name);
}

export function speaker_exists(settings: ConversationsPluginSettings, name: string) {
    return get_speaker_idx(settings, name) != -1;
}