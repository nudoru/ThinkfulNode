var Diner = {
    dishes: [],
    name:'',

    init: function(name) {
        this.name = name;
        this.dishes = [];
    },

    addDish: function(name, price) {
        this.dishes.push({name:name, price:price});
    },

    getTotal: function() {
        var total = 0;
        this.dishes.forEach(function(dish) {
            total += dish.price;
        });
        return total;
    },

    getTax: function(taxpct) {
        return this.getTotal()*taxpct;
    }

};

var Table = {
    party: Object.create(null),
    partySize: 0,
    totalBill: 0,
    totalBillTaxPct: 0.075,
    totalBillTipPct: 0.2,
    addDiner: function(name) {
        this.party[name] = Object.create(Diner);
        this.party[name].init(name);
        this.partySize += 1;
    },

    addDinerDish: function(name, dish, price) {
        this.party[name].addDish(dish,price);
        this.totalBill += price;
    },

    getTotalTax: function() {
        return this.totalBill * this.totalBillTaxPct;
    },

    getTotalTip: function() {
        return this.totalBill * this.totalBillTipPct;
    },

    logDinerChecks: function() {
        var share = this.totalBill / this.partySize,
            tipShare = this.getTotalTip() / this.partySize;

        console.log('Everyone pays: '+share+' + their food tax and '+tipShare+' tip');
        console.log('-----------------');

        for(var diner in this.party) {
            var dinerTotal = this.party[diner].getTotal(),
                dinerTax = this.party[diner].getTax(this.totalBillTaxPct),
                dinerShare = share + dinerTax + tipShare;

            console.log(diner +' pays: '+dinerShare+', breakdown, their food was: '+dinerTotal+', tax: '+dinerTax);
        };
        console.log('-----------------');
        console.log('Total bill: '+this.totalBill);
        console.log('Total bill tax: '+this.getTotalTax());
        console.log('Total bill tip: '+this.getTotalTip());
    },

};

var group = ['Bob','Anna','Chris'];

group.forEach(function(person) {
    Table.addDiner(person);
});

Table.addDinerDish(group[0],'Steak',27.50);
Table.addDinerDish(group[0],'Beer',8.00);
Table.addDinerDish(group[1],'Fish',17.85);
Table.addDinerDish(group[1],'Cake',7.85);
Table.addDinerDish(group[2],'Salad',7.25);
Table.addDinerDish(group[2],'Chicken',4.25);
Table.addDinerDish(group[2],'Tea',2.00);

Table.logDinerChecks();