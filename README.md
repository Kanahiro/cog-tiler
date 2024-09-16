# Higuruma - COG Tiler on Hono

## motivation

- [geomatico/maplibre-cog-protocol](https://github.com/geomatico/maplibre-cog-protocol) is amazing work to consume COG on browser, maximize performance of geotiff.js and provides utilities to colorize raster data.
- It is nice the process to load COG and tiling them on server in terms of utilize shared cache.

## usage

```sh
npm install
MODE=nodejs npm run dev # run server on node server
```

### AWS Lambda

```sh
npm install
npm run deploy # needs credentials
```

## endpoints

- `/tile/{z}/{x}/{y}?url=https://path/to/cog.tif`: content-type is `image/png`
- `/values?url=https://path/to/cog.tif&lat=35.681236&lon=139.767125`: return pixel value at the given lat/lon

## acknowledgements

- This codes includes many codes from [geomatico/maplibre-cog-protocol](https://github.com/geomatico/maplibre-cog-protocol) and modified to fit on Node.js.
