new Vue({
	el: '#app',
	data: {
		total: 0,
		items: [
			{
				id: 1,
				title: 'Item 1'
			},
			{
				id: 2,
				title: 'Item 2'
			},
			{
				id: 3,
				title: 'Item 3'
			}
		],
		cart: []
	},
	methods: {
		addItem: function(index) {
			var item = this.items[index];
			var addItem = true;
			for(var i = 0; i < this.cart.length; i++) {
				if(this.cart[i].id === item.id) {
					this.cart[i].quantity++;
					addItem = false;
				}
			}

			this.total += 9.99;
			if(addItem) {
				this.cart.push({
					id: item.id,
					title: item.title,
					quantity: 1
				});
			}
		}
	}
})