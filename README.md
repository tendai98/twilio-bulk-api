# Twilio Bulk Phone Number API

The Twilio Bulk Phone Number API is a service that allows you to purchase and release phone numbers in bulk. This API simplifies the process of managing phone numbers, making it convenient for various applications and services. It is built on the Twilio platform for communication and utilizes a secure authentication mechanism for authorized access.

## Table of Contents

- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [Authentication](#authentication)
- [Configuration](#configuration)
- [Error Handling](#error-handling)
- [Usage](#usage)

## Getting Started

To use the Twilio Bulk Phone Number API, follow these steps:

1. Clone the repository:

   ```
   git clone https://github.com/tendai98/twilio-bulk-api.git
   ```

2. Navigate to the project directory:

   ```
   cd twilio-bulk-api
   ```

3. Install the required dependencies:

   ```
   npm install
   ```

4. Start the server:

   ```
   npm start
   ```

   The server will run on the default port 5000, or you can specify a different port using the `PORT` environment variable.

## API Endpoints

The API provides the following endpoints for managing phone numbers in bulk:

- `/config`: Configure the API credentials.
- `/bn`: Buy phone numbers in bulk.
- `/ln`: List available phone numbers.
- `/rn`: Release phone numbers.
- `/auth`: Authenticate system users.

## Authentication

The API uses a simple token-based authentication mechanism to ensure that only authorized users can access its features. To use the API, you need to provide a token in your requests, which is validated against the predefined `TOKEN` value in the API.

## Configuration

Before using the API, you must configure your Twilio account credentials. This step is essential for the proper functioning of the Twilio Bulk Phone Number API. Use the `/config` endpoint to set up your credentials by providing the `accountSID` and `authToken` as query parameters.

## Error Handling

The API provides error handling for various scenarios. If an error occurs, it will respond with an error message and a corresponding error code. The error codes are as follows:

- `0`: Access Granted
- `1`: Access Denied
- `2`: Not Authorized
- `-1`: Error has occurred

## Usage

### Buying Phone Numbers

To buy phone numbers in bulk, make a GET request to the `/bn` endpoint. You should provide the following parameters:

- `areaCode`: The area code for the desired phone numbers.
- `quantity`: The number of phone numbers to purchase.
- `areaId`: An identifier for the area.
- `token`: Your authentication token.

### Listing Phone Numbers

To list available phone numbers, make a GET request to the `/ln` endpoint. You should provide your authentication token as the `token` parameter.

### Releasing Phone Numbers

To release phone numbers, make a GET request to the `/rn` endpoint. You should provide the following parameters:

- `sid`: The identifier of the phone number you want to release.
- `token`: Your authentication token.

### Authenticating System Users

To authenticate system users, make a GET request to the `/auth` endpoint. You should provide the following parameters:

- `userId`: The user's ID.
- `password`: The user's password.
