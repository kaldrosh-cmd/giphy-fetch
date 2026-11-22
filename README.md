# GIPHY Fetch

This app shows a random cat GIF and lets you search for other GIFs.

## How to run

1. Get a key from the [GIPHY Developer Dashboard](https://developers.giphy.com/dashboard/).
2. Copy `config.example.js` to `config.js`.

   ```js
   export const GIPHY_API_KEY = "your-key-here";
   ```

3. Open `index.html` with Live Server in VS Code. The modules won't load from `file://`.

## Design decisions

I use `limit=10` because ten GIFs are enough to pick from. I pick one at random for variety. I keep your search in the box so you can use it again or edit it.

I use `encodeURIComponent` to send the whole search. Without it, `cats&rating=r` treats `rating=r` as a setting, `cats & dogs` loses `dogs`, and `c# memes` becomes just `c`.

If nothing matches, the app shows `No GIFs found for "..."`. Other errors show `Something went wrong`. I log the HTTP status if GIPHY returns an error, or the network error if the browser can't connect.

Git ignores `config.js`, so my key stays off GitHub. You can still see it in the browser. A server could keep a key private by calling the API and sending back only the results. GIPHY requires searches to come from the browser.
