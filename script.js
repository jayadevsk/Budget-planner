let chartInstance = null;

function generatePlans(){

    let income = Number(document.getElementById("income").value);
    let members = Number(document.getElementById("members").value);
    let houseType = document.getElementById("houseType").value;

    if(!income || !members){
        alert("Enter valid inputs");
        return;
    }

    // 👨‍👩‍👧 Family scaling factor
    let familyFactor = 1 + (members - 1) * 0.08;

    // 🏠 RENT (scaled)
    let rent = houseType === "rent"
        ? income * 0.20 * familyFactor
        : 0;

    // 🧾 FIXED EXPENSES (ALL SCALE WITH FAMILY)
    let groceries = income * 0.10 * familyFactor;
    let essentials = income * 0.12 * familyFactor;
    let medical = income * 0.10 * familyFactor;
    let transport = income * 0.06 * familyFactor;
    let utilities = income * 0.07 * familyFactor;

    // 💰 total fixed cost
    let fixedCost = rent + groceries + essentials + medical + utilities;

    // 🔄 remaining income
    let remaining = income - fixedCost;

    if(remaining < 0){
        remaining = income * 0.2;
    }

    // ================= HIGH SAVINGS =================
    function highSavings(){
        return {
            rent,
            groceries: groceries * 0.9,
            essentials: essentials * 0.9,
            medical: medical * 0.9,
            transport: transport * 0.9,
            utilities: utilities * 0.9,
            entertainment: remaining * 0.05,
            travel: remaining * 0.05,
            emi: remaining * 0.10,
            savings: remaining * 0.35,
            investment: remaining * 0.25
        };
    }

    // ================= BALANCED =================
    function balanced(){
        return {
            rent,
            groceries: groceries,
            essentials: essentials,
            medical: medical,
            transport: transport,
            utilities: utilities,
            entertainment: remaining * 0.10,
            travel: remaining * 0.10,
            emi: remaining * 0.15,
            savings: remaining * 0.20,
            investment: remaining * 0.15
        };
    }

    // ================= LUXURY =================
    function luxury(){
        return {
            rent,
            groceries: groceries * 1.1,
            essentials: essentials * 1.1,
            medical: medical,
            transport: transport * 1.2,
            utilities: utilities,
            entertainment: remaining * 0.20,
            travel: remaining * 0.20,
            emi: remaining * 0.20,
            savings: remaining * 0.08,
            investment: remaining * 0.07
        };
    }

    function range(val){
        return [
            Math.round(val * 0.9),
            Math.round(val * 1.1)
        ];
    }

    function show(v){
        return `₹${v[0]} - ₹${v[1]}`;
    }

    function card(title, data){

        return `
        <div class="card">
            <h2>${title}</h2>

            ${houseType === "rent" ? `<p><b>Rent:</b> ${show(range(data.rent))}</p>` : ""}

            <p>Groceries: ${show(range(data.groceries))}</p>
            <p>Essentials: ${show(range(data.essentials))}</p>
            <p>Medical: ${show(range(data.medical))}</p>
            <p>Transport: ${show(range(data.transport))}</p>
            <p>Utilities: ${show(range(data.utilities))}</p>

            <p><b>Entertainment:</b> ${show(range(data.entertainment))}</p>
            <p><b>Travel:</b> ${show(range(data.travel))}</p>

            <p><b>EMI:</b> ${show(range(data.emi))}</p>
            <p><b>Savings:</b> ${show(range(data.savings))}</p>
            <p><b>Investment:</b> ${show(range(data.investment))}</p>
        </div>
        `;
    }

    let high = highSavings();
    let bal = balanced();
    let lux = luxury();

    document.getElementById("result").innerHTML = `
        <div class="summary">

            <div class="summary-card">
                <p>💰 Income: ₹${income}</p>
            </div>

            <div class="summary-card">
                <p>👨‍👩‍👧 Members: ${members}</p>
            </div>

            <div class="summary-card">
                <p>📊 Family Factor: ${familyFactor.toFixed(2)}</p>
            </div>

        </div>

        <div class="plans">
            ${card("💰 High Savings Lifestyle", high)}
            ${card("⚖ Balanced Lifestyle", bal)}
            ${card("🌟 Luxury Lifestyle", lux)}
        </div>
    `;
}