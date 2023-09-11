const cart = [
    {
        itemName : 'Shoes',
        itemPrice : 2000
    },
    {
        itemName : 'Paint',
        itemPrice : 2500
    },
    {
        itemName : 'Kurta',
        itemPrice : 1500
    }
];

let walletBalance = 10000;

createOrder(cart)
    .then((orderId) => proceedToPayment(orderId))
    .then((orderStatus) => showOrderSummery(orderStatus))
    .then((orderHistory) => updateWallet(orderHistory))
    .then((res) => console.log(res))
    .catch((err)=>{
        console.log(err.message)
    })

function createOrder(cart){
    return new Promise(function(resolve,reject){
        if(!validateCart(cart)){
            reject(new Error("Cart is not valid"));
        }
        let orderId=10
        if(orderId){
            resolve(orderId);
        }
    })
}

function proceedToPayment(orderId){
    return new Promise(function(resolve,reject){
        if(orderId){
            resolve({paymentStatus : 1, message : "Payment successfully completed"});
        }else{
            reject(new Error("Payment Failed"));
        }
    })
}

function showOrderSummery(orderStatus){
    return new Promise(function(resolve,reject){
        if(orderStatus.paymentStatus === 1){
            resolve({status:'success', orders : cart});
        }else{
            reject(new Error("Something went wrong"));
        }
    })
}

function updateWallet(orderHistory){
    return new Promise(function(resolve,reject){
        if(orderHistory.status === 'success'){
            let orderAmount = 6000;
            walletBalance = walletBalance - orderAmount;
            resolve({balance : walletBalance, 'message':'Wallet updated'});
        }else{
            reject(new Error("Wallet balance not updated"));
        }
    })
}

function validateCart(cart){
    return true;
}