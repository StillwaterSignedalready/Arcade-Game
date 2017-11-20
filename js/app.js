// 这是我们的玩家要躲避的敌人 
var Enemy = function() {
    // 要应用到每个敌人的实例的变量写在这里
    // 我们已经提供了一个来帮助你实现更多

    // 敌人的图片或者雪碧图，用一个我们提供的工具函数来轻松的加载文件
    this.row = 1 + Math.ceil(Math.random() * 3);
    this.sprite = 'images/enemy-bug.png';
    this.x = 0;
    this.y = (this.row - 1) * 83 - 20;
    this.speed = 150 + Math.random() * 300;
    // 将敌人Push到allEnemies这个array中    
    allEnemies.push(this);
};

// 此为游戏必须的函数，用来更新敌人的位置
// 参数: dt ，表示时间间隙
Enemy.prototype.update = function(dt) {
    // 你应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
    // 都是以同样的速度运行的
    this.center = this.x + 40;
    if(this.x > 101 * 5){
        let index = allEnemies.indexOf(this);
        console.log(allEnemies[index].x);
        allEnemies.splice(index, 1);
    }else{
        this.x += dt * this.speed;
    }

    // console.log('enemy.update()');
};

// 此为游戏必须的函数，用来在屏幕上画出敌人，
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// 现在实现你自己的玩家类
// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数
class Player{
    constructor(){
        this.x = 101 * 2;
        this.y = 83 * 4 - 10;
        this.sprite = 'images/' + playerSprite[Math.floor(Math.random() * 5)];
        this.row = 5;
    }
    update(){
        // ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
        this.center = this.x + (101 / 2);
    }
    render(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    handleInput(orient){
        switch(orient){
            case 'left':
                if(this.x > 0){
                    this.x -= 101;
                }
                break;
            case 'up':
                if(this.y > 0){
                    this.y -= 83;
                    this.row--;
                }
                break;
            case 'right':
                if(this.x < 404){
                    this.x += 101;
                }
                break;
            case 'down':
                if(this.y < 330){
                    this.y += 83;
                    this.row++;
                }
                break;
        }
    }
}
// 现在实例化你的所有对象
// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
// 把玩家对象放进一个叫 player 的变量里面
const catched = [];
const playerSprite = [
    'char-boy.png',
    'char-cat-girl.png',
    'char-horn-girl.png',
    'char-pink-girl.png',
    'char-princess-girl.png'
];
const allEnemies = new Array();
var player = new Player();

for(let i = 0, len = 3; i < len; i ++ ){
    new Enemy();
}
setInterval(function(){
    let interval = Math.random() * 2500;
    setTimeout(function(){
        new Enemy();
    }, interval);
},1500);

// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Play.handleInput()
// 方法里面。你不需要再更改这段代码了。
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
