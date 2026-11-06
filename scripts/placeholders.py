# Génère des images provisoires (dégradés + grain) en attendant les vraies photos.
import random, os, math
from PIL import Image, ImageDraw, ImageFilter
random.seed(7)
projects = {
 "motocross-ciney":   ("Sport & Action", [(30,24,20),(190,110,50)]),
 "mariage-claire-tom":("Mariage",        [(40,36,34),(220,200,180)]),
 "collection-automne":("Mode",           [(25,20,30),(160,90,120)]),
 "portraits-studio":  ("Portraits",      [(15,15,15),(150,150,150)]),
 "equipe-dirigeante": ("Corporate",      [(18,26,34),(90,130,160)]),
 "campagne-brasserie":("Pub",            [(30,20,10),(200,150,60)]),
}
sizes=[(2000,1333),(1333,2000),(2000,1333),(1600,2000),(2000,1125),(1333,2000)]
for slug,(cat,(a,b)) in projects.items():
  d=f"src/content/projets/{slug}"; os.makedirs(d,exist_ok=True)
  for i,(w,h) in enumerate(sizes):
    s=0.25; W,H=int(w*s),int(h*s)
    img=Image.new("RGB",(W,H)); px=img.load()
    cx,cy=random.random(),random.random()*0.7
    for y in range(H):
      for x in range(W):
        t=min(1,math.hypot(x/W-cx,(y/H-cy)*H/W)*1.4)
        t=t**1.3
        px[x,y]=tuple(int(b[k]*(1-t)+a[k]*t) for k in range(3))
    dr=ImageDraw.Draw(img)
    for _ in range(3):
      r=random.randint(W//10,W//3); x=random.randint(0,W); y=random.randint(0,H)
      dr.ellipse((x-r,y-r,x+r,y+r),fill=tuple(min(255,c+25) for c in b))
    img=img.filter(ImageFilter.GaussianBlur(W/25)).resize((w,h),Image.BICUBIC)
    noise=Image.effect_noise((w,h),18).convert("RGB")
    img=Image.blend(img,noise,0.06)
    img.save(f"{d}/photo-{i+1}.jpg",quality=78)
print("ok")
