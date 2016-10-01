<template>
  <div class="editor col-sm-8 col-md-8">
    <input type="text" class="form-control" placeholder="请输入笔记标题" v-model="note.title">
    <div>
      <vue-html5-editor :content.sync="note.content" :auto-height="true"></vue-html5-editor>
    </div>
  </div>
</template>

<script>
  import os from 'os'
  import storage from 'electron-json-storage'
  import key from 'keyboard-shortcut'
  import {
    getNoteById
  } from '../vuex/getters'

  const platform = os.platform()
  const success = {
    show: true,
    duration: 1000,
    type: 'success',
    placement: 'top',
    content: '保存笔记成功！'
  }
  const error = {
    show: true,
    type: 'error',
    placement: 'top',
    content: '保存笔记失败！'
  }
  const save = (note) => {
    return new Promise((resolve, reject) => {
      storage.get('notes', (err, data) => {
        const changeNote = data[note.id]

        changeNote.title = note.title
        changeNote.content = note.content

        storage.set('notes', data, (err, data) => {
          if (err) {
            return reject(err)
          }

          resolve(data)
        })
      })
    })
  }

  export default {
    vuex: {
      getters: {
        note: getNoteById
      }
    },
    ready() {
      if (platform === 'darwin') {
        key('meta s', () => save(this.note).then(() => this.$dispatch('alert', success)).catch(() => this.$dispatch('alert', error)))
      }

      if (platform === 'win32') {
        key('ctrl s', () => save(this.note).then(() => this.$dispatch('alert', success)).catch(() => this.$dispatch('alert', error)))
      }
    },
    destroyed() {
      key('meta s', () => {})
      key('ctrl s', () => {})
    }
  }
</script>

<style lang="less" scoped>
  .editor {
    position: relative;
    overflow: auto;
    height: 100vh;
    padding: 0;
    .form-control {
      border-radius: 0;
      border-color: #ddd;
    }
    .vue-html5-editor {
      border-top: none;
      border-bottom: none;
      border-radius: 0;
    }
  }
</style>