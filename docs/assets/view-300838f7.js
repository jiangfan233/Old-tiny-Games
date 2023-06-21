var y=Object.defineProperty;var m=(r,t,e)=>t in r?y(r,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):r[t]=e;var h=(r,t,e)=>(m(r,typeof t!="symbol"?t+"":t,e),e);import{r as u,j as w,R as x}from"./index-f7fd2ae1.js";class n{constructor(t,e){h(this,"x");h(this,"y");this.x=t,this.y=e}static new(t,e){return new n(t,e)}add(t){return n.new(this.x+t.x,this.y+t.y)}}class i{constructor(t,e,s){h(this,"typ");h(this,"positions");h(this,"anchor");this.typ=t,this.positions=e,this.anchor=s}static shapeFactory(t){const e=n.new;switch(t){case 0:return new i("🟥",new Set([e(0,0),e(1,0),e(2,0),e(3,0)]),e(1,0));case 1:return new i("🟧",new Set([e(0,0),e(1,0),e(0,1),e(1,1)]),e(1,0));case 2:return new i("⬛",new Set([e(1,0),e(1,1),e(1,2),e(0,2)]),e(1,1));case 3:return new i("🟩",new Set([e(0,0),e(0,1),e(0,2),e(1,2)]),e(0,1));case 4:return new i("🟦",new Set([e(1,0),e(2,0),e(1,1),e(0,1)]),e(1,0));case 5:return new i("🟪",new Set([e(0,0),e(1,0),e(1,1),e(2,1)]),e(1,0));case 6:return new i("🟫",new Set([e(0,0),e(1,0),e(2,0),e(1,1)]),e(1,0));default:console.warn("shape number out of range: ",t)}}get(t){return Array.from(this.positions).find(e=>e.x===t.x&&e.y===t.y)}isColliding(t){return t.some(e=>Array.from(this.positions).some(s=>e.x===s.x&&e.y===s.y))}add(t){const{typ:e,anchor:s}=this;return new i(e,new Set(Array.from(this.positions).map(a=>n.new(a.x+t.x,a.y+t.y))),n.new(s.x+t.x,s.y+t.y))}remove(t){this.positions=new Set(Array.from(this.positions).filter(e=>e.y!==t).map(e=>e.y>=t?e:e.add(n.new(0,1))))}rotate(){const{typ:t,anchor:e}=this,{x:s,y:a}=this.anchor;return new i(t,new Set(Array.from(this.positions).map(o=>n.new(-o.y+a+s,o.x-s+a))),e)}}class p{constructor(t=10,e=25){h(this,"width");h(this,"height");h(this,"current_shape");h(this,"fixed_shapes");h(this,"failed");this.width=t,this.height=e,this.fixed_shapes=[],this.failed=!1,this.current_shape=i.shapeFactory(Math.floor(Math.random()*7)).add(n.new(this.width/2-1,0))}clone(){let t=new p;return t.current_shape=this.current_shape,t.fixed_shapes=this.fixed_shapes,t.failed=this.failed,t}changeCoordinates(t){const{typ:e,anchor:s,positions:a}=t,o=n.new(s.x+this.width/2-1,s.y),d=new Set(Array.from(a).map(c=>n.new(c.x+this.width/2-1,c.y)));return new i(e,d,o)}getTyp(t){if(this.current_shape.get(t))return this.current_shape.typ;let s=this.fixed_shapes.find(a=>!!a.get(t));return s?s.typ:null}isOutOfBounds(t){return!Array.from(t.positions).every(s=>s.x>=0&&s.x<this.width&&s.y>=0&&s.y<this.height)}isColliding(t){const e=Array.from(t.positions);return this.fixed_shapes.some(s=>s.isColliding(e))}tick(){if(this.failed)return;const t=this.current_shape.add(n.new(0,1));return this.isColliding(t)||this.isOutOfBounds(t)?(this.fixed_shapes.push(this.current_shape),this.removeFullLines(),this.current_shape=i.shapeFactory(Math.floor(Math.random()*7)).add(n.new(this.width/2-1,0)),this.isColliding(this.current_shape)&&(this.failed=!0)):this.current_shape=t,this.failed}shift(t){let e;switch(t){case"Left":e=this.current_shape.add(n.new(-1,0));break;case"Right":e=this.current_shape.add(n.new(1,0));break;default:return}!this.isOutOfBounds(e)&&!this.isColliding(e)&&(this.current_shape=e)}rotate(){const t=this.current_shape.rotate();!this.isOutOfBounds(t)&&!this.isColliding(t)&&(this.current_shape=t)}removeFullLines(){Array(this.height).fill(null).forEach((t,e)=>{this.isLineFull(e)&&this.fixed_shapes.forEach(s=>{s.remove(e)})})}isLineFull(t){return this.fixed_shapes.flatMap(e=>Array.from(e.positions)).filter(e=>e.y===t).length===this.width}}const g=x.memo(({x:r,y:t,colorShape:e})=>w.jsx("div",{style:{display:"flex",alignItems:"center",justifyContent:"center"},children:e},`${r}-${t}`));function v(){const[r,t]=u.useState(new p),[e,s]=u.useState(500),a=u.useRef(null),o=u.useCallback(function(l){if(l.code==="ArrowDown"){s(50);return}switch(l.code){case"ArrowLeft":r.shift("Left");break;case"ArrowRight":r.shift("Right");break;case"ArrowUp":r.rotate();break}t(r.clone())},[r,s,t]),d=u.useCallback(function(c){s(500)},[]);return u.useEffect(()=>(document.addEventListener("keydown",o),document.addEventListener("keyup",d),()=>{document.removeEventListener("keydown",o),document.removeEventListener("keyup",o)}),[o,d]),u.useEffect(()=>(a.current=setInterval(()=>{t(c=>(c.tick(),c.clone()))},e),()=>clearInterval(a.current)),[t,e]),w.jsx("div",{className:"container",style:{display:"grid",gridTemplateColumns:`repeat(${r.width}, 1rem)`,gridTemplateRows:`repeat(${r.height}, 1rem)`,width:"fit-content"},children:Array(r.height).fill(null).flatMap((c,l)=>Array(r.width).fill(null).map((A,f)=>w.jsx(g,{x:f,y:l,colorShape:r.getTyp(n.new(f,l))},f+"-"+l)))})}export{v as default};
