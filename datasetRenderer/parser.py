from gmalthgtparser import HgtParser

# globale
rezolutie = 0.001 # in productie seteaza la 0.001 (latura de 1000)
latura = int(1/rezolutie)

print(f"parser: {rezolutie=} {latura=}")

# de reamintit ca latitudinea e X si longitudinea e Y

# wrapper pentru a prelua elevatia dintr un punct geografic
def iaElevatie(parser, long, lat):
    return parser.get_elevation((long, lat))[2]

def iaPuncteHGT(fisier):
    lista = []
    with HgtParser(fisier) as parser:
        # luam coordonatele geografice
        coord = fisier[10:][:7]
        lat = int(coord[4:])
        long = int(coord[1:][:2])

        # lat long alt
        coordMax = (-1,-1,-1)
        coordMin = (10000000000000000000,10000000000000000000,10000000000000000000)

        # le inseram in lista de puncte
        for y in range(1, latura, 1):
            for x in range(1, latura, 1):
                elevatia = iaElevatie(parser, long + y * rezolutie, lat + x * rezolutie)
                if coordMax[2] < elevatia:
                    coordMax = (lat + x * rezolutie, long + y * rezolutie, elevatia)
                if coordMin[2] > elevatia:
                    coordMin = (lat + x * rezolutie, long + y * rezolutie, elevatia)
                lista.append((x  * rezolutie, y  * rezolutie, elevatia))

        altMed = (coordMax[2] + coordMin[2])/2

        print(f"{coordMin=} {coordMax=} {altMed=}")

    print("parser: gata")

    return lista


