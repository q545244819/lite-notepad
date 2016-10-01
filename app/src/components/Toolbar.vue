<template>
  <div class="toolbar col-sm-1 col-md-1">
    <nav>
      <a class="fa fa-plus" aria-hidden="true" @click="addNote()">
        <div class="tooltip right" role="tooltip">
          <div class="tooltip-arrow"></div>
          <div class="tooltip-inner">
            添加一条新笔记
          </div>
        </div>
      </a>
      <a class="fa fa-times" aria-hidden="true" @click="remove()">
        <div class="tooltip right" role="tooltip">
          <div class="tooltip-arrow"></div>
          <div class="tooltip-inner">
            删除当前笔记
          </div>
        </div>
      </a>
      <a class="fa fa-refresh" aria-hidden="true">
        <div class="tooltip right" role="tooltip">
          <div class="tooltip-arrow"></div>
          <div class="tooltip-inner">
            同步到服务器
          </div>
        </div>
      </a>
    </nav>
  </div>
</template>

<script>
  import { popover } from 'vue-strap'
  import {
    addNote,
    removeNoteById
  } from '../vuex/action.js'

  export default {
    vuex: {
      actions: {
        addNote,
        removeNoteById
      }
    },
    methods: {
      remove() {
        if (confirm('是否要删除这条笔记？')) {
          this.$router.go({
            name: 'note'
          })

          this.removeNoteById()
        }
      }
    },
    components: {
      popover
    }
  }
</script>

<style lang="less" scoped>
  .toolbar {
    position: relative;
    height: 100vh;
    padding: 0;
    background-color: #2C3E50;
    text-align: center;
    nav {
      a {
        &:hover,
        &:active,
        &:link {
          background-color: #34495E;
          text-decoration: none;
        }
        &:hover > .tooltip {
          display: block;
        }

        position: relative;        
        cursor: pointer;
        display: block;
        padding: 20px 0;
        font-size: 16px;
        color: #fff;
      }
      .setting-icon {
        position: absolute;
        width: 100%;
        bottom: 0;
        left: 0;
      }
    }
  }
  
  .tooltip {
    display: none;
    position: absolute;
    top: 15px;
    left: 100%;
    width: 200%;
  }
</style>