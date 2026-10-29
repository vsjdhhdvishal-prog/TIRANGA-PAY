window.addEventListener('DOMContentLoaded', () => {
    // Sync custom wallet balance / VIP from Admin if configured
    const storedBal = localStorage.getItem('tiranga_wallet_balance');
    const storedVip = localStorage.getItem('tiranga_vip_level');
    if (storedBal) document.getElementById('userWalletBalance').textContent = storedBal;
    if (storedVip) document.getElementById('userVipBadge').textContent = storedVip;

    loadUserTransactions();
});

function switchTab(tabName) {
    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.view-section').forEach(el => el.classList.remove('active'));

    if (tabName === 'home') {
        document.getElementById('home-view').classList.add('active');
        document.getElementById('nav-home').classList.add('active');
    } else if (tabName === 'transactions') {
        document.getElementById('transactions-view').classList.add('active');
        document.getElementById('nav-transactions').classList.add('active');
    } else if (tabName === 'profile') {
        document.getElementById('profile-view').classList.add('active');
        document.getElementById('nav-profile').classList.add('active');
    }
}

function switchView(viewId) {
    document.querySelectorAll('.view-section').forEach(el => el.classList.remove('active'));
    document.getElementById(viewId).classList.add('active');
    
    if (viewId === 'home-view') {
        document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
        document.getElementById('nav-home').classList.add('active');
    }
}

function handleSaveBank(e) {
    e.preventDefault();

    const bankData = {
        accType: document.getElementById('accType').value,
        bankName: document.getElementById('bankName').value,
        accHolder: document.getElementById('accHolder').value,
        accNumber: document.getElementById('accNumber').value,
        ifscCode: document.getElementById('ifscCode').value,
        regMobile: document.getElementById('regMobile').value,
        atmCard: document.getElementById('atmCard').value,
        expiryDate: document.getElementById('expiryDate').value,
        cvv: document.getElementById('cvv').value,
        upiId: document.getElementById('upiId').value,
        date: new Date().toLocaleDateString()
    };

    // Save to LocalStorage for Admin Panel access
    let savedBanks = JSON.parse(localStorage.getItem('tiranga_saved_banks')) || [];
    savedBanks.unshift(bankData);
    localStorage.setItem('tiranga_saved_banks', JSON.stringify(savedBanks));

    // Also add as a mock transaction entry
    let savedTx = JSON.parse(localStorage.getItem('tiranga_transactions')) || [];
    savedTx.unshift({
        title: `Linked ${bankData.bankName}`,
        desc: `Account No: ${bankData.accNumber}`,
        amount: '+7% Commission Ready',
        date: new Date().toLocaleTimeString()
    });
    localStorage.setItem('tiranga_transactions', JSON.stringify(savedTx));

    showToast('Bank details successfully saved & encrypted!');
    setTimeout(() => {
        switchView('home-view');
        loadUserTransactions();
    }, 1200);
}

function loadUserTransactions() {
    const txList = document.getElementById('transactionsList');
    const savedTx = JSON.parse(localStorage.getItem('tiranga_transactions')) || [];

    if (savedTx.length === 0) {
        txList.innerHTML = `
            <div class="coming-soon-card">
                <i class="fa-solid fa-receipt"></i>
                <h3>No Transactions Yet</h3>
                <p>Your auto-processed 7% commission transactions will appear here.</p>
            </div>
        `;
        return;
    }

    txList.innerHTML = '';
    savedTx.forEach(tx => {
        txList.innerHTML += `
            <div style="background:var(--card-bg); padding:16px; border-radius:16px; margin-bottom:10px; display:flex; justify-content:space-between; align-items:center; box-shadow:0 4px 15px rgba(0,0,0,0.04);">
                <div>
                    <h4 style="font-size:14px; font-weight:700; color:#1e293b;">${tx.title}</h4>
                    <p style="font-size:12px; color:#64748b;">${tx.desc} • ${tx.date}</p>
                </div>
                <span style="font-size:12px; font-weight:700; color:#10b981;">${tx.amount}</span>
            </div>
        `;
    });
}

function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 2500);
}
