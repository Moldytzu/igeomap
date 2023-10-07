import matplotlib.pyplot as plt
from matplotlib  import cm

from parser import * # bibliotea noastra magica
 
# Using zip function and Unpacking the values
x, y, z = zip(*lista)

# scoatem marginile albe
plt.axis("off")
plt.margins(x=0, y=0, tight=True)

# punem punctele pe imagine
plt.scatter(x, y, s=15,c=z, marker = ',', cmap = cm.gist_gray)

print("plot: gata scatter")

# salvam figura
plt.savefig("test.png", dpi=1000, bbox_inches='tight', pad_inches = 0)

print("plot: gata save")