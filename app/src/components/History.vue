<template>
  <aside :show.sync="showRight" placement="right" header="笔记历史" width="250">
    <div class="media" v-for="item in history">
      <div class="media-body">
        <h4 class="media-heading" v-text="item.title"></h4>
        <p class="content" v-text="item.content"></p>
        <p>保存于：<span v-text="item.update"></span></p>
      </div>
    </div>
  </aside>
</template>

<script>
  import storage from 'electron-json-storage'
  import {
    getShowHistory,
    getCurrentNoteId
  } from '../vuex/getters'
  import {
    toggleHistory
  } from '../vuex/action'
  import { aside } from 'vue-strap'

  export default {
    data() {
      return {
        showRight: false,
        history: []
      }
    },
    computed: {
      showRight: {
        get() {
          if (this.id) {
            storage.get(`history-${this.id}`, (err, data) => {
              this.history = data
            })
          }

          return this.show
        },
        set(val) {
          this.toggleHistory(val)
        }
      }
    },
    vuex: {
      getters: {
        show: getShowHistory,
        id: getCurrentNoteId
      },
      actions: {
        toggleHistory
      }
    },
    components: {
      aside
    }
  }
</script>

<style lang="less" scoped>
  .media-body {
    cursor: pointer;
    border-bottom: 1px solid #ddd;

    .content {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
</style>