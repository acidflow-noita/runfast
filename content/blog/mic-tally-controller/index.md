---
title: Mic Tally Controller
date: 2025-08-29
draft: true
width: wide
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

{{< badge content="I Cooked" icon="pot-full-icon" color="green" tagBorder=true >}}

## Speedrun

{{< cards cols="3">}}
{{< card icon="pot-full-icon" link="assets/3d printing model/Mic Tally Enclosure for Printing.3mf" title="Download full model" subtitle="Full enclosure model for printing as one file" image="/blog/mic-tally-controller/assets/images/enclosure-printable-full.png" tag="tag text" tagColor="indigo" tagIcon="sparkles" tagBorder=true >}}
{{< card icon="pot-lid-icon" link="assets/3d printing model/Mic Tally Enclosure Lid for Printing.3mf" title="Optional: download lid only" subtitle="Enclosure lid for printing" image="/blog/mic-tally-controller/assets/images/enclosure-printable-lid.png" tag="tag text" tagColor="blue" tagIcon="sparkles" tagBorder=true >}}
{{< card icon="pot-body-icon" link="assets/3d printing model/Mic Tally Enclosure Box for Printing.3mf" title="Optional: download body only" subtitle="Enclosure body for printing" image="/blog/mic-tally-controller/assets/images/enclosure-printable-box.png" tag="tag text" tagColor="yellow" tagIcon="sparkles" tagBorder=true >}}
{{< /cards >}}

## Acquire

In June of 2021 I've stumbled upon a listing titled "**Lot of 2: Yellowtec m!ka Mic Arm M (used)**". They were missing mounting adapters, XLR connectors, and the integrated lighting indicators were of the old style: red color only. Looked like they were decomissioned from a studio somewhere, and had minor surface wear marks, but nothing major. Asking price for both was around half of what a [brand new](https://shop.yellowtec.com/collections/mika-arms/products/mika-mic-arm-m?variant=39510330966180) costs, so I figured it wasn't too bad. Physical inspection confirmed that all internal tension cables and brass bushings were intact, awesome! I went ahead and bought them.

## Complete the set

To actually use the boom arms I needed to get what was missing and replace the old and worn out parts:

{{% steps %}}

### Mounting hardware

Yellowtec's m!ka family is a modular system with practically every imaginable mounting option available.
{{% details title="Video: How to mount m!ka Microphone Arms (click to reveal)" closed="true" %}}
{{< youtube M85zVliz9bQ >}}
{{% /details %}}

I've decided to order [regular table clamps](https://shop.yellowtec.com/products/mika-table-clamp)(P/N `YT3210`), and added [plastic sleeves](https://shop.yellowtec.com/collections/mika-accessories/products/mika-plastic-sleeve)(P/N `YT3247`) for the boom arms' ends, since they came in bare.

### Light indicaors

Replace the mic arm adapters with the modern [dual-color LED](https://shop.yellowtec.com/collections/mika-accessories/products/mika-mic-adapter)(P/N `YT3350`) ones. The process is demonstrated in Yellowtec's video and takes about a minute
{{% details title="Video: Yellowtec Tutorial - How to replace your m!ka Mic Adapter (click to reveal)" closed="true" %}}
{{< youtube h0kSqxqkn2k >}}
{{% /details %}}

### Terminate the cables

Yellowtec boom arms have internal, non-removable cables. More often than not you'll find them on sale unterminated, which, I argue, is better compared to ordering a pre-terminated boom arm. Doing more work doesn't sound right, but the benefit of an unterminated cabling is that you can use the best XLR connector available on the market: the EMC version made by the best maker -- Neutrik. Basic XLR connectors by Neutrik are already excellent, but the EMC version is truly **the best**, here's a video by Allen -- a professional boom operator working in the motion picture industry. I've learned a lot from his videos:

{{% details title="Video: Neutrik EMC XLR Connectors - Sound Speeds Review (click to reveal)" closed="true" %}}
{{< youtube zc3cbLncmp0 >}}
{{% /details %}}

{{% details title="Video: How To Solder XLR Microphone Cables [Step-By-Step Tutorial] (click to reveal)" closed="true" %}}
{{< youtube Jk1B42c3kNk >}}
{{% /details %}}

Terminate the cables with one male XLR-5 connector, and one XLR-3 connector.

This was a quick and easy soldering job. There are countless videos on YouTube, as well as XLR-specific soldering tutorials, but I'd like to mention one more resource that I found invaluable while learning to solder: NASA's [Workmanship Standard For Crimping, Interconnecting Cables, Harnesses, And Wiring](https://standards.nasa.gov/sites/default/files/standards/NASA/A/4/nasa-std-87394a_w_change_4_0.pdf) (page 102 might be helpful).

[Neutrik NC5MXX-B Cable Connector male, 5-pole, black](https://www.neutrik.com/en/product/nc5mxx-b). 5 pole male cable connector with black metal housing and gold contacts.

[NC3FXX-EMC](https://www.neutrik.com/en/product/nc3fxx-emc)

> The EMC-XLR Series is a specifically designed version of the XX series to give enhanced RF screening for critical applications in live performance and recording where there are particular problems with radio transmission or mobile phones. The design guarantees a continuous RF shield connection from the cable to the chassis connector housing via a circular capacitor around the cable shield. The circular capacitors act as high-pass filter with a cut-off frequency around 10 MHz.
> An EMI suppression ferrite bead with 24 Ohm at 1 MHz between pin 1 and the cable screen provides a low-pass filter for improved RF rejection.

NC3FXX-B

### Replace the light indicators

### Add table mounting

{{% /steps %}}

https://www.youtube.com/watch?v=zc3cbLncmp0

153

50 shipping

## Drawings

Here are the drawings of the tally controller:

{{< pdf "assets/CAD/Mic Tally Enclosure Drawing.pdf" >}}

<br />

{{< hextra/hero-button text="Download PDF" link="https://runfast.stream/blog/mic-tally-controller/assets/Mic%20Tally%20Enclosure%20Drawing.pdf" >}}

## The Blogpost

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

| #   | Part Name                                                                                                                   | Qty | Notes                                                                                            |
| --- | --------------------------------------------------------------------------------------------------------------------------- | --- | ------------------------------------------------------------------------------------------------ |
| 1   | [M3 8mm Hex Drive Flat Head Screw](https://www.mcmaster.com/90729A167/)                                                     | 4   |                                                                                                  |
| 2   | [18-8 Stainless Steel Washer](https://www.mcmaster.com/93475A210/)                                                          | 4   |                                                                                                  |
| 3   | [M3 x 0.5 mm Hex Nut](https://www.mcmaster.com/90591A250/)                                                                  | 4   |                                                                                                  |
| 4   | [Adam Hall 4903 Rubber Feet](https://www.adamhall.com/shop/en/feet-skids/4903)                                              | 4   |                                                                                                  |
| 5   | [Neutrik NC5FD-LX](https://www.neutrik.com/en/product/nc5fd-lx)                                                             | 1   |                                                                                                  |
| 6   | [Neutrik NC3MD-S-1-B](https://www.neutrik.com/en/product/nc3md-s-1-b)                                                       | 1   | Screw terminals make assembly easier compared to when using Neutrik NC3MD-L-B-1 with solder cups |
| 7   | [Canare L-4E6S](https://www.canare.co.jp/en/products/cables/index.php?tid=4_001)                                            | 1   | Minimum required length: 100mm, cut a 120-140mm piece before stripping the cable                 |
| 8   | [Arduino Motor Shield Rev3](https://store.arduino.cc/products/arduino-motor-shield-rev3)                                    | 1   |                                                                                                  |
| 9   | [Arduino UNO R4 WiFi](https://store.arduino.cc/products/uno-r4-wifi)                                                        | 1   | Arduino UNO R4 Minima works too, needs constant wired connection to the computer                 |
| 10  | [3D-printed enclosure with lid](<assets/3d printing model/Mic Tally Enclosure for Printing.3mf>)                            | 1   | Regular PLA works well                                                                           |
| 11  | [A 12V Power Adapter](https://www.dahuasecurity.com/products/All-Products/Accessories/Power/DC-Power-Adapter/PFM321-Series) | 1   | Any cheap adapter should suffice                                                                 |

---

## Designing for 3D printing

https://blog.rahix.de/design-for-3d-printing/

---

## Decisions I Made and Why

1. Using fillet instead of chamfer in Autodesk Fusion to process the outer corners results would have resulted in reduced printing time and "prettier"-looking box. made printing faster, but mixing visual features. ![issue](assets/images/chamfer_and_fillet_combination_issue_visualized.png 'Issue visualized') But as everything in Fusion, the order of operations matter, so using fillet first, and then chamfer fixes the issue. ![fixed](assets/images/fillet_then_chamfer_fix.png 'Fixed version')

## Notes
