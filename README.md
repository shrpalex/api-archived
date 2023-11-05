<div align="center">
    <img src="https://cdn3.emoji.gg/emojis/3812-catblushstare.gif" width="75" align="center"></img>
</div>

<h2 align="center">welcome to the azure's mod repo</h2>
<p align="center">Here you can find all sorts of tinkery which you can play around with, including: official mod source codes, the official modding devkit, tutorials, and more!</p>

## > contents

first of all, this repo is subdivided into folders that host a certain type of content.

**os-devkit-v1** (devkit folder, most updated) hosts the Modding devkit, or basically most of the instanceable parts of the **Client Framework**

... more to be added!!!

## > devkit usage

### also read [`os-devkit-v1/devkit-info.md`]

the codebase of the game is purely written in **TypeScript**, then transpiled down to **Luau** using the [roblox-ts](https://roblox-ts.com/) tool.

You have two ways of using this devkit:

### 1. CIY (compile it yourself)

**For this method you will need:**

- obviously, roblox studio
- an updated version of [vscode](https://code.visualstudio.com/)
- the [roblox-ts](https://marketplace.visualstudio.com/items?itemName=Roblox-TS.vscode-roblox-ts) plugin on vscode
- [nodejs](https://nodejs.org/en), npm
- rojo if you also want to port the devkit on roblox studio

//

So, [download](https://github.com/shrpalex/azures-mod/archive/refs/heads/main.zip) or [clone](https://github.com/git-guides/git-clone) the repository.

once you're done doing that, open the `os-devkit-v1` folder in **vscode** and you're done... unless you absolutely want to code in **Luau**:

so, to transpile everything in Luau try to run `npx rbxtsc -w` (if it doesnt work remember to install every node module / `npm i roblox-ts`)

once you see the `/out` folder pop up and you're sure it contains all the **.lua** files you can use rojo to bring everything into life on **Roblox Studio**

### 2. Download the prebuilt (wont release until the game goes in beta)

Once beta rolls out, I'll start compiling the modules and making them downloadable in the **Release** tags.

You'll have to wait a little before you can use this method, but a test release of the module will likely come out in a few months :)

## Thanks for visiting :3