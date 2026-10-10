const LUCK = {
    mult() {
        let x = E(1)

        x = x.mul(upgradeEffect('pp',0)[1]).mul(upgradeEffect('tp',0)[1]).mul(upgradeEffect('rp',0)[1]).mul(upgradeEffect('es',0)[1])

        x = x.pow(tmp.mTierEff.luck||1)

        return x
    },
    pow() {
        let x = E(1)

        x = x.mul(upgradeEffect('tp',2))

        return x
    },
    generate() {
        let r = Decimal.pow(Math.random(),-1).pow(tmp.luckPow).mul(tmp.luckMult).log(tmp.luckBase).scale(tmp.raritySS,2,0,true).scale(1000,1.001,1,true)

        //r = r.min(player.max_rarity.add(1))

        return r.floor()
    },
}

const RARITY_PREFIX = [
    [
        ["Starter--", '#717870'],
        ["Starter-", '#7f877e'],
        ["Starter", '#97a196'],
        ["Starter+", '#a7b3a6'],
        ["Starter++", '#c3d1c2'],
        ["Basic--", '#c1e3d4'],
        ["Basic-", '#aae3c9'],
        ["Basic", '#8ae3bb'],
        ["Basic+", '#68e3a4'],
        ["Basic++", '#4fe397'],
        ["Common--", '#3be386'],
        ["Common-", '#27e368'],
        ["Common", '#1ee341'],
        ["Common+", '#1cd43d'],
        ["Common++", '#1bcf3b'],
        ["Uncommon--", '#19bd36'],
        ["Uncommon-", '#17ab31'],
        ["Uncommon", '#16a32f'],
        ["Uncommon+", '#17b549'],
        ["Uncommon++", '#1ac472'],
        ["Rare--", '#1ed4a6'],
        ["Rare-", '#1ededb'],
        ["Rare", '#1ec3e8'],
        ["Rare+", '#1ea8e8'],
        ["Rare++", '#1e79e8'],
        ["Epic--", '#1e3de8'],
        ["Epic-", '#651ee8'],
        ["Epic", '#941ee8'],
        ["Epic+", '#c31ee8'],
        ["Epic++", '#e81ed1'],
        ["Legendary--", '#f0ea7f'],
        ["Legendary-", '#f0e45e'],
        ["Legendary", '#f0e73a'],
        ["Legendary+", '#f0cd30'],
        ["Legendary++", '#f0b726'],
        ["Exotic--", '#f0a61d'],
        ["Exotic-", '#f09516'],
        ["Exotic", '#f0890c'],
        ["Exotic+", '#f07007'],
        ["Exotic++", '#f05f05'],
        ["Mythical--", '#f04502'],
        ["Mythical-", '#f02602'],
        ["Mythical", '#e00b1d'], 
        ["Mythical+", '#cc0a1a'], 
        ["Mythical++", '#bd2633'], 
        ["Ethereal--", '#bd6542'], 
        ["Ethereal-", '#bd7b57'], 
        ["Ethereal", '#bd8b6c'], 
        ["Ethereal+", '#cc9675'], 
        ["Ethereal++", '#e0a581'],
        ["Divine--", '#6096a8'], 
        ["Divine-", '#6aa6ba'], 
        ["Divine", '#7abfd6'], 
        ["Divine+", '#83d2d6'], 
        ["Divine++", '#98d6d5'], 
        ["Almighty--", '#a36f53'], 
        ["Almighty-", '#c28463'], 
        ["Almighty", '#db9570'], 
        ["Almighty+", '#db9886'], 
        ["Almighty++", '#db9e9e'], 
        ["Mystical--", '#7a5db0'], 
        ["Mystical-", '#8c6ac9'], 
        ["Mystical", '#9772d9'],
        ["Mystical+", '#aa89d9'], 
        ["Mystical++", '#b39ed9'], 
        ["Primordial--", '#ab6888'], 
        ["Primordial-", '#c97aa0'], 
        ["Primordial", '#db85af'],
        ["Primordial+", '#db97b8'],
        ["Primordial++", '#dba9c1'],
        ["Supreme--", '#afb3db'],
        ["Supreme-", '#b3afdb'],
        ["Supreme", '#c1b1db'],
        ["Supreme+", '#ccb1db'],
        ["Supreme++", '#dab1db'],
        ["Celestial--", '#6b67c2'],
        ["Celestial-", '#8569c2'],
        ["Celestial", '#9e6bc2'],
        ["Celestial+", '#ac69c2'],
        ["Celestial++", '#bd67c2'],
        ["Eternal--", '#698ba1'],
        ["Eternal-", '#79a1ba'], 
        ["Eternal", '#88b5d1'],
        ["Eternal+", '#99bad1'],
        ["Eternal++", '#9fb2d1'],
        ["Predominant--", '#618f70'],
        ["Predominant-", '#74ab86'],
        ["Predominant", '#85c49a'],
        ["Predominant+", '#83c4a7'],
        ["Predominant++", '#87c4bb'],
        ["Void--", '#531d80'],
        ["Void-", '#612296'],
        ["Void", '#7328b3'],
        ["Void+", '#7d2bc2'],
        ["Void++", '#882fd4'],
        ["Ultimate--", '#d48888'], 
        ["Ultimate-", '#d4ab8a'],
        ["Ultimate", '#d4d388'],
        ["Ultimate+", '#9ed48c'],
        ["Ultimate++", '#8ed4a6']
    ],
    [
        ["", 0],
        ["Galactic", '#ca97f0'],
        ["Universal", '#a265f0'],
        ["Multiversal", '#7259f0'],
        ["Megaversal", '#4354f0'],
        ["Gigaversal", '#3284f0'],
        ["Teraversal", '#29baf0'],
        ["Petaversal", '#1df0e3'],
        ["Exaversal", '#16f083']
    ],
    [
        ["", 0],
        ["Metaversal", '#81f013'],
        ["Xenoversal", '#d1f00c'],
        ["Omniversal", '#f0ca07'],
        ["Outside", '#f08a02']
    ],
]
const RP_LENS = RARITY_PREFIX.map(x=>x.length)

var show_luck_nav = false

function rarityNameFormat(args) {
    return !args[1] ? args[0] : `<span style="color:${args[1]}">${args[0].replaceAll("-","<sup>-</sup>").replaceAll("+","<sup>+</sup>")}</span>`
}
function getRarityName(i) {
    let h = ''

    i = E(i).floor()

    if (i.lt(1e16)) {
        i = i.toNumber()

        let a = Math.floor(i / RP_LENS[0])
    
        if (a>0) h += a < RP_LENS[1] ? rarityNameFormat(RARITY_PREFIX[1][a])+" " : 'Arch'+format(a,0).sup()+' '
        h += rarityNameFormat(RARITY_PREFIX[0][i%RP_LENS[0]])
    } else {
        let m = i.slog().sub(new Decimal("1e16").slog()).floor()
        if (m>0) h += (m < RP_LENS[2] ? rarityNameFormat(RARITY_PREFIX[2][m]) : 'Infi'+format(m,0).sup()) + (m<1e16?" ":"")

        if (m.lt("1e16")) {
            let p = Math.max(i.mag-new Decimal("1e16").slog().toNumber()), q = Math.floor((p%1)*RP_LENS[0]), a = Math.floor(p)
        
            if (a>0) h += a < RP_LENS[1] ? rarityNameFormat(RARITY_PREFIX[1][a])+" " : 'Arch'+format(a,0).sup()+' '
            h += rarityNameFormat(RARITY_PREFIX[0][q%RP_LENS[0]])
        }
    }

    return h+` [${format(i,0)}σ]`
}

function getRarityChance(i) {
    let x = Decimal.pow(1.2,i.pow(Decimal.pow(1.2,i.div(1000).root(4).sub(1).max(0)))).div(tmp.luckMult).root(tmp.luckPow)

    return x.max(1)
}

function roll() {
    let r = LUCK.generate()

    player.max_rarity = player.max_rarity.max(r)

    tmp.el.rolled_div.setHTML(`
    You rolled:<br>
    <h2>${getRarityName(r)} <i style="font-size: 15px; font-family: monospace typewriter">1 in ${format(getRarityChance(r),2)}</i></h2>
    (Your highest rarity is ${getRarityName(player.max_rarity)})<br>
    ${player.max_rarity.gte(1000) ? `<span style="color: #f00">Chance has been increased due to rarity softcap.</span>` : ""}
    `)

    player.roll_time = 0
}

tmp_update.push(()=>{
    tmp.raritySS = E(100).add(upgradeEffect('tp',4,0))

    tmp.luckBase = 1.25
    tmp.rollInt = 1-upgradeEffect('pp',1,0)
    tmp.luckMult = LUCK.mult()
    tmp.luckPow = LUCK.pow()
})

el.update.luck = () => {
    let mr = player.max_rarity

    tmp.el.luck_list.setDisplay(show_luck_nav)

    tmp.el.roll_btn.setHTML("Roll ("+format(Math.max(tmp.rollInt-player.roll_time,0),1)+"s)")
}
