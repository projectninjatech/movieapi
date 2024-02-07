# MovieAPI

## Description
This Node.js app serves as a movie API using TMDB (The Movie Database) as a data source. It provides endpoints to access movie information and media files stored locally.

## Getting Started
Follow these steps to set up and run the app on your local machine:

### Prerequisites
- Node.js installed on your system

### Installation
1. Clone this repository to your local machine.
2. Navigate to the project directory in your terminal.

### Configuration
1. Create a `.env` file in the root directory of the project.
2. Add the following environment variables to the `.env` file:
   ```plaintext
   TMDB_AUTH_KEY = "YOUR TMDB AUTH KEY"
   SERVER_IP = "YOUR SERVER IP"
   HTTP_SERVER_MEDIA_DIR = "YOUR MEDIA SERVER DIRECTORY e.g. C:/Users/imran/Downloads/Video"
   HTTP_SERVER_ADDR = "YOUR HTTP SERVER ADDRESS e.g. http://192.168.0.148:8080"
   MOVIE_DIR = "YOUR MOVIE DIRECTORY e.g. C:/Users/imran/Downloads/Video/movies (dir name should be movies)"
   SHOWS_DIR = "YOUR SHOWS DIRECTORY e.g. C:/Users/imran/Downloads/Video/shows (dir name should be shows)"

### Start the App
1. Install dependencies by running:
npm install
2. Start the Node.js server by running:
node app.js and npm run dev (if running locally which will create http-server)