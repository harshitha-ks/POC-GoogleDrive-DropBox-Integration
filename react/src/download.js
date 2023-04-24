

import axios from "axios"

async function Download(data) {
    const ACCESS_TOKEN = 'ya29.a0Ael9sCPARbDVRTGMiOxf8Lr9RFO6c2gJGL6O5T23z3Bsxr2SCUvZEcR4pr-wXSqhLrM-j7juf9PSgFIuY7Mqr12Kc50PhgMu7I3s9kgdF_Bg8KqN6gd9FJvYv0giUGoZ6AHAx5qjXcV4U7m5bo5ka9rLZqFxLAaCgYKATASARMSFQF4udJhrPT3FcOSOaMgxuFrOZDeLQ0165'

    const url = `https://www.googleapis.com/drive/v3/files?fileId=${data.id}&fields=files(id,name,webContentLink)`
    // `https://drive.google.com/u/1/uc?id=${req.body.id}&export=download`;
    // `https://www.googleapis.com/drive/v3/files/${req.body.id}?alt=media`;
    // `https://www.googleapis.com/drive/v3/files?q=${req.body.id}&fields=files(id,name)`
    axios.get(url, {
        headers: {
            Authorization:
                "Bearer " + ACCESS_TOKEN,

        },
    }).then((response) => {
        console.log(response.data)
        let docs = response.data.files;
        let aa = docs.find((doc) => doc.id === data.id);
        console.log(aa.webContentLink);
        const imageUrl = aa.webContentLink;
        const link = document.createElement('a');
        link.href = imageUrl;
        link.download = data.name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
}

export default Download