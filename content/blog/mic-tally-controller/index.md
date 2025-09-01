---
title: Mic Tally Controller
date: 2025-08-29
draft: true
authors:
    - name: WUOTE
      link: https://github.com/WUOTE
      image: https://github.com/wuote.png
tags:
    - 3DPrinting
    - Fusion360
    - AutodeskFusion
    - 3DModeling
    - Arduino
excludeSearch: false
---

{{< badge content="Badge" color="blue" >}}

# Mic Tally Controller

## The Boom Arm

a

## Drawings

Here are the drawings of the tally controller:

{{< pdf "assets/Mic Tally Enclosure Drawing.pdf" >}}

<br />

{{< hextra/hero-button text="Download PDF" link="https://runfast.stream/blog/mic-tally-controller/assets/Mic%20Tally%20Enclosure%20Drawing.pdf" >}}

## The Blogpost

On Jul 26, 2021, 9:04 PM, Avital responded:

> Hi Alex,

Thanks for reaching out and glad you found the post useful. I no longer have the lookup table as a file but it's just as well because the resolution of the steps will depend on your hardware.

You can generate your own however using the formula in the post, however. In a Google Sheet, make column A your "x", with whatever step size works for you (eg: 0.5, 1.0, 1.5, ...), then simply input this X value into the formula to get your "f(x)" value.

I hope this helps! Would love to see what you build with it, drop me a link if you end up making a blog post :)

Best,
--Avital

## The Email

On Thu, Aug 19, 2021, I received the response:

> thanks for requesting the Lighthouse Software.
> A few things to note:
>
> -   The source code is not free of charge and cannot been downloaded. Instead, we ship a USB stick with the Source code. It costs 25€ + Fright Charge
> -   The source code is for personal use, only.
> -   There is no technical support for the building process or for the resulting binary.

Adam Hall 4903 Rubber Feet https://www.adamhall.com/shop/en/feet-skids/4903

Neutrik NC3MD-S-1-B https://www.neutrik.com/en/product/nc3md-s-1-b

Neutrik NC5FD-LX https://www.neutrik.com/en/product/nc5fd-lx?c=audio

Canare L-4E6S https://www.canare.co.jp/en/products/cables/index.php?tid=4_001

Arduino UNO R4 WiFi https://store.arduino.cc/products/uno-r4-wifi

Arduino Motor Shield Rev3 https://store.arduino.cc/products/arduino-motor-shield-rev3

## Videos

{{< youtube jcO-IzIXuCw >}}

{{< youtube DAOaFJS_flk >}}



---

##

Required Components and Parts

| #   | Qty | Part Name                                                                                | McMaster-Carr P/N | Notes                                                                                            |
| --- | --- | ---------------------------------------------------------------------------------------- | ----------------- | ------------------------------------------------------------------------------------------------ |
| 1   | 4   | M3 8mm Hex Drive Flat Head Screw                                                         | 90729A167         | -                                                                                                |
| 2   | 4   | 18-8 Stainless Steel Washer                                                              | 93475A210         | -                                                                                                |
| 3   | 4   | M3 x 0.5 mm Hex Nut                                                                      | 90591A250         | -                                                                                                |
| 4   | 4   | [Adam Hall 4903 Rubber Feet](https://www.adamhall.com/shop/en/feet-skids/4903)           | -                 | -                                                                                                |
| 5   | 1   | [Neutrik NC5FD-LX](https://www.neutrik.com/en/product/nc5fd-lx)                          | -                 | -                                                                                                |
| 6   | 1   | [Neutrik NC3MD-S-1-B](https://www.neutrik.com/en/product/nc3md-s-1-b)                    | -                 | Screw terminals make assembly easier compared to when using Neutrik NC3MD-L-B-1 with solder cups |
| 7   | 1   | [Canare L-4E6S](https://www.canare.co.jp/en/products/cables/index.php?tid=4_001)         | -                 | Minimum required length: 100mm, cut a 120-140mm piece before stripping the cable                 |
| 8   | 1   | [Arduino Motor Shield Rev3](https://store.arduino.cc/products/arduino-motor-shield-rev3) | -                 | -                                                                                                |
| 9   | 1   | [Arduino UNO R4 WiFi](https://store.arduino.cc/products/uno-r4-wifi)                     | -                 | Arduino UNO R4 Minima works too, needs constant wired connection to the computer                 |
| 10  | 1   | 3D-printed enclosure with lid                                                            | -                 | Regular PLA works well                                                                           |

---

additional

Neutrik NC5MXX-B Cable Connector male, 5-pole, black

---

90591A250 Zinc-Plated Steel Hex Nut

90729A167 Passivated 316 Stainless Steel Hex Drive Flat Head Screw

93475A210 18-8 Stainless Steel Washer

https://blog.rahix.de/design-for-3d-printing/

---

## Decisions I Made and Why

1. Using fillet instead of chamfer in Autodesk Fusion to process the outer corners results would have resulted in reduced printing time and "prettier"-looking box. made printing faster, but mixing visual features. ![issue](assets/images/chamfer_and_fillet_combination_issue_visualized.png 'Issue visualized') But as everything in Fusion, the order of operations matter, so using fillet first, and then chamfer fixes the issue. ![fixed](assets/images/fillet_then_chamfer_fix.png 'Fixed version')
