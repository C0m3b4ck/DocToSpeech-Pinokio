const path = require('path')
module.exports = {
  version: "7.0",
  title: "DocToSpeech",
  description: "Offline document-to-speech with 9 TTS models across 5 engine groups",
  icon: "icon.png",
  menu: async (kernel, info) => {
    let local = info.local("state") || {}
    let group = local.group

    let running = {
      install: info.running("install.js"),
      start: info.running("start.js"),
      update: info.running("update.js"),
      reset: info.running("reset.js"),
      link: info.running("link.js")
    }

    if (running.install) {
      return [{
        default: true,
        icon: "fa-solid fa-plug",
        text: "Installing " + (group || "") + "...",
        href: "install.js",
      }]
    } else if (running.start) {
      let url = info.local("start.js")
      if (url && url.url) {
        return [{
          default: true,
          icon: "fa-solid fa-rocket",
          text: "Open Web UI",
          href: url.url,
        }, {
          icon: 'fa-solid fa-terminal',
          text: "Terminal",
          href: "start.js",
        }]
      } else {
        return [{
          default: true,
          icon: 'fa-solid fa-terminal',
          text: "Terminal",
          href: "start.js",
        }]
      }
    } else if (running.update) {
      return [{
        default: true,
        icon: 'fa-solid fa-terminal',
        text: "Updating...",
        href: "update.js",
      }]
    } else if (running.reset) {
      return [{
        default: true,
        icon: 'fa-solid fa-terminal',
        text: "Resetting...",
        href: "reset.js",
      }]
    } else if (running.link) {
      return [{
        default: true,
        icon: 'fa-solid fa-terminal',
        text: "Deduplicating...",
        href: "link.js",
      }]
    } else if (!group) {
      return [{
        default: true,
        icon: "fa-solid fa-microchip",
        text: "<div><strong>Coqui + StyleTTS 2</strong><div>XTTS v2, Bark, VITS, YourTTS, StyleTTS 2</div></div>",
        href: "install.js?group=coqui",
      }, {
        icon: "fa-solid fa-microchip",
        text: "<div><strong>Chatterbox</strong><div>Resemble Chatterbox TTS</div></div>",
        href: "install.js?group=chatterbox",
      }, {
        icon: "fa-solid fa-microchip",
        text: "<div><strong>Tortoise</strong><div>Tortoise TTS</div></div>",
        href: "install.js?group=tortoise",
      }, {
        icon: "fa-solid fa-microchip",
        text: "<div><strong>CSM</strong><div>Sesame CSM-1B</div></div>",
        href: "install.js?group=csm",
      }, {
        icon: "fa-solid fa-microchip",
        text: "<div><strong>OpenVoice</strong><div>OpenVoice V2 + MeloTTS</div></div>",
        href: "install.js?group=openvoice",
      }]
    } else {
      let installed = info.exists("venvs/" + group)
      let groupNames = {
        coqui: "Coqui + StyleTTS 2",
        chatterbox: "Chatterbox",
        tortoise: "Tortoise",
        csm: "CSM",
        openvoice: "OpenVoice"
      }
      let displayName = groupNames[group] || group

      if (installed) {
        return [{
          default: true,
          icon: "fa-solid fa-power-off",
          text: "Start " + displayName,
          href: "start.js?group=" + group,
        }, {
          icon: "fa-solid fa-plug",
          text: "Update " + displayName,
          href: "update.js?group=" + group,
        }, {
          icon: "fa-solid fa-plug",
          text: "Reinstall " + displayName,
          href: "install.js?group=" + group,
        }, {
          icon: "fa-solid fa-file-zipper",
          text: "<div><strong>Save Disk Space</strong><div>Deduplicates redundant library files</div></div>",
          href: "link.js?group=" + group,
        }, {
          icon: "fa-regular fa-circle-xmark",
          text: "<div><strong>Reset " + displayName + "</strong><div>Revert to pre-install state</div></div>",
          href: "reset.js?group=" + group,
          confirm: "Are you sure you wish to reset " + displayName + "?"
        }, {
          icon: "fa-solid fa-arrow-left",
          text: "Change Model Group",
          href: "resetgroup.js",
        }]
      } else {
        return [{
          default: true,
          icon: "fa-solid fa-plug",
          text: "Install " + displayName,
          href: "install.js?group=" + group,
        }, {
          icon: "fa-solid fa-arrow-left",
          text: "Change Model Group",
          href: "resetgroup.js",
        }]
      }
    }
  }
}
