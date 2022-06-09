import { createApp } from 'vue'
import { createStore } from 'vuex'
import { formatMoney } from './utilities/string'
import App from './App.vue'

const store = createStore({
    state () {
        return {
            cart: [],
            cartTotal: 0,
            sideCartActive: false,
            count: 0,
            products: [
                {
                  id: 1,
                  name: "Macbook Pro 13-inch",
                  price: 129999,
                  image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp-spacegray-select-202206?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1653493200207"
                },
                {
                  id: 2,
                  name: "Macbook Pro 14-inch",
                  price: 199999,
                  image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp14-spacegray-select-202110?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1632788573000g"
                },
                {
                  id: 3,
                  name: "Macbook Pro 16-inch",
                  price: 249999,
                  image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp16-spacegray-select-202110?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1632788574000"
                },
            ]
        }
    },
    mutations: {
        increment (state) {
            state.count++
        },
        addToCartProduct (state, item) {
            let checkIfInCart = () => {
                let inCart = false
                state.cart.forEach(cartItem => {
                    if(cartItem.id === item.id){
                        return inCart = true
                    }
                });
                return inCart
            }

            if(checkIfInCart()) {
                item.quantity++
            } else {
                item.quantity = 1;
                state.cart.push(item);
            }
        },
        clearCart (state) {
            state.cart = [];
            state.count = 0;
        },
        openSideCart (state) {
            state.sideCartActive = true 
        },
        closeSideCart (state) {
            state.sideCartActive = false
        }
    },
    actions: {
        increment ({commit}) {
            commit("increment")
        },
        addToCartProduct ({commit}, payload) {
            commit("addToCartProduct", payload)
        },
        clearCart ({commit}) {
            commit("clearCart")
        },
        openSideCart ({commit}) {
            commit("openSideCart")
        },
        closeSideCart ({commit}) {
            commit("closeSideCart")
        }
    },
    getters: {
        getAllProducts: state => state.products,
        getCart: state => state.cart,
        getCartTotal (state) {
            if(state.cart.length > 0) {
                let cartTotal = state.cart.reduce((accumulator, item) => {
                    return accumulator + (item.price * item.quantity);
                }, 0);
                return formatMoney(cartTotal)
            } else {
                return formatMoney(state.cartTotal)
            }
        }
    }
})

const app = createApp(App)

app.use(store)
app.mount('#app')