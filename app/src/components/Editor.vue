<template>
  <div class="editor col-sm-8 col-md-8">
    <input type="text" class="form-control" placeholder="请输入笔记标题" v-model="note.title">
    <div>
      <vue-html5-editor :content.sync="note.content" :auto-height="true"></vue-html5-editor>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery'
  import NiceScroll from 'jquery.nicescroll'
  import os from 'os'
  import format from 'date-format'
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
    duration: 1500,
    type: 'danger',
    placement: 'top',
    content: '保存笔记失败！'
  }
  const saveNoteToLocal = (note) => {
    return new Promise((resolve, reject) => {
      storage.get('notes', (err, data) => {
        const changeNote = data.filter(item => item.id === note.id)[0]

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
  const saveHistoryToLocal = (note) => {
    return new Promise((resolve, reject) => {
      note.update = format('yyyy-MM-dd hh:mm:ss', new Date)

      storage.get(`history-${note.id}`, (err, data) => {
        if (Object.prototype.toString.call(data) === '[object Object]') {
          data = []
        }

        if (data.length === 20) {
          data.pop()
        }

        data.unshift(note)

        storage.set(`history-${note.id}`, data, (err, data) => {
          if (err) {
            return reject(err)
          }

          resolve(data)
        })
      })
    })
  }
  const save = (note) => {
    return Promise.all([
      saveNoteToLocal(note),
      saveHistoryToLocal(note)
    ])
  }
  const setChangeListener = (div, listener) => {
    div.addEventListener("keydown", listener)
    div.addEventListener("paste", listener)
    div.addEventListener("delete", listener)
  }
  const removeChangeListener = div => {
    div.onKeydown = null
    div.onPaste = null
    div.onDelete = null
  }


  export default {
    vuex: {
      getters: {
        note: getNoteById
      }
    },
    ready() {
      let keys = ''

      switch (platform) {
        case 'darwin':
          keys = 'meta s'
          break
        case 'win32':
          keys = 'ctrl s'
          break
      }

      key(keys, () => save(this.note).then(() => {
        document.title = this.note.title

        return this.$dispatch('alert', success)
      }).catch(() => this.$dispatch('alert', error)))

      this.$el.querySelector('.form-control').addEventListener('input', e => {
        document.title = `${this.note.title} - 未保存`
      })
      setChangeListener(this.$el.querySelector('.vue-html5-editor > .content'), e => {
        document.title = `${this.note.title} - 未保存`
      })

      $(this.$el).niceScroll({cursorcolor: "#999999", zindex: 99999})

      document.title = this.note.title
    },
    beforeDestroyed() {
      this.$el.querySelector('.form-control').onInput = null
      removeChangeListener(this.$el.querySelector('.vue-html5-editor > .content'))
    },
    destroyed() {
      key('meta s', () => {})
      key('ctrl s', () => {})

      document.title = 'lite-notepad'
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
      padding: 20px 10px;
      border-radius: 0;
      border-color: #ddd;
      font-size: 18px;
      font-weight: bold;
    }
    .vue-html5-editor {
      border-top: none;
      border-bottom: none;
      border-radius: 0;
    }
  }
</style>