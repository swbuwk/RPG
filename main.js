class Game {
    constructor() {
        this.choice = 0
        this.newRound = 0
        this.round = -1
        this.turn = 0
        this.world = -1
        this.enemiesCount=15
        this.worldsCompl = [0,0,0]
        this.enemies = [
            [
            {
                name: "Большой жук",
                hp: 25,
                maxhp: 25,
                dmg: 3,
                hitch: 0.8,
                critch: 0.2,
                def: 0,
                image: "img/enemies/bug.png",
            },
            {
                name: "Мужчина с вилой",
                hp: 35,
                maxhp: 50,
                dmg: 10,
                hitch: 0.8,
                critch: 0.3,
                def: 10,
                image: "img/enemies/man-with-fork.png",
            },
            {
                name: "Рыцарь",
                hp: 100,
                maxhp: 100,
                dmg: 15,
                hitch: 0.8,
                critch: 0,
                def: 20,
                image: "img/enemies/unknownknight.png",
            },            {
                name: "Колдун",
                hp: 100,
                maxhp: 100,
                dmg: 35,
                hitch: 0.9,
                critch: 0.2,
                def: 10,
                image: "img/enemies/mage.png",
            },
            {
                name: "Каменный великан",
                hp: 300,
                maxhp: 1000,
                dmg: 45,
                hitch: 0.75,
                critch: 0.1,
                def: 0,
                image: "img/enemies/giant.png",            
            },
            
            ],
            [
            {
                name: "Огненный скорпион",
                hp: 150,
                maxhp: 150,
                dmg: 45,
                hitch: 0.85,
                critch: 0.2,
                def: 15,
                image: "img/enemies/scorpyo.png",
            },
            {
                name: "Разъяренная мумия",
                hp: 300,
                maxhp: 500,
                dmg: 65,
                hitch: 0.65,
                critch: 0.05,
                def: 20,
                image: "img/enemies/mummy.png",
            },
            {
                name: "Огромный сфинкс",
                hp: 400,
                maxhp: 400,
                dmg: 55,
                hitch: 1,
                critch: 0.15,
                def: 55,
                image: "img/enemies/sphinx.png",
            },
            {
                name: "Фараон на колеснице",
                hp: 500,
                maxhp: 500,
                dmg: 90,
                hitch: 0.35,
                critch: 0,
                def: 50,
                image: "img/enemies/pharaoh.png",
            },
            {
                name: "Египетский Мау",
                hp: 1000,
                maxhp: 1000,
                dmg: 60,
                hitch: 1,
                critch: 0.3,
                def: 100,
                image: "img/enemies/mau.png",
            },
            ],
            [
            {
                name: "Ледяная нежить",
                hp: 400,
                maxhp: 400,
                dmg: 70,
                hitch: 0.8,
                critch: 0.3,
                def: 70,
                image: "img/enemies/frozen-skel.png",
            },
            {
                name: "Злющий снеговик",
                hp: 500,
                maxhp: 500,
                dmg: 95,
                hitch: 1,
                critch: 0.1,
                def: 50,
                image: "img/enemies/snowman.png",
            },
            {
                name: "Йети",
                hp: 800,
                maxhp: 1200,
                dmg: 85,
                hitch: 0.5,
                critch: 0,
                def: 150,
                image: "img/enemies/yeti.png",
            },
            {
                name: "Морозный дракон",
                hp: 1000,
                maxhp: 1000,
                dmg: 100,
                hitch: 1,
                critch: 0.3,
                def: 100,
                image: "img/enemies/frozen-dragon.png",
            },
            {
                name: "Ледяной Король ДЖАМАЛ",
                hp: 1000,
                maxhp: 1000,
                dmg: 75,
                hitch: 1,
                critch: 0.1,
                def: 150,
                image: "img/enemies/JAMAL-king.png",
            }
            ]
        ]
    }

    create_message(message) {
        let div = document.createElement('div')
        div.innerHTML = message
        div.classList.add("historytext")
        document.body.querySelector("#history").prepend(div)
    }

    create_prompt([title,desc]) {
        document.querySelector("#prompTitle").innerHTML = `${title}`
        document.querySelector("#promptDesc").innerHTML = `${desc}`
        document.querySelector("#prompt").classList.remove("Abshidden")
    }

    hide_all() {
        document.querySelectorAll(".menu").forEach(el => el.classList.add("Abshidden"))
    }

    to_island_menu() {
        game.hide_all()
        document.querySelector(".island-menu").classList.remove("Abshidden")
        document.body.style = 'background-image: url(img/bg1.jpg)'
    }

    to_island() {
        document.querySelector(".island-menu").classList.add("Abshidden")
        document.querySelector(".fight-menu").classList.remove("Abshidden")
        document.querySelector("#game_to_menu").classList.add("Abshidden")
        game.new_game()
    }

    next_round() {
        this.turn=0
        myWar.healCooldown=4
        myWar.rageCooldown=6
        myWar.posionDebuffDur=0
        enemyWar.posionDebuffDur=0
        myWar.freezeDebuffDur=0
        enemyWar.freezeDebuffDur=0
        game.round ++
        if (myWar.hp === 0 || game.round>=game.enemies[game.world].length) {
            if (myWar.hp>0) {
                document.querySelectorAll(".island")[game.world].querySelector("#isCompl").innerHTML = "Пройдено!"
                document.querySelectorAll(".island")[game.world].querySelector("#isCompl").style="color: springgreen;"
                game.worldsCompl[game.world]=1
                if (game.worldsCompl.every(function(el) {
                    return el === 1;
                })) {
                    document.querySelector("#choose_plz").innerHTML = "Чел харош))"
                    document.querySelector("#choose_plz").style="color: #52ff6f"
                }
            } else {
                document.querySelectorAll(".island")[game.world].querySelector("#isCompl").innerHTML = `Пройдено ${game.round-1}/${game.enemies[game.world].length}`
            }
            game.to_island_menu()
        } else {
            let otherWorldBuff = game.worldsCompl[0]*game.enemies[0].length + game.worldsCompl[1]*game.enemies[1].length + game.worldsCompl[2]*game.enemies[2].length
            myWar = new Warrior(
                warName.value,
                baseWar.hp*(otherWorldBuff+game.round+1),
                baseWar.maxhp*(otherWorldBuff+game.round+1),
                baseWar.dmg*(otherWorldBuff+game.round+1),
                baseWar.hitch+0.25*((otherWorldBuff+game.round+1)/game.enemiesCount),
                baseWar.critch+0.5*((otherWorldBuff+game.round+1)/(game.enemiesCount*2)),
                baseWar.def*(otherWorldBuff+game.round+1),
                "img/knight.png",
            )
            myWar.hp = myWar.maxhp
            document.querySelector("#action").style.transition = "0.4s"
            document.querySelector("#myOptions").classList.remove("hidden")
            enemyWar = new Warrior(
                game.enemies[game.world][game.round].name,
                game.enemies[game.world][game.round].hp,
                game.enemies[game.world][game.round].maxhp,
                game.enemies[game.world][game.round].dmg,
                game.enemies[game.world][game.round].hitch,
                game.enemies[game.world][game.round].critch,
                game.enemies[game.world][game.round].def,
                game.enemies[game.world][game.round].image,
            )
            document.querySelector("#enemyPic").src = enemyWar.image
            document.querySelector("#history").innerHTML = ""
            game.create_message(`РАУНД ${game.round + 1}  |  ${myWar.name} vs. ${enemyWar.name}`)
            game.update_counter()
        }
    }

    new_game() {
        if (myWar.hp===0) {
            myWar = baseWar
            game.newRound=0
        }
        game.round=-1
        game.next_round()
    }

    update_counter() {
        document.querySelector("#myName").innerHTML = myWar.name
        document.querySelector("#enemyName").innerHTML = enemyWar.name

        document.querySelector("#hpcd").style.width = `${100*(1-myWar.healCooldown/3)}%`
        document.querySelector("#ragecd").style.width = `${100*(1-myWar.rageCooldown/5)}%`

        document.querySelector("#myHp").value = myWar.hp
        document.querySelector("#enemyHp").value = enemyWar.hp

        document.querySelector("#myHpCount").innerHTML = `${myWar.hp} / ${myWar.maxhp}`
        document.querySelector("#enemyHpCount").innerHTML = `${enemyWar.hp} / ${enemyWar.maxhp}`
        document.querySelector("#myHp").style = `width: ${myWar.hp / myWar.maxhp * 100}%`
        document.querySelector("#enemyHp").style = `width: ${enemyWar.hp / enemyWar.maxhp * 100}%`

        document.querySelector("#myDmgCount").innerHTML = `DMG: ${myWar.dmg}`
        document.querySelector("#enemyDmgCount").innerHTML = `DMG: ${enemyWar.dmg}`

        document.querySelector("#myDefCount").innerHTML = `DEF: ${myWar.def}`
        document.querySelector("#enemyDefCount").innerHTML = `DEF: ${enemyWar.def}`

        document.querySelector("#myHitchCount").innerHTML = `HIT CHANCE: ${Math.round(myWar.hitch*100)}%`
        document.querySelector("#enemyHitchCount").innerHTML = `HIT CHANCE: ${enemyWar.hitch*100}%`

        document.querySelector("#myCritchCount").innerHTML = `CRIT CHANCE: ${Math.round(myWar.critch*100)}%`
        document.querySelector("#enemyCritchCount").innerHTML = `CRIT CHANCE: ${enemyWar.critch*100}%`
    }

    myTurn(option) {
        switch (option) {
            case "defUp":
                myWar.defbuff()
                break
            case "attack":
                myWar.attack(enemyWar)
                break
            case "dmgUp":
                myWar.dmgbuff()
                break
            case "heal":
                if (myWar.healCooldown>0) {
                    return
                } else {
                myWar.heal()
                break
                }
            case "rage":
                if (myWar.rageCooldown>0) {
                    return
                } else {
                myWar.rage()
                }
        }
        this.turn++
        if (enemyWar.hp>0) {
            myWar.posionDebuff("check", enemyWar, 0)
            myWar.freezeDebuff("check", enemyWar, 0)
        }
        if (myWar.healCooldown>0) myWar.healCooldown--
        if (myWar.rageCooldown>0) myWar.rageCooldown--
        game.update_counter()
        if (!this.newRound) {
            document.querySelectorAll(".button").forEach(el => el.style.transition = "0s")
            document.querySelector("#myOptions").classList.add("hidden")
            setTimeout(game.enemyTurn, 1500)
        }
        this.newRound = 0
    }

    enemyTurn() {
        if (enemyWar.healCooldown>0) enemyWar.healCooldown--
        this.choice = Math.random()
        if (this.choice < 0.2) {
            enemyWar.defbuff()
        } else if (0.2 <= this.choice && this.choice < (0.35 + (myWar.def >= enemyWar.dmg ? 0.3 : 0))) {
            enemyWar.dmgbuff()
        } else {
            enemyWar.attack(myWar)
            if ((enemyWar.name==="Огненный скорпион" || enemyWar.name==="Огромный сфинкс") && Math.random()<0.1 && myWar.posionDebuffDur===0) {
                enemyWar.posionDebuff("enemy", myWar, 5)
            }
            if (enemyWar.name==="Египетский Мау" && Math.random()<0.5 && myWar.posionDebuffDur===0) {
                enemyWar.posionDebuff("enemy", myWar, -1)
            }
            if (game.world===2 && Math.random()<(enemyWar.name === "Ледяной Король ДЖАМАЛ" ? 0.5 : 0.1) && myWar.freezeDebuffDur===0) {
                if (enemyWar.name === "Ледяной Король ДЖАМАЛ") {
                    enemyWar.freezeDebuff("enemy", myWar, -1)
                } else {
                    enemyWar.freezeDebuff("enemy", myWar, Math.round(2+3*Math.random()))
                }
            }
        }
        enemyWar.posionDebuff("check", myWar, 0)
        enemyWar.freezeDebuff("check", myWar, 0)
        if (myWar.hp!==0) {
            document.querySelector("#myOptions").classList.remove("hidden")
            document.querySelector("#action").style.transition = "0.4s"
        }
        game.update_counter()
    }
}

class Warrior {
    constructor(name, hp, maxhp, dmg, hitch, critch, def, image) {
        this.name = name
        this.hp = hp // hp...
        this.maxhp = maxhp
        this.dmg = dmg // damage
        this.hitch = hitch // hit chance
        this.critch = critch // crit chance
        this.def = def // defence
        this.image = image
        this.healCooldown = 3
        this.rageCooldown = 5
        this.isRage=0
        this.posionDebuffDur=0
        this.freezeDebuffDur=0
    }

    freezeDebuff(choice, enemy, dur) {
        if (choice === "check") {
            if (this.freezeDebuffDur!==0) {
                let debuff = Math.round(1+Math.round(Math.random())*2)
                this.dmg-=debuff
                this.def-=debuff
                this.hitch-=0.002
                this.critch-=0.001
                game.create_message(`${this.name} получает дебафф от заморозки! (${debuff} ед.)`)
                this.freezeDebuffDur--
            }
        } else if (choice === "enemy") {
            enemy.freezeDebuffDur=dur
            if (dur>0) {
                game.create_message(`${enemy.name} заморожен на ${dur} ходов!`)
            } else {
                game.create_message(`${enemy.name} заморожен... НАВЕЧНО!`)
            }
        }
    }

    posionDebuff(choice, enemy, dur) {
        if (choice === "check") {
            if (this.posionDebuffDur!==0) {
                let damage = Math.round(0.1*enemy.dmg-Math.random()*3)
                this.hp-=damage
                game.create_message(`${this.name} получает урон от отравления! (${damage} ед.)`)
                this.posionDebuffDur--
                if (this.hp<0) {
                    this.hp = 0
                    game.create_message(`${enemy.name} победил!`)
                    document.querySelectorAll(".button").forEach(el => el.style.transition = "0s")
                    document.querySelector("#myOptions").classList.add("hidden")
                    game.newRound = 1
                    setTimeout(game.next_round, 5000)
                }
            }
        } else if (choice === "enemy") {
            enemy.posionDebuffDur=dur
            if (dur>0) {
                game.create_message(`${this.name} отравил ${enemy.name} на ${dur} ходов!`)
            } else {
                game.create_message(`${this.name} отравил ${enemy.name}... НАВЕЧНО!`)
            }
            
        }
    }

    attack(enemy) {
        let damage = 0
        if (Math.random() < this.hitch) {
            if (Math.round(this.dmg - enemy.def ** 0.97) > 0) {
                if (Math.random() < this.critch) {
                    damage = Math.round(1.5 * ((this.isRage ? 2 : 1) * this.dmg - enemy.def ** 0.97))
                    game.create_message(`${this.name} нанес критический урон! (${damage} ед.)`)
                } else {
                    damage = Math.round((this.isRage ? 2 : 1) * this.dmg - enemy.def ** 0.97)
                    game.create_message(`${this.name} нанес ${damage} ед. урона`)
                }
                enemy.hp -= damage
            } else { game.create_message(`${this.name} не смог пробить броню противника!`) }
        } else {
            game.create_message(`${this.name} промазал...`)
        }
        this.isRage=0
        if (enemy === myWar) {
            document.querySelector("#enemyPic").classList.toggle("right-attack-anim")
            setTimeout(() => document.querySelector("#enemyPic").classList.toggle("right-attack-anim"), 500)
        } else {
            document.querySelector("#myPic").classList.toggle("left-attack-anim")
            setTimeout(() => document.querySelector("#myPic").classList.toggle("left-attack-anim"), 500)
        }
        if (enemy.hp <= 0) {
            enemy.hp = 0
            game.create_message(`${this.name} победил!`)
            document.querySelectorAll(".button").forEach(el => el.style.transition = "0s")
            document.querySelector("#myOptions").classList.add("hidden")
            game.newRound = 1
            setTimeout(game.next_round, 5000)
        }
    }

    defbuff() {
        game.create_message(`${this.name} повысил свою защиту! (${this.def} --> ${this.def += Math.round((game.world+1)**2.25) + Math.round(2*Math.random())} ед.)`)
    }

    dmgbuff() {
        game.create_message(`${this.name} повысил свой урон! (${this.dmg} --> ${this.dmg += Math.round((game.world+1)**2.25) + Math.round(3*Math.random())} ед.)`)
    }

    heal() {
        let heal = Math.round((Math.random()/5+0.9)*0.5*(this.maxhp-this.hp))
        game.create_message(`${this.name} восстановил ${heal} ед. здоровья`)
        this.hp += heal
        this.healCooldown = 4
    }

    rage() {
        game.create_message(`${this.name} использовал ярость! Его следующая атака нанесет удвоенный урон!`)
        this.isRage=1
        this.rageCooldown = 6
    }
}

const game = new Game()
let baseWar = new Warrior(
    warName.value,
    20,
    20,
    5,
    0.75,
    0,
    5,
    "img/knight.png",
    )
let myWar = baseWar
let enemyWar = new Warrior("", 1, 0, 0, 0, 0, 0, "")

document.querySelector("#confButton").onclick = () => {
    warName = document.querySelector("#warName")
    if (`${warName.value}`.length>=2) {
        document.querySelector("#startwind").classList.add("Abshidden")
        document.querySelector(".main-menu").classList.remove("Abshidden")
        myWar.name = warName.value
        document.querySelector(".hello").innerHTML = `Привет, ${myWar.name}!`
    } else {
        document.querySelector("#nameError").classList.remove("Abshidden")
    }
}

document.querySelector("#game_start").onclick = () => {
    game.hide_all()
    document.querySelector(".island-menu").classList.remove("Abshidden")
    document.querySelector("#game_to_menu").classList.remove("Abshidden")
}

document.querySelector("#game_to_menu").onclick = () => {
    game.hide_all()
    document.querySelector("#game_to_menu").classList.add("Abshidden")
    document.querySelector(".main-menu").classList.remove("Abshidden")
}

document.querySelector("#game_to_islands").onclick = () => {
    game.create_prompt(["Выйти?","Вы уверены, что хотите выйти в меню с островами? Весь ваш прогресс на этом острове будет утерян!"])
    document.querySelectorAll(".island")[game.world].querySelector("#isCompl").innerHTML = `Пройдено ${game.round}/${game.enemies[game.world].length}`
    document.querySelector("#promptYes").onclick = () => {
        document.querySelector("#prompt").classList.add("Abshidden")
    }
    document.querySelector("#promptNo").onclick = () =>{
        myWar.hp=0
        game.to_island_menu()
        document.querySelector("#game_to_menu").classList.remove("Abshidden")
        document.querySelector("#prompt").classList.add("Abshidden")
    }
}


document.querySelector("#game_help").onclick = () => {
    game.hide_all()
    document.querySelector(".help-menu").classList.remove("Abshidden")
    document.querySelector("#game_to_menu").classList.remove("Abshidden")
}

document.querySelector("#myattack").onclick = () => {
    game.myTurn("attack")
}

document.querySelector("#myDefUp").onclick = () => {
    game.myTurn("defUp")
}

document.querySelector("#myHeal").onclick = () => {
    game.myTurn("heal")
}

document.querySelector("#myRage").onclick = () => {
    game.myTurn("rage")
}

document.querySelector("#myDmgUp").onclick = () => {
    game.myTurn("dmgUp")
}

document.querySelectorAll(".island")[0].onclick = () => {
    game.world=0
    if (!game.worldsCompl[game.world]) {
        document.body.style = 'background-image: url(img/island1_bg.jpg)'
        game.to_island()
    }
}

document.querySelectorAll(".island")[1].onclick = () => {
    game.world=1
    if (!game.worldsCompl[game.world]) {
        document.body.style = 'background-image: url(img/island2_bg.jpg)'
        game.to_island()
    }
}

document.querySelectorAll(".island")[2].onclick = () => {
    game.world=2
    if (!game.worldsCompl[game.world]) {
        document.body.style = 'background-image: url(img/island3_bg.jpg)'
        game.to_island()
    }
}

document.querySelector("#action").onclick = () => {
    document.querySelector("#action").classList.toggle('action-option-active');
}