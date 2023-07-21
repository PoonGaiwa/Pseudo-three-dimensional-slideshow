var posData = [
  {
    zIndex: 0,
    top: '-400px',
    left: '-400px',
    width: '600px',
    height: 'auto',
    boxShadow: '0 0 8px #333',
  },
  {
    zIndex: 1,
    top: '-250px',
    left: '-700px',
    width: '800px',
    height: 'auto',
    boxShadow: '0 6px 8px #333',
  },
  {
    zIndex: 2,
    top: '0px',
    left: '0px',
    width: '1000px',
    height: 'auto',
    boxShadow: '0 12px 8px #333',
  },
  {
    zIndex: 1,
    top: '-250px',
    left: '700px',
    width: '800px',
    height: 'auto',
    boxShadow: '0 6px 8px #333',
  },
  {
    zIndex: 0,
    top: '-400px',
    left: '400px',
    width: '600px',
    height: 'auto',
    boxShadow: '0 0 8px #333'
  }
];
var aLi = document.querySelectorAll('.pic-list li');
var oBtn = document.querySelector('.btn-wrap');
var tapMap = {
  'prev': function(){
    posData.push(posData.shift());
  },
  'next': function(){
    posData.unshift(posData.pop());
  }
}
translate(aLi);
oBtn.addEventListener('click',function(e){
  if(e.target.tagName.toLowerCase() === 'span'){
    var btnType = e.target.className;
    if (tapMap[btnType] && typeof tapMap[btnType] === 'function'){
      tapMap[btnType]();
      translate(vDomArr);
    }
  }
})
function translate(){
  posData.forEach(function(item, idx, arr){
    animate(aLi[idx],item);
  });
}
function animate(ele,json,callback){
  clearInterval(ele.time);
  var toggle = false;
  var curr, target;
  ele.time = setInterval(function(){
    toggle = true;
    for (var key in json){
      target = parseInt(json[key]);
      curr = parseInt(getStyle(ele,key));
      speed = (target - curr) / 50;
      speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
      if (key === 'zIndex' || key === 'boxShadow'){
        ele.style[key] = json[key];
        continue;
      }
      if(curr === target) {
        ele.style[key] = target + 'px';
      }
      ele.style[key] = curr + speed + 'px';
      if (curr !== target){
        toggle = false;
      }
    }
    if (toggle) {
      clearInterval(ele.time);
      callback && callback();
    }
  });
}
