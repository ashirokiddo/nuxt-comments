<template>
  <div class="custom-table">
    <table>
      <thead>
        <tr>
          <th
            v-for="header in headers"
            :key="header.value"
            :class="{'usable': header.sortable}"
            @click="sortBy(header.value)"
          >
            <div>
              <span>
                {{ header.text }}
              </span>
              <div
                v-if="header.sortable"
                class="sort-arrow"
              >
                <ChevronUpMdi />
              </div>
            </div>
          </th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="(item, index) in getPageItems"
          :key="index"
          @dblclick="showDetails(item)"
        >
          <td
            v-for="header in headers"
            :key="header.value"
          >
            {{ item[header.value] }}
          </td>
        </tr>
      </tbody>
    </table>

    <div class="footer">
      <div class="footer__select">
        <span>Элементов на странице: {{ itemsPerPage.text }}</span>
      </div>

      <div class="footer__pagination">
        {{ tablePage + 1 }} из {{ getPageCount || 1 }}
      </div>

      <div class="footer__rows">
        <button
          class="btn table-btn"
          :disabled="getArrowDisabled.left"
          :class="{
            'disabled': getArrowDisabled.left
          }"
          @click="tablePage--"
        >
          <ChevronLeftMdi />
        </button>
        <button
          class="btn table-btn"
          :disabled="getArrowDisabled.right"
          :class="{
            'disabled': getArrowDisabled.right
          }"
          @click="tablePage++"
        >
          <ChevronRightMdi />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    headers: {
      type: Array,
      default: () => [],
      required: true
    },
    items: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  data () {
    return {
      sortName: 'id',
      sortDir: 'asc',

      sortState: {},

      tablePage: 0,

      itemsPerPage: {
        text: '10',
        val: 10
      },

      itemsPerPageList: [
        {
          text: '10',
          val: 10
        },
        {
          text: '15',
          val: 15
        },
        {
          text: '25',
          val: 25
        },
        {
          text: '100',
          val: 100
        },
        {
          text: 'Все',
          val: -1
        }
      ]
    }
  },
  computed: {
    getArrowDisabled () {
      return {
        left: this.tablePage <= 0,
        right: !(this.tablePage >= 0 && this.tablePage + 1 < this.getPageCount)
      }
    },

    getPageItems () {
      return this.itemsPerPage.val === -1
        ? this.items
        : [...this.items].sort((a, b) => {
            let modifier = 1
            if (this.sortDir === 'desc') {
              modifier = -1
            }

            if (a[this.sortName] < b[this.sortName]) {
              return -1 * modifier
            }
            if (a[this.sortName] > b[this.sortName]) {
              return modifier
            }

            return 0
          }).slice(
            this.tablePage * this.itemsPerPage.val,
            (this.tablePage * this.itemsPerPage.val) + this.itemsPerPage.val
          )
    },

    getPageCount () {
      return this.itemsPerPage.val === -1
        ? 1
        : Math.ceil(this.items.length / this.itemsPerPage.val)
    }
  },
  methods: {
    showDetails (item) {
      this.$router.push({ path: `/Details?id=${item.id}` })
    },

    sortBy (value) {
      const header = this.headers.find(el => el.value === value)

      if (header === undefined || !header.sortable) {
        return
      }

      this.sortName = value

      if (value === this.sortName) {
        this.sortDir = this.sortDir === 'asc' ? 'desc' : 'asc'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.custom-table {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 900px;
  height: fit-content;
  padding: 12px;
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 0 2px 1px -1px rgba(0, 0, 0, .2), 0 1px 1px 0 rgba(0, 0, 0, .14), 0 1px 3px 0 rgba(0, 0, 0, .12) !important;
}

table {
  width: 100%;
  display: table;
  border-collapse: separate;
  box-sizing: border-box;
  text-indent: initial;
  border-color: grey;

  & > thead > tr {
    & > th {
      border-bottom: thin solid rgba(0, 0, 0, .12);
      text-align: left;
      user-select: none;
      line-height: 48px;
      height: 48px;

      & > :first-child {
        width: max-content;
        padding: 0 16px;
      }
    }
  }

  & > tbody > tr > td {
    user-select: none;
    line-height: 48px;
    height: 48px;
    padding: 0 16px;
    border-bottom: thin solid rgba(0, 0, 0, .12);
  }
}

.footer {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  font-size: 0.75rem;
  padding: 0 8px;
  margin-top: 16px;

  &__select {
    display: flex;
    align-items: center;
    flex: 0 0 0;
    justify-content: flex-end;
    white-space: nowrap;
    margin-left: auto;
    margin-right: 12px;
  }

  &__rows {
    margin-left: 12px;

    & button:not(:last-child) {
      margin-right: 4px;
    }
  }
}

.table-btn {
  font-size: 22px;
  border: none;
  border-radius: 50%;
  height: 35px;
  width: 35px;
  background-color: transparent;
  transition: background-color 0.2s ease-in-out;
  &:hover {
    background-color: #f3f5f7;
  }
  & span > svg {
    bottom: 0 !important;
  }
}

.sort-arrow {
  display: inline-flex;
}
</style>
