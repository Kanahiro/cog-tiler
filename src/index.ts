export { renderTile, locationValues } from './cog';

// for AWS Lambda
import { handle } from 'hono/aws-lambda';
import { app } from './server';
export const handler = handle(app);
