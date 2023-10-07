from parser import *

def genereazaLinkImagineNASA(imagine):
    return f"https://e4ftl01.cr.usgs.gov//WORKING/BRWS/Browse.001/2014.11.20/{imagine}.SRTMGL1.2.jpg"

def genereazaJSON(fisier, index):
    output = "{"

    with HgtParser(fisier) as parser:
        # luam coordonatele geografice
        coord = fisier[10:][:7]
        lat = int(coord[4:])
        long = int(coord[1:][:2])

        # lat long alt
        coordMax = (-1,-1,-1)
        coordMin = (10000000000000000000,10000000000000000000,10000000000000000000)

        # cautam elevatia maxima, minima si calculam media
        for y in range(1, latura, 1):
            for x in range(1, latura, 1):
                elevatia = iaElevatie(parser, long + y * rezolutie, lat + x * rezolutie)
                if coordMax[2] < elevatia:
                    coordMax = (lat + x * rezolutie, long + y * rezolutie, elevatia)
                if coordMin[2] > elevatia:
                    coordMin = (lat + x * rezolutie, long + y * rezolutie, elevatia)

        altMed = (coordMax[2] + coordMin[2])/2

        print(f"{coordMin=} {coordMax=} {altMed=}")

        # coordonatele patrulaterului
        output += f"coord:["
        output += f"    [{long}, {lat}],"
        output += f"    [{long + 1}, {lat + 1}],"
        output += f"],"

        # text placeholder
        output += f"text: \"\","

        # altitudinea maxima si minima
        output += f"coordaltmax: [{coordMax[1], coordMax[0]}],"
        output += f"coordaltmin: [{coordMin[1], coordMin[0]}],"
        output += f"altmax: {coordMax[2]},"
        output += f"altmin: {coordMin[2]},"
        output += f"altmed: {altMed},"

        # imaginile
        output += f"image: \"{genereazaLinkImagineNASA(fisier[10:17])}\","
        output += f"imagehr: \"{genereazaLinkImagineNASA(fisier[10:17])}\"," # imagine de calitate mare

        # sol
        output += f"soilComp: [],"
        output += f"soilRes: [],"

        # indice
        output += f"granuleNumber: {index},"

    output += "}"

    return output

fisier = open("out.json","w+")

fisier.write("[")
i = 1
for n in range(44, 49, 1):
    for e in range(20, 30, 1):
        fisier.write(genereazaJSON(f"./dataset/N{n}E0{e}.hgt", i))
        fisier.write(",")
        i += 1
fisier.write("]")