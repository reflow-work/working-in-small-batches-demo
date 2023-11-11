export function textWidget(text: string) {
  return {
    textParagraph: { text },
  };
}

export function imageWidget(imageUrl: string) {
  return {
    image: { imageUrl },
  };
}
