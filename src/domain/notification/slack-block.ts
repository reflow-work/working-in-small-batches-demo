export function text_section(text: string) {
  return {
    type: 'section',
    text: {
      type: 'mrkdwn',
      text,
    },
  };
}

export function link_section(text: string, url: string) {
  return {
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: `<${url}|${text}>`,
    },
  };
}

export function divider() {
  return {
    type: 'divider',
  };
}
