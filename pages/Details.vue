<template>
  <div class="details">
    <div class="card">
      <div class="card__header">
        <NuxtLink to="/" class="link back">
          <ChevronLeftMdi />
          Вернуться
        </NuxtLink>
      </div>
      <div class="card__body">
        <div
          v-for="(value, propName, index) in item"
          :key="index"
          class="card__body__item"
        >
          <span>{{propName}}:</span>  {{value}}
        </div>
      </div>
    </div>
    <!--    <NuxtLink to="/">-->
    <!--      back to /-->
    <!--    </NuxtLink>-->
  </div>
</template>

<script>
export default {
  data () {
    return {
      item: {
        postId: 'Загрузка',
        id: 'Загрузка',
        name: 'Загрузка',
        email: 'Загрузка',
        body: 'Загрузка'
      }
    }
  },
  async mounted () {
    await this.$store.dispatch('fetchComments')
    const id = Number(this.$route.query.id)

    if (id && Number.isInteger(id)) {
      const comment = this.$store.state.comments.find(el => el.id === id)
      if (comment) {
        this.item = comment
      } else {
        this.$router.push('/')
      }
    } else {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss" scoped>
.details {
  background-color: #f3f5f7;
  height: 100vh;
  display: flex;
  padding: 20px;
  box-sizing: border-box;
  justify-content: center;
}
.card {
  display: flex;
  flex-direction: column;
  width: 500px;
  min-height: 300px;
  height: fit-content;
  padding: 12px;
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 0 2px 1px -1px rgba(0, 0, 0, .2), 0 1px 1px 0 rgba(0, 0, 0, .14), 0 1px 3px 0 rgba(0, 0, 0, .12) !important;
  &__body {
    &__item {
      font-size: 18px;
      & span {
        font-weight: 600;
      }
      &:not(:last-child) {
        margin-bottom: 8px;
      }
    }
  }
}
a.link {
  display: flex;
  align-items: center;
  text-decoration: none !important;
  color: #222;
  font-size: 18px;
  margin-bottom: 16px;
  & span {
    font-size: 22px !important;
    & > svg {
      bottom: 0 !important;
    }
  }
}
</style>
