document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    for (let i = 0; i < 225; i++) {
        const box = document.createElement('div');
        grid.appendChild(box);
    }

    document.getElementById('gameover').style.display="hidden";
    document.getElementById('win').style.display="hidden";
    let score = 0;
    let shoot = 202;
    let dir = 1;
    let width = 15;
    const boxes = Array.from(document.querySelectorAll('.grid div'));
    const removing = [];
    const alien = [
        16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28,
        31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43,
        46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58,
        61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73
    ];
    let right = true;
    let flag = true;

    function draw() {
        for (let i = 0; i < 225; i++) {
            boxes[i].classList.remove('alien');
        }
        for (let i = 0; i < alien.length; i++) {
            if (!removing.includes(i)) {
                boxes[alien[i]].classList.add('alien');
            }
        }
    }

    draw();

    movement = setInterval(() => {
        if (alien[0] === 15 || alien[0] === 30 || alien[0] === 60 || alien[0] === 90 || alien[0] === 120 || alien[0] === 150 || alien[0] === 180 || alien[0] === 210) {
            dir = 1;
            below = 1;
        }
        else if (alien[alien.length - 1] === 74 || alien[alien.length - 1] === 104 || alien[alien.length-1]===134 || alien[alien.length-1]===164 || alien[alien.length-1]===194 || alien[alien.length-1]===214) {
            dir = -1;
            below = 1;
        }
        else {
            below = 0;
        }

        if(below) {
            for (let i = 0; i < alien.length; i++) {
                alien[i] += 15;
            }
        }
        else {
            for (let i = 0; i < alien.length; i++) {
                alien[i] += dir;
            }
        }
        draw();


        if(alien[alien.length-1]===209 || alien[alien.length-1]===208 || alien[alien.length-1]===207 || alien[alien.length-1]===206){
            // document.getElementById('score').innerHTML="GAME OVER!";
            document.getElementById('gameover').style.display="block";
            flag = false;
            clearInterval(movement);
        }


    }, 1500);


    boxes[shoot].classList.add('shoot');


    function keylist(e) {
        // console.log(e.keyCode);
        // 37 = left
        // 38 = up
        // 39 = right
        // 40 = down
        if (e.keyCode === 39) {
            boxes[shoot].classList.remove('shoot');
            if (shoot < 209) shoot++;
            boxes[shoot].classList.add('shoot');
        }
        if (e.keyCode === 37) {
            boxes[shoot].classList.remove('shoot');
            if (shoot > 195) shoot--;
            boxes[shoot].classList.add('shoot');
        }
        if (e.keyCode === 38) {
            let pos = shoot - 15;
            interval = setInterval(() => {
                boxes[pos + 15].classList.remove('fire');
                boxes[pos].classList.add('fire');
                pos -= 15;

                if (boxes[pos].classList.contains('alien')) {
                    boxes[pos].classList.remove('alien', 'fire');
                    boxes[pos + 15].classList.remove('alien', 'fire');
                    removing.push(alien.indexOf(pos));
                    console.log(alien.indexOf(pos));
                    pos = -1;
                    score++;
                    document.getElementById('score').innerText = `${score}`;
                    if(score === 52){
                        document.getElementById('win').style.display="block";
                    }
                }

                if(!flag)clearInterval(interval);
            }, 100);
        }
    }

    document.addEventListener('keyup', keylist);
})