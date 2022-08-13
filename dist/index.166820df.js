class Ball{constructor(t){this.id=t,this.name="Ball",this.level=0,this.color=[0,0,0],this.x=0,this.y=0,this.xv=0,this.yv=0,this.rotation=0,this.trans=-1,this.onTee=!1,this.wasReset=!1,this.lastChat=-1e10,this.tpTick=-1,this.canStroke=!1,this.health=100,this.score=0,this.time=0,this.clears=new Array(100).fill([1/0,1/0]),this.aiming=!1,this.aimX=0,this.aimY=0,this.aimVelX=0,this.aimVelY=0,this.aimPower=0}}class Level{constructor(t,i,s,e,n){this.id=t,this.x=i,this.holeX=e,this.holeY=n,this.points=s,this.width=-99999999;for(let t of s)this.width=Math.max(this.width,t.x)}}function isWithin(t,i,s,e,n,r){return t>s&&i>e&&t<s+n&&i<e+n}function intersect(t,i,s,e,n,r,h,o){if(t===s&&i===e||n===h&&r===o)return!1;const a=(o-r)*(s-t)-(h-n)*(e-i);if(0===a)return!1;let l=((h-n)*(i-r)-(o-r)*(t-n))/a;return{x:t+l*(s-t),y:i+l*(e-i)}}function intersectPoint(t,i,s,e,n,r,h,o){if(t===s&&i===e||n===h&&r===o)return!1;if(denominator=(o-r)*(s-t)-(h-n)*(e-i),0===denominator)return!1;let a=((h-n)*(i-r)-(o-r)*(t-n))/denominator,l=((s-t)*(i-r)-(e-i)*(t-n))/denominator;return!(a<0||a>1||l<0||l>1)&&{x:t+a*(s-t),y:i+a*(e-i)}}function distToSegment(t,i,s){function e(t){return t*t}function n(t,i){return e(t.x-i.x)+e(t.y-i.y)}return Math.sqrt(function(t,i,s){var e=n(i,s);if(0==e)return n(t,i);var r=((t.x-i.x)*(s.x-i.x)+(t.y-i.y)*(s.y-i.y))/e;return r=Math.max(0,Math.min(1,r)),n(t,{x:i.x+r*(s.x-i.x),y:i.y+r*(s.y-i.y)})}(t,i,s))}try{module.exports={Ball:Ball,Level:Level}}catch(t){}
//# sourceMappingURL=index.166820df.js.map