let heads = 0;
let tails = 0;
let coin = document.querySelector(".coin");
let flipBtn = document.querySelector("#flip-button");
let resetBtn = document.querySelector("#reset-button");

function flipCoinAnimation(animationName) {
    coin.style.animation = "none";
    setTimeout(function () {
        coin.style.animation = animationName + " 3s forwards";
    }, 100);
}

flipBtn.addEventListener("click", () => {
    let i = Math.floor(Math.random() * 2);
    if (i) {
        flipCoinAnimation("spin-heads");
        heads++;
    } else {
        flipCoinAnimation("spin-tails");
        tails++;
    }
    setTimeout(updateStats, 3000);
    disableButton();
});

function updateStats() {
    document.querySelector("#heads-count").textContent = `Heads: ${heads}`;
    document.querySelector("#tails-count").textContent = `Tails: ${tails}`;
}

function disableButton() {
    flipBtn.disabled = true;
    setTimeout(function () {
        flipBtn.disabled = false;
    }, 3000);
}

resetBtn.addEventListener("click", () => {
    coin.style.animation = "none";
    heads = 0;
    tails = 0;
    updateStats();
});
