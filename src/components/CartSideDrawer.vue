<template>
    <section class="cart" :class="{ active: sideCartStatus }">
        <div class="cart__header">
            <h1 class="cart__title">
                <span>My Cart ({{ count }}</span>
                <span v-if="count == 1"> Item: </span>
                <span v-else> Items: </span>
                <span>{{ cartTotal }})</span>
            </h1>
            <div class="cart__close" @click="sideCartClose">
                <svg width="13px" height="13px" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg"><path d="M9.757 1.424A.804.804 0 0010 .834c0-.231-.08-.428-.243-.59A.804.804 0 009.167 0c-.23 0-.427.08-.59.243L5 3.82 1.424.243A.804.804 0 00.834 0C.602 0 .405.08.243.243A.804.804 0 000 .833c0 .23.08.427.243.59L3.82 5 .243 8.576a.804.804 0 00-.243.59c0 .231.08.428.243.59.163.163.36.245.59.244.23 0 .427-.08.59-.243L5 6.18l3.576 3.576c.164.162.36.244.59.243.231 0 .428-.08.59-.243a.804.804 0 00.244-.59c0-.23-.08-.427-.243-.59L6.18 5l3.576-3.576z" fill="#212721" fill-rule="evenodd"></path></svg>
            </div>
        </div>
        <div class="cart__body" v-if="cart.length > 0">
            <div class="cart__items">
                <div class="cart__item" v-for="item in cart" :key="item.id">
                    <div class="cart__image">
                        <img :src="item.image">
                    </div>
                    <div class="cart__content">
                        <h4>{{ item.name }}</h4>
                        <p>Line Item Price: {{ formatPrice(item.price) }}</p>
                        <p>Total Line Item Price: {{ lineItemPrice(item.price, item.quantity) }}</p>
                        <p>Quanity: {{ item.quantity }}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="cart__empty" v-else>
            <h3>Your Cart is Empty</h3>
            <p @click="sideCartClose">Continue Shopping</p>
        </div>
        <div class="cart__clear" @click="clearCart" v-if="cart.length > 0">
           Clear Cart
        </div>
    </section>
    <section class="cart__overlay" :class="{ active: sideCartStatus }" @click="sideCartClose"></section>
</template>

<script>
import '../styles/cartsidedrawer.scss';

import { mapGetters } from "vuex";
import { formatMoney } from '../utilities/string'

export default {
  name: 'CartSideDrawer',
  computed: {
    ...mapGetters({
      cart: "getCart",
      cartTotal: "getCartTotal"
    }),
    count () {
        return this.$store.state.count
    },
    sideCartStatus() {
        return this.$store.state.sideCartActive
    },
  },
  methods: {
    sideCartClose() {
        this.$store.dispatch("closeSideCart")
    },
    clearCart() {
        this.$store.dispatch("clearCart")
    },
    formatPrice(number) {
      return formatMoney(number);
    },
    lineItemPrice(price, quantity) {
        return formatMoney(price * quantity)
    }
  }
}
</script>