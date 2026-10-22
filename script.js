const budgetInput = document.getElementById("monthly-budget");
const saveButton = document.getElementById("save-budget");
const budgetDisplay = document.getElementById("budget-display");
const categoryName = document.getElementById("category-name");
const categoryAmount = document.getElementById("category-amount");
const addCategoryButton = document.getElementById("add-category");
const categoryList = document.getElementById("category-list");

let categories = JSON.parse(localStorage.getItem("categories")) || [];

function displayCategory(category) {
const formattedAmount = category.amount.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
    });

    const savedCategory = document.createElement("p");

    savedCategory.textContent = category.name + ": " + formattedAmount;

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";

    savedCategory.appendChild(editButton);

    editButton.addEventListener("click", function() {
        const updatedName = prompt("Enter new category name:", category.name);
        if (updatedName === null || updatedName.trim() === "") {
        return;
        }

        const updatedAmount = prompt("Enter new category amount:", category.amount);
        if (updatedAmount === null || updatedAmount.trim() === "" || Number(updatedAmount) <= 0) {
            return;
        }

        category.name = updatedName.trim();
        category.amount = Number(updatedAmount);

        localStorage.setItem("categories", JSON.stringify(categories));

        const formattedUpdatedAmount = category.amount.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
        });

        savedCategory.firstChild.textContent = category.name + ": " + formattedUpdatedAmount;

    });
    
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";

    savedCategory.appendChild(deleteButton);

    deleteButton.addEventListener("click", function() {
        savedCategory.remove();

        categories = categories.filter(function(item) {
            return item !== category;
        });

        localStorage.setItem("categories", JSON.stringify(categories));
    });

    categoryList.appendChild(savedCategory);
}

categories.forEach(function(category) {
    displayCategory(category);
});

const savedBudget = localStorage.getItem("monthlyBudget");
if (savedBudget !== null) {
    budgetInput.value = savedBudget;

    const formattedBudget = Number(savedBudget).toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
    });
    budgetDisplay.textContent = "Monthly Budget: " + formattedBudget;
}

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

    localStorage.setItem("monthlyBudget", amount);
    budgetDisplay.textContent = "Monthly Budget: " + formattedAmount;
});

addCategoryButton.addEventListener("click", function() {
    const name = categoryName.value.trim();
    const amount = Number(categoryAmount.value);

    if (name === "" || categoryAmount.value.trim() === "" || amount <= 0) {
        alert("Please enter a category name and a valid amount.");
        return;
    }

    const newCategoryData = {
        name: name,
        amount: amount,
    };

    categories.push(newCategoryData);

    localStorage.setItem("categories", JSON.stringify(categories));

    displayCategory(newCategoryData);
});