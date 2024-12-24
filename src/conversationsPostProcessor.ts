import { MarkdownPostProcessor, MarkdownPostProcessorContext } from "obsidian";

export const ConversationsPostProcessor: MarkdownPostProcessor = (element: HTMLElement, context: MarkdownPostProcessorContext) => {
  // ^(V:)\s.*((\n.+)*) you'll need this!
  const div_conversation = element.createDiv({
    cls: "conversationBox"
  });

  const div_dialog: HTMLElement = element.createDiv({
    attr: {
      "style": "color:blue"
    }
  });
  div_dialog.appendChild(element.find('p'));

  const div_speaker: HTMLElement = element.createDiv();
  const speaker_text: HTMLElement = div_speaker.createEl('p', {
    text: "Azalea"
  })
  const speaker_icon: HTMLElement = div_speaker.createEl('img', {
    attr: {"src": "blob:https://github.com/7d9b5279-d9ee-4cd4-9efa-baa8db1b90dcg"}
  })
  div_speaker.appendChild(speaker_icon);
  div_speaker.appendChild(speaker_text);
  
  div_conversation.appendChild(div_speaker);
  div_conversation.appendChild(div_dialog);

  element.replaceWith(div_conversation);
  }