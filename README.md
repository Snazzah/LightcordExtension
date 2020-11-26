# Lightcord Extension
The web extension to make Lightcord work.

## Why do I need this?
The Cloudflare configuration for the domain `discord.com` [now blocks out requests](https://github.com/discord/discord-api-docs/issues/2078#issuecomment-697829305) that do not have the [proper user agent](https://discord.com/developers/docs/reference#user-agent). Since browsers are strict and do not allow the modification of user agents from inside a page, this extension sets the user agent for outgoing requests from Lightcord. (and does not require the use of a backend)

Before then the CloudFlare configuration for `discordapp.com` did not actively block requests with the incorrect user agents, but since the use of API requests to that domain is being deprecated, this extension is now required for future versions of Lightcord.

## What exactly is happening here?
- For every request being created for `discord.com` from Lightcord, the `User-Agent` header is replaced with `DiscordBot (https://lightcord.js.org 1.0.0)`
- All requests to `discordapp.com` from Lightcord will be redirected to `discord.com`.
- The `Access-Control-Allow-Headers` header in every response from Discord will have `user-agent` appended to it, since Firefox requires it in the CORS preflight.
- This extension also allows any request to `discord.com` from projects in [GitHub Codespaces](https://github.com/features/codespaces) to work. (Since Lightcord development use GitHub Codespaces)

## Installation
<details>
  <summary><img src="https://api.iconify.design/grommet-icons:chrome.svg" height="13"> Google Chrome</summary>

1. [Download the repo](https://github.com/Snazzah/LightcordExtension/archive/master.zip) and extract the folder somewhere for later. (you can also clone it)
2. Type `chrome://extensions` in the URL bar.
3. Turn on Developer Mode (top right) and click `Load unpacked`. (top left)
	![](https://get.snaz.in/43yCFup.png)
4. Select the `src` folder inside the extracted folder.
5. Reload Lightcord.
</details>

<details>
  <summary><img src="https://api.iconify.design/fa-brands:firefox.svg?color=%23cf6600" height="13"> Firefox</summary>

1. [Download the repo](https://github.com/Snazzah/LightcordExtension/archive/master.zip) and extract the folder somewhere for later. (you can also clone it)
2. Type `about:debugging#/runtime/this-firefox` in the URL bar.
3. Click `Load Temporary Add-on...`.
	![](https://get.snaz.in/8pED9yU.png)
4. Select the `src` folder inside the extracted folder.
5. Reload Lightcord.
</details>

<details>
  <summary><img src="https://api.iconify.design/fa-brands:opera.svg?color=%23ff1b2d" height="13"> Opera</summary>

1. [Download the repo](https://github.com/Snazzah/LightcordExtension/archive/master.zip) and extract the folder somewhere for later. (you can also clone it)
2. Type `opera://extensions` in the URL bar.
3. Turn on Developer Mode (top right) and click `Load unpacked`. (top left)
	![](https://get.snaz.in/7LnKk2D.png)
4. Select the `src` folder inside the extracted folder.
5. Reload Lightcord.
</details>

<details>
  <summary><img src="https://api.iconify.design/fa-brands:edge.svg?color=%234db3fc" height="13"> Microsoft Edge</summary>

1. [Download the repo](https://github.com/Snazzah/LightcordExtension/archive/master.zip) and extract the folder somewhere for later. (you can also clone it)
2. Type `edge://extensions` in the URL bar.
3. Turn on Developer Mode (bottom left) and click `Load unpacked`.
	![](https://get.snaz.in/Ns4Yatx.png)
4. Select the `src` folder inside the extracted folder.
5. Reload Lightcord.
</details>