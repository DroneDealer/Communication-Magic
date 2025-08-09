# install: pip install aiortc opencv-python flask flask-sock

import cv2
import asyncio
from aiortc import RTCPeerConnection, VideoStreamTrack
from aiortc.contrib.media import MediaBlackhole
from flask import Flask, render_template, request, jsonify

app = Flask(__name__)
pcs = set()

class OpenCVVideoStream(VideoStreamTrack):
    def __init__(self):
        super().__init__()
        self.cap = cv2.VideoCapture(0)

    async def recv(self):
        frame_time = await self.next_timestamp()
        ret, frame = self.cap.read()
        if not ret:
            return
        # Convert OpenCV BGR → RGB for WebRTC
        frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        from av import VideoFrame
        video_frame = VideoFrame.from_ndarray(frame, format="rgb24")
        video_frame.pts = frame_time
        return video_frame
    
@app.route("/")  
def home():
    return render_template("home.html") 

@app.route("/offer", methods=["POST"])
async def offer():
    params = request.get_json()
    pc = RTCPeerConnection()
    pcs.add(pc)

    pc.addTrack(OpenCVVideoStream())

    await pc.setRemoteDescription(params["sdp"])
    answer = await pc.createAnswer()
    await pc.setLocalDescription(answer)

    return jsonify({"sdp": pc.localDescription.sdp, "type": pc.localDescription.type})

if __name__ == "__main__":
    app.run(port=5000)
