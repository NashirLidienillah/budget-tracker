document.addEventListener('DOMContentLoaded', () => {
    const dom = {
        list: document.getElementById('history-list'),
        emptyMessage: document.getElementById('empty-message'),
        searchInput: document.getElementById('search'),
        categoryFilter: document.getElementById('filter-category'),
        chartCanvas: document.getElementById('expense-chart').getContext('2d'),
        balance: document.getElementById('history-balance')
    };

    let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    let expenseChart = null;

    const formatMoney = (number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(number);
    const formatDate = (dateString) => new Date(dateString).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    function render() {
        const searchTerm = dom.searchInput.value.toLowerCase();
        const category = dom.categoryFilter.value;

        const filteredTransactions = transactions.filter(t => {
            const matchesSearch = t.text.toLowerCase().includes(searchTerm);
            const matchesCategory = category === 'all' || t.category === category;
            return matchesSearch && matchesCategory;
        });

        updateBalance();
        renderList(filteredTransactions);
        renderChart(filteredTransactions);
    }

    function renderList(items) {
        dom.list.innerHTML = '';
        dom.emptyMessage.classList.toggle('hidden', items.length > 0);

        if (items.length === 0) return;

        const sortedItems = items.sort((a, b) => new Date(b.date) - new Date(a.date));

        sortedItems.forEach(t => {
            const sign = t.amount < 0 ? '-' : '+';
            const itemClass = t.amount < 0 ? 'expense' : 'income';
            const categoryTagColor = itemClass === 'income' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';

            const item = document.createElement('li');
            item.className = `bg-white p-4 rounded-lg shadow-sm flex flex-col sm:flex-row sm:items-center justify-between transaction-item ${itemClass} fade-in`;
            item.innerHTML = `
                <div class="flex-grow">
                    <p class="font-bold text-lg">${t.text}</p>
                    <div class="flex items-center gap-2 mt-1">
                        <span class="text-sm text-gray-500">${formatDate(t.date)}</span>
                        <span class="category-tag ${categoryTagColor}">${t.category}</span>
                    </div>
                </div>
                <div class="flex items-center gap-4 mt-3 sm:mt-0">
                    <span class="font-semibold text-lg">${sign} ${formatMoney(Math.abs(t.amount))}</span>
                    <button class="edit-btn" data-id="${t.id}" title="Edit"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16"><path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293z"/><path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/></svg></button>
                    <button class="delete-btn" data-id="${t.id}" title="Hapus"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16"><path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5zM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528zM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5z"/></svg></button>
                </div>`;
            dom.list.appendChild(item);
        });
    }

    function renderChart(items) {
        const expenseData = items
            .filter(t => t.amount < 0)
            .reduce((acc, t) => {
                acc[t.category] = (acc[t.category] || 0) + Math.abs(t.amount);
                return acc;
            }, {});

        if (expenseChart) expenseChart.destroy();

        expenseChart = new Chart(dom.chartCanvas, {
            type: 'doughnut',
            data: {
                labels: Object.keys(expenseData),
                datasets: [{
                    data: Object.values(expenseData),
                    backgroundColor: ['#c0392b', '#e74c3c', '#d35400', '#f39c12', '#8e44ad', '#9b59b6', '#2980b9'],
                    hoverOffset: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'top' },
                    tooltip: {
                        callbacks: {
                            label: (context) => `${context.label}: ${formatMoney(context.parsed)}`
                        }
                    }
                }
            }
        });
    }

    function updateBalance() {
        const total = transactions.reduce((acc, t) => acc + t.amount, 0);
        dom.balance.textContent = formatMoney(total);
    }

    function populateCategoryFilter() {
        const categories = [...new Set(transactions.map(t => t.category))];
        categories.forEach(cat => {
            const option = document.createElement('option');
            option.value = cat;
            option.textContent = cat;
            dom.categoryFilter.appendChild(option);
        });
    }

    function handleListClick(e) {
        const editBtn = e.target.closest('.edit-btn');
        if (editBtn) {
            localStorage.setItem('editTransactionId', editBtn.dataset.id);
            window.location.href = 'index.html';
            return;
        }

        const deleteBtn = e.target.closest('.delete-btn');
        if (deleteBtn) {
            if (confirm('Apakah Anda yakin ingin menghapus transaksi ini?')) {
                transactions = transactions.filter(t => t.id !== +deleteBtn.dataset.id);
                localStorage.setItem('transactions', JSON.stringify(transactions));
                render();
            }
        }
    }
    
    function init() {
        populateCategoryFilter();
        render();
        dom.searchInput.addEventListener('input', render);
        dom.categoryFilter.addEventListener('change', render);
        dom.list.addEventListener('click', handleListClick);
    }

    init();
});
