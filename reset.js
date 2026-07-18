module.exports = {
  run: [{
    method: "fs.rm",
    params: {
      path: "venvs/{{args.group}}"
    }
  }]
}
