<template>
  <main class="main" :class="{ active: sideCartStatus }">
    <header class="header">
      <h1 class="header__title">
        <span>Scoutside Vue Cart</span>
      </h1>
      <div class="header__cart-icon" @click="openSideCart">
        <span><svg width="24px" height="24px" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg"><g fill-rule="evenodd"><path d="M3.601 0h-2.51a1.09 1.09 0 100 2.182h2.51l3.584 9.86a3.273 3.273 0 00.452 6.503h13.09a1.09 1.09 0 100-2.181H7.638a1.09 1.09 0 110-2.182h9.605a4.577 4.577 0 004.26-2.951l2.428-6.486a1.09 1.09 0 00-1.02-1.472H6.545a.927.927 0 00-.218 0l-.675-1.86H5.65A2.183 2.183 0 003.6 0zm17.732 5.455l-1.877 5.013h.002A2.376 2.376 0 0117.242 12H9.49L7.091 5.455h14.242zM9.974 23.871c-.63.261-1.36.116-1.842-.366a1.692 1.692 0 111.843.367zM17.583 22.956c-.26-.63-.116-1.36.367-1.843a1.692 1.692 0 11-.367 1.843z"></path></g></svg></span>
        <span class="header__cart-count">{{ count }}</span>
      </div>
    </header>
    <section class="products">
      <div class="product-card" v-for="product in products" :key="product.id">
        <img class="product-card__image" :src="product.image" />
        <h3 class="product-card__title">{{ product.name }}</h3>
        <p class="product-card__price">{{ formatPrice(product.price) }}</p>
        <div class="product-card__button" @click="addToCart(product)">Add to Cart</div>
      </div>
    </section>
    <CartSideDrawer/>
  </main>
</template>

<script>

import '../styles/main.scss'

import CartSideDrawer from './CartSideDrawer.vue'

import { mapGetters } from "vuex";
import { formatMoney } from '../utilities/string'

export default {
  name: 'HomePage',
  components: {
    CartSideDrawer
  },
  computed: {
    ...mapGetters({
      products: "getAllProducts"
    }),
    count () {
      return this.$store.state.count
    },
    sideCartStatus() {
        return this.$store.state.sideCartActive
    },
  },
  methods: {
    openSideCart() {
      this.$store.dispatch("openSideCart")
    },
    addToCart(product) {
      this.$store.dispatch("increment");
      this.$store.dispatch("openSideCart");
      this.$store.dispatch("addToCartProduct", product);
    },
    formatPrice(number) {
      return formatMoney(number);
    }
  }
}
</script>
