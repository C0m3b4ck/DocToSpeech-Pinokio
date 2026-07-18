module.exports = {
  requires: {
    bundle: "ai"
  },
  run: [
    {
      method: "local.set",
      params: {
        state: {
          group: "{{args.group}}"
        }
      }
    },
    // Coqui + StyleTTS 2
    {
      when: "{{args.group === 'coqui'}}",
      method: "shell.run",
      params: {
        venv: "venvs/coqui",
        path: ".",
        message: [
          "uv pip install -r requirements/coqui.txt",
          "uv pip install -r requirements/styletts2.txt",
          "uv pip install gradio"
        ],
      }
    },
    // Chatterbox
    {
      when: "{{args.group === 'chatterbox'}}",
      method: "shell.run",
      params: {
        venv: "venvs/chatterbox",
        path: ".",
        message: [
          "uv pip install -r requirements/chatterbox.txt",
          "uv pip install gradio"
        ],
      }
    },
    // Tortoise
    {
      when: "{{args.group === 'tortoise'}}",
      method: "shell.run",
      params: {
        venv: "venvs/tortoise",
        path: ".",
        message: [
          "uv pip install -r requirements/tortoise.txt",
          "uv pip install gradio"
        ],
      }
    },
    // CSM
    {
      when: "{{args.group === 'csm'}}",
      method: "shell.run",
      params: {
        venv: "venvs/csm",
        path: ".",
        message: [
          "uv pip install -r requirements/csm.txt",
          "uv pip install gradio"
        ],
      }
    },
    // OpenVoice - install deps
    {
      when: "{{args.group === 'openvoice'}}",
      method: "shell.run",
      params: {
        venv: "venvs/openvoice",
        path: ".",
        message: [
          "uv pip install -r requirements/openvoice.txt",
          "uv pip install gradio"
        ],
      }
    },
    // OpenVoice - clone repos + download checkpoints
    {
      when: "{{args.group === 'openvoice'}}",
      method: "shell.run",
      params: {
        path: ".",
        message: [
          "git clone https://github.com/myshell-ai/OpenVoice.git",
          "cd OpenVoice && pip install -e .",
          "pip install git+https://github.com/myshell-ai/MeloTTS.git"
        ],
      }
    },
    {
      when: "{{args.group === 'openvoice'}}",
      method: "shell.run",
      params: {
        path: ".",
        message: [
          "python -c \"from huggingface_hub import snapshot_download; snapshot_download(repo_id='myshell-ai/OpenVoiceV2', local_dir='checkpoints_v2')\""
        ],
      }
    },
    // Install torch for the selected group
    {
      method: "script.start",
      params: {
        uri: "torch.js",
        params: {
          venv: "venvs/{{args.group}}",
          path: "."
        }
      }
    },
    // Post-install message
    {
      when: "{{args.group === 'csm'}}",
      method: "input",
      params: {
        title: "HuggingFace Login Required",
        description: "Before starting, run 'huggingface-cli login' in your terminal to authenticate with HuggingFace. CSM models require gated access."
      }
    },
    {
      when: "{{args.group !== 'csm'}}",
      method: "input",
      params: {
        title: "Install Complete",
        description: "Installation complete. You may now start the app."
      }
    },
  ]
}
