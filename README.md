# Higuruma - COG Tiler on Hono

- Hono -> Hi(火🔥)
- COG -> gear -> Haguruma(歯車⚙️)

## motivation

- [geomatico/maplibre-cog-protocol](https://github.com/geomatico/maplibre-cog-protocol) is amazing work to consume COG on browser, maximizing performance of geotiff.js and provides utilities to colorize raster data.
- It is also good the process to load COG and tiling them on server in terms of utilize shared cache.

## usage

### As Package

```sh
npm install -g higuruma
higuruma # run server on nodejs, http://localhost:3000/health
```

### As Library

```sh
npm install higuruma
```

```typescript
import { renderTile, locationValues } from 'higuruma/dist/index.esm.js'; // ES Module
// const { renderTile, locationValues } = require('higuruma/dist/index.cjs.js'); // CommonJS

const tile = await renderTile('https://path/to/cog.tif', z, x, y); // ArrayBuffer of PNG
const values = await locationValues('https://path/to/cog.tif', {latitude, longitude}); // pixel values

```

### AWS Lambda

```sh
npm install
npm run deploy # needs credentials
```

## endpoints

- `/tile/{z}/{x}/{y}?url=https://path/to/cog.tif`: content-type is `image/png`
- `/values?url=https://path/to/cog.tif&lat=35.681236&lon=139.767125`: return pixel value at the given lat/lon

> inspired by [developmentseed/titiler](https://github.com/developmentseed/titiler)

## acknowledgements

- This codes includes many codes derived from [geomatico/maplibre-cog-protocol](https://github.com/geomatico/maplibre-cog-protocol), modified to fit on Node.js.
