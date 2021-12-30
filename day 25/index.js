var fs = require('fs')

let input=fs.readFileSync('input.txt',"utf8").trim().split('\n').map((s)=>s.split(''))
let old=null;

let move={
    ">":({x,y},map)=>({y,x:(x+1)%map[y].length}),
    "v":({x,y},map)=>({y:(y+1)%map.length,x})
}

function step(map){
    next = []
    for(let l of map) next.push([...l]);
    
    map = go(go(next,">"),"v");
    return map
}

function go(map,dir){
	let movable=[];
	
    map.forEach((r,y)=>{	
		r.forEach((_,x)=>{
            var nxt = move[dir]({x,y},map);
            if(map[nxt.y][nxt.x]==='.' && map[y][x]===dir) movable.push({x,y,dir});
		})
	})
	
    for(let {x,y} of movable){
        let nextPt=move[dir]({x,y},map)
        map[y][x]='.'
        map[nextPt.y][nextPt.x]=dir
    }
    return map
}

function equal(prev,curr){
    if(!prev) return false;
    for(let y=0;y<curr.length;y++) if(prev[y].join('')!==curr[y].join(''))return false;
    return true;
}

let steps=0;

while(!equal(old,input)){
    old=input;
    input=step(input)
    steps++
}

console.log(steps)