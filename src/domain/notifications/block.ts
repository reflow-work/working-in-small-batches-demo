export function text(text: string) {
  return {
    type: 'text',
    text: text,
  };
}

export function link(text: string, url: string) {
  return {
    type: 'link',
    text: text,
    url: url,
  };
}

export function divider() {
  return { type: 'divider' };
}

export function image(text: string, imageUrl: string) {
  return {
    type: 'image',
    text: text,
    imageUrl: imageUrl,
  };
}
