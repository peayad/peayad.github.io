
head = '{"metadata":{"formatVersion":3.2,"type":"scene"},"urlBaseType":"relativeToHTML","objects":{"group": {"position":[0,0,0],"rotation":[0,0,0],"scale":[1,1,1],"visible": true,"children":{'
geometry = []
body = ',"mainCamera":{"type":"PerspectiveCamera","fov": 50,"aspect":1.33333,"near":1,"far":5000,"position":[0,0,250],"target":[0,0,0]},"light1":{"type":"PointLight","position":[0,200,0],"color":16777215,"intensity":1},"light2":{"type":"PointLight","position":[100,200,100],"color":16777215,"intensity":1},"light3":{"type":"PointLight","position":[-100, -200, -100],"color":16777215,"intensity":1}}}},"geometries":{'
url = []
tail = '},"materials":{"myMaterial":{"type":"MeshPhongMaterial","parameters":{"color":1401481,"emissive":468276,"side":"double","shading":"flat"}}},"defaults":{"bgcolor":[0,0,0],"bgalpha":1,"camera":"mainCamera"}}'

geometryText = '"%s":{"geometry":"%s","material":"myMaterial","position":[0,0,0],"rotation":[0,0,0],"scale":[1,1,1],"visible":false}'
urlText = '"%s":{"type":"ctm","url":"models/%s.ctm"}'

for L in range(1,7):
    for H in range(1,7):
        for V in range(1,7):
            tempName = 'L%s_H%s_V%s' %(L,H,V)
            geometry.append( geometryText %(tempName,tempName) )
            url.append( urlText %(tempName,tempName) )

geometry = ','.join(geometry)
url = ','.join(url)

totalText = ''.join([head,geometry,body,url,tail])

f = open('ctmFiles.json', 'r+')
f.seek(0)
f.truncate()
f.write( totalText )
f.close()

print('we are done here!')
