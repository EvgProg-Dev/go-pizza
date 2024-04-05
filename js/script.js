import { modalController } from "./modalController.js";
import { renderCart } from "./renderCart.js";
import { renderPizzas } from "./renderPizza.js";
import { renderToppings } from "./renderToppings.js";
import { toppingToogle } from "./toppingToggle.js";





const init = () => {
    toppingToogle();
    renderToppings();
    renderPizzas();
    modalController({
        modal: '.modal-cart',
        btnOpen: '.header__cart',
        btnClose: '.modal-close',
        cbOpen() {
            renderCart();
        }
    });

    modalController({
        modal: '.modal-cart',
        btnOpen: '.hero__order',
        btnClose: '.modal-close',
        cbOpen() {
            renderCart();
        }
    });
};

init();

