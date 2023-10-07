import vtkplotlib as vpl
from stl.mesh import Mesh

mesh = Mesh.from_file("./render/N47E023.stl")
vpl.mesh_plot(mesh, scalars=mesh.z)
vpl.view(camera_direction=[0, 1, -1])
vpl.zoom_to_contents(padding=-3)
vpl.save_fig("test.png",pixels=(4096,4096), off_screen=True, trim_pad_width=1)