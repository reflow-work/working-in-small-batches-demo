import { db } from '../../db';
import { slackCredentialsTable } from '../../db/schema';

type SlackCredential = {
  id: number;
  token: string;
};

export async function getAccessToken(): Promise<SlackCredential> {
  const [result] = await db.select().from(slackCredentialsTable);

  return Promise.resolve({
    id: result.id,
    token: result.token,
  });
}

export async function postMessage(blocks: any[], token: string): Promise<void> {
  console.log('slack - postMessage', blocks, token);

  return Promise.resolve();
}
