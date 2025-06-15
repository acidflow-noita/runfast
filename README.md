# <a href="https://runfast.stream"><img src="https://github.com/acidflow-noita/runfast/assets/106106310/c3f04d87-291a-4267-aadd-2695b7a86083" width="200"> https://runfast.stream</a>
Website with tools and guides for Noita players and streamers.

The website is built using [hugo](https://gohugo.io/), it uses [hextra](https://imfing.github.io/hextra/) theme.
The friendly smiling Mina has been drawn by [Gnikenob](https://www.twitch.tv/gnikenob), I added background to it.

## Contribute

### Run a copy locally
If you want to add or fix something, clone the repo, then run this in the terminal in the root directory:
```powershell
hugo mod tidy && hugo mod clean && hugo && hugo server -p 1313 --buildDrafts --disableFastRender
```
hugo will build the website and start a server serving a hot-reloadable website which you'll be able to see at https://localhost:1313/
hugo rebuilds stuff as soon as you save your changes.

#### Bind to IP
If you need to bind the server to your local ip here's how you can do it:
```powershell
hugo server --bind 10.0.1.10 --baseURL http://10.0.1.10
```

### Creating a new page using hugo
```powershell
hugo new /pastas/newpasta.md
```

### Customizing a page
Look at the [primary website's settings](hugo.yaml), and the custom [layouts](layouts), for hextra-specific stuff read [hextra's documentation](https://imfing.github.io/hextra/docs/).
> [!NOTE]  
> Despite using tailwind, hextra does not seem to actually recompile tailwind css so any css customization might be slightly problematic, look at the [`custom.css`](assets/css/custom.css)
