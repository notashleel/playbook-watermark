# Playbook API Plugin

This project is an Express.js-based web server that handles image processing requests, specifically applying a watermark to an image. The server receives requests with image assets, determines the dominant color of the image, decides on a suitable watermark (black or white), applies the watermark, and uploads the processed image back.

## Features

- Receives image assets via POST requests.
- Determines the dominant color of an image.
- Applies an appropriate watermark based on the image's dominant color.
- Uploads the watermarked image to a specified URL.

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/notashleel/playbook-watermark
    cd playbook-watermark
    ```

2. Install the dependencies:
    ```sh
    npm install
    ```

3. Run index.js:
    ```sh
    node index.js
    ```

## Usage

Start the server:
```sh
node index.js
```

The server will run on port 80 by default.

## Endpoints

### GET /playbookapi

- **Description:** Health check endpoint to ensure the server is running.
- **Response:** `Hello World! Use POST to trigger the plugin in development.`

### POST /playbookapi

- **Description:** Main endpoint to process images.
- **Request Body:**
  ```json
  {
    "pluginInvocationToken": "invocation-token",
    "operationName": "operation-name",
    "callbackUrl": "https://callback.url",
    "assets": [
      {
        "url": "https://image.url",
        "title": "Image Title"
      }
    ]
  }
  ```

- **Response:** Status 200 on success.

## How It Works

1. **Receive Request:** The server receives a POST request with image asset details.
2. **Get Dominant Color:** The dominant color of the image is determined.
3. **Determine Watermark:** Based on the dominant color, a suitable watermark (black or white) is chosen.
4. **Apply Watermark:** The watermark is applied to the image using the `Watermark` class in `watermark.js`.
5. **Upload Image:** The processed image is uploaded to the provided callback URL.

## Files

### index.js

Main server file that sets up the Express app and handles image processing.

### watermark.js

Contains the `Watermark` class responsible for applying the watermark to the image.

## Dependencies

- `dotenv`: For environment variable management.
- `fs`: For file system operations.
- `axios`: For HTTP requests.
- `canvas`: For image processing.
- `express`: For setting up the web server.
- `path`: For handling file paths.
- `sharp`: For image conversion and manipulation.
- `colorthief`: For extracting dominant colors from images.
- `node-fetch`: For fetching images from URLs.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## Contact

For questions or feedback, please contact [aumanshk@gmail.com](mailto:aumanshk@gmail.com).