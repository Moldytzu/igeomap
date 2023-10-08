# din ceva motive, vtkplotlib nu are functii de curatare
# si asta inseamna ca avem memory leakuri
# asadar si prin urmare automam procesul folosind subprocess
# yaay
import subprocess

for n in range(44, 49, 1):
    for e in range(20, 30, 1):
       subprocess.run(["python3","stlRenderer.py",f"C:/Users/tuddo/space-apps/datasetRenderer/render/N{n}E0{e}_3dless_com_simplified.stl"]) # din criza de timp (3 ore dureaza generarea stl-urilor), a trebuit ca noi sa reducem numarul vertex-urilor folosind un program online
