<template>
  <div class="home">
    <custom-table
      :headers="headers"
      :items="items"
    />
  </div>
</template>

<script>
import CustomTable from '@/components/CustomTable.vue'

export default {
  components: {
    CustomTable
  },
  data () {
    return {
      headers: [
        {
          text: 'id',
          value: 'id',
          sortable: true
        },
        {
          text: 'Имя',
          value: 'name',
          sortable: false
        },
        {
          text: 'Email',
          value: 'email',
          sortable: false
        }
      ]

    }
  },
  computed: {
    items () {
      return this.$store.state.comments
    }
  },
  mounted () {
    this.$store.dispatch('fetchComments')
  }
}
</script>

<style lang="scss" scoped>
// scoped styles

.home {
  background-color: #f3f5f7;
  height: 100vh;
  display: flex;
  padding: 20px;
  box-sizing: border-box;
  justify-content: center;
}
</style>
