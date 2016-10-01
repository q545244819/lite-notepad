<template>
  <div class="sidebar col-sm-3 col-md-3">
    <nav>
      <section class="item" v-for="item in data">
        <h4 v-text="item.title"></h4>
        <p v-text="item.date"></p>
        <i class="icon glyphicon glyphicon-remove" @click="remove($event, item.id)"></i>
      </section>
    </nav>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        data: []
      }
    },
    methods: {
      remove(e) {
        e.stopPropagation()
        
        alert(`current:note, remove!`)
      },
      add() {
        this.data.push({
          id: this.data.length + 1,
          title: `This is note${this.data.length + 1}`,
          date: '2015-01-01'
        })
      },
      returnNotepad() {
        this.$router.go('/notepad')
      }
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
      &:hover {
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