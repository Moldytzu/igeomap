from gmalthgtparser import HgtParser

rezolutie = 0.001 # in productie seteaza la 0.001 (latura de 1000)
latura = int(1/rezolutie)
lista = []

print(f"{rezolutie=} {latura=}")

# de reamintit ca latitudinea e X si longitudinea e Y molozule

# wrapper pentru a prelua elevatia dintr un punct geografic
def getElevation(parser, long, lat):
    return parser.get_elevation((long, lat))[2]

fisier = "./dataset/N44E022.hgt"
with HgtParser(fisier) as parser:
    coord = fisier[10:][:7]
    lat = int(coord[4:])
    long = int(coord[1:][:2])
    for y in range(1, latura, 1):
        for x in range(1, latura, 1):
            lista.append((x  * rezolutie, y  * rezolutie, getElevation(parser, long + y * rezolutie, lat + x * rezolutie)))

print("gata")