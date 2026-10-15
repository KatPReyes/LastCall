console.log();
const budgetInput = document.getElementById("monthly-budget");
const saveButton = document.getElementById("save-budget");
const budgetDisplay = document.getElementById("budget-display");

saveButton.addEventListener("click", function() {
    const amount = Number(budgetInput.value);
    if (budgetInput.value.trim() === "" || amount <= 0) {
        budgetDisplay.textContent = "Please enter a valid budget amount.";
        return;
    }
    const formattedAmount = amount.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
    });

    budgetDisplay.textContent = "Monthly Budget: " + formattedAmount;
});