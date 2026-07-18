# DocToSpeech - Pinokio Launcher

Unified Pinokio launcher for [DocToSpeech](https://github.com/C0m3b4ck/DocToSpeech). Supports all 9 TTS models across 5 engine groups with isolated virtual environments.

## Installation

Copy this folder to your Pinokio `api/` directory:

```bash
cp -r DocToSpeech-Pinokio ~/.pinokio/api/DocToSpeech
```

Then open Pinokio and select a model group to install.

## Model Groups

| Group | Models | VRAM | Notes |
|-------|--------|------|-------|
| **Coqui + StyleTTS 2** | XTTS v2, Bark, VITS, YourTTS, StyleTTS 2 | 2-12 GB | 5 models in one venv |
| **Chatterbox** | Resemble Chatterbox | 2-4 GB | Voice cloning + paralinguistic tags |
| **Tortoise** | Tortoise TTS | 4-6 GB | Very slow but high quality, GPU required |
| **CSM** | Sesame CSM-1B | 4.5-8.5 GB | Requires HuggingFace login |
| **OpenVoice** | OpenVoice V2 + MeloTTS | ~4 GB | Multi-lingual via MeloTTS |

## Why Separate Venvs?

Each model group uses different versions of `transformers` and other core libraries:

| Group | transformers | torch |
|-------|-------------|-------|
| Coqui | >=4.43 | 2.7.0 |
| Chatterbox | ==5.2.0 | 2.7.0 |
| Tortoise | ==4.31.0 | 2.7.0 |
| CSM | ==4.45.2 | 2.7.0 |
| OpenVoice | (latest) | 2.7.0 |

## Project Structure

```
DocToSpeech-Pinokio/
  pinokio.json              # App metadata
  pinokio.js                # Menu with model group selection
  app.py                    # Gradio web UI
  doctospeech.py            # Main TTS engine
  agent.md                  # Ollama sanitization prompt
  template.py               # Ollama sanitizer
  torch.js                  # GPU-aware PyTorch installer
  install.js                # Unified installer (group-aware)
  start.js                  # Unified launcher (group-aware)
  update.js                 # Unified updater
  reset.js                  # Unified reset
  link.js                   # Unified dedup
  resetgroup.js             # Clear selected group
  requirements/             # Requirements per group
    coqui.txt
    styletts2.txt
    chatterbox.txt
    tortoise.txt
    csm.txt
    openvoice.txt
    gradio.txt
  venvs/                    # Isolated venvs (created on install)
    coqui/
    chatterbox/
    tortoise/
    csm/
    openvoice/
```

## Credits

Started on July 12th, 2026 by C0m3b4ck.

MPL 2.0 License.
