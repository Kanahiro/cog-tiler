#! /usr/bin/env node

import { serve } from '@hono/node-server';
import { app } from './server';

serve(app);
