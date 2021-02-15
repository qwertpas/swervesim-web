

function rotate(x, y, angle){
    let sin = Math.sin(angle);
    let cos = Math.cos(angle);
    return [x * cos - y * sin, x * sin + y * cos];
}


function normalizeAngle(angle, range){
    // reduce the angle  
    angle =  angle % (2 * range); 

    // force it to be the positive remainder, so that 0 <= angle < 360  
    angle = (angle + (2 * range)) % (2 * range);  

    // force into the minimum absolute value residue class, so that -180 < angle <= 180  
    if (angle > range) angle -= (2 * range); 

    return angle;
}

function limit(value, max){
    if(Math.abs(value) > max){
        return Math.sign(value) * max;
    }else{
        return value;
    }
}

function normalizeValue(scale, ...values){
    let max = 0
    for(let value of values){
        if(Math.abs(value) > max){
            max = Math.abs(value);
        }
    }

    let normalized = [];
    for(let value of values){
        normalized.push(value * scale / max);
    }
    return normalized;
}

function centerRect(x, y, angle, width, height) {
    let center = new Point(x, y);
    let pts = [
        new Point(+width/2.0, +height/2.0).rotate(angle).add(center),
        new Point(-width/2.0, +height/2.0).rotate(angle).add(center),
        new Point(-width/2.0, -height/2.0).rotate(angle).add(center),
        new Point(+width/2.0, -height/2.0).rotate(angle).add(center),
    ]
    return new Polygon(pts);
}

function cornerRect(x0, y0, x1, y1) {
    let pts = [
        new Point(x0, y0),
        new Point(x0, y1),
        new Point(x1, y1),
        new Point(x1, y0),
    ]
    return new Polygon(pts);
}

class Polygon {
    constructor(pts){
        this.pts = pts;
    }
    move(dx, dy){
        for(let i=0; i < this.pts.length; i++){
            this.pts[i].x += dx;
            this.pts[i].y += dy;
        }
    }
    center(){
        let xsum = 0;
        let ysum = 0;
        for(let i=0; i < this.pts.length; i++){
            xsum += this.pts[i].x;
            ysum += this.pts[i].y;
        }
        return {
            x: xsum/this.pts.length,
            y: ysum/this.pts.length,
        }
    }
}

class LineSeg {
    constructor(startx, starty, endx, endy){
        this.start = new Point(startx, starty);
        this.end = new Point(endx, endy);
    }
}

class Point {
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
    
    rotate(angle){
        let sin = Math.sin(angle);
        let cos = Math.cos(angle);
        return new Point(this.x * cos - this.y * sin, this.x * sin + this.y * cos);
    }

    add(vec){
        return new Point(this.x + vec.x, this.y + vec.y);
    }
}


function polyPolys(poly, otherPolys){
    let vertices = poly.pts;

    // go through each of the vertices, plus the next vertex in the list
    for (let current=0; current<vertices.length; current++) {

        // get next vertex in list
        // if we've hit the end, wrap around to 0
        let next = current+1;
        if (next == vertices.length) next = 0;

        // get the PVectors at our current position
        // extract X/Y coordinates from each
        let x3 = vertices[current].x;
        let y3 = vertices[current].y;
        let x4 = vertices[next].x;
        let y4 = vertices[next].y;

        for(let otherPoly of otherPolys){
            otherVertices = otherPoly.pts;

            for (let otherCurrent=0; otherCurrent<otherVertices.length; otherCurrent++) {
                let otherNext = otherCurrent+1;
                if (otherNext == otherVertices.length) otherNext = 0;

                x1 = otherVertices[otherCurrent].x;
                y1 = otherVertices[otherCurrent].y;
                x2 = otherVertices[otherNext].x;
                y2 = otherVertices[otherNext].y;

                if (lineLine(x1, y1, x2, y2, x3, y3, x4, y4)) {
                    return true;
                }

            }
        }
    }
    return false;
}

function lineLine(x1, y1, x2, y2, x3, y3, x4, y4) {

    // calculate the direction of the lines
    let uA = ((x4-x3)*(y1-y3) - (y4-y3)*(x1-x3)) / ((y4-y3)*(x2-x1) - (x4-x3)*(y2-y1));
    let uB = ((x2-x1)*(y1-y3) - (y2-y1)*(x1-x3)) / ((y4-y3)*(x2-x1) - (x4-x3)*(y2-y1));
  
    // if uA and uB are between 0-1, lines are colliding
    if (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1) {
        return true;
    }
    return false;
}


