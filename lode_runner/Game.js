
DOMTokenList.prototype.includes = Array.prototype.includes

function onload() {
    // highscore()

    startGameLoop()
    time = document.getElementById('time')
    document.getElementById('life').innerHTML = zycie
    next_lifeup = 500
    document.getElementById("overall_score").innerHTML = '000000'
    map_wczytaj(document.getElementById("level").value)
    document.getElementById("wczytaj").style.display = 'none'
    document.getElementById("start").addEventListener("click", startgame);
    document.getElementById("suicide").addEventListener("click", gameover);
    document.getElementById("bricks").addEventListener("mouseover", edytor);
    document.getElementById("bricks").addEventListener("mouseup", function (){
        edycja = false
    });
    document.getElementById("bricks").addEventListener("mousedown", function(event){
        edycja = true
        edytor(event)
    })
    document.getElementById("levels").addEventListener("click", function (event) {
        if (document.getElementById("admin_tools").checked == false) {
            alert('STAY DETERMINED!')
            event.preventDefault()
        }
    })
    document.getElementById("levels").addEventListener("change", function (event) {
        if (document.getElementById('levels').value) {
            _poziom_ = document.getElementById('levels').value
            map_wczytaj(document.getElementById("level").value)
        }
    })
    document.getElementById("zapisz").addEventListener("click", function () {
        document.getElementById("level").value = map_zapisz()
    })
    document.getElementById("wczytaj").addEventListener("click", function () {
        next_lifeup = 500
        document.getElementById("overall_score").innerHTML = '000000'

        //map_wczytaj(document.getElementById("level").value)
    })
    document.getElementById("pauza").addEventListener("click", function () {
        restart = true

        bricks.style.opacity = 0.5 ;
    })
    document.getElementById("coin_score").addEventListener("click", function () {
        admin_tool()
    })
        document.getElementById("admin_tools").checked = true

    admin_tool()
    //document.getElementById("admin_tools").addEventListener("change", admin_tool)
    bricks.focus()
}
var edycja, restart
//czas = 150
var currentlyPressedKey;
var is_active
ilosc_poz = 2
zycie = 5
player_can_walk = true
Object.defineProperty(window, '_poziom_', {
        get: function() { // wczytuje wartość zmiennej _poziom_ bezpośrednio z HTML
            return Number(document.getElementById('levels').value)
        },
        set: function (value) { // zapisuje nowy poziom do HTML
            document.getElementById('levels').value = value
        }
    }
)

//ta funkcja na dole jest do tworzenai mapek
function startgame() {
    makeLevel();
    //map_wczytaj()
    document.getElementById("coin_score").innerHTML = 0
    next_lifeup = 500
    document.getElementById("overall_score").innerHTML = '000000'
    document.getElementById('time').innerHTML = Infinity
};
function makeLevel() {
    restart = true
    width = document.getElementById('szerokosc_plansza').value
    heigth = document.getElementById('wysokosc_plansza').value
    document.getElementById("coin_score").innerHTML = 0
    var bricks = document.getElementById('bricks')
    bricks.style.width = 20 * heigth+ 'px'
    bricks.style.height = 20 * width + 'px'
    bricks.innerHTML = ''
    for (var i = 0; i < width; i++) {
        for (var j = 0; j < heigth; j++) {

            var bri = document.createElement("bri");
            bricks.appendChild(bri)

            bri.style.opacity = 0
            bri.style.top= i * 20+ "px"
            bri.style.left= j * 20+"px"
            bri.id = i + "_" + j
            bri.className = 'czysto'
        }

    }
    var random = Array.from(document.getElementsByTagName("bri"))
    shuffle(random)
    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }
    var i = random.length -1
    var interval_scoreboard = setInterval(function () {
        if ( i >= 0) {
            random[i].style.opacity = '1'
            random[i-1].style.opacity = '1'
            i -= 2
            player_can_walk = false
            document.getElementById("scoreboard2").style.display = 'flex'
            document.getElementById("scoreboard").style.display = 'none'
        } else {
            //var poz = document.querySelector('.gracz').id.split('_')
            player_can_walk = true
            document.getElementById("scoreboard2").style.display = 'none'
            document.getElementById("scoreboard").style.display = 'flex'
            clearInterval(interval_scoreboard)
            restart = false

        }
    }, 6)



    poz_gracza_x = 8
    poz_gracza_y = 0


    bri = document.getElementById(poz_gracza_x + '_' + poz_gracza_y);
    bri.className = 'gracz'

    var kloc =  document.getElementById((poz_gracza_x + 1) + '_' + poz_gracza_y );
    kloc.className = 'dirt'

}

function zbierz_monete() {
    var snd = new Audio("sound/getGold.ogg"); // buffers automatically when created
    snd.play();
    snd.volume = 0.04
    document.getElementById("coin_score").innerHTML++
    document.getElementById("overall_score").innerHTML = zeroes(Number(document.getElementById("overall_score").innerHTML) + Number(pkt_coin.innerHTML), 6)
    var coin_score = document.getElementById('coin_score')
    lifeup()
    //funkcja dodająca zera do wyniku
    function zeroes(n, width, z) {
        z = z || '0';
        n = n + '';
        return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
    }

    if (document.getElementById("coin_score").innerHTML == Number(document.getElementById('required_coins').innerHTML)) {
        document.documentElement.style.backgroundColor = 'white'
        setTimeout(function () { document.documentElement.style.backgroundColor = '#190c6b' }, 250)

        var snd = new Audio("sound/goldFinish.ogg"); // buffers automatically when created
        snd.play();
        snd.volume = 0.04

        switch (_poziom_) {
            case 1:
                if (coin_score.innerHTML == '6') {
                    pkt_coin.innerHTML = '250'
                   // document.getElementById('coin_img').innerHTML = '<img style="display:inline" src="tekstures/coin.gif" /><img style="display:inline" src="tekstures/coin.gif" /><img style="display:inline" src="tekstures/coin.gif" />'
                    //document.getElementById('required_coins').innerHTML = document.getElementById('pkt_coin').innerHTML
                   // document.getElementById('pkt_coin').innerHTML = ' '
                document.getElementById('0_18').className = 'teleport'
                document.getElementById('1_18').className = 'ladder'
                document.getElementById('2_18').className = 'ladder'
                document.getElementById('3_18').className = 'ladder'


                }
                break
            case 2:
                if (coin_score.innerHTML = '8') {
                    pkt_coin.innerHTML = '250'
                    document.getElementById('4_27').className = 'teleport'
                    document.getElementById('5_27').className = 'teleport'
                }
                break
             case 3:
                if (coin_score.innerHTML = '7') {
                    pkt_coin.innerHTML = '250'
                    document.getElementById('0_27').className = 'teleport'
                    document.getElementById('1_27').className = 'ladder'
                    document.getElementById('2_27').className = 'ladder'

                }
                break
             case 4:
                if (coin_score.innerHTML = '7') {
                    pkt_coin.innerHTML = '250'
                    document.getElementById('0_9').className = 'teleport'
                    document.getElementById('1_9').className = 'ladder'
                    document.getElementById('2_9').className = 'ladder'
                    document.getElementById('3_9').className = 'ladder'
                    document.getElementById('4_9').className = 'ladder'
                    document.getElementById('5_9').className = 'ladder'
                    document.getElementById('6_9').className = 'ladder'
                    document.getElementById('7_9').className = 'ladder'


                }
                break

        }
    }
}

function kolizja(bri) {
    switch (bri.className) {
        case "ladder":

            return true;
            break;
        case "ladder_top":

            return true;
            break;
        case "hole":

            return true;
            break;
        case "horizontal_line":

            return true;
            break;
        case "dirt":

            return false;
            break;
        case "czysto":
            var pos_kam = bri.id.split('_')
             var gracz_nadole = document.getElementById((Number(pos_kam[0])+1) + '_' + pos_kam[1]) || {className: ''}
             // var gracz_nagorze = document.getElementById((Number(pos_kam[0]) - 1) + '_' + pos_kam[1]) || { className: '' }

            if (gracz_nadole.className== "dirt"  || gracz_nadole.className== "czysto" || gracz_nadole.className== "coin" || gracz_nadole.className== "hole" || gracz_nadole.className== "horizontal_line" || gracz_nadole.className== "obsidian" || gracz_nadole.className== "enemy" || gracz_nadole.className== "recoveringEnemy") {
                return true;
            }
            else{
                return false
            }
            break;

        case "coin":
            zbierz_monete()
            return true;
            break;
        case "enemy":
            break;
        case "obsidian":
            return false
            break;
        case "cobble":
            return false
            break;
        case "teleport":
            restart = true
            var snd = new Audio("sound/pass.ogg"); // buffers automatically when created
            snd.play();
            snd.volume = 0.04

            var score = document.getElementById('overall_score')

            var interval = setInterval(function () {
                if (time.innerHTML > 0) {
                    player_can_walk = false // YOU SHALL NOT PASS HERE TOO
                    score.innerHTML = zeroes(Number(score.innerHTML) + 1, 6)
                    time.innerHTML--
                    lifeup()
                    score.innerHTML++
                } else {
                    clearInterval(interval)
                    map_wczytaj(document.getElementById("level").value)
                    //alert("poziom " + _poziom_ + "!")

                }
            }, 28)
            _poziom_++

            return true;
            break;
        case "explosion":
            return true
            break
    }
}
function startGameLoop() {
    setInterval(move, 175);
}
var pressedKey = new Set
function registerKey(event) {
    currentlyPressedKey = event.which;
    pressedKey.add(event.which)
    //console.log('keydown' + event.which)
}

function releaseKey(event) {
    //console.log('keyup' + event.which)

    pressedKey.delete(event.which)
    if (pressedKey.size == 0) {
        currentlyPressedKey = null;
    }
}
function move(event){
    var key = currentlyPressedKey
    //console.log(currentlyPressedKey)
    if (player_can_walk == false) {
        return
    }
    if (document.querySelector('.gracz') && document.querySelector('.gracz').spada) {
        return
    }
    //87 - w , 83 -s, 65 -a, 68 - d
    switch (key){
        case 87:
            document.querySelector('.gracz').style.backgroundImage = ''
            var nowy_x = poz_gracza_x -1;
            var nowy_y = poz_gracza_y - 0;
            bricks.style.opacity = 1;
            var czy_isc = true;
            restart = false
            break;
        case 83:
            document.querySelector('.gracz').style.backgroundImage = ''
            var nowy_x = poz_gracza_x +1;
            var nowy_y = poz_gracza_y - 0;
            bricks.style.opacity = 1;
            var czy_isc = true;
            restart = false
            break;
        case 65:
            document.querySelector('.gracz').style.backgroundImage = ''
            // var player_teksture = 'url(tekstures/player_left.gif)'
            var nowy_x = poz_gracza_x - 0;
            var nowy_y = poz_gracza_y - 1;
            bricks.style.opacity = 1;
            var czy_isc = true;
            restart = false
            break;
        case 68:
            document.querySelector('.gracz').style.backgroundImage = ''
            // var player_teksture = 'url(tekstures/player_right.gif)'
            var nowy_x = poz_gracza_x - 0;
            var nowy_y = poz_gracza_y + 1;
            bricks.style.opacity = 1;
            var czy_isc = true;
            restart = false
            break;
        case 37: // lewo
            var kam_obok_pod = document.getElementById((poz_gracza_x + 1) + '_' + (poz_gracza_y - 1))
            var kam_obok_pod_nad = document.getElementById((poz_gracza_x) + '_' + (poz_gracza_y - 1))
            if (kam_obok_pod.className == "dirt" && (kam_obok_pod_nad.className === 'czysto' || kam_obok_pod_nad.className === 'hole')) {
                var snd = new Audio("sound/dig.ogg"); // buffers automatically when created
                snd.play();
                snd.volume = 0.04
                kam_obok_pod.className = 'hole'
                setTimeout(function() {
                    if (kam_obok_pod.className == "gracz") {
                        gameover()
                    }
                    if (kam_obok_pod.className == "recoveringEnemy") {
                        random(document.querySelectorAll('[id^="0_"].czysto')).className = 'bankrupt enemy'
                    }
                    kam_obok_pod.className = 'dirt'
                }, 10000)
            }
            break;
        case 39: // prawo
            var kam_obok_pod = document.getElementById((poz_gracza_x + 1) + '_' + (poz_gracza_y + 1))
            var kam_obok_pod_nad = document.getElementById((poz_gracza_x) + '_' + (poz_gracza_y + 1))
            if (kam_obok_pod.className == "dirt" && (kam_obok_pod_nad.className === 'czysto' || kam_obok_pod_nad.className === 'hole')) {
                var snd = new Audio("sound/dig.ogg"); // buffers automatically when created
                snd.play();
                snd.volume = 0.04
                kam_obok_pod.className = 'hole'
                setTimeout(function() {
                    if (kam_obok_pod.className == "gracz") {
                        gameover()
                    }
                    if (kam_obok_pod.className == "recoveringEnemy") {
                        random(document.querySelectorAll('[id^="0_"].czysto')).className = 'bankrupt enemy'
                    }
                    kam_obok_pod.className = 'dirt'
                }, 10000)
            }

            break;
        case 27:
            restart = true
            break

        default:

            //console.log(key)
            return;
            break;
    }
    //event.preventDefault()
        var pod = document.getElementById(`${poz_gracza_x + 1}_${poz_gracza_y}`)
        if (pod.className === 'hole') return
        var _bri = document.getElementById(nowy_x + '_' + nowy_y)
        if (_bri != null && kolizja(_bri)) {
            if (czy_isc) {
                if (_bri.className == "coin") {
                    _bri.className = "czysto"
                }

                var star_poz = document.getElementById(poz_gracza_x + '_' + poz_gracza_y)
                idz_proste(star_poz, nowy_y - poz_gracza_y, nowy_x - poz_gracza_x, 175)
                // _bri.className = 'gracz'
                // // _bri.style.backgroundImage = player_teksture || ''

                // star_poz.className = star_poz.poprzedni || "czysto"

                poz_gracza_y = nowy_y;
                poz_gracza_x = nowy_x;
            }
            else {
                _bri.className = 'czysto'
            }
        }

}
function edytor(event){
    if (event.buttons === 0) {
        edycja = false
    }
    if(event.target!==event.currentTarget && edycja && document.getElementById("admin_tools").checked) {  // MAGICZNY IF
        var objekciki = document.getElementById('objekciki').value
        //console.log(objekciki)
        event.target.className = objekciki;
    }
}

var kierunki = {
    "1,0": "prawo",
    "-1,0": "lewo",
    "0,-1": "gora",
    "0,1": "dol"
}

var z_kurwa_index = 0

function idz_proste(enemy, movX, movY, time) {
    if (player_can_walk == false) {
        return
    }
    var [y, x] = enemy.id.split('_').map(Number)
    var target = document.getElementById(`${y+movY}_${x+movX}`)
    target.poprzedni = target.className
    target.className = enemy.className
    enemy.className = enemy.poprzedni || 'czysto'
    enemy.poprzedni = target.poprzedni
    enemy.style.animation = null
    target.style.animation = time + 'ms linear ' + kierunki[[movX, movY]]
    target.style.zIndex = ++z_kurwa_index
}

function idz(enemy, movX, movY) {
	if (player_can_walk == false) {
        return
    }
    var [y, x] = enemy.id.split('_').map(Number)
    var target = document.getElementById(`${y+movY}_${x+movX}`)
    if (movY === 0 && (!target || target.classList.includes('dirt') || target.classList.includes('obsidian'))) {
        movX *= -1
        enemy.classList.remove('right')
        enemy.classList.remove('left')
    }
    if (target.classList.includes('enemy')) {
        target.classList.remove("goWherever")
        target.classList.remove('left')
        target.classList.remove('right')
        enemy.classList.remove("goWherever")
        enemy.classList.remove('left')
        enemy.classList.remove('right')
        return
    }
    if (target.className === 'coin') {
        if (enemy.classList.includes('bankrupt')) {
            target.className = 'czysto'
            enemy.classList.remove('bankrupt')
        }
    }
    if (target.className === 'gracz') {
        gameover()
    }else{
    	idz_proste(enemy, movX, movY, 225)
    }

}
function sprobujIscPoziomo(enemy) {
    if (player_can_walk == false) {
        return
    }
    var [y, x] = enemy.id.split('_').map(Number)

    // console.log('poziomo')
    // if (poz_gracza_y === x) return false
    if (enemy.classList.includes('goWherever')) {
        if (enemy.classList.includes('right')) {
            idz(enemy, 1, 0)
            return true
        }
        if (enemy.classList.includes('left')) {
            idz(enemy, -1, 0)
            return true
        }
    }
    if (poz_gracza_y > x) {
        var movement = 1
        enemy.classList.add('right')
        enemy.classList.remove('left')
    } else if (poz_gracza_y < x) {
        var movement = -1
        enemy.classList.add('left')
        enemy.classList.remove('right')
    } else return false
    var target = document.getElementById(`${y}_${x+movement}`)
    //console.log(target)
    if (['czysto', 'horizontal_line', 'coin', 'ladder', 'gracz', 'ladder_top'].indexOf(target.className) > -1) {
        idz(enemy, movement, 0)
        return true
    }
}

function sprobujIscPionowo(enemy) {
    if (player_can_walk == false) {
        return
    }
    var [y, x] = enemy.id.split('_').map(Number)
    if (poz_gracza_x === y) return false
    // console.log(poz_gracza_x > y)
    if (poz_gracza_x > y) {
        var nad = document.getElementById(`${y+1}_${x}`)
        if (nad.className === 'ladder' || nad.className === 'ladder_top' || nad.className === 'czysto' || nad.className === 'gracz' ) {
            idz(enemy, 0, 1)
            return true
        }
    } else if (poz_gracza_x < y) {
        var pod = document.getElementById(`${y-1}_${x}`)
        if (pod.className === 'ladder' || pod.className === 'ladder_top' ||pod.className === 'gracz' || pod.className === 'horizontal_line') {
            idz(enemy, 0, -1)
            return true
        }
    }
}
function enemiesAI() {
	if (player_can_walk == false) {
        return
    }

    var enemies = document.querySelectorAll('.enemy')

    for (var enemy of Array.from(enemies)) {
        if (enemy.spada) continue

        var [y, x] = enemy.id.split('_').map(Number)
        var nad = document.getElementById(`${y-1}_${x}`)
        if (nad && nad.classList.includes('enemy')) {
            continue
        }

        switch (enemy.poprzedni) {
            case 'ladder':
            case 'ladder_top':
                enemy.classList.remove('goWherever')
                sprobujIscPionowo(enemy) || sprobujIscPoziomo(enemy)
                break
            case 'horizontal_line':
                enemy.classList.remove('goWherever')
                sprobujIscPoziomo(enemy) || sprobujIscPionowo(enemy)
                break
            default:
                sprobujIscPionowo(enemy)
                if (!sprobujIscPoziomo(enemy)) {
                    enemy.className += ' goWherever'
                    if (!enemy.classList.includes('right') && !enemy.classList.includes('left')) {
                        enemy.classList.add(random(['right', 'left']))
                    }
                    sprobujIscPoziomo(enemy)
                }
                break
        }
    }

}

function random(x){
    return x[Math.floor(x.length * Math.random())]
}

setInterval (spadaj, 225)

function spadaj() {
    if (restart) {
        return
    };
    var entities = document.querySelectorAll(".enemy, .gracz")


    for (var i = entities.length - 1; i >= 0; i--) {
        // because we dont want mess with gravity
        // making its working for fuck sake!!! DONT TOUCH IT! YOU!!!!!!
        if (player_can_walk == false) {
            return
        }
        //if (restart) {
        //    return
        //}
        const entity = entities[i]
        var position_entity  = entity.id.split('_');//dzieli id na dwie zmienne
        //wybieranie id elementu ponizej
        const pod = document.getElementById(Number(position_entity[0]) + 1 + '_' + position_entity[1]) || { className: '' }
        //console.log (entity.poprzedni)
        if ((pod.className == "czysto" || pod.className == "horizontal_line" || pod.className == "hole" || pod.className == "coin") && entity.poprzedni !== "horizontal_line" || pod.className == "ladder_top") {
            if (entity.className == "gracz") {
                [poz_gracza_x, poz_gracza_y] = pod.id.split('_').map(Number)
                if (pod.className === 'coin') {
                    //
                    zbierz_monete()
                    pod.className = 'czysto'
                }

            }
            if (entity.classList.includes('enemy') && pod.className === 'hole') {
                var snd = new Audio("sound/trap.ogg"); // buffers automatically when created
                snd.play();
                snd.volume = 0.04
                var drop = !entity.classList.includes('bankrupt')
                entity.className = 'recoveringEnemy'
                setTimeout(function() {
                    if (pod.className === 'recoveringEnemy') {
                        pod.style.animation = '1s linear shake'
                    }
                }, 4000)
                setTimeout(function() {
                    pod.style.animation = null
                    if (pod.className === 'recoveringEnemy') {
                        pod.className = 'bankrupt enemy'
                        idz(pod, 0, -1)
                        // if (!sprobujIscPoziomo(entity)) {
                        //     entity.classList.add('goWherever')
                        //     if (!entity.classList.includes('right') && !entity.classList.includes('left')) {
                        //         entity.classList.add(random(['right', 'left']))
                        //     }
                        //     sprobujIscPoziomo(entity)
                        // }
                        pod.className = 'tempwall'
                    }
                }, 5000)
            }

            // pod.poprzedni = pod.className
            // pod.className = entity.className
            // entity.className = entity.poprzedni || "czysto"
            idz_proste(entity, 0, 1, 225)
            if (drop) {
                entity.className = 'coin'
            }
            pod.spada = true
        } else {
            // snd.pause();
            entity.spada = false
        }


        if (entity.className != 'gracz' && entity.className != 'enemy') {
            continue
        }

        //funkcja losujaca w ktora stronie spadnie kamien
        // var x = [1, -1]

        // var rand_x = random(x)
        //wybieranie id dla kamienia spadajacego z kamienia
        // var kam_obok = document.getElementById(position_entity[0] + '_' + ((Number(position_entity[1]) + rand_x)))
        // var kam_obok_nad = document.getElementById((Number(position_entity[0]) - 1) + '_' + ((Number(position_entity[1]) + rand_x)))
        // var kam_obok_pod = document.getElementById((Number(position_entity[0]) + 1) + '_' + ((Number(position_entity[1]) + rand_x)))
        // sprawdzanie nad kamienie_monetym
        // var kam_nagorze = document.getElementById((Number(position_entity[0]) - 1) + '_' + position_entity[1]) || { className: '' }
        //spadanie kamienia gdy jest w powietrzu

    };
    enemiesAI()
    for (var tempwall of Array.from(document.querySelectorAll('.tempwall'))) {
        tempwall.className = 'hole'
    }
}
function Position(y, x) {
    this[0] = Number(y)
    this[1] = Number(x)
}
Position.prototype = {
    add:function(other){
        return new Position(this[0] + Number(other[0] || 0), this[1] + Number(other[1] || 0))
    },
    get:function(){
        return document.getElementById(this[0] + '_' + this[1])
    }
}
setInterval(enemy, 150)
function enemy() {
    if (restart) { return }
    var allenemy = document.querySelectorAll('.firefly, .butterfly')
    for (var i = allenemy.length - 1; i >= 0; i--) {
        enemy_wall(allenemy[i])
    }
}

function move_one(enemy, direction) {
    var enemy_poz = enemy.id.split('_')
    var new_position = (new Position(enemy_poz[0], enemy_poz[1])).add(direction).get()
    if (new_position.className == 'czysto') {
        new_position.className = enemy.className
        enemy.className = 'czysto'
        return new_position
    }
    else if (new_position.className == 'gracz') {
        coin_explosion(new_position.id.split('_'), 'czysto')
        gameover()
    }
    else if (new_position.className == 'bio_mass') {
        if (enemy.className == 'firefly') {
            coin_explosion(enemy_poz, 'czysto')
        }
        else if (enemy.className == 'butterfly'){
            coin_explosion(enemy_poz, 'coin')
        }
    }
}

function enemy_wall(enemy) {
    if (enemy.className == 'firefly') {
        var attached_direction = +1
        var blocked_direction = +3
    }
    else if (enemy.className == 'butterfly') {
        var attached_direction = +3
        var blocked_direction = +1
    }
    else {
        throw 'jajco'
    }
    var attached_to = ((enemy.direction || 0) + attached_direction) % 4
    var new_square

    if (new_square = move_one(enemy, dir_to_pos[attached_to])) {
        new_square.direction = attached_to
    }
    else if (new_square = move_one(enemy, dir_to_pos[enemy.direction || 0])) {
        new_square.direction = enemy.direction
    } else {
        enemy.direction = ((enemy.direction || 0) + blocked_direction) % 4
    }
}

var dir_to_pos = [
	new Position(0, 1),
	new Position(-1, 0),
	new Position(0, -1),
	new Position(1, 0)
]

function gameover() {
    var snd = new Audio("sound/dead.ogg"); // buffers automatically when created
                snd.play();
                snd.volume = 0.04

        document.getElementById('life').innerHTML = zycie - 1
        zycie--
        //alert('umar, zostało ci ' + zycie + ' żyć!')

        if (zycie == 0) {
            document.getElementById('getttttttttttt_dunked_on').style.display = 'inline'
            document.getElementById('life').innerHTML = 3
            _poziom_ = 1
            zycie = 3
            //map_wczytaj(document.getElementById("level").value)
            next_lifeup = 500
            document.getElementById("overall_score").innerHTML = '000000'
        }
    document.querySelector('.gracz').className = 'explosion'
    player_can_walk = false
    if (document.getElementById('time').innerHTML === '0')
        map_wczytaj(document.getElementById("level").value)
    else {
        setTimeout(map_wczytaj, 3000, document.getElementById("level").value)
    }
}

function coin_explosion(poz_gra, typ) {
    var wokol_gracz = [
        document.getElementById(Number(poz_gra[0]) + '_' + poz_gra[1]) || {},
        document.getElementById(Number(poz_gra[0]) + 1 + '_' + poz_gra[1]) || {},
        document.getElementById(Number(poz_gra[0]) + -1 + '_' + poz_gra[1]) || {},
        document.getElementById(Number(poz_gra[0]) + 1 + '_' + (Number(poz_gra[1]) + 1)) || {},
        document.getElementById(Number(poz_gra[0]) + 1 + '_' + (Number(poz_gra[1]) - 1)) || {},
        document.getElementById(Number(poz_gra[0]) - 1 + '_' + (Number(poz_gra[1]) + 1)) || {},
        document.getElementById(Number(poz_gra[0]) - 1 + '_' + (Number(poz_gra[1]) - 1)) || {},
        document.getElementById(poz_gra[0] + '_' + (Number(poz_gra[1]) + 1)) || {},
        document.getElementById(poz_gra[0] + '_' + (Number(poz_gra[1]) - 1)) || {}
    ]
    document.getElementById(poz_gra[0]+'_'+poz_gra[1]).style.backgroundImage = ''
    for (var i = 0; i < wokol_gracz.length; i++) {
        if (wokol_gracz[i].className == 'gracz') {
            //document.getElementById("coin_score").innerHTML++
        }
        else if (wokol_gracz[i].className != 'obsidian' ) {
            wokol_gracz[i].className = 'explosion'

        }


    }
    setTimeout(function () {
        for (var i = 0; i < wokol_gracz.length; i++) {

            if (wokol_gracz[i].className == 'gracz') {
                if (typ == 'coin')
                    document.getElementById("coin_score").innerHTML++
            }
            else if (wokol_gracz[i].className == 'obsidian') {
                //emm
            }
            else wokol_gracz[i].className = typ

        }
    }, 600)
}

function map_zapisz() {
    var map = []
    for (var i = 0; i < width; i++) {
        map[i] = []
        for (var j = 0; j < heigth; j++) {
            map[i][j] = document.getElementById(i + "_" + j).className
        }
    }
    return JSON.stringify(map)
}

function map_wczytaj(s) {
    var required_coins = document.getElementById('required_coins')

        pkt_coin = document.getElementById('pkt_coin')
    if (_poziom_ == 21) {
        _poziom_ = 1
    }
    switch (_poziom_) {
        case 1:
            pkt_coin.innerHTML = '250'
            required_coins.innerHTML = '6'
            break
        case 2:
            pkt_coin.innerHTML = '250'
            required_coins.innerHTML = '8'
            break
        case 3:
            pkt_coin.innerHTML = '250'
            required_coins.innerHTML = '7'
            break
        case 4:
            pkt_coin.innerHTML = '250'
            required_coins.innerHTML = '7'
            break

    }

        // snd_start = new Audio("audio/start.ogg"); // buffers automatically when created
        // snd_start.play()
        // snd_start.volume = 0.04

        var treeData;
        var oReq = new XMLHttpRequest();
        oReq.onload = reqListener;
        var str_level = 'levels/level_'+_poziom_+'.txt'
        oReq.open("get", str_level, true);
        oReq.send();

        function reqListener(e) {
            map = JSON.parse(this.responseText);
            document.getElementById('wysokosc_plansza').value = map[0].length
            document.getElementById('szerokosc_plansza').value = map.length
            makeLevel()
            for (var i = 0; i < width; i++) {
                for (var j = 0; j < heigth; j++) {
                    if (map[i][j] === 'enemy') map[i][j] = 'bankrupt enemy'
                    if (map[i][j] === 'trap') {
                        document.getElementById(i + "_" + j).className = 'czysto'
                        document.getElementById(i + "_" + j).style.backgroundImage =  "url('tekstures/dirt.png')";
                    } else
                    document.getElementById(i + "_" + j).className = map[i][j]
                }
            }
            var gracz = document.querySelector('.gracz')
            var gra = gracz.id.split('_')

            poz_gracza_x = Number(gra[0])
            poz_gracza_y = Number(gra[1])
            bri = gracz
        }
}

function admin_tool() {
    if (document.getElementById("admin_tools").checked == false) {
        document.getElementById("zapisz").style.display = 'inline'
        document.getElementById("level").style.display = 'inline'
        document.getElementById("objekciki").style.display = 'inline'
        document.getElementById("wysokosc_plansza").style.display = 'inline'
        document.getElementById("szerokosc_plansza").style.display = 'inline'
        document.getElementById("start").style.display = 'inline'
    }
    // if (document.getElementById("admin_tools").checked == false) {
    //     document.getElementById("level").style.display = 'none'
    //     document.getElementById("objekciki").style.display = 'none'
    //     document.getElementById("wysokosc_plansza").style.display = 'none'
    //     document.getElementById("szerokosc_plansza").style.display = 'none'
    //     document.getElementById("start").style.display = 'none'
    //     document.getElementById("zapisz").style.display = 'none'
    // }
}

function lifeup() {
    var score = Number(document.getElementById("overall_score").innerHTML)
    while (score >= next_lifeup) {
        document.getElementById('life').innerHTML = zycie + 1
        next_lifeup += 500
        zycie++
    }

}
// function highscore(){
//     $.ajax({
//                     type: "POST",
//                     url: "http://projekty.propanek.tk/boulderdash/loadhighscore.php",
//                     dataType: 'text',
//                     success: function (response) {

//                          var ar = response
//                          var obj_um = JSON.parse(ar)
//                          console.log(obj_um)
//                          tab_div = []
//                        for(var i = 0; i < obj_um.length; i++ ){
//                             var div = $("<div class='hover' id='player_" + i+"' >"+ obj_um[i].name +": <br>"+ obj_um[i].highscore + '</div>')
//                             tab_div.push(div)
//                         }
//                         for(var i =0; i< tab_div.length; i++){
//                                     $('#highscore').append(tab_div[i])
//                         }
//                     },
//                     error: function(xhr){
//                         alert("błąd" + xhr.responseText)
//                     }
//                 })
// }
