from gmalthgtparser import HgtParser # bilioteca din pip a parserului hgt

# globale
rezolutie = 0.001 # in productie seteaza la 0.001 (latura de 1000)
latura = int(1/rezolutie)

print(f"parser: {rezolutie=} {latura=}")

# de reamintit ca latitudinea e X si longitudinea e Y

# wrapper pentru a prelua elevatia dintr un punct geografic
def iaElevatie(parser, long, lat):
    return parser.get_elevation((long, lat))[2]

# returneaza toate punctele din datele topografice
def iaPuncteHGT(fisier):
    puncte = []
    with HgtParser(fisier) as parser:
        # luam coordonatele geografice din numele fisierului
        coord = fisier[10:][:7]
        lat = int(coord[4:])
        long = int(coord[1:][:2])

        # le inseram in puncte de puncte
        for y in range(1, latura, 1):
            for x in range(1, latura, 1):
                puncte.append((x  * rezolutie, y  * rezolutie, iaElevatie(parser, long + y * rezolutie, lat + x * rezolutie)))

    print("parser: gata")

    return puncte


