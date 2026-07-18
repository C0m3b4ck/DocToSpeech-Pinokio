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

### IMPORTANT COMPATIBILITY NOTE - READ BEFORE USE

**Poppler** is required for PDF text extraction on all platforms. If you plan to process PDF files, you must install Poppler separately — it is **not** included with pip dependencies.

| Platform | Install Command |
|----------|-----------------|
| **Linux (Debian/Ubuntu)** | `sudo apt install poppler-utils` |
| **Linux (Fedora/RHEL)** | `sudo dnf install poppler-utils` |
| **Linux (Arch)** | `sudo pacman -S poppler` |
| **macOS** | `brew install poppler` |
| **Windows** | Download from [poppler-windows releases](https://github.com/oschwartz10612/poppler-windows/releases), extract, and add the `Library/bin` folder to your system PATH |

After installing, verify with: `pdftotext -v`

Without Poppler, PDF documents will fail to load in the Gradio web UI and CLI.

### PDF OCR (Scanned Documents)

DocToSpeech supports OCR for scanned PDFs (page scans with no text layer). This requires **Tesseract OCR** to be installed separately:

| Platform | Install Command |
|----------|-----------------|
| **Linux (Debian/Ubuntu)** | `sudo apt install tesseract-ocr` |
| **Linux (Fedora/RHEL)** | `sudo dnf install tesseract` |
| **Linux (Arch)** | `sudo pacman -S tesseract` |
| **macOS** | `brew install tesseract` |
| **Windows** | Download from [UB-Mannheim releases](https://github.com/UB-Mannheim/tesseract/wiki), install, and add to PATH |

When a PDF contains no extractable text (pure image scans), DocToSpeech automatically detects this and falls back to OCR using Tesseract. The `pytesseract` and `pdf2image` Python packages are included in all requirements files.

## Credits

Started on July 12th, 2026 by C0m3b4ck.

MPL 2.0 License.
