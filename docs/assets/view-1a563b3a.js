var x=Object.defineProperty;var g=(s,e,t)=>e in s?x(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t;var h=(s,e,t)=>(g(s,typeof e!="symbol"?e+"":e,t),t);import{r as d,j as a,R as k}from"./index-b4e24b1e.js";import{P as m}from"./pos-bbfa6582.js";class p extends m{constructor(t,i,n,r,l,c,o){super(t,i);h(this,"color");h(this,"isShow");h(this,"isMarked");h(this,"value");h(this,"isClickError");this.isShow=r,this.color=n,this.isMarked=l,this.value=c,this.isClickError=o}static mine(t,i,n="💣",r=!1,l=!1,c=-1,o=!1){return new p(t,i,n,r,l,c,o)}static grass(t,i,n=null,r=!1,l=!1,c=0,o=!1){return new p(t,i,n,r,l,c,o)}isMine(){return this.value<0}mark(){const{isShow:t}=this;t||(this.isMarked=!this.isMarked)}toMine(){this.color="💣",this.value=-1}setValue(t){this.value=t,this.isShow=!0}toView(){const{isShow:t,color:i,value:n,isMarked:r}=this;return r?"🚩":t?this.isMine()?i:n||null:null}isMarkError(){const{isMarked:t}=this;return t&&!this.isMine()}}class w{constructor(e,t,i,n,r){h(this,"width");h(this,"height");h(this,"isFailed");h(this,"mineCount");h(this,"positions");this.width=e,this.height=t,this.isFailed=i,this.mineCount=n,this.positions=r}static default(e=16,t=30,i=20){let n=Array(t).fill(0).map((l,c)=>Array(e).fill(0).map((o,u)=>p.grass(u,c))),r=0;for(;r<i;){let l=n[~~(Math.random()*t)][~~(Math.random()*e)];l.isMine()||(l.toMine(),r+=1)}return new w(e,t,!1,i,n)}isMine(e){return this.getPosition(e).isMine()}isInBounds(e){return e.x>=0&&e.x<this.width&&e.y>=0&&e.y<this.height}getPosition(e){return this.positions[e.y][e.x]}iterDirection(){return[0,2,4,6,1,5,3,7]}next(e,t){switch(t){case 0:return e.add(m.new(0,-1));case 1:return e.add(m.new(1,-1));case 2:return e.add(m.new(1,0));case 3:return e.add(m.new(1,1));case 4:return e.add(m.new(0,1));case 5:return e.add(m.new(-1,1));case 6:return e.add(m.new(-1,0));case 7:return e.add(m.new(-1,-1));default:return console.warn("where do you want to go ???",t),e}}scan(e){if(!e.isMarked){if(this.isMine(e)){this.isFailed=!0,e.isClickError=!0,this.positions.forEach(t=>{t.forEach(i=>i.isShow=!0)});return}this.search(e,[])}}search(e,t=[]){let i=[e];const n=this.iterDirection();for(;i.length;){let r=i.shift(),l=0,c=[];for(let o=0;o<n.length;o++){let u=n[o],f=this.next(r,u);this.isInBounds(f)&&(this.getPosition(f).isMarked||(this.isMine(f)?l+=1:c.push(f)))}t.push(r),this.getPosition(r).setValue(l),l<=0&&c.forEach(o=>{i.every(u=>!u.eq(o))&&t.every(u=>!u.eq(o))&&i.push(o)})}}clone(){const{width:e,height:t,isFailed:i,mineCount:n,positions:r}=this;return new w(e,t,i,n,r)}iterPosition(){return this.positions.flatMap(e=>e.map(t=>t))}markedMineCount(){return this.mineCount-this.iterPosition().filter(e=>e.isMarked).length}markMine(e){e.mark()}}const C=k.memo(function({maybeMine:e,handleClick:t}){let{isShow:i,isClickError:n}=e;return a.jsx(a.Fragment,{children:a.jsx("div",{style:{border:"1px solid gray",display:"flex",justifyContent:"center",alignItems:"center",padding:"0.1rem",background:i?n?"red":"white":""},onClick:r=>t(r,e),onAuxClick:r=>t(r,e),children:e.toView()})})},(s,e)=>{if(s.handleClick!==e.handleClick)return!1;const{isShow:t,value:i}=s.maybeMine,{isShow:n,value:r}=e.maybeMine;return t===n&&r===i}),S=k.memo(({mineCount:s})=>a.jsx(a.Fragment,{children:a.jsx("span",{children:s.toString().padStart(3,"0")})})),v=k.memo(({gameStatus:s})=>{const[e,t]=d.useState(0),i=d.useRef(null);return d.useEffect(()=>{if(s==="😵"){clearInterval(i.current),i.current=null;return}if(i.current===null&&s==="😀"&&t(0),i.current==null)return i.current=setInterval(()=>{t(n=>n+1)},1e3),()=>{}}),a.jsx(a.Fragment,{children:a.jsx("span",{children:e.toString().padStart(3,"0")})})},(s,{gameStatus:e})=>!(e==="😵"||e==="😀"));function F(){const[s,e]=d.useState(w.default(10,15,20)),[t,i]=d.useState("😀"),n=d.useCallback((u,f)=>{if(u.preventDefault(),!s.isFailed)switch(u.button){case 0:{e(M=>(M.scan(f),M.isFailed&&i("😵"),M.clone()));return}case 2:s.markMine(f),e(s.clone())}},[s,e]),r=d.useCallback(function(){s.isFailed||i("😲")},[s,t,i]),l=d.useCallback(function(){s.isFailed?i("😵"):i("😀")},[s,t,i]),c=d.useCallback(()=>{e(w.default(10,15,20)),i("😀")},[e]),o=d.useMemo(()=>a.jsx("div",{style:{cursor:"pointer"},onClick:c,children:t}),[t]);return d.useEffect(()=>{document.oncontextmenu=function(u){u.preventDefault()}},[]),a.jsxs("div",{className:"container custom-scheme",style:{display:"flex",flexDirection:"column"},children:[a.jsxs("div",{className:"mineSweeper-header",style:{display:"flex",justifyContent:"space-between"},children:[a.jsx(S,{mineCount:s.markedMineCount()}),o,a.jsx(v,{gameStatus:t})]}),a.jsx("div",{onMouseDown:r,onMouseUp:l,className:"mineSweeper-container",style:{display:"grid",gridTemplateRows:`repeat(${s.height}, 1rem)`,gridTemplateColumns:`repeat(${s.width}, 1rem)`,cursor:"pointer"},children:s.iterPosition().map((u,f)=>a.jsx(a.Fragment,{children:a.jsx(C,{maybeMine:u,handleClick:n},`${f}-${u.asKey()}`)}))})]})}export{F as default};
