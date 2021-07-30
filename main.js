class Game {
    constructor() {
        this.choice = 0
        this.newRound = 0
        this.round = -1
        this.turn = 0
        this.enemies = [
            {
                name: "Большой жук",
                hp: 25,
                maxhp: 25,
                dmg: 3,
                hitch: 0.8,
                critch: 0.2,
                def: 0,
                image: "https://sun9-84.userapi.com/impg/uLkxmUCMVE3pHBXhtyvUjydRAO4kqHHEq7cPHg/lGnnZxgz4-Y.jpg?size=161x135&quality=96&sign=067a051c1c3441b5dad16a703aa48788&type=album",
            },
            {
                name: "Мужчина с вилкой",
                hp: 30,
                maxhp: 40,
                dmg: 10,
                hitch: 0.8,
                critch: 0.3,
                def: 10,
                image: "https://sun9-39.userapi.com/impg/19XUoLoGCumRzvMc2a5388rt2QTRlxEjOK5Otw/ywyX4k1-f5U.jpg?size=141x156&quality=96&sign=b7ce5a8992b881c3c92261699b643c3d&type=album",
            },
            {
                name: "Неизвестный рыцарь",
                hp: 100,
                maxhp: 100,
                dmg: 10,
                hitch: 0.8,
                critch: 0,
                def: 20,
                image: "https://sun9-29.userapi.com/impg/2mojjjSZeye0CVFuhLo02JH57KCJkMtIY9zcaA/YW1Zpf3gz-U.jpg?size=155x167&quality=96&sign=aff69e3f67250488dac2f81a23b6d85f&type=album",
            },
            {
                name: "Колдун",
                hp: 100,
                maxhp: 100,
                dmg: 30,
                hitch: 0.9,
                critch: 0.25,
                def: 10,
                image: "https://sun9-23.userapi.com/impg/Z8aPdmXRu5ILyCmtUWoOhfinBHfBaoxG0CLEzA/cRwvOyMH7Jg.jpg?size=118x145&quality=96&sign=2026443c446adfc3febf106a548a8f4c&type=album",
            },
            {
                name: "Раненый великан",
                hp: 250,
                maxhp: 1000,
                dmg: 40,
                hitch: 0.9,
                critch: 0.25,
                def: 0,
                image: "https://sun9-23.userapi.com/impg/IoIkvq-nrn6AtsIvdUVV4qT2p6uivSbP4uF6fQ/KrMT_v7AnuU.jpg?size=224x289&quality=96&sign=a7306e24c7e1d97d8f3f8f3fb1241c6f&type=album",
            },
            {
                name: "ДЖАМАЛ",
                hp: 10000,
                maxhp: 10000,
                dmg: 100,
                hitch: 1,
                critch: 0.25,
                def: 100,
                image: "https://sun9-65.userapi.com/impg/QiLx_CF9dvUfq9_T9TOti5ok8YOEM-xF60XAiQ/x2z1kGnyJaE.jpg?size=126x173&quality=96&sign=6e25d81acda1800b584d9456ac28df17&type=album",
            }
        ]
    }

    create_message(message) {
        let div = document.createElement('div')
        div.innerHTML = message
        div.classList.add("historytext")
        document.body.querySelector("#history").prepend(div)
    }
    
    next_round() {
        this.turn=0
        if (myWar.hp === 0) {
            if (game.round===5) {
                game.create_message("ДЖАМАЛ - финальный босс бета теста, вряд ли его возможно убить...")
            }
            game.create_message("Игра окончена! (перезагрузите страницу)")
        } else {
            game.round += 1
            myWar = new Warrior(
                warName.value,
                20*(game.round+1),
                20*(game.round+1),
                5*(game.round+1),
                0.75+0.25*(game.round/game.enemies.length),
                0+0.5*(game.round/game.enemies.length),
                5*(game.round+1),
                "https://sun9-53.userapi.com/impg/5Lt5U2yy5qJIUOdjrTYwD0iXl786Wbn9R6z5qg/y5NXNNE275c.jpg?size=160x179&quality=96&sign=f0dd3f0d0c7d2b0470dedc01ce56dbe0&type=album"
            )
            myWar.hp = myWar.maxhp
            document.querySelector("#myOptions").classList.remove("hidden")
            enemyWar = new Warrior(
                game.enemies[game.round].name,
                game.enemies[game.round].hp,
                game.enemies[game.round].maxhp,
                game.enemies[game.round].dmg,
                game.enemies[game.round].hitch,
                game.enemies[game.round].critch,
                game.enemies[game.round].def,
                game.enemies[game.round].image,
            )
            document.querySelector("#enemyPic").src = enemyWar.image
            game.create_message(`РАУНД ${game.round + 1}  |  ${myWar.name} vs. ${enemyWar.name}`)
            game.update_counter()
        }
    }

    update_counter() {
        document.querySelector("#myName").innerHTML = myWar.name
        document.querySelector("#enemyName").innerHTML = enemyWar.name

        document.querySelector("#hpcd").style = `width: ${100*(1-myWar.healCooldown/3)}%`
    
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
        }
        this.turn++
        if (myWar.healCooldown>0) myWar.healCooldown--
        game.update_counter()
        if (!this.newRound) {
            document.querySelector("#myOptions").classList.add("hidden")
            document.querySelector("#whichTurn").innerHTML = "Ход противника"
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
        }
        document.querySelector("#whichTurn").innerHTML = "Ваш ход"
        document.querySelector("#myOptions").classList.remove("hidden")
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
    }

    attack(enemy) {
        let damage = 0
        if (Math.random() < this.hitch) {
            if (Math.round(this.dmg - enemy.def ** 0.95) > 0) {
                if (Math.random() < this.critch) {
                    damage = Math.round(2 * (this.dmg - enemy.def ** 0.95))
                    game.create_message(`${this.name} нанес критический урон! (${damage} ед.)`)
                } else {
                    damage = Math.round(this.dmg - enemy.def ** 0.95)
                    game.create_message(`${this.name} нанес ${damage} ед. урона`)
                }
                enemy.hp -= damage
            } else { game.create_message(`${this.name} не смог пробить броню противника!`) }
        } else {
            game.create_message(`${this.name} промазал...`)
        }
        if (enemy.hp <= 0) {
            enemy.hp = 0
            game.create_message(`${this.name} победил!`)
            document.querySelector("#myOptions").classList.add("hidden")
            game.newRound = 1
            if (game.round===5 && myWar.hp!==0) {
                game.create_message("Вы прошли бета тест!")
            } else {
            setTimeout(game.next_round, 5000)
            }
        }
    }

    defbuff() {
        game.create_message(`${this.name} повысил свою защиту! (${this.def} --> ${this.def += 1 + Math.round(Math.random() * 4)} ед.)`)
    }

    dmgbuff() {
        game.create_message(`${this.name} повысил свой урон! (${this.dmg} --> ${this.dmg += 1 + Math.round(Math.random() * 5)} ед.)`)
    }

    heal() {
        let heal = Math.round((Math.random()+0.6)*0.5*(this.maxhp-this.hp))
        game.create_message(`${this.name} восстановил ${heal} ед. здоровья`)
        this.hp += heal
        this.healCooldown = 4
    }
}

const game = new Game()
let myWar = new Warrior("", 1, 0, 0, 0, 0, 0, "")
let enemyWar = new Warrior("", 1, 0, 0, 0, 0, 0, "")

document.querySelector("#confButton").onclick = () => {
    warName = document.querySelector("#warName")
    if (`${warName.value}`.length>=2) {
        document.querySelector("#startwind").classList.add("Abshidden")
        document.querySelector("#game").classList.remove("Abshidden")
        myWar.name = warName.value
        game.next_round()
    } else {
        document.querySelector("#nameError").classList.remove("Abshidden")
    }
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

document.querySelector("#myDmgUp").onclick = () => {
    game.myTurn("dmgUp")
}
