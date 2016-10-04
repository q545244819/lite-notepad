<template>
  <div class="sidebar col-sm-3 col-md-3">
    <nav>
      <section class="item"
        v-for="item in notes"
        v-link="{name: 'edit', params: {id: item.id}, activeClass: 'active'}"
        @click="setCurrentNoteId(item.id)">
        <h4 v-text="item.title"></h4>
        <p>创建于：<span v-text="item.date"></span></p>
      </section>
    </nav>
  </div>
</template>

<script>
  import $ from 'jquery'
  import NiceScroll from 'jquery.nicescroll'
  import {
    getNotes
  } from '../vuex/getters'
  import {
    getNotesFormLocal,
    setCurrentNoteId
  } from '../vuex/action'

  export default {
    vuex: {
      getters: {
        notes: getNotes
      },
      actions: {
        getNotesFormLocal,
        setCurrentNoteId
      }
    },
    ready() {
      this.getNotesFormLocal()

      $(this.$el).niceScroll({cursorcolor: "#999999"})
    }
  }
</script>

<style lang="less" scoped>
  .sidebar {
    height: 100vh;
    padding: 0;
    overflow-y: auto;
    background-color: #ECF0F1;
  }

  nav {
    .item {
      &:hover,
      &.active {
        background-color: #BDC3C7;
      }
      position: relative;
      cursor: pointer;
      padding: 5px 15px 0;
      border-bottom: 1px solid #95A5A6;
      h4 {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .icon {
        position: absolute;
        right: 15px;
      }
      .glyphicon-remove {
        top: 15px;
      }
      .add {
        font-size: 24px;
      }
    }
    .add {
      margin: 0;
      border-bottom: 1px solid #95A5A6;
      text-align: center;
      i {
        cursor: pointer;
        margin-top: -1px;
        &:hover {
          background-color: #BDC3C7;
        }
        padding: 15px 0;
      }
      .glyphicon-arrow-left {
        border-left: 1px solid #BDC3C7;
      }
    }
  }
</style>