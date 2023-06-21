var g=Object.defineProperty;var x=(s,e,t)=>e in s?g(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t;var a=(s,e,t)=>(x(s,typeof e!="symbol"?e+"":e,t),t);import{r as l,j as p,R as F}from"./index-f7fd2ae1.js";class o{constructor(e,t){a(this,"x");a(this,"y");this.x=e,this.y=t}static new(e,t){return new this(e,t)}add(e){return o.new(this.x+e.x,this.y+e.y)}eq(e){return this.x===e.x&&this.y===e.y}}class c extends o{constructor(t,r,n){super(t,r);a(this,"food_color");this.food_color=n}static newFood(t,r,n){return new c(t,r,n)}}var i=(s=>(s[s.Left=0]="Left",s[s.Right=1]="Right",s[s.Up=2]="Up",s[s.Down=3]="Down",s))(i||{}),w=(s=>(s[s.Normal=0]="Normal",s[s.Dead=1]="Dead",s[s.Grow=2]="Grow",s[s.Neck=3]="Neck",s))(w||{});class f{constructor(e,t,r="🟥"){a(this,"positions");a(this,"headColor");a(this,"color");this.positions=e,this.headColor=t,this.color=r}static new(e,t="🔴"){return new f(new Set(e),t)}getHead(){return this.iterPositions()[0]}move(e,t){let r;switch(e){case 3:{r=o.new(0,1);break}case 2:{r=o.new(0,-1);break}case 0:{r=o.new(-1,0);break}case 1:{r=o.new(1,0);break}}let n=this.getHead().add(r);if(this.isNeck(n))return 3;if(this.eatSelf(n))return 1;let h=this.iterPositions();return n.eq(t)?(this.positions=new Set([n].concat(h)),2):(h.pop(),this.positions=new Set([n].concat(h)),0)}iterPositions(){return Array.from(this.positions)}eatSelf(e){return!!this.iterPositions().find(t=>t.eq(e))}isNeck(e){return this.iterPositions()[1].eq(e)}}class m{constructor(e,t,r,n,h){a(this,"width");a(this,"height");a(this,"snake");a(this,"food");a(this,"isFailed");this.width=e,this.height=t,this.snake=r,this.food=n,this.isFailed=h}static default(e=30,t=30){return new m(e,t,f.new([c.newFood(e/2,t/2,"🟥"),c.newFood(e/2+1,t/2,"🟥"),c.newFood(e/2+2,t/2,"🟥")]),c.newFood(~~(Math.random()*e),~~(Math.random()*t),["🟥","🟫","🟪","🟦","🟩","🟨","🟧"][~~(Math.random()*7)]),!1)}newSnake(){const{width:e,height:t}=this;return f.new([o.new(e/2,t/2),o.new(e/2+1,t/2),o.new(e/2+2,t/2)])}refreshFood(){const{width:e,height:t}=this;let r=()=>c.newFood(~~(Math.random()*e),~~(Math.random()*t),["🟥","🟫","🟪","🟦","🟩","🟨","🟧"][~~(Math.random()*7)]),n=r();for(;this.isSnake(n);)n=r();this.food=n}isIndBounds(e){let t;switch(e){case i.Down:{t=o.new(0,1);break}case i.Up:{t=o.new(0,-1);break}case i.Left:{t=o.new(-1,0);break}case i.Right:{t=o.new(1,0);break}}let r=this.snake.getHead().add(t);return r.x>=0&&r.x<this.width&&r.y>=0&&r.y<this.height}tryMove(e){if(this.isFailed)return!1;if(!this.isIndBounds(e))return this.isFailed=!0,!1;switch(this.snake.move(e,this.food)){case w.Grow:return this.refreshFood(),!0;case w.Normal:return!0;case w.Dead:return this.isFailed=!0,!0;case w.Neck:return!1}}clone(){const{width:e,height:t,snake:r,food:n,isFailed:h}=this;return new m(e,t,r,n,h)}isSnake(e){return this.snake.iterPositions().some(t=>t.eq(e))}getPosition(e){const{snake:t,food:r}=this;return r.eq(e)?r.food_color:t.getHead().eq(e)?t.headColor:this.isSnake(e)?t.color:""}}const b=F.memo(({x:s,y:e,colorShape:t})=>p.jsx("div",{style:{display:"flex",alignItems:"center",justifyContent:"center"},children:t},`${s}-${e}`));function R(){const[s,e]=l.useState(m.default(30,30)),[t,r]=l.useState(i.Left),n=l.useRef(null),h=l.useCallback(function(u){let d=!1;switch(u.code){case"ArrowLeft":d=s.tryMove(i.Left),d&&r(i.Left);break;case"ArrowRight":d=s.tryMove(i.Right),d&&r(i.Right);break;case"ArrowUp":d=s.tryMove(i.Up),d&&r(i.Up);break;case"ArrowDown":d=s.tryMove(i.Down),d&&r(i.Down);break}d&&e(s.clone())},[s,e,t,r]);return l.useEffect(()=>(document.addEventListener("keydown",h),()=>{document.removeEventListener("keydown",h)}),[h]),l.useEffect(()=>(n.current=setInterval(()=>{s.tryMove(t),e(s.clone())},500),()=>clearInterval(n.current)),[t,s,e]),p.jsx("div",{className:"container",style:{display:"grid",gridTemplateColumns:`repeat(${s.width}, 1rem)`,gridTemplateRows:`repeat(${s.height}, 1rem)`,width:"fit-content"},children:Array(s.height).fill(null).flatMap((y,u)=>Array(s.width).fill(null).map((d,k)=>p.jsx(b,{x:k,y:u,colorShape:s.getPosition(o.new(k,u))},k+"-"+u)))})}export{R as default};
