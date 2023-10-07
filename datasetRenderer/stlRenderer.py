import numpy
import vtkplotlib as vpl
from stl.mesh import Mesh

path = "./render/N47E023.stl"
mesh = Mesh.from_file(path)
vpl.mesh_plot(mesh)
vpl.view(camera_direction=[0, 2, -1]) # muta camera la un unghi potrivit
vpl.save_fig("test.png",pixels=4000)
vpl.show()