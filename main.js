const { app, shell, dialog } = require("electron");
const { exec } = require("child_process");
const path = require("path");

function launchApp() {
  if (process.platform === "darwin") {
    exec("open -a 'Creative Resolve'", (err, _stdout, stderr) => {
      if (err) {
        dialog.showErrorBox("警告", stderr);
      }
      app.quit();
    });
  } else {
    exec(
      String.raw`Get-ItemPropertyValue 'Registry::HKLM\SOFTWARE\16107399-379a-5e83-9c5b-0ed0c7aa5461' -Name InstallLocation`,
      { shell: "powershell.exe" },
      function (error, stdout, _stderr) {
        if (error) {
          dialog.showErrorBox("警告", "请先安装达芬奇创意集！");
          app.quit();
        }
        try {
          shell.openItem(
            path.join(stdout.replace(/\r?\n|\r/g, ""), "Creative Resolve.exe")
          );
          app.quit();
        } catch {
          app.quit();
        }
      }
    );
  }
}

app.on("ready", launchApp);
