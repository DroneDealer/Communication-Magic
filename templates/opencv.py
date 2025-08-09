import numpy as np
import math
import cv2 as cv
# Open the default camera
cam = cv.VideoCapture(0)

# Get the default frame width and height
frame_width = int(cam.get(cv.CAP_PROP_FRAME_WIDTH))
frame_height = int(cam.get(cv.CAP_PROP_FRAME_HEIGHT))

# Define the codec and create VideoWriter object
fourcc = cv.VideoWriter_fourcc(*'mp4v')
out = cv.VideoWriter('output.mp4', fourcc, 20.0, (frame_width, frame_height))

import torch
import torch.nn as nn
import torch.optim as optim
from torchvision import datasets, transforms, models
from torch.utils.data import DataLoader, random_split
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(
        mean=[0.485, 0.456, 0.406],  # Imagenet means
        std=[0.229, 0.224, 0.225]    # Imagenet stds
    ),
])

model = models.resnet18(pretrained=False)
model.load_state_dict('handclassifier.pth')     
num_features = model.fc.in_features
model.fc = nn.Sequential(
    nn.Linear(num_features, 1),
    nn.Sigmoid()
)


while True:
    ret, frame = cam.read()

    # Write the frame to the output file
    # out.write(gray_image)

    # # Display the captured frame
    cv.imshow('Camera', frame)

    # Press 'q' to exit the loop
    if cv.waitKey(1) == ord('q'):
        break

# Release the capture and writer objects
cam.release()
out.release()
cv.destroyAllWindows()