import { highlightCurrentPage } from "./components/scripts/highlight-current.js";
import { fetchSection } from "./components/scripts/include.js";
import { cardNumberValidate } from "./components/scripts/validation.js";

window.addEventListener("DOMContentLoaded", async () => {
    await fetchSection("sidebar-container", "components/partials/sidebar.html");
    await fetchSection("footer-container", "components/partials/footer.html");
    await fetchSection("breadcrumbs-container", "components/partials/breadcrumbs.html");
    highlightCurrentPage();


    document.querySelectorAll(".card-container").forEach(container => {
        const cardDisplay = container.querySelector('.card-display');
        const editBtn = container.querySelector('.edit-btn');
        const cardInput = container.querySelector('.card-input');
        const firstTwelve = container.querySelector('.first-twelve');
        const lastFour = container.querySelector('.last-four');
        let helpText = container.querySelector('.help-text');
        const cardInputContainer = container.querySelector('.card-input-container');

        const cardId = container.id || 'default-card';
        let cardNumber = localStorage.getItem(`card-${cardId}`);

        if (!cardNumber) {
            cardNumber = "4242424242424242"; 
            localStorage.setItem(`card-${cardId}`, cardNumber);
        }

        let isEdit = false;

        function formatCardNumber(value) {
            return value.replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, '$1 ');
        }

        function updateDisplay() {
            const clean = cardNumber.replace(/\D/g, '');
            const formatted = formatCardNumber(cardNumber);
            firstTwelve.textContent = formatted.slice(0, 14);
            lastFour.textContent = 'XXXX';
        }

        updateDisplay();

        function toggleEdit() {
            isEdit = !isEdit;

            if (isEdit) {
                cardDisplay.classList.add('hidden');
                cardInputContainer.classList.remove('hidden');
                cardInput.value = formatCardNumber(cardNumber);
                cardInput.focus();
                editBtn.innerHTML = '<ion-icon name="checkmark-outline" class="text-[12px]"></ion-icon>';
            }
            else {
                const newNumber = cardInput.value.replace(/\s/g, '').trim();
                if (!newNumber) {
                    helpText.textContent = 'Card number cannot be empty.';
                    cardInput.focus();
                    return;
                }
                if (cardNumberValidate(newNumber)) {
                    if (newNumber !== cardNumber) {
                        cardNumber = newNumber;
                        try {
                            localStorage.setItem(`card-${cardId}`, cardNumber);
                        } catch (e) {
                            console.warn("LocalStorage unavailable:", e);
                        }
                    }
                    cardDisplay.classList.remove('hidden');
                    cardInputContainer.classList.add('hidden');
                    editBtn.innerHTML = '<ion-icon name="pencil-outline" class="text-[12px]"></ion-icon>';
                    helpText.textContent = '';
                    updateDisplay();
                }
                else {
                    helpText.textContent = 'Please enter a valid card number.';
                    cardInput.focus();
                }
            }
        }

        editBtn.addEventListener('click', toggleEdit);

        cardInput.addEventListener('input', function (e) {
            let value = this.value.replace(/\D/g, '');
            this.value = formatCardNumber(value);
            helpText.textContent='';
        });
        cardInput.addEventListener('keypress', (e) => {
            if (e.key == "Enter") {
                toggleEdit();
            }
        });
    });

});