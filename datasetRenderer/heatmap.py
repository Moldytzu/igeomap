import matplotlib.pyplot as plt
from matplotlib import cm

from parser import *  # wrapper al parserului

def genereazaHeatMapDin(fisier):
    puncte = iaPuncteHGT(fisier)

    iesire = fisier.replace('hgt', 'png')

    # despartim valorile din puncte
    x, y, z = zip(*puncte)

    # scoatem marginile albe
    plt.axis("off")
    plt.margins(x=0, y=0, tight=True)

    # punem punctele pe imagine
    plt.scatter(x, y, s=15, c=z, marker=',', cmap=cm.gist_gray)

    print("plot: gata scatter")

    iesire = iesire.replace("dataset", "render") # schimbam folderul de iesire

    # salvam figura
    plt.savefig(iesire, dpi=250, bbox_inches='tight', pad_inches=0)

    print("plot: gata save")

    return iesire
