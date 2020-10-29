// module.exports = function main() {
//     console.log();
//     return 'Hello World!';
// };
class ShoppingCartItem {
    constructor(name, unitPrice, unit) 
    { 
        this._name = name; 
        this._unitPrice = unitPrice;
        this._unit = unit;
        this._quantity = 1;
    };

    toString() 
    {
        return 'Name: ' + this._name + ', '
        + "Quantity: " + this._quantity + this.unit + ', '
        + 'Unit price: ' + this._unitPrice.toFixed(2) + ' (yuan), ' 
        + 'Subtotal: ' + this.getTotalPrice() + ' (yuan)\n';
    }    

    addOne()
    {
        this._quantity += 1;
    }

    getTotalPrice()
    {
        return (this._quantity * this._unitPrice).toFixed(2);
    }

    //if there is a valid unit list, I could revise the code to make it more clean.
    get unit()
    {
        if(this._unit === 'a')
        {
            return '';
        }
        if(this._quantity > 1)
        {
            return ' '+ this._unit + 's';
        }
        else
        {
            return ' ' + this._unit;
        }
    }
}

module.exports = function printReceipt(shoppingCart)
{
    let receipt = '***<store earning no money>Receipt ***\n';
    let totalPrice = 0;
    let itemsInShoppingCart = getItemsInShoppingCart(shoppingCart);
    
    for(let item in itemsInShoppingCart)
    {
        receipt = receipt + itemsInShoppingCart[item].toString();
        totalPrice += Number(itemsInShoppingCart[item].getTotalPrice());
    }

    receipt = receipt + 
    '----------------------\n' + 
    'Total: ' + totalPrice.toFixed(2) + ' (yuan)\n' +
    '**********************\n';
    return receipt;
}

function getItemsInShoppingCart(shoppingCart)
{
    var itemsInShoppingCart = {}
    shoppingCart.reduce((itemQuantity, value)=>{ 
        if(itemQuantity[value.Barcode] === undefined)
        {         
            itemQuantity[value.Barcode] = new ShoppingCartItem(value.Name, value.Price, value.Unit );
            return itemQuantity;
        }
        else
        {
            itemQuantity[value.Barcode].addOne();
            return itemQuantity;
        }
    },itemsInShoppingCart);
    return itemsInShoppingCart;
}
