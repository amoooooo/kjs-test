function calculateBezierPoint(t, p0, p1, p2, p3) {
  var i = 1 - t;
  return i * i * i * p0 + 3 * i * i * t * p1 + 3 * i * t * t * p2 + t * t * t * p3;
}

onEvent('block.right_click', event => {
    if(event.block.id == 'kubejs:urn'){
        let block = event.block;
        let q0 = calculateBezierPoint(0, block.pos, {x: block.pos.x, y: block.pos.y + 1, z: block.pos.z}, {x: block.pos.x +1, y: block.pos.y + 1, z: block.pos.z}, {x: block.pos.x+1, y: block.pos.y, z: block.pos.z});
        for(let i = 1; i < 10; i++){
            t = i/10;
            let q1 = calculateBezierPoint(t, block.pos, {x: block.pos.x, y: block.pos.y + 1, z: block.pos.z}, {x: block.pos.x +1, y: block.pos.y + 1, z: block.pos.z}, {x: block.pos.x+1, y: block.pos.y, z: block.pos.z});
            console.log(q1);
            particleLine(event, q0, q1, {r:1, g:1, b:1}, event.level.dimension);
        }
    }
})