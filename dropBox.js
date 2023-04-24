const request = require('request');
const fs = require('fs');
const axios = require('axios')

// get the user's auth token from the dropbox autherization
const ACCESS_TOKEN = 'sl.BdEOW8fjC8cT0Oom2X1UP0gVOA5PrjWP_CAJh3pxRlrKBGPPfzm1uMRVnQkmo5pwD3O0JSBqZiZdS0T7zwa4_3j1u0vLib5t9gAEuzK_hTbmn7D0HUuhv1uRmvuAvCIHLq-D3Rg';

const DOWNLOAD_OPTIONS = {
    url: `https://content.dropboxapi.com/2/files/download`,
    method: 'POST'
}
module.exports = {
    downloadFromDropBox: (docs) => {
        docs.forEach(doc => {
            DOWNLOAD_OPTIONS.headers = {
                Authorization: `Bearer ${ACCESS_TOKEN}`,
                'Dropbox-API-Arg':
                    JSON.stringify({
                        "path": doc.id
                    })
            }

            request(DOWNLOAD_OPTIONS)
                .on('error', (err) => {
                    console.error(err);
                })
                .pipe(fs.createWriteStream(doc.name))
                .on('close', () => {
                    console.log('Image downloaded successfully!');
                });
        });
    }
}