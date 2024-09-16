import { Hono } from 'hono';
import { handle } from 'hono/aws-lambda';
import { renderTile, locationValues } from './cog';

export const app = new Hono();

app.get('/health', (c) => {
    return c.text('ok');
});

app.get('/values', async (c) => {
    const url = c.req.query('url') as string;
    const latitude = parseFloat(c.req.query('lat') as string);
    const longitude = parseFloat(c.req.query('lon') as string);

    if (!url || isNaN(latitude) || isNaN(longitude)) {
        return c.text('Invalid lat/lon', 400);
    }

    try {
        const values = await locationValues(url, { latitude, longitude });
        return c.json(values);
    } catch (e) {
        console.error(e);
        return c.text('Error rendering value', 400);
    }
});

app.get('/tiles/:z/:x/:y', async (c) => {
    const url = c.req.query('url') as string;
    const z = parseInt(c.req.param('z'));
    const x = parseInt(c.req.param('x'));
    const y = parseInt(c.req.param('y'));

    if (!url || isNaN(z) || isNaN(x) || isNaN(y)) {
        return c.text('Invalid tile', 400);
    }

    try {
        const tile = await renderTile(url, z, x, y);
        c.header('Content-Type', 'image/png');
        return c.body(tile);
    } catch (e) {
        console.error(e);
        return c.text('Error rendering tile', 400);
    }
});

export const handler = handle(app);
