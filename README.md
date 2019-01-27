# Currency Converter

## Usage

### Local

To setup first run, run `npm install`. Then `npm run start` to start application on localhost.
This app run on port `3000`.

### Docker

This application can run inside a docker container.

From the root folder run `docker build -t currency-converter .` to build the image.
Then execute it with `docker run -p 3000:3000 -d currency-converter`.

The app will be available on port `3000`.

## Development

### Prerequisities

- NodeJS >= 7

### Style guide & type checking

Style guide is an extension of [AirBnb Base](https://airbnb.io/projects/javascript/) with some extension plugin, as you can see in `eslintrc.js` file.

Project supports [Prettier](https://github.com/prettier/prettier) to enable automatic linting on file save.

Type checking is provided by TypeScript type checking.

### Testing

For integration tests see `src/__tests__` folder, while unit tests are spread inside `src` with `.test.js` suffix.

To execute tests via CLI, run `npm run test`. To execute style guide and type checking run `npm run lint`
