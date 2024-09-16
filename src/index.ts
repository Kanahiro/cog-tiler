export { renderTile, locationValues } from './cog/index.js';

// for AWS Lambda
import { handle } from 'hono/aws-lambda';
import { app } from './server.js';
export const handler = handle(app);
