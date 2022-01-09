const formPanel = document.querySelector(".form-panel");
const formSection = formPanel.querySelectorAll(".form-section");
const stepControl = document.querySelector(".stepper-container");
const steps = stepControl.querySelectorAll(".stepper");
const controlBtn = document.querySelector(".control-btn");
const prevBtn = controlBtn.querySelector(".previous-btn");
const nextBtn = controlBtn.querySelector(".next-btn");
let step = 0;
const cartPanel = document.querySelector(".cart-panel");
const deliverySection = document.querySelector(".delivery-section");

// 表單分割
function handleBtnControlClicked(e) {
  e.preventDefault();
  const nowStep = steps[step];
  if (e.target.innerHTML === "下一步 ➝" && e.target.matches(".next-btn")) {
    const nextStep = steps[step + 1];
    nowStep.classList.add("checked");
    nextStep.classList.add("stepper--active");
    formSection[step].classList.toggle("d-none");
    formSection[step + 1].classList.toggle("d-none");
    step += 1;
  } else if (
    e.target.innerHTML === "← 上一步" &&
    e.target.matches(".previous-btn")
  ) {
    const prevStep = steps[step - 1];
    nowStep.classList.remove("stepper--active");
    prevStep.classList.remove("checked");
    prevStep.classList.add("stepper__container--active");
    formSection[step].classList.toggle("d-none");
    formSection[step - 1].classList.toggle("d-none");
    step -= 1;
  }
  setBtnDisabled();
}

// 表單按鈕渲染
function setBtnDisabled() {
  if (step === 0) {
    prevBtn.setAttribute("disabled", "disabled");
  } else {
    prevBtn.removeAttribute("disabled");
    nextBtn.style.width = "156px";
  }

  if (step === 2) {
    nextBtn.innerHTML = "確認下單";
  } else {
    nextBtn.innerHTML = "下一步 ➝";
  }
}

// 商品數量渲染
function renderCount(e) {
  let count = e.target.parentElement.children[1];
  let countValue = Number(count.innerText);
  if (e.target.matches("#count-minus") && countValue > 0) {
    count.innerText = countValue - 1;
  } else if (e.target.matches("#count-plus")) {
    count.innerText = countValue + 1;
  }
  cartTotal();
}

// 購物車金額渲染
function renderCartTotal(total) {
  let price = total.toString().replace(/(\d)(?=(\d{3})+(\.\d+)?$)/g, "$1,");
  let cartTotal = document.querySelector(".total");
  cartTotal.innerText = `$${price}`;
}

// 購物車總計
function cartTotal() {
  let total = 0;
  let countValues = document.querySelectorAll(".count");
  let countArray = [];
  let shipping = document.querySelector(".shipping");
  let shippingValue = shipping.innerText;
  console.log(shippingValue);
  countValues.forEach((value) => countArray.push(Number(value.innerText)));
  if (shippingValue === "免費") {
    total = countArray[0] * 3999 + countArray[1] * 1299;
  } else if (shippingValue === "500") {
    total = 500 + countArray[0] * 3999 + countArray[1] * 1299;
  }
  renderCartTotal(total);
}

// 運費渲染
function renderShipping(e) {
  let shipping = document.querySelector(".shipping");
  if (e.target.matches("#standard-delivery")) {
    shipping.innerHTML = "免費";
  } else if (e.target.matches("#DHL-delivery")) {
    shipping.innerHTML = "500";
  }
  cartTotal();
}

controlBtn.addEventListener("click", handleBtnControlClicked);
cartPanel.addEventListener("click", renderCount);
deliverySection.addEventListener("click", renderShipping);
