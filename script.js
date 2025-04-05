document.addEventListener("DOMContentLoaded", function () {
    const financeData = JSON.parse(localStorage.getItem("financeData")) || [];
    const addButton = document.getElementById("add-entry");

    if (addButton) {
        addButton.addEventListener("click", function () {
            const date = document.getElementById("date-input").value;
            const income = parseFloat(document.getElementById("income-input").value) || 0;
            const expense = parseFloat(document.getElementById("expense-input").value) || 0;

            if (date) {
                financeData.push({ id: Date.now(), date, income, expense });
                localStorage.setItem("financeData", JSON.stringify(financeData));
                location.reload();
            }
        });
    }

    function getMonthYear(dateString) {
        const date = new Date(dateString);
        return { year: date.getFullYear(), month: date.getMonth() + 1 };
    }

    function displayData(viewType) {
        const tableBody = document.getElementById(`${viewType}-history`);
        if (!tableBody) return;
        tableBody.innerHTML = "";

        if (viewType === "daily") {
            financeData.forEach(({ id, date, income, expense }) => {
                const row = tableBody.insertRow();
                row.innerHTML = `
                    <td><input type="checkbox" class="delete-checkbox" data-id="${id}"></td>
                    <td>${date}</td>
                    <td>${income}</td>
                    <td>${expense}</td>
                    <td>${income - expense}</td>`;
            });
        } else {
            const groupedData = {};

            financeData.forEach(({ id, date, income, expense }) => {
                const { year, month } = getMonthYear(date);
                const key = viewType === "monthly" ? `${year}-${month}` : `${year}`;

                if (!groupedData[key]) {
                    groupedData[key] = { income: 0, expense: 0, ids: [] };
                }

                groupedData[key].income += income;
                groupedData[key].expense += expense;
                groupedData[key].ids.push(id);
            });

            Object.entries(groupedData).forEach(([key, { income, expense, ids }]) => {
                const row = tableBody.insertRow();
                row.innerHTML = `
                    <td><input type="checkbox" class="delete-checkbox" data-ids='${JSON.stringify(ids)}'></td>
                    <td>${key}</td>
                    <td>${income}</td>
                    <td>${expense}</td>
                    <td>${income - expense}</td>`;
            });
        }
    }

    ["daily", "monthly", "yearly"].forEach(displayData);

    const deleteButton = document.getElementById("delete-selected");
    if (deleteButton) {
        deleteButton.addEventListener("click", () => {
            const checkedBoxes = document.querySelectorAll(".delete-checkbox:checked");
            let idsToDelete = [];

            checkedBoxes.forEach(cb => {
                const ids = JSON.parse(cb.dataset.ids || "[]");
                idsToDelete = idsToDelete.concat(ids.length ? ids : [Number(cb.dataset.id)]);
            });

            const updatedData = financeData.filter(entry => !idsToDelete.includes(entry.id));
            localStorage.setItem("financeData", JSON.stringify(updatedData));
            location.reload();
        });
    }

    function drawPieChart(canvasId, viewType) {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;

        let incomeTotal = 0, expenseTotal = 0;

        if (viewType === "daily") {
            incomeTotal = financeData.reduce((sum, entry) => sum + entry.income, 0);
            expenseTotal = financeData.reduce((sum, entry) => sum + entry.expense, 0);
        } else {
            const groupedData = {};

            financeData.forEach(({ date, income, expense }) => {
                const { year, month } = getMonthYear(date);
                const key = viewType === "monthly" ? `${year}-${month}` : `${year}`;

                if (!groupedData[key]) {
                    groupedData[key] = { income: 0, expense: 0 };
                }

                groupedData[key].income += income;
                groupedData[key].expense += expense;
            });

            incomeTotal = Object.values(groupedData).reduce((sum, data) => sum + data.income, 0);
            expenseTotal = Object.values(groupedData).reduce((sum, data) => sum + data.expense, 0);
        }

        new Chart(canvas, {
            type: "pie",
            data: {
                labels: ["Income", "Expense"],
                datasets: [{
                    data: [incomeTotal, expenseTotal],
                    backgroundColor: ["#66B3FF", "#FF9999"]
                }]
            }
        });
        
        ["daily", "monthly", "yearly"].forEach(displayAdvice);

    }

    drawPieChart("dailyPieChart", "daily");
    drawPieChart("monthlyPieChart", "monthly");
    drawPieChart("yearlyPieChart", "yearly");

    function generateAdvice(balance) {
        let investPercent = 0, savePercent = 0, spendPercent = 0;
    
        if (balance < 0) {
            return `Your balance is negative. First, cut down on your spending and prioritize savings`;
        } else if (balance <= 1000) {
            investPercent = 30;
            savePercent = 30;
            spendPercent = 40;
        } else if (balance <= 5000) {
            investPercent = 40;
            savePercent = 30;
            spendPercent = 30;
        } else if (balance <= 10000) {
            investPercent = 50;
            savePercent = 20;
            spendPercent = 30;
        } else {
            investPercent = 60;
            savePercent = 20;
            spendPercent = 20;
        }
    
        const investAmount = (balance * investPercent) / 100;
        const saveAmount = (balance * savePercent) / 100;
        const spendAmount = (balance * spendPercent) / 100;
    
        return `Total Balance: $${balance.toFixed(2)}  
        📈 Investment: $${investAmount.toFixed(2)} (${investPercent}%)  
        💾 Saving: $${saveAmount.toFixed(2)} (${savePercent}%)  
        🛍️ Available: $${spendAmount.toFixed(2)} (${spendPercent}%)`;
    }
    
    function displayAdvice(viewType) {
        const adviceElement = document.getElementById(`${viewType}-advice`);
        if (!adviceElement) return;
    
        let incomeTotal = 0, expenseTotal = 0;
    
        if (viewType === "daily") {
            incomeTotal = financeData.reduce((sum, entry) => sum + entry.income, 0);
            expenseTotal = financeData.reduce((sum, entry) => sum + entry.expense, 0);
        } else {
            const groupedData = {};
    
            financeData.forEach(({ date, income, expense }) => {
                const { year, month } = getMonthYear(date);
                const key = viewType === "monthly" ? `${year}-${month}` : `${year}`;
    
                if (!groupedData[key]) {
                    groupedData[key] = { income: 0, expense: 0 };
                }
    
                groupedData[key].income += income;
                groupedData[key].expense += expense;
            });
    
            incomeTotal = Object.values(groupedData).reduce((sum, data) => sum + data.income, 0);
            expenseTotal = Object.values(groupedData).reduce((sum, data) => sum + data.expense, 0);
        }
    
        const balance = incomeTotal - expenseTotal;
        adviceElement.innerHTML = generateAdvice(balance);
    }
    
    ["daily", "monthly", "yearly"].forEach(displayAdvice);
    
    
});

