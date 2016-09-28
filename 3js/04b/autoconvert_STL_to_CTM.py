
import os

for x in range(1,7):
    for y in range(1,7):
        for z in range(1,7):
            filename = "R" + str(x) + "_H" + str(y) + "_O" + str(z)
            os.system("ctmconv C:\\Users\\ptr\\Assignments\\whiteRoom\\deployment\\peayad.github.io\\3js\\04b\\stl\\" + filename + ".stl" + " C:\\Users\\ptr\\Assignments\\whiteRoom\\deployment\\peayad.github.io\\3js\\04b\\ctm\\" + filename + ".ctm --method MG2 --level 9")
            print(x,y,z)
