<template>
  <v-btn small color="info" @click="triggerUpload()">
    Upload
    <input ref="fileInput" style="display: none" class="btn__content" type="file" @change="readFile">
  </v-btn>

</template>

<script>
export default {
  methods: {
    readFile: function (ev) {
      const file = ev.target.files[0]
      const fileName = ev.target.files[0].name

      const reader = new FileReader()

      reader.onload = e => this.$emit("load", { fileName: fileName, data_attributes: e.target.result})
      reader.readAsText(file)
    },
    triggerUpload: function() {
      this.$refs.fileInput.click()
    }
  }
}
</script>
