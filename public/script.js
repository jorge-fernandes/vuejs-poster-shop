new Vue({
	el: '#app',
	data: {
		total: 0,
		items: [],
		cart: [],
		search: ''
	},
	methods: {
		addItem: function(index) {
			var item = this.items[index];
			var addItem = true;

			this.total += item.price;

			for(var i = 0; i < this.cart.length; i++) {
				if(this.cart[i].id === item.id) {
					this.cart[i].quantity++;
					addItem = false;
					break;
				}
			}

			if(addItem) {
				this.cart.push({
					id: item.id,
					title: item.title,
					quantity: 1,
					price: item.price
				});
			}
		},
		incrementItem: function(item) {
			item.quantity++;
			this.total += item.price;
		},
		decrementItem: function(item) {
			item.quantity--;
			this.total -= item.price;
			if(item.quantity <= 0) {
				for(var i = 0; i < this.cart.length; i++) {
					if(this.cart[i].id === item.id) {
						this.cart.splice(i, 1);
						break;
					}
				}
			}
		},
		onSubmit: function() {
			var me = this;
			axios.get('/search/'.concat(this.search))
				.then(function(res) {
					var data = res.data;
					//inject fake prices
					data.forEach(function(item) {
						item.price = Math.random() * 10;
					});
					me.items = data;
				})
		}
	},
	filters: {
		formatCurrency: function(price) {
			return '€'.concat(price.toFixed(2));
		}
	}
})