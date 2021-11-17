let timer = null;
const Max = 1;
let count = 0;

const APPLICATION_KEY = "bfa5be4e8976cf9e18765e78990c78d22d71021d1851444ac4524a94047acaa4";
const CLIENT_KEY = "d90443ee0bf997ca57d470a295a5ba79d9fa19ba9c2f286a63f0144fcb73c316";
const ncmb = new NCMB(APPLICATION_KEY,CLIENT_KEY);
const DBName = "TestClass";

let TestClass = ncmb.DataStore(DBName);

function init() {
  if (timer == null) {
    start = new Date();
    time();
    gameStart();
  }
}

function gameStart() {
  let size = 5;
  let qNum = Math.floor(Math.random()*q.length);

  for (let i =0; i<size*size; i++){
    let s = document.createElement("span");
    s.textContent = q[qNum][0];
    s.setAttribute("id","num"+i);
    s.addEventListener("click",function(){
      if( this.textContent== q[qNum][1]){
        // alert("正解");

        console.log(count);
        correct.play();
        while (cells.firstChild) {
          cells.removeChild(cells.firstChild);
        }
        count++;
        if(count < Max){
          gameStart();
        }else{
          save(timer-1);
          load();
          clearTimeout(timer);
          alert("game clear!");
        }
      }else{
        wrong.play();
      }
    });
    cells.appendChild(s);
    if(i % size == size -1){
      const br =document.createElement("br");
      cells.appendChild(br);
    }
  }
  let p = Math.floor(Math.random()*size*size);
  let ans = document.getElementById("num" +p);
  ans.textContent = q[qNum][1];
}

function time() {
  let now = new Date();
  let eTime = parseInt((now.getTime()-start.getTime())/1000);

  score.textContent = eTime;
  timer = setTimeout("time()",1000);


}

function save(time){
  let test = new TestClass();
   let key = "cleartime";
  let value = time;
  const text = document.getElementById('timer');
  // let value = text.value;
test.set(key, parseInt(value));
test.save()
  .then (function(){
    console.log("成功");
        })
  .catch(function(err){
    console.log("エラー:" + err);
  });
}

function load(time){
  let score;
  TestClass
  .order("cleartime")
  .fetchAll()
  .then(function(results){
    for(let i=0; i<results.length; i++){
      console.log(results[i].cleartime);
      if(timer<results[0].cleartime){
        alert("High score!"+timer);
      }
    }
  })
  .catch(function(err){
    console.log("エラー" + err);
  });
}
