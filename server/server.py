from transformers import pipeline
from PIL import Image
import requests
from flask import Flask
from flask import request
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)

checkpoint = "openai/clip-vit-large-patch14"
classifier = pipeline(task="zero-shot-image-classification", model=checkpoint)

# url = "https://t4.ftcdn.net/jpg/01/01/57/15/360_F_101571591_06UDBxpsfOLocCdhn6tHAyOQgmS4P3GG.jpg"
# image = Image.open(requests.get(url, stream=True).raw)
# predictions = classifier(image, candidate_labels=["knife", "screwdriver", "scalpel", "wrench", "hammer"])


@app.route("/")
async def index():
    return "Hello Server!"

@app.route("/predict", methods=["POST", "GET"])
async def predict():
    jsonData = request.get_json()
    #data = json.loads(jsonData)
    prediction = classifier(jsonData["image"], candidate_labels=jsonData["candidateLables"])
    print(prediction)
    return prediction

app.run(port=8000)