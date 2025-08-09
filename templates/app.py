from flask import Flask, render_template, Response
import cv2
#lowk just following a tutorial + praying 

app = Flask(__name__)
camera = cv2.VideoCapture(0)
def gen_frames():  
    while True:
        success, frame = camera.read()  # read the camera frame
        if not success:
            break
        else:
            ret, buffer = cv2.imencode('.jpg', frame) #saves it to a buffer so encodes it w/out writing to disk. Stores it in stream and then sends.
            frame = buffer.tobytes()
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')  
            
@app.route('/video_feed')
def video_feed():
    return Response(gen_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route("/")
def home():
    return render_template('home.html')

if __name__ == "__main__":
    app.run(debug=True)