# Watermark Plugin for Playbook.com

## Overview

The Watermark plugin for Playbook.com is designed to help designers easily add watermarks to their images with a single click. This tool ensures that your creative work is protected and properly credited, all without any hidden charges or the need for credits.

## Features

- **Easy to Use**: Add watermarks to images in one click.
- **Free of Charge**: No credits or hidden costs.
- **Supports Multiple Image Formats**: JPEG, PNG, WebP, and SVG.

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/watermark-plugin.git
    cd watermark-plugin
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory and add necessary environment variables:
    ```env
    # Example .env file content
    PORT=3000
    CALLBACK_URL=https://yourcallbackurl.com
    ```

4. Start the server:
    ```bash
    node index.js
    ```

## Usage

### API Endpoints

#### GET /playbookapi

This endpoint is used to verify the server is running.

- **Response**: 
  ```plaintext
  Hello World! Use POST to trigger the plugin in development.
  ```

#### POST /playbookapi

This endpoint processes the watermarking of images.

- **Request Body**:
  ```json
  {
    "pluginInvocationToken": "string",
    "operationName": "string",
    "callbackUrl": "string",
    "assets": [
      {
        "url": "string",
        "title": "string"
      }
    ]
  }
  ```

- **Response**: `200 OK` if the request is successfully received.

- **Process**:
  1. Extracts the image URL from the request.
  2. Downloads the image and converts it to PNG format if necessary.
  3. Applies a gray watermark to the image.
  4. Uploads the watermarked image to the specified callback URL.
  5. Sends a success status to the callback URL if the operation is successful, or a failure status if the image format is unsupported.

## Code Structure

- **index.js**: Main server file.
- **/playbook**: Contains the watermark logic and assets.
  - **gray.png**: The watermark image.
  - **index.js**: Contains the `Watermark` class for applying the watermark.

## Dependencies

- `dotenv`
- `express`
- `axios`
- `canvas`
- `sharp`
- `fs`
- `http`
- `https`
- `path`

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for review.

## Support

If you have any questions or issues, please open an issue in the GitHub repository.

---

Happy watermarking with the Watermark plugin for Playbook.com!