+++
title = '5-minute guide for novice players'
date = 2024-03-22T04:26:42+06:00
draft = false
+++

{{< callout type="info" emoji="🪄">}}
You just bought Noita? **Congrats**! Here's _everything_ you need to know to hit the ground running!
{{< /callout >}}

## About the author

Hi, I am WUOTE of the ACID Temple. I might have played this game for at least TWO hours. Nowadays I usually coach newer players and help Noita speedrunners optimize their runs.

## Switch to `Beta branch` before you start

Noita has two publicly available build branches: `main` and `beta`. The most important difference is that `beta` branch is **more stable**, since the devs applied large address aware (LAA) patch to otherwise `32-bit` game, so on `beta` Noita is able to use more than `2 GB` of RAM. That increases the game's stability.

Besides that, `beta` branch has more content, and is updated more often. If you want to play the most recent version of Noita, switch to `beta` branch.

Here are store-specific instructions, click on the one that applies to you:
{{% details title="I bought Noita on Steam" closed="true" %}}
{{% steps %}}

### Right click on Noita in your Steam library

![Steam accessing properties](/images/Steam/Steam1.webp)

### Select Betas on the left

### Choose `noitabeta - Beta branch` in the dropdown

![Steam switching to beta branch](/images/Steam/Steam2.webp)

### Update the game

![Updating Noita beta](/images/Steam/Steam3.webp)

### You are good to go!

You now should have the most recent version of Noita.

{{% /steps %}}
{{% /details %}}

{{% details title="I bought Noita on GOG" closed="true" %}}
{{% steps %}}

### Open GOG

### Open configuration menu

Right click on Noita, choose "`Manage installation`" then "`configure`"
![GOG Configuration](/images/GOG/gog1.webp)

### Select "`Change private channel password`" from the dropdown menu

![GOG Switching branch](/images/GOG/gog2.webp)

### Enter private channel password

```python {filename="Beta branch password"}
noitabeta
```

![GOG beta branch password](/images/GOG/gog3.webp)

### You are good to go!

beta channel should now say noitabeta
![GOG beta branch active](/images/GOG/gog4.webp)

{{% /steps %}}
{{% /details %}}

## General approach

Every single run is winnable! Different players have different playstyles and approaches, to develop your unique play style all you have to do is to play more! My general strategy to win a run is to reduce the number of things I have to pay attention to, that way it's easier to watch the environment, enemies, and loot spawns.

## The best quality of life setting

This is called "Pouring bind", it allows you immediately start pouring from your water flask to remove stains and put out fire, and then quickly switch back to your main attack wand. You don't have to bind it to mouse buttons, some players use Q key for that.

![Pouring Bind Visualization](/images/HintsAndAdvice/pouring_bind.webp)

## Universal knowledge

Always useful to know:

1. If you have and keep blood/water/slime stain on your character you cannot catch fire.
1. Ambrosia stain makes you "immortal" as long as you don't move around, and the stain is not washed off.
1. Kick things around. Direction and strength of the kick is determined by your cursor's position: the further your cursor from your character the stronger the kick.
1. Tablet is a very powerful melee weapon. Throw a tablet at an enemy, often it will drop double gold upon death. Learn to `kick + throw` a tablet. Easiest kick directions are straight down, and 45° angle down. General rule is: press kick ➔ wait `0.25` seconds ➔ press throw ➔ you will launch the tablet you're holding. Tablets can deal thousands of damage. Tablet throws follow the cursor: the further your cursor from your character the stronger the kick.

## Perks

There's a hierarchy to them, most of the time it's better to choose a perk having in mind the spells/other perks you have. Many perks have hidden stats. Some perks override previously taken perks. Is a perk worth taking?-- Either ask around, or just risk and experiment: press `[E]`.

## Wand building strategy

Diversify your damage sources: having 2 spark bolts and a chainsaw inside package is much better than 3 spark bolts just because they are of different damage types -- projectile/slice, and there are enemies invulnerable to specific damage types. Great if your main wand can do several things at once: `kill+dig`, for example,-- again, reducing the number of things you need to pay attention to.

## Basic wand build types

Most to least often used wands are:

{{% steps %}}

### Machine gun

Fires very quickly, often doesn't require homing, great to spray and pray "preemptively heck everything in that direction" playstyle. Can be of a "trigger/timer + package" type, or just a simple wrapping wand. The less chaotic the wand the better: if your wand has huge spread, or its package has a lot of projectiles, you may hit an explosive by accident and go boom.

Common structure:

Chainsaw or luminous drill ➔ double cast ➔ spark bolt (or spark bolt timer/trigger ➔ "_multicast_" ➔ damage modifiers ➔ the same number of projectiles for package as "_multicast_").

![alt text](/images/WandBuilds/1_wrap.webp)

![alt text](/images/WandBuilds/2_wrap.webp)

### Homing mist

This is your "shoot once per screen/biome", lazy wand: timer releases package -- a mist with some form of homing and damage increase modifier attached to it, which flies around killing everything. Very convenient (my usual go-to), but <u>might kill you if you get polymorphed</u> -- those wands attack everything which is not player character.

Common structure:

Spark bolt timer/trigger ➔ homing spell ➔ damage modifier (damage field is the best) ➔ mist.

![alt text](/images/WandBuilds/3_mist.webp)

### Homing plasma

Dangerous to the player (with one special exception, I encourage you to look up "_safe plasma_" build), **extremely deadly** -- these wands kill everything almost instantly. Require a lot of attention where do you land your shots, if plasma follows an enemy which is about to hug you, you'll get hit. If you hit a swapper mage, there's a high chance you'll die.

Common structure:

Spark bolt timer/trigger ➔ homing spell ➔ plasma spell. Green plasma beams dig through everything, including metals, and can be used as dedicated digging wands with no homing. Blue-ish plasma spells don't dig well.

![alt text](/images/WandBuilds/4_plasma.webp)

![alt text](/images/WandBuilds/5_plasma.webp)

### Accelerated homing rock

If you have unlimited spells -- this is a no-brainer -- you have a rock flying around dealing damage measured in thousands, instantly killing almost everything (does not work on certain ghost creatures and some other creatures, I'll leave it to you to figure out). 98% safe to the player (polymorphine is your worst enemy as always). Slain enemies will drop double gold, if you have trick blood money perk gold will be red and heal you upon pickup. Even if you don't have unlimited spells, you still can kick "charged" rock around the level, as soon it senses an enemy, it'll launch again and continue slaying.

![alt text](/images/WandBuilds/6_rock.webp)

### Double Explosive Projectile (EP)

This build utilizes hidden game mechanic of explosion radius increase. One explosive projectile modifier adds ~5 damage to a spark bolt, two EPs suddenly add 325 damage! Safe with most projectiles (might set you on fire, otherwise safe), if you don't have explosion immunity perk, do not use with materials (water, blood, acid, concrete spells), luminous drills, wooden arrows (green magic arrows are safe),-- you'll kill yourself.

![alt text](/images/WandBuilds/7_explo.webp)

{{% /steps %}}

## Biomes

In each biome try to look for hearts, spells, and wands. Manage your health: no matter how much gold you have it will not save you from death. If in danger -- flee, move to the next holy mountain.
{{% steps %}}

### Mines

Try collecting `400` gold, ideally `800`, grab a tablet. The best naturally spawning wand you can find is a `10-7` shuffle wand, which is a wand with `0.10` seconds of cast delay and `0.07` seconds of reload time (sort of a natural machine gun wand which looks like this {{< icon "10-7-icon" >}} )."

### Coal Pits

collect `~1000` gold. Look for wands, you can try going straight to Fungal Caverns located to the left of Coal Pits -- this mini biome is very dangerous, but often have great spells and guaranteed to have no-shuffle wands.

### Snowy Depths

Try collecting `2500` gold. This biome usually has spell shops and add mana spells on wands granting you much needed power spike. Move slowly, don't jump straight down if you hear electricity chances are you are hearing an ukko -- one of the deadliest enemies, avoid or shoot ukko from a distance, be very careful. How to traverse: generally, try to move from right to left -- less chances to get overwhelmed/get ambushed (don't go inside the dark area). If in danger -- go right all the way till you see dark brown rock, then go straight down -- that is one of the safest ways to skip this biome entirely.

### Hiisi Base

Collect `~2500-3000` gold. Beware of propane tanks and electrical lights. A lot of explosives are hidden inside snow, shoot and dig carefully. If you have broken wands, bottom right corner of the biome might interest you. Need healing? Dudes with green guns shoot healing bolts, charm them with your personality or get in their way while medics are trying to heal someone else.

### Underground Jungle

Try collecting at least `3500` gold. Jungle is always on fire and has dangerous mages: watch for small white projectiles hitting you from off-screen.

### The Vault

Very dangerous and annoying: acid baths, electric traps, lots of rusted metal (bombs cannot dig through it, but TNT can). You probably want to spend the least time in this biome.

### Temple of the Art

Try collecting `6000-10000` gold. Very dangerous: swapper mages, "glowing fishtank head" socks (don't shoot them, they're harmless if you don't hit them), traps, poly mages, pools of polymorphine, lots of lava, colorful crystals (don't shoot crystals, especially green ones: they are the most dangerous). Move slowly, watch corners and walls closely, if you can, dig through the biome and get to the portal.

### ...

{{% /steps %}}

## Seek knowledge

Noita has a lot of hidden mechanics, spells, and secrets. It is almost impossible to discover everything on your own.
Read the Wiki, watch videos and streams, ask questions! Noita community is the friendliest community out there, and we're always happy to help!

{{< callout type="error" >}}
**Do not use fandom wiki**
It has been abandoned, we do not update it anymore. The info is outdated, it's full of mistakes.

Use `noita.wiki.gg` instead.
{{< /callout >}}

{{< callout type="info" >}}

[Official Noita Wiki ↗](https://noita.wiki.gg)

{{< /callout >}}

## You got this!

Best of luck! Run fast and throw hard!
