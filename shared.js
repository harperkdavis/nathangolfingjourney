class Ball {

    constructor(id) {
        this.id = id;

        this.name = "Ball";
        this.level = 0;

        this.color = [0, 0, 0];
        
        this.x = 0;
        this.y = 0;
        this.xv = 0;
        this.yv = 0;

        this.rotation = 0;

        this.trans = -1;
        this.onTee = false;

        this.wasReset = false;
        this.lastChat = -10000000000;

        this.tpTick = -1;
        
        this.canStroke = false;
        
        this.health = 100;
        this.score = 0;
        this.time = 0;
        this.clears = new Array(100).fill([Infinity, Infinity]);

        this.aiming = false;

        this.aimX = 0;
        this.aimY = 0;
        this.aimVelX = 0;
        this.aimVelY = 0;

        this.aimPower = 0;
    }

}

class Level {
    
    constructor(id, x, points, holeX, holeY) {
        this.id = id;
        this.x = x;

        this.holeX = holeX;
        this.holeY = holeY;

        this.points = points;

        this.width = -99999999
        for (let point of points) {
            this.width = Math.max(this.width, point.x);
        }
    }

}

function isWithin(x, y, x1, y1, w, h) {
    return x > x1 && y > y1 && x < x1 + w && y < y1 + w;
}

// https://observablehq.com/@bumbeishvili/two-unlimited-lines-intersection-in-javascript
function intersect(x1, y1, x2, y2, x3, y3, x4, y4) {

    // Check if none of the lines are of length 0
    if ((x1 === x2 && y1 === y2) || (x3 === x4 && y3 === y4)) {
        return false
    }

    const denominator = ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1))

    // Lines are parallel
    if (denominator === 0) {
        return false
    }

    let ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denominator
    let ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denominator

    // Return a object with the x and y coordinates of the intersection
    let x = x1 + ua * (x2 - x1)
    let y = y1 + ua * (y2 - y1)

    return { x, y }
}

function intersectPoint(x1, y1, x2, y2, x3, y3, x4, y4) {

    // Check if none of the lines are of length 0
      if ((x1 === x2 && y1 === y2) || (x3 === x4 && y3 === y4)) {
          return false
      }
  
      denominator = ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1))
  
    // Lines are parallel
      if (denominator === 0) {
          return false
      }
  
      let ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denominator
      let ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denominator
  
    // is the intersection along the segments
      if (ua < 0 || ua > 1 || ub < 0 || ub > 1) {
          return false
      }
  
    // Return a object with the x and y coordinates of the intersection
      let x = x1 + ua * (x2 - x1)
      let y = y1 + ua * (y2 - y1)
  
      return {x, y}
  }

// https://stackoverflow.com/questions/849211/shortest-distance-between-a-point-and-a-line-segment
function distToSegment(p, v, w) { function sqr(x) { return x * x }
function dist2(v, w) { return sqr(v.x - w.x) + sqr(v.y - w.y) }
function distToSegmentSquared(p, v, w) {
  var l2 = dist2(v, w);
  if (l2 == 0) return dist2(p, v);
  var t = ((p.x - v.x) * (w.x - v.x) + (p.y - v.y) * (w.y - v.y)) / l2;
  t = Math.max(0, Math.min(1, t));
  return dist2(p, { x: v.x + t * (w.x - v.x),
                    y: v.y + t * (w.y - v.y) });
} return Math.sqrt(distToSegmentSquared(p, v, w)); }

try {
    module.exports = {
        Ball,
        Level,
    }
} catch (e) {}