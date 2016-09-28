<template>
  <nav>
    <section class="item" v-for="item in data" @click="show(item.id)">
      <h4 v-text="item.title"></h4>
      <p v-text="item.date"></p>
      <i class="icon glyphicon glyphicon-edit" @click="edit($event, item.id)"></i>
      <i class="icon glyphicon glyphicon-remove" @click="remove($event, item.id)"></i>
    </section>
    <section class="add row">
      <i v-bind:class="[current === 'notepad' ? 'col-xs-12' : 'col-xs-6']"
        @click="add()"
        class="glyphicon glyphicon-plus"></i>
      <i v-show="current === 'note'"
        @click="returnNotepad()"
        class="col-xs-6 glyphicon glyphicon-arrow-left"></i>
    </section>
  </nav>
</template>

<script>
  const data = [
  ]
  const notes = [
  ]

  export default {
    data() {
      return {
        data,
        current: 'notepad'
      }
    },
    methods: {
      edit(e) {
        e.stopPropagation()

        alert(`current:${this.current}, edit!`)
      },
      remove(e) {
        e.stopPropagation()
        
        alert(`current:${this.current}, remove!`)
      },
      show(id) {
        this.current === 'notepad' ? this.current = 'note' : false

        this.data = notes
      },
      add() {
        this.data.push({
          id: this.data.length + 1,
          title: `This is ${this.current}${this.data.length + 1}`,
          date: '2015-01-01'
        })
      },
      returnNotepad() {
        this.current = 'notepad'
        this.data = data

        this.$dispatch('toggleMask', true)
      }
    }
  }
</script>

<style lang="less" scoped>
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
        overflow : hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }

      .icon {
        position: absolute;
        right: 15px;
      }

      .glyphicon-edit {
        top: 15px;
      }

      .glyphicon-remove {
        top: 35px;
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