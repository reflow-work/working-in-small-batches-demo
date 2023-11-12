import { SlackCredentials } from '../integrations/integration.service';
import { NotificationService } from './notification.service';
import { toSlackBlocks } from './slack-block';

export const slackService: NotificationService = {
  notify: async (blocks: any[], credentials: SlackCredentials) => {
    const slackBlocks = toSlackBlocks(blocks);

    console.log('slack - notify', slackBlocks, credentials);

    return Promise.resolve();
  },
};
