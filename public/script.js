new Vue({
	el: '#app',
	data: {
		total: 0,
		items: [
			{
				id: 1,
				title: 'Item 1',
				price: 0.99
			},
			{
				id: 2,
				title: 'Item 2',
				price: 5.00
			},
			{
				id: 3,
				title: 'Item 3',
				price: 14.50
			}
		],
		cart: []
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
		}
	},
	filters: {
		formatCurrency: function(price) {
			return '€'.concat(price.toFixed(2));
		}
	}
})