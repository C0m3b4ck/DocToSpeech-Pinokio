module.exports = {
  run: [
    {
      method: "fs.link",
      params: {
        venv: "venvs/{{args.group}}"
      }
    }
  ]
}
