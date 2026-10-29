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
    showToast('Bank details successfully saved & encrypted!');
    setTimeout(() => {
        switchView('home-view');
    }, 1200);
}

function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 2500);
}
