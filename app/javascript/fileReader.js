export default {
  readFile: function (event) {
    const file = ev.target.files[0]
    const fileName = ev.target.files[0].name

    alert(fileName)

    const reader = new FileReader()

    reader.onload = e => this.$emit("load", { fileName: fileName, data_attributes: e.target.result})
    reader.readAsText(file)
  }
}
