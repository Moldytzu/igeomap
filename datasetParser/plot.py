import matplotlib.pyplot as plt
import numpy as np
import itertools
from matplotlib  import cm
from mpl_toolkits.mplot3d import Axes3D

from matplotlib import cm
from matplotlib.ticker import LinearLocator

from parser import * # bibliotea noastra magica
 
# Using zip function and Unpacking the values
x, y, z = zip(*lista)

plt.axis("off")
plt.margins(x=0, y=0, tight=True)
plt.scatter(x, y, s=15,c=z, marker = ',', cmap = cm.gist_gray)
plt.savefig("test.png", dpi=1000, bbox_inches='tight', pad_inches = 0)
plt.show()