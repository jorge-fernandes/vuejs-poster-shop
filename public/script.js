new Vue({
	el: '#app',
	data: {
		total: 0,
		items: [
			{
				title: 'Item 1'
			},
			{
				title: 'Item 2'
			},
			{
				title: 'Item 3'
			}
		],
		cart: []
	},
	methods: {
		addItem: function(index) {
			var item = this.items[index];
			this.total += 9.99;
			this.cart.push({
				title: item.title,
				quantity: 1
			});
		}
	}
})