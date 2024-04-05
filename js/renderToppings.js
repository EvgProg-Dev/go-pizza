import { getData } from './getData.js';
import { changeFirstUpperCase } from './helpers.js';
import { renderPizzas } from './renderPizza.js';

export const renderToppings = async () => {
    const { en: enToppings, ru: ruToppings } = await getData('https://wonderful-puzzled-parrot.glitch.me/api/toppings');

    const toppingsList = document.querySelector(".toppings__list");
    toppingsList.textContent = "";

    const items = enToppings.map((enName, i) => {
        const item = document.createElement("li");
        item.classList.add("toppings__item");
        item.innerHTML = `
            <input class="toppings__checkbox" type="checkbox" name="topping" value="${enName}" id="${enName}">
            <label class="toppings__label" for="${enName}">${changeFirstUpperCase(ruToppings[i])}</label>
                        `
        return item;
    });
    toppingsList.append(...items)

    const itemReset = document.createElement('li');
    itemReset.classList.add('toppings__item');

    const btnReset = document.createElement('button');
    itemReset.classList.add('toppings__reset');

    btnReset.textContent = 'Сбросить';
    btnReset.type = 'reset';
    
    itemReset.append(btnReset);

    const toppingsform = document.querySelector('.toppings__form');
    toppingsform.addEventListener('change', (e) => {
        const formData = new FormData(toppingsform);
        const checkedToppings = [];
        for (const [, value] of formData.entries()) {
            checkedToppings.push(value);
        }

        renderPizzas(checkedToppings);

        if (checkedToppings.length) {
            toppingsList.append(itemReset)
        } else {
            toppingsform.reset();
        }
    })

    btnReset.addEventListener('click', () => {
        itemReset.remove();
        toppingsform.reset();

        renderPizzas();
    })
}