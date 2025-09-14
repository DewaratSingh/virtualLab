class ToolWChemical{
constructor(x,y,src,width,height,chemical="empty",angle=0,coll=true,name,tranX=-width/2,tranY=-height/2)
{
this.x=x
this.y=y
this.Img=new Image();
this.chemical=chemical
this.chemicalarr=[]
this.src=src
this.height=height
this.width=width
this.data=[src]
this.Img.src=src
this.Img.height=height
this.Img.width=width
this.tranX=tranX
this.tranY=tranY
this.initialPo={X:x,Y:y}
this.imgPo={x:x,y:y}
this.index = 0;
this.animate = false;
this.repeat=false;
this.angle=angle
this.collide=coll
this.name=name
}

draw(ctx,offSet,player=false)
{
if(player){
this.imgPo.x=this.initialPo.X+offSet.x;
this.imgPo.y=this.initialPo.Y+offSet.y;
}else{
this.x=this.initialPo.X-offSet.x;
this.y=this.initialPo.Y-offSet.y;
}

this.tranX=-this.Img.width/2
this.tranY=-this.Img.height/2
this.height=this.Img.height
this.width=this.Img.width


//formula to string
if(this.chemicalarr.length>0){
    this.chemical=""
    for(let i=0;i<this.chemicalarr.length;i++){
        this.chemical+=this.chemicalarr[i]+ "+"
    }
}


this.Img.src=this.data[this.index]
if(this.x>offSet.range.xFrom&&this.x<offSet.range.xTo&&this.y>offSet.range.yFrom&&this.y<offSet.range.yTo){
ctx.save();
ctx.translate(this.x, this.y);
ctx.rotate(this.angle);

ctx.beginPath();
ctx.drawImage(this.Img, this.tranX, this.tranY, this.Img.width, this.Img.height);
ctx.fillStyle = "black";  
ctx.font = "10px Arial";   
ctx.textAlign = "center";   
ctx.fillText(this.chemical, -50, -50);

ctx.restore();

}
if (this.animate) {
this.index++;
if (this.index >= this.data.length) {
if(this.repeat){
this.index = 0;
}else{
this.index = 0;
this.animate = false;
}
}
}
}

animation(frames,time,repeat=false) {
this.repeat=repeat
if (frames.length === 0 || frames.length > 60) {
console.error("Invalid frames array length. Should be between 1 and 60.");
return;
}

const step = 60*time / frames.length;
const animatedData = [];

frames.forEach(frame => {
for (let i = 0; i < step; i++) {
animatedData.push(frame);
}
});

this.data = animatedData;
this.animate = true;
this.index = 0;
}


point()
{
const arrey=[]
const r=Math.hypot(this.width/2,this.height/2)
const angle=Math.atan2(this.width,this.height)

arrey.push({
x:this.x-Math.sin(-angle-this.angle)*r,
y:this.y-Math.cos(-angle-this.angle)*r
})
arrey.push({
x:this.x-Math.sin(Math.PI+angle-this.angle)*r,
y:this.y-Math.cos(Math.PI+angle-this.angle)*r
})
arrey.push({
x:this.x-Math.sin(Math.PI-angle-this.angle)*r,
y:this.y-Math.cos(Math.PI-angle-this.angle)*r
})

arrey.push({
x:this.x-Math.sin(angle-this.angle)*r,
y:this.y-Math.cos(angle-this.angle)*r
})
return arrey;
}


}


function polygonsCollide(poly1, poly2) {
  // SAT collision check
  let polygons = [poly1, poly2];
  for (let i = 0; i < polygons.length; i++) {
    let polygon = polygons[i];
    for (let i1 = 0; i1 < polygon.length; i1++) {
      let i2 = (i1 + 1) % polygon.length;
      let p1 = polygon[i1];
      let p2 = polygon[i2];

      // edge vector
      let normal = { x: p2.y - p1.y, y: p1.x - p2.x };

      // project both polygons on axis
      let minA = null, maxA = null;
      for (let p of poly1) {
        let proj = p.x * normal.x + p.y * normal.y;
        if (minA === null || proj < minA) minA = proj;
        if (maxA === null || proj > maxA) maxA = proj;
      }

      let minB = null, maxB = null;
      for (let p of poly2) {
        let proj = p.x * normal.x + p.y * normal.y;
        if (minB === null || proj < minB) minB = proj;
        if (maxB === null || proj > maxB) maxB = proj;
      }

      // no overlap → no collision
      if (maxA < minB || maxB < minA) {
        return false;
      }
    }
  }
  return true;
}
