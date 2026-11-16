const { app, BrowserWindow, shell } = require('electron');

app.whenReady().then(() => {
  const splash = new BrowserWindow({
    width: 520,
    height: 350,
    frame: false,
    resizable: false,
    backgroundColor: '#001b15',
    webPreferences: { contextIsolation: true, nodeIntegration: false, sandbox: true },
  });
  splash.loadFile('splash.html');

  const window = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 640,
    minHeight: 480,
    backgroundColor: '#10111a',
    title: 'AulaPlayer',
    show: false,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
    },
  });

  let shown = false;
  const showMain = () => {
    if (shown || window.isDestroyed()) return;
    shown = true;
    window.show();
    if (!splash.isDestroyed()) splash.close();
  };
  window.webContents.once('did-finish-load', showMain);
  window.webContents.once('did-fail-load', showMain);
  splash.on('closed', () => { if (!shown && !window.isDestroyed()) window.show(); });

  window.on('page-title-updated', (event) => {
    event.preventDefault();
    window.setTitle('AulaPlayer');
  });

  window.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https://stellar.rip/')) shell.openExternal(url);
    return { action: 'deny' };
  });
  window.webContents.on('dom-ready', () => {
    if (new URL(window.webContents.getURL()).hostname === 'stellar.rip') {
      window.webContents.insertCSS(`
        a[href$="/api"], a[href*="/api#"], a[href*="/api?"] { display: none !important; }
        a[aria-label="Stellar Rip home"] span:has(> img[src*="stellar-wordmark"]) > * { display: none !important; }
        a[aria-label="Stellar Rip home"] span:has(> img[src*="stellar-wordmark"])::after {
          content: "AULA";
          color: white;
          font-family: "Arial", sans-serif;
          font-size: 16px;
          font-weight: 400;
          letter-spacing: 0.32em;
          line-height: 1;
        }
      `);
    }
  });
  window.loadURL('https://stellar.rip/en');
  window.setMenuBarVisibility(false);
});

app.on('window-all-closed', () => app.quit());
