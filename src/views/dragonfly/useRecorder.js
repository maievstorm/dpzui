import { ContactSupportOutlined } from "@material-ui/icons";
import { useEffect, useState } from "react";
import axios from "axios";

const useRecorder = () => {
  const [audioURL, setAudioURL] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [recorder, setRecorder] = useState(null);
  const [songdata, setSongdata] = useState(null);
  

  useEffect(() => {
    // Lazily obtain recorder first time we're recording.
    if (recorder === null) {
      if (isRecording) {
        requestRecorder().then(setRecorder, console.error);
      }
      return;
    }

    // Manage recorder state.
    if (isRecording) {
      recorder.start();
    } else {
      recorder.stop();
    }

    // Obtain the audio when ready.
    const handleData = e => {
      
      console.log(e.data)
      setSongdata(e.data);
      const audioChunks = [];
      audioChunks.push(e.data);
      const mimeType = 'audio/mp3';
      const filesong = new Blob(audioChunks, { 
        'type': mimeType 
      });
      console.log(filesong);
      setAudioURL(URL.createObjectURL(filesong));
      var formFile = new FormData();
      formFile.append("file", filesong);
      

      const routeUpload = 'https://dragonfly.apps.xplat.fis.com.vn/upload_image/?is_save=1&fast_check=1';

      axios.post(routeUpload, formFile,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(res => {
          console.log(res.data.results)
        })
        .catch((err) => {
          console.log(err);
        })

     
       
    };

    recorder.addEventListener("dataavailable", handleData);
    return () => recorder.removeEventListener("dataavailable", handleData);
  }, [recorder, isRecording]);

  const startRecording = () => {
    setIsRecording(true);
  };

  const stopRecording = () => {
    setIsRecording(false);
    console.log(songdata)
  };

  return [songdata,audioURL, isRecording, startRecording, stopRecording];
};

async function requestRecorder() {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  return new MediaRecorder(stream);
}
export default useRecorder;