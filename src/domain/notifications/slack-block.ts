export function toSlackBlocks(blocks: any[]): any[] {
  return blocks.map((block) => {
    switch (block.type) {
      case 'text':
        return text_section(block.text);
      case 'link':
        return link_section(block.text, block.url);
      case 'divider':
        return divider();
    }
  });
}

function text_section(text: string) {
  return {
    type: 'section',
    text: {
      type: 'mrkdwn',
      text,
    },
  };
}

function link_section(text: string, url: string) {
  return {
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: `<${url}|${text}>`,
    },
  };
}

function divider() {
  return {
    type: 'divider',
  };
}
