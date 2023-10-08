import vtkplotlib as vpl
from stl.mesh import Mesh
import sys

def randeazaSTL(fisier):
    mesh = Mesh.from_file(fisier) # citeste stl-ul intr-un mesh
    vpl.mesh_plot(mesh, scalars=mesh.z) # foloseste indicele de adancime pentru scalarii culorii
    vpl.view(camera_direction=[0, 1, -1]) # muta camera intr-o pozitie favorabila
    vpl.zoom_to_contents(padding=-3) # pune zoom
    vpl.save_fig(fisier.replace(".stl","_render.png"),pixels=(4096,4096), off_screen=True, trim_pad_width=1) # salveaza figura intr-un png mare

randeazaSTL(sys.argv[1]) # randeaza din primul argument al script-ului