const request = require('request');
const fs = require('fs');
const axios = require('axios')

// get the user's auth token from the dropbox autherization
const ACCESS_TOKEN = '<user dropbox auth token>';

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