document.addEventListener('DOMContentLoaded', () => {
    const CATEGORIES = {
        income: ['Gaji', 'Bonus', 'Hadiah', 'Lainnya'],
        expense: ['Makanan', 'Transportasi', 'Tagihan', 'Hiburan', 'Belanja', 'Kesehatan', 'Lainnya']
    };

    const dom = {
        balance: document.getElementById('balance'),
        moneyPlus: document.getElementById('money-plus'),
        moneyMinus: document.getElementById('money-minus'),
        form: document.getElementById('form'),
        textInput: document.getElementById('text'),
        categoryInput: document.getElementById('category'),
        amountInput: document.getElementById('amount'),
        dateInput: document.getElementById('date'),
        notification: document.getElementById('notification'),
        formButton: document.getElementById('form-button'),
        cancelEditButton: document.getElementById('cancel-edit'),
        tabIncome: document.getElementById('tab-income'),
        tabExpense: document.getElementById('tab-expense')
    };

    let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    let isEditing = false;
    let editID = null;
    let formMode = 'income';

    const formatMoney = (number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(number);

    function showNotification(message, isError = true) {
        dom.notification.textContent = message;
        dom.notification.className = isError 
            ? 'bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-4'
            : 'bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg relative mb-4';
        
        setTimeout(() => {
            dom.notification.className += ' hidden';
        }, 3000);
    }

    function updateDashboard() {
        const amounts = transactions.map(t => t.amount);
        const total = amounts.reduce((acc, item) => acc + item, 0);
        const income = amounts.filter(item => item > 0).reduce((acc, item) => acc + item, 0);
        const expense = (amounts.filter(item => item < 0).reduce((acc, item) => acc + item, 0) * -1);
        
        dom.balance.textContent = formatMoney(total);
        dom.moneyPlus.textContent = `+ ${formatMoney(income)}`;
        dom.moneyMinus.textContent = `- ${formatMoney(expense)}`;
    }

    function populateCategories() {
        dom.categoryInput.innerHTML = '';
        CATEGORIES[formMode].forEach(cat => {
            const option = document.createElement('option');
            option.value = cat;
            option.textContent = cat;
            dom.categoryInput.appendChild(option);
        });
    }

    function setFormMode(mode) {
        formMode = mode;
        populateCategories();
        const isIncome = mode === 'income';
        dom.tabIncome.classList.toggle('active', isIncome);
        dom.tabIncome.classList.toggle('active-income', isIncome);
        dom.tabExpense.classList.toggle('active', !isIncome);
        dom.tabExpense.classList.toggle('active-expense', !isIncome);
        dom.formButton.className = `btn-primary w-full ${isIncome ? 'bg-green-600 hover:bg-green-700 focus:ring-green-500' : 'bg-red-600 hover:bg-red-700 focus:ring-red-500'}`;
    }
    
    function resetForm() {
        isEditing = false;
        editID = null;
        dom.form.reset();
        dom.dateInput.valueAsDate = new Date();
        dom.formButton.textContent = 'Tambah Transaksi';
        dom.cancelEditButton.classList.add('hidden');
        localStorage.removeItem('editTransactionId');
        setFormMode('income');
    }

    function handleFormSubmit(e) {
        e.preventDefault();
        const text = dom.textInput.value.trim();
        const amount = +dom.amountInput.value;
        const date = dom.dateInput.value;
        const category = dom.categoryInput.value;

        if (!text || !amount || !date) {
            showNotification('Mohon lengkapi semua kolom.');
            return;
        }

        const transactionData = {
            text,
            amount: formMode === 'income' ? amount : -amount,
            date,
            category
        };

        if (isEditing) {
            const index = transactions.findIndex(t => t.id === editID);
            if (index > -1) {
                transactions[index] = { ...transactions[index], ...transactionData };
            }
        } else {
            transactions.push({ id: Date.now(), ...transactionData });
        }

        localStorage.setItem('transactions', JSON.stringify(transactions));
        updateDashboard();
        resetForm();
        showNotification('Transaksi berhasil disimpan!', false);
    }

    function loadTransactionForEdit() {
        const transactionIdToEdit = localStorage.getItem('editTransactionId');
        if (!transactionIdToEdit) return;

        const transaction = transactions.find(t => t.id === +transactionIdToEdit);
        if (!transaction) {
            localStorage.removeItem('editTransactionId');
            return;
        }

        isEditing = true;
        editID = transaction.id;
        
        setFormMode(transaction.amount > 0 ? 'income' : 'expense');
        dom.textInput.value = transaction.text;
        dom.amountInput.value = Math.abs(transaction.amount);
        dom.dateInput.value = transaction.date;
        dom.categoryInput.value = transaction.category;

        dom.formButton.textContent = 'Update Transaksi';
        dom.cancelEditButton.classList.remove('hidden');
    }
    
    function init() {
        updateDashboard();
        loadTransactionForEdit();
        if (!isEditing) {
            resetForm();
        }

        dom.form.addEventListener('submit', handleFormSubmit);
        dom.cancelEditButton.addEventListener('click', resetForm);
        dom.tabIncome.addEventListener('click', () => setFormMode('income'));
        dom.tabExpense.addEventListener('click', () => setFormMode('expense'));
    }

    init();
});
