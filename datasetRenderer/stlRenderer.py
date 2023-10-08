import vtkplotlib as vpl
from stl.mesh import Mesh
import gc, sys

def randeazaSTL(fisier):
    mesh = Mesh.from_file(fisier)
    vpl.mesh_plot(mesh, scalars=mesh.z)
    vpl.view(camera_direction=[0, 1, -1])
    vpl.zoom_to_contents(padding=-3)
    vpl.save_fig(fisier.replace(".stl","_render.png"),pixels=(4096,4096), off_screen=True, trim_pad_width=1)
    vpl.close()
    gc.collect()

randeazaSTL(sys.argv[1])