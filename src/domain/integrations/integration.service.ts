import { db } from '../../db';
import {
  googleChatCredentialsTable,
  slackCredentialsTable,
} from '../../db/schema';

type Integration = {
  provider: string;
};

export async function listIntegrations(): Promise<Integration[]> {
  const slackResultsPromise = db.select().from(slackCredentialsTable);
  const googleChatResultsPromise = db.select().from(googleChatCredentialsTable);

  return await Promise.all([
    slackResultsPromise,
    googleChatResultsPromise,
  ]).then(([slackResults, googleChatResults]) => {
    const integrations: Integration[] = [];

    if (slackResults.length == 1) {
      integrations.push({ provider: 'slack' });
    }

    if (googleChatResults.length == 1) {
      integrations.push({ provider: 'googleChat' });
    }

    return integrations;
  });
}
