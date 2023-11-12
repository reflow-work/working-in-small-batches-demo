type GoogleChatCard = {
  cardId: string;
  card: {
    sections: any[];
  };
};

export function toGoogleChatCard(
  cardId: string,
  blocks: any[]
): GoogleChatCard {
  const sections = blocks
    .map((block) => {
      switch (block.type) {
        case 'text':
          return textWidget(block.text);
        case 'link':
          return textWidget(block.text);
        case 'divider':
          return null;
      }
    })
    .filter((value) => value != null);

  return {
    cardId: cardId,
    card: { sections },
  };
}

function textWidget(text: string) {
  return {
    textParagraph: { text },
  };
}
