import { basename } from "$lib/prompta/utils";
import * as tauri from "@tauri-apps/api";
import * as shell from "@tauri-apps/api/shell";
import { appWindow } from "@tauri-apps/api/window";

export const openExternal = async (url: string) => {
  try {
    await shell.open(url);
  } catch (err) {
    console.debug("Failed to open external URL. Likely in a normal browser.", err);
  if (typeof window !== 'undefined') {
    window.open(url, "_blank");
  }
  }
};

export const AppWindow = {
  minimize: () => appWindow.minimize(),
  toggleMaximize: () => appWindow.toggleMaximize(),
  close: () => appWindow.close(),
};

export const toggleDevTools = async () => {
  await tauri.invoke("toggle_devtools");
};

export async function saveAs(filename: string, data: string) {
  const savePath = await tauri.dialog.save({ title: "Save as", defaultPath: filename });
  if (!savePath) return;
  return tauri.fs.writeFile(savePath, data);
}

export async function chooseAndOpenTextFile() {
  const file = await tauri.dialog.open({
    multiple: false,
    filters: [{ name: "JSON", extensions: ["json"] }],
  });

  if (!file) return;

  let filePath: string;
  if (Array.isArray(file)) {
    filePath = file[0];
  } else {
    filePath = file;
  }

  const data = await tauri.fs.readTextFile(filePath);

  return {
    name: basename(filePath) as string,
    data,
  };
}

export async function alert(message: string) {
  await tauri.dialog.message(message);
}

export async function confirm(message: string) {
  return tauri.dialog.confirm(message, { type: "warning" });
}
