from plot import * # biblioteca noastra magica
import numpy as np
import cv2
from surf2stl import surf2stl

fisier = genereazaHeatMapDin("./dataset/N47E023.hgt")

heatmap = cv2.imread(fisier, 0) # citim poza
xx, yy = np.mgrid[0:heatmap.shape[0], 0:heatmap.shape[1]] # generam indicii
fisier = fisier.replace("png", "stl") # inlocuim extensia cu stl
surf2stl.write(fisier, xx, yy, heatmap * 0.5) # si, la final, generam fisierul stl
