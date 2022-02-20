export const Player = (id, color, w, h) => {
	let o = {
    halfWidth: w/2, halfHeight: h/2,
		x: 0, y: 0, w: w, h: h, vy: 0, vx: 0,
		id: id, color: color, speed: 5, score:0,
		draw: (ctx) => {
			ctx.beginPath();
			ctx.fillStyle = o.color;
			ctx.rect(o.x, o.y, o.w, o.h);
			ctx.fill();
		},
    get centerX () {
      return o.x + o.halfWidth;
    },
    get centerY () {
      return o.y + o.halfHeight;
    }
	}
	return o;
}

export const Ball = (r, color) => {
	let d1 = Math.random() < 0.5 ? -1 : 1;
	let d2 = Math.random() < 0.5 ? -1 : 1;
	let a = randomFloat(.8,.9);
	let speed = 7;
	let vx = (speed * Math.cos(a)) * d1;
	let vy = (speed * Math.sin(a)) * d2;
	let o  = {
    halfWidth: r, halfHeight: r,
		x: 0, y: 0, r: r, h: r*2, w: r*2,
		vx: vx, vy: vy, color: color,
		draw: (ctx) => {
			ctx.beginPath();
			ctx.fillStyle = o.color;
			ctx.arc(o.x + r, o.y + r, o.r, 0, 2 * Math.PI);
			ctx.fill();
		},
    get centerX () {
      return o.x + r;
    },
    get centerY () {
      return o.y + r;
    }
	}
	return o;
}

export const Text = (content, color) => {
	let o = {
		x: 100, y: 100, color: color,
		content: content,
		draw: (ctx) => {
			ctx.beginPath();
			ctx.fillStyle = o.color;
			ctx.font = "30px Arial";
			ctx.fillText(o.content, o.x, o.y);
			ctx.fill();
		}
	}
	return o;
}

function randomFloat(min, max) {
  return min + Math.random() * (max - min);
}

export function hitTestRectangle(r1, r2, global = false) {
  let hit, combinedHalfWidths, combinedHalfHeights, vx, vy;

  //A variable to determine whether there's a collision
  hit = false;

  //Calculate the distance vector
  vx = r1.centerX - r2.centerX;
  vy = r1.centerY - r2.centerY;
  
  //Figure out the combined half-widths and half-heights
  combinedHalfWidths = r1.halfWidth + r2.halfWidth;
  combinedHalfHeights = r1.halfHeight + r2.halfHeight;

  //Check for a collision on the x axis
  if (Math.abs(vx) < combinedHalfWidths) {

    //A collision might be occuring. Check for a collision on the y axis
    if (Math.abs(vy) < combinedHalfHeights) {

      //There's definitely a collision happening
      hit = true;
    } else {

      //There's no collision on the y axis
      hit = false;
    }
  } else {

    //There's no collision on the x axis
    hit = false;
  }

  //`hit` will be either `true` or `false`
  return hit;
}


export function contain(sprite, bounds, bounce = false, extra = undefined) {

  let x = bounds.x,
      y = bounds.y,
      width = bounds.width,
      height = bounds.height;

      //The `collision` object is used t store which
      //side of the containing rectangle the sprite hits
      let collision;

      //Left
      if (sprite.x < x) {
        //Bounce the sprite if `bounce` is true
        if (bounce) sprite.vx *= -1;
        //If the sprite has `mass`, let the mass
        //affect the sprite's velocity
        if (sprite.mass) sprite.vx /= sprite.mass;
        sprite.x = x;
        collision = "left"; 
      }
      //Top
      if (sprite.y < y) {
        if (bounce) sprite.vy *= -1;
        if (sprite.mass) sprite.vy /= sprite.mass;
        sprite.y = y;
        collision = "top";
      }
      //Right
      if (sprite.x + sprite.w > width) {
        if (bounce) sprite.vx *= -1;
        if (sprite.mass) sprite.vx /= sprite.mass;
        sprite.x = width - sprite.w;
        collision = "right";
      }
      //Bottom
      if (sprite.y + sprite.h > height) {
        if (bounce) sprite.vy *= -1;
        if (sprite.mass) sprite.vy /= sprite.mass;
        sprite.y = height - sprite.h;
        collision = "bottom";
      }

      //The `extra` function runs if there was a collision
      //and `extra` has been defined
      if (collision && extra) extra(collision);

      //Return the `collision` object
      return collision;
}