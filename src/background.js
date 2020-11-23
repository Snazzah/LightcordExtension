const root = (chrome || browser);

function getChromeVersion() {
  let pieces = navigator.userAgent.match(
    /Chrom(?:e|ium)\/([0-9]+)\.([0-9]+)\.([0-9]+)\.([0-9]+)/
  );
  if (pieces == null || pieces.length !== 5) {
    return {};
  }
  pieces = pieces.map((piece) => parseInt(piece, 10));
  return {
    major: pieces[1],
    minor: pieces[2],
    build: pieces[3],
    patch: pieces[4],
  };
}

const useExtraHeaders = getChromeVersion().major >= 72;

// Set headers for discord.com
root.webRequest.onBeforeSendHeaders.addListener(
	details => {
    // Replace user-agent
    for (var i = 0; i < details.requestHeaders.length; ++i) {
      if (details.requestHeaders[i].name === 'User-Agent') {
        details.requestHeaders.splice(i, 1);
        details.requestHeaders.push({
          name: 'User-Agent',
          value: 'DiscordBot (https://lightcord.js.org 1.0.0)'
        });
        break;
      }
    }

		return { requestHeaders: details.requestHeaders };
	},
	{
		urls: ['https://discord.com/api/v*']
  },
  useExtraHeaders
  ? ['blocking', 'requestHeaders', 'extraHeaders']
  : ['blocking', 'requestHeaders']
);

// Redirect discordapp.com to discord.com
root.webRequest.onBeforeRequest.addListener(
	details => ({
    redirectUrl: details.url.replace('https://discordapp.com', 'https://discord.com')
  }),
	{
		urls: ['https://discordapp.com/api/v*']
	},
	['blocking']
);

// Browser action
root.browserAction.onClicked.addListener(() => {
  root.tabs.create({
    url: 'https://lightcord.js.org'
  });
});

// Fix CORS headers
root.webRequest.onHeadersReceived.addListener(
	details => {
    // Replace access-control-allow-headers to include user-agent
    // since this fails CORS preflight for Firefox
    for (var i = 0; i < details.responseHeaders.length; ++i) {
      if (details.responseHeaders[i].name === 'access-control-allow-headers') {
        if (!details.responseHeaders[i].value.includes('user-agent'))
          details.responseHeaders[i].value = [...details.responseHeaders[i].value.split(', '), 'user-agent'].join(', ')
        break;
      }
    }
    console.log(details)
		return { responseHeaders: details.responseHeaders };
	},
	{
		urls: ['https://discord.com/api/v*']
  },
  useExtraHeaders
  ? ['blocking', 'responseHeaders', 'extraHeaders']
  : ['blocking', 'responseHeaders']
);

console.log('Loaded');