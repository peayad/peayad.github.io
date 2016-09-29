
import os

for x in range(1,7):
    for y in range(1,7):
        for z in range(1,7):
            filename = "L" + str(x) + "_H" + str(y) + "_V" + str(z)
            os.system("ctmconv C:\\Users\\ptr\\Assignments\\whiteRoom\\deployment\\peayad.github.io\\3js\\04d\\stl\\" + filename + ".stl" + " C:\\Users\\ptr\\Assignments\\whiteRoom\\deployment\\peayad.github.io\\3js\\04d\\ctm\\" + filename + ".ctm --method MG2 --level 9")
            print(x,y,z)
