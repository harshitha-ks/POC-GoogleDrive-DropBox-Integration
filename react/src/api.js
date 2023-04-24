
import axios from 'axios';

async function Download(files) {
    // let { name, id, url, mimeType, sizeBytes} = { ...download}
    console.log(files)
    axios({

        // Endpoint to send files
        url: "http://localhost:8000/download",
        method: "POST",
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        },

        // Attaching the form data
        data: files
    });
}
export default Download