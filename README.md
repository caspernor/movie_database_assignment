# Movie Database Single Page Application

This project is a movie database web application built using HTML, CSS, and JavaScript. It fetches data from [The Movie Database (TMDb)](https://www.themoviedb.org) API to display information about currently playing, popular, top-rated, and upcoming movies.

## Setup Instructions
1. Clone the repository:
    ```bash
    git clone https://github.com/caspernor/movie_database_assignment.git
    cd movie_database_assignment
    ```

2. Get your own TMDb API key by signing up at [The Movie Database](https://www.themoviedb.org/signup).

3. Create a file named `config.js` inside the `assets/js/` directory and add the following content:
    ```javascript
    const API_KEY = 'your-tmdb-api-key-here';
    export default API_KEY;
    ```

4. Make sure the `config.js` file is not committed by adding it to your `.gitignore` file:
    ```
    assets/js/config.js
    ```

5. Host the application and navigate to your application's URL in the browser to see it live.

## Technologies Used
- HTML
- CSS
- JavaScript (ES6 Modules)
- [The Movie Database (TMDb) API](https://www.themoviedb.org/documentation/api)
