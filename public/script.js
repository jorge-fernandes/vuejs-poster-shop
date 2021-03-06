var LOAD_NUM = 10;

new Vue({
	el: '#app',
	data: {
		total: 0,
		items: [],
		cart: [],
		newSearch: 'craft beer',
		lastSearch: '',
		loading: false,
		results: []
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
				if(me.newSearch.length) {
				me.loading = true;
				me.items = [];
				axios.get('/search/'.concat(this.newSearch))
					.then(function(res) {
						var data = res.data;
						//inject fake prices
						data.forEach(function(item) {
							item.price = Math.random() * 10;
						});
						me.loading = false;
						me.results = data;
						me.items = data.slice(0, LOAD_NUM);
						me.lastSearch = me.newSearch;
					});
			} else {
				me.newSearch = me.lastSearch;
				alert('You can not search for an empty term.');
			}
		},
		appendItems: function() {
			if(this.items.length < this.results.length) {
				var append = this.results.slice(this.items.length, this.items.length + LOAD_NUM);
				this.items = this.items.concat(append);
			}
		}
	},
	filters: {
		formatCurrency: function(price) {
			return '€'.concat(price.toFixed(2));
		}
	},
	mounted: function() {
		var me = this;
		var elem = document.getElementById('product-list-bottom');
		var watcher = scrollMonitor.create(elem);
		me.onSubmit();

		watcher.enterViewport(function() {
		 	me.appendItems();
		});
	},
	computed: {
		noMoreItems: function() {
			return this.items.length === this.results.length && this.results.length > 0;
		}
	}
});
