const credentials = require('./config.json'); // Google cloud credential file
const fs = require('fs')
const request = require('request')
const { google } = require('googleapis')

// get this token: user's google oauth token from frontend 
const ACCESS_TOKEN = 'ya29.a0Ael9sCPp3JxLQpA-7tzoNMS2jGMHbNhLQsoBEOjopjMeQoNdQH23mPqskuCv95YnBITAAhD9UYOSDPX8aloXfePO-jNz9QE42iVMKTxkwJz0zUOm6wywOr91EwqQSM_omTrK63ohKNmiRAO6Ol8wNK83cLOqPQaCgYKAbYSARMSFQF4udJh-BsBZIA6Usrm7g7e4dhGvQ0165'

module.exports = {
    downloadFromGoogle: (files) => {
        // Create a new OAuth2 client using the credentials
        const auth = new google.auth.OAuth2(
            credentials.web.client_id,
            credentials.web.client_secret
        );

        // Set the access token for the client
        auth.setCredentials({
            access_token: ACCESS_TOKEN // pass from frontend
        });



        files.forEach(file => {
            const fileId = file.id;
            const downloadPath = file.name;

            // Set the options for the request to download the file
            const options = {
                url: `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`,
                headers: {
                    Authorization: `Bearer ${auth.credentials.access_token}`
                }
            };

            // Send the request to download the file and save it to the specified path
            request(options)
                .on('error', function (err) {
                    console.error(err);
                })
                .pipe(fs.createWriteStream(downloadPath))
                .on('close', function () {
                    console.log(`File ${fileId} downloaded to ${downloadPath}`);
                });
        });
    }
}
