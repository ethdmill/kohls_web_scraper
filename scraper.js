// WEB SCRAPING UTILITY

// gets number of items in cart
let numOfItems = document.querySelector("#tr_phase2_ShoppingBg > span.number-items.boss-number-items.nonzero-items").innerText;

// gets total cost of items in cart
let totalCost = document.querySelector("#tr_phase2_ShoppingBg > span.subtotal").innerText;

// triggers a click on the cart slider button
document.querySelector("#tr_phase2_ShoppingBg").click();

// gets the image URL for the first item
let firstImageURL = document.querySelector("#sliderSection > li > div:nth-child(1) > div > div > div.front > a > img").src;

// gets the image URL for the second item
let secondImageURL = document.querySelector("#sliderSection > li > div:nth-child(2) > div > div > div.front > a > img").src;

// stores cart info in an object
let cart = {
  "Number of Items": numOfItems,
  "Total Cost": totalCost,
  "First Image URL": firstImageURL,
  "Second Image URL": secondImageURL
};

// logs object to the console to confirm everything worked properly
console.log(cart);

// ----------------------------------------------------------------------------------------------------

// OVERLAY RENDER UTILITY

// gets the document height and creates a range around ~90% of the document scroll height
let scrollThresholdFloor = Math.floor(document.documentElement.scrollHeight * 0.9)
let scrollThresholdCeiling = Math.ceil((document.documentElement.scrollHeight * 0.9) + 10);

// helper function to temporarily disable scrolling
const disableScrolling = () => {
  document.body.style.overflow = "hidden"
}

// creates overlay to be rendered later
const createOverlay = () => {
  // creates transparent black background
  let background = document.createElement("div")
  background.id = "overlayBackground"
  background.style.cssText = "display:block;position:fixed;top:0;bottom:0;left:0;right:0;background-color:rgba(0,0,0,0.75);z-index:9989;"
  document.body.appendChild(background)

  // creates overlay 
  let overlay = document.createElement("div")
  overlay.id = "overlay"
  overlay.style.cssText = "position:fixed;height:700px;width:900px;border-radius:15px;background-color:#F0F0F0;vertical-align:middle;justify-content:center;top:50%;left:50%;margin-top:-400px;margin-left:-450px;z-index:9999;"
  background.appendChild(overlay)

  // creates link to cart page
  let cartLink = document.createElement("a")
  cartLink.id = "cartLink"
  cartLink.style.cssText = "color:#464646;font-size:36px;padding-left:10px"
  cartLink.innerHTML = "Go to Cart"
  cartLink.href = "https://www.kohls.com/checkout/shopping_cart.jsp"
  overlay.appendChild(cartLink)

  // creates button to hide overlay
  let closeButton = document.createElement("button")
  closeButton.id = "closeButton"
  closeButton.style.cssText = "color:#464646;font-size:36px;float:right;padding-right:0px;margin-top:5px;margin-right:12px;"
  closeButton.innerHTML = "X"
  closeButton.onclick = function() {
    background.style.cssText = "display:none"
    document.body.style.overflow = "scroll"
  }
  overlay.appendChild(closeButton)

  // creates text area for number of items in cart
  let numOfItemsText = document.createElement("div")
  numOfItemsText.style.cssText = "text-align:center;margin-top:50px;font-size:24px;"
  numOfItemsText.id = "numOfItemsText"
  numOfItemsText.innerHTML = "Number of Items in Cart: " + numOfItems
  overlay.appendChild(numOfItemsText)

  // creates text area for total cart cost
  let totalCostText = document.createElement("div")
  totalCostText.style.cssText = "text-align:center;margin-top:5px;font-size:24px;"
  totalCostText.id = "totalCostText"
  totalCostText.innerHTML = "Total Cost: " + totalCost
  overlay.appendChild(totalCostText)

  // creates div to store following images
  let imageContainer = document.createElement("div")
  imageContainer.style.cssText = "text-align:center;margin-top:30px"
  imageContainer.id = "overlayImageContainer"
  overlay.appendChild(imageContainer)

  // creates img element for first cart item image
  let firstImage = document.createElement("img")
  firstImage.style.cssText = "padding:0 25px;"
  firstImage.id = "firstImage"
  firstImage.src = firstImageURL
  firstImage.alt = "First Image"
  imageContainer.appendChild(firstImage)

  // creates img element for second cart item image
  let secondImage = document.createElement("img")
  secondImage.style.cssText = "padding:0 25px;"
  secondImage.id = "secondImage"
  secondImage.src = secondImageURL
  secondImage.alt = "First Image"
  imageContainer.appendChild(secondImage)
}

// watches the page scrolling and returns overlay when scroll reaches threshold
document.addEventListener('scroll', () => {
  if (window.pageYOffset > scrollThresholdFloor) {
    if (scrollThresholdCeiling > window.pageYOffset) {
      disableScrolling()
      createOverlay()
    }
  }
});

