import { app, BrowserWindow } from "electron";
import path from "path";
require("electron-reload")(__dirname);
import { Foo } from "./libs/Foo";
import { doStuff } from "./libs/Bar";

let f = new Foo();
doStuff(f);

let mainWindow = null;

const createWindow = () => {
    mainWindow = new BrowserWindow({
        width: 854,
        height: 480,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: true,
        },
    });
    mainWindow.loadURL(path.join(__dirname, "www", "launcher.html"));
    mainWindow.webContents.openDevTools();
};

app.on("ready", () => {
    app.name = "Svelte Template";
    createWindow();
});

app.on("window-all-closed", () => {
    app.quit();
});