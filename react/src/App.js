import React from "react";
import GoogleDrivePicker from 'react-google-drive-picker';
import DropBoxPicker from 'react-dropbox-chooser';
import Download from './api'

const GOOGLE_CLIENT_ID = '<Google cloud project client ID>'
const GOOGLE_API_KEY = '<Google cloud project API Key>'
function App() {

  const [openPicker] = GoogleDrivePicker();

  const handleGoogleDrivePicker = () => {
    openPicker({
      clientId: GOOGLE_CLIENT_ID,
      developerKey: GOOGLE_API_KEY,
      viewId: "DOCS", // gets all type of files, we cannot fetch only audio, video and image files
      supportDrives: true,
      multiselect: true,
      callbackFunction: (data) => {
        if (data.action === 'cancel') {
          console.log('User clicked cancel/close button')
        }

        if (data.docs && data.action === 'picked') {
          console.log("*****Google drive data***** ", data.docs[0])
          data.service = 'google';
          // include the google oauth token in the payload - needed in backend to download the image
          Download(data);
        }

      },
    })
  }


  return (
    <div>
      <button onClick={() => handleGoogleDrivePicker()}>
        Import From GoogleDrive
      </button>
      <DropBoxPicker
        appKey='gghkc1xekvc7ic6'
        success={files => {
          console.log('*****Drop Box data***** ', files)
          files.service = 'dropbox'
          // include the dropbox access token in the payload, needed in backend to download the image
          Download(files)
        }}
        cancel={() => this.onCancel()}
        multiselect={true}
        // only provided extention files can be imported
        extensions={['.jpg, .jpeg']} >
        <button>Import from DropBox!</button>
      </DropBoxPicker>
    </div>
  )

}
export default App