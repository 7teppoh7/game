var gameScore = 0;
const areaW = 800;
const areaH = 600;

function start(){
	document.getElementById("start").style.display = "none";

	var score = document.getElementById("score");
	score.style.display = "block";
	updateScore();

	alert("Попадайте по красным квадратам 15 секунд! \nЗа попадание в центр +15; в цель +5")
	setTimeout(endGame, 15 * 1000);
	setInterval(createTargets, 1.5 * 1000);

	isGame = true;
	var target = document.getElementById("target");
	target.onclick = bang;
	target.style.display = "block";
	document.getElementById("apple").onclick = appleBang;

	var area = document.getElementById("area");
	area.style.display = "block";
}

function createTargets(){
	let curX = Math.random() * (areaW - 80)
	let curY = Math.random() * (areaH - 80)
	target.style.left = curX + "px";
	target.style.top = curY + "px";
}



function bang(){
	gameScore += 5;
	updateScore();
}

function appleBang(){
	gameScore += 10;
	updateScore();
}


function updateScore(){
	score.innerHTML = "Счёт: " + gameScore;
}


function endGame(){
	score.style.display = "none";
	area.style.display = "none";

	var res = document.createElement("div");
	res.id += "result";
	res.innerHTML = "Ваш резульатат: " + gameScore;

	var p = document.createElement("p");
	p.innerHTML = "Сохранить?"

	var buttonS = document.createElement("button");
	buttonS.innerHTML = "Сохранить";
	buttonS.onclick = save;

	var buttonR = document.createElement("button");
	buttonR.onclick = showResults;
	buttonR.innerHTML = "Результаты";

	var buttonA = document.createElement("button");
	buttonA.onclick = restart;
	buttonA.innerHTML = "Начать заново";

	res.appendChild(p);
	res.appendChild(buttonS);
	res.appendChild(buttonR);
	res.appendChild(buttonA)

	document.body.appendChild(res);

}

function save(){
	let username = prompt("Введите свое имя:");
	if((username != null) && (username.trim() != "")){
		if (localStorage.getItem(username) == null){
			localStorage.setItem(username, JSON.stringify(User = {name: username, score: gameScore}));
		} else {
			localStorage.removeItem(username);
			localStorage.setItem(username, JSON.stringify(User = {name: username, score: gameScore}));
		}
	}
}

function showResults(){
	let res = "";
	for (let i = 0; i < localStorage.length; i++){
		let tmp = JSON.parse(localStorage.getItem(localStorage.key(i)));
		res += (i+1) + ". " + tmp.name + ": " + tmp.score + "\n";
	}
	alert(res);
}

function restart(){
	document.location.reload();
}