//cart 
let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");


const contadorItems = document.querySelector("#contadorItems")


//open cart
cartIcon.onclick = () =>{
    cart.classList.add("active");
};
//close cart
closeCart.onclick = () =>{
    cart.classList.remove("active");
};

//cart working
if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready);
} else{
    ready();
};


//function remove items from cart
function ready() {
//remove intems from cart
    let removeCartButtons = document.getElementsByClassName("cart-remove");
    //console.log(removeCartButtons);

    for (let i = 0; i < removeCartButtons.length; i++) {
       let button = removeCartButtons[i];
       button.addEventListener("click" , removeCartItem);
    }

    // quantity changes
    let quantityInputs =document.getElementsByClassName("cart-quantity");
    for (let i = 0; i < quantityInputs.length; i++){
       let input = quantityInputs[i];
       input.addEventListener("change", quantityChanged); 
    }

    
    //add to cart 1 
    let addCart = document.getElementsByClassName("add-cart");
    for (let i = 0; i < addCart.length; i++) {
        let button = addCart[i];
        button.addEventListener("click", addCartClicked);
    }

    //Buy button work
    document.getElementsByClassName('btn-buy')[0].addEventListener('click', buyButtonClicked);
}

// buy Button
function buyButtonClicked(){
    alert('Order Placed');
    let cartContent = document.getElementsByClassName('cart-content')[0];
    while (cartContent.hasChildNodes()){
        cartContent.removeChild(cartContent.firstChild);
    }
    updatetotal();
}




//remove Items from cart

function removeCartItem(event){
    let buttonClicked = event.target;
    console.log(buttonClicked.id)
    buttonClicked.parentElement.remove();
    updatetotal();
    printNumberCart(cartArray);
}

//quantity changes 
function quantityChanged(event) {
    let input = event.target;
    if (isNaN(input.value) || input.value <= 0){
        input.value = 1;
    }  
    updatetotal();
}
// Add to cart  
function addCartClicked(event){
    let button = event.target;
    let shopProducts = button.parentElement;
    let title = shopProducts.getElementsByClassName("product-title")[0].innerText;
    let price = shopProducts.getElementsByClassName("price")[0].innerText;
    let productImg = shopProducts.getElementsByClassName("product-img")[0].src;
    let id = shopProducts.id;
    //console.log(id);
    addProductToCart(title, price,productImg,id);
    updatetotal();
    printNumberCart(cartArray);
}


function printNumberCart(cartArray){
    contadorItems.textContent = cartArray.length;
   console.log(cartArray.length); 
}



let cartArray = [];
function addProductToCart(title,price,productImg,id){
    let product = {
        title:title,
        price:price,
        productImg:productImg,
        id:id
    }
   

    let procutExist = cartArray.find((item)=>item.id ===id);

    console.log(procutExist);

    if (cartArray.find((item)=>item.id ===id)) {
        
        let amountItem = document.getElementById("amount"+id);
        amountItem.value++
        
    } else {
       
        cartArray.push(product);
        let cartShopBox = document.createElement("div");
        cartShopBox.classList.add("cart-box");
        let cartItems = document.getElementsByClassName("cart-content")[0];
        let cartItemsNames = cartItems.getElementsByClassName("cart-product-title");
        for ( let i = 0; i < cartItemsNames.length; i++){
            
        } 
             
        let cartBoxContent = `
                            <img src="${productImg}" alt="" class="cart-img" />
                            <div class="details-box">
                                <div class="cart-product-title">${title}</div>
                                <div class="cart-price">${price}</div>
                                <input type="number" id="amount${id}" value="1" class="cart-quantity" />
                            </div>
                            <i class="bx bxs-trash-alt cart-remove" id="delete${id}"></i>`;
    cartShopBox.innerHTML = cartBoxContent;
    cartItems.append(cartShopBox);
    cartShopBox.getElementsByClassName("cart-remove")[0].addEventListener("click", removeCartItem);
    cartShopBox.getElementsByClassName("cart-quantity")[0].addEventListener("change", quantityChanged);
    
    }

}



//update  total

function updatetotal(){
    let cartContent = document.getElementsByClassName("cart-content")[0];
    let cartBoxes = cartContent.getElementsByClassName("cart-box");
    let total = 0;
    for (let i = 0; i < cartBoxes.length; i++) {
        let cartBox = cartBoxes[i];
        let priceElement = cartBox.getElementsByClassName("cart-price")[0];
        let quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
        let price = parseFloat(priceElement.innerText.replace("$", ""));
        let quantity = quantityElement.value;
        total = total + (price * quantity);
    }    
        //if price contain cents

        total = Math.round(total *100) / 100;

        document.getElementsByClassName("total-price")[0].innerText = "$" + total;
    
}


