 let spacePlane = sprites.create(img`
     ........................
     ........................
     ........................
     ...........ccc..........
     ...........cccc.........
     .......ccc..ccccccc.....
     .......cccccc555555cc...
     ........ccb5555555555c..
     .....cc..b555555555555c.
     .....cccb55555bcc555555c
     ......cb555555555c55d55c
     ......b5555555555555555c
     ...cc.b555dd5555bb1bbbc.
     ....ccd55ddddd5bbbb335c.
     ...ccbdddddddd5bbbb335c.
     .ccccddddddddd55bb3335c.
     cdcccdddddb55bb55b3335c.
     cddbddddddb555bb553335c.
     cddddddddddb5555b5555c..
     ccddddddbd55bb55cbccc...
     .ccddddbbbdd55ccbbc.....
     ...ccbbbcbddddccdddc....
     .....ccccdd555dccccc....
     ........cccccccc........
 `, SpriteKind.Player)
 spacePlane.setStayInScreen(true)
 info.setLife(3)
 controller.moveSprite(spacePlane,200,200)

controller.A.onEvent(ControllerButtonEvent.Pressed, function() { 
    let dart = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . 2 2 2 2 . . .
        . . . . . . . 2 2 1 1 1 1 2 . .
        . . . . 2 2 3 3 1 1 1 1 1 1 . .
        . . 3 3 3 3 1 1 1 1 1 1 1 1 . .
        . . 1 1 1 1 1 1 1 1 1 1 1 1 . .
        . . 3 3 2 2 3 1 1 1 1 1 1 1 . .
        . . . . . . 2 2 3 1 1 1 1 2 . .
        . . . . . . . . . 2 2 2 2 . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
    `, spacePlane, 200, 0)
    
})
game.onUpdateInterval(500, function() {
    let bogey = sprites.create(img`
        . . . . . . . . . . . . . . . .
        . . . . . . . c c c c c . . . .
        . . . . . . c d d d d d c . . .
        . . . . . . c c c c c d c . . .
        . . . . . c 4 4 4 4 d c c . . .
        . . . . c d 4 4 4 4 4 1 c . . .
        . . . c 4 4 1 4 4 4 4 4 1 c . .
        . . c 4 4 4 4 1 4 4 4 4 1 c c c
        . c 4 4 4 4 4 1 c c 4 4 1 4 4 c
        . c 4 4 4 4 4 1 4 4 f 4 1 f 4 f
        f 4 4 4 4 f 4 1 c 4 f 4 d f 4 f
        f 4 4 4 4 4 4 1 4 f f 4 f f 4 f
        . f 4 4 4 4 1 4 4 4 4 c b c f f
        . . f f f d 4 4 4 4 c d d c . .
        . . . . . f f f f f c c c . . .
        . . . . . . . . . . . . . . . .
    `, SpriteKind.Enemy)
    bogey.setVelocity(-100, 0)
    bogey.y = randint(0, scene.screenHeight())
    bogey.setFlag(SpriteFlag.AutoDestroy, true)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy()
    info.changeLifeBy(-1)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function(sprite, otherSprite) {
    otherSprite.destroy()
    sprite.destroy(effects.fire, 100)
    info.changeScoreBy(1)
})