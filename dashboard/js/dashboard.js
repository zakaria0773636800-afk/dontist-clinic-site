// Dashboard Application
// Local Storage Based Appointment & Patient Management

class DashboardApp {
    constructor() {
        this.currentSection = 'overview';
        this.currentPage = 1;
        this.itemsPerPage = 10;
        this.currentDate = new Date();
        this.appointments = [];
        this.patients = [];
        this.services = [];
        
        this.serviceNames = {
            whitening: 'تبييض الأسنان',
            braces: 'تقويم الأسنان',
            implant: 'زراعة الأسنان',
            filling: 'علاج التسوس',
            cleaning: 'تنظيف الأسنان',
            pediatric: 'طب أسنان الأطفال',
            consultation: 'استشارة عامة'
        };
        
        this.statusNames = {
            pending: 'في الانتظار',
            confirmed: 'مؤكد',
            completed: 'مكتمل',
            cancelled: 'ملغي'
        };
        
        this.init();
    }
    
    init() {
        this.loadData();
        this.setupEventListeners();
        this.renderOverview();
        this.renderAppointments();
        this.renderPatients();
        this.renderCalendar();
        this.renderServices();
        this.updateBadges();
    }
    
    loadData() {
        // Load from localStorage or use sample data
        const savedAppointments = localStorage.getItem('dental_appointments');
        const savedPatients = localStorage.getItem('dental_patients');
        const savedServices = localStorage.getItem('dental_services');
        
        if (savedAppointments) {
            this.appointments = JSON.parse(savedAppointments);
        } else {
            this.appointments = this.getSampleAppointments();
            this.saveAppointments();
        }
        
        if (savedPatients) {
            this.patients = JSON.parse(savedPatients);
        } else {
            this.patients = this.getSamplePatients();
            this.savePatients();
        }
        
        if (savedServices) {
            this.services = JSON.parse(savedServices);
        } else {
            this.services = this.getSampleServices();
            this.saveServices();
        }
    }
    
    getSampleAppointments() {
        return [
            { id: 1, name: 'محمد كمال', phone: '0555 123 456', service: 'whitening', date: '2026-07-05', time: '10:00', status: 'confirmed', notes: 'زيارة ثانية' },
            { id: 2, name: 'فاطمة زهراء', phone: '0555 234 567', service: 'implant', date: '2026-07-06', time: '11:30', status: 'pending', notes: '' },
            { id: 3, name: 'نادية عمر', phone: '0555 345 678', service: 'filling', date: '2026-07-04', time: '09:00', status: 'completed', notes: 'متابعة للطفل' },
            { id: 4, name: 'أحمد سمير', phone: '0555 456 789', service: 'braces', date: '2026-07-08', time: '14:00', status: 'confirmed', notes: '' },
            { id: 5, name: 'سارة لطفي', phone: '0555 567 890', service: 'cleaning', date: '2026-07-09', time: '10:30', status: 'pending', notes: '' },
            { id: 6, name: 'كريم بن يوسف', phone: '0555 678 901', service: 'consultation', date: '2026-07-10', time: '16:00', status: 'pending', notes: 'استشارة أولى' },
            { id: 7, name: 'ليلى حميدي', phone: '0555 789 012', service: 'pediatric', date: '2026-07-07', time: '11:00', status: 'confirmed', notes: '' },
            { id: 8, name: 'يوسف عمراني', phone: '0555 890 123', service: 'whitening', date: '2026-07-12', time: '13:30', status: 'pending', notes: '' }
        ];
    }
    
    getSamplePatients() {
        return [
            { id: 1, name: 'محمد كمال', phone: '0555 123 456', birthDate: '1985-03-15', gender: 'male', address: 'حي حسين داي', notes: 'حساسية من البنج', createdAt: '2026-01-10' },
            { id: 2, name: 'فاطمة زهراء', phone: '0555 234 567', birthDate: '1990-07-22', gender: 'female', address: 'الجزائر الوسطى', notes: '', createdAt: '2026-02-05' },
            { id: 3, name: 'نادية عمر', phone: '0555 345 678', birthDate: '1988-11-08', gender: 'female', address: 'باب الزوار', notes: 'أم لثلاثة أطفال', createdAt: '2026-03-12' },
            { id: 4, name: 'أحمد سمير', phone: '0555 456 789', birthDate: '1992-05-30', gender: 'male', address: 'الرويبة', notes: '', createdAt: '2026-04-18' },
            { id: 5, name: 'سارة لطفي', phone: '0555 567 890', birthDate: '1987-09-12', gender: 'female', address: 'المدنية', notes: '', createdAt: '2026-05-22' }
        ];
    }
    
    getSampleServices() {
        return [
            { id: 1, name: 'تبييض الأسنان', price: 15000, duration: 60, description: 'تبييض احترافي باستخدام أحدث التقنيات' },
            { id: 2, name: 'تقويم الأسنان', price: 80000, duration: 45, description: 'تقويم شفاف وتقليدي' },
            { id: 3, name: 'زراعة الأسنان', price: 120000, duration: 90, description: 'زرعات دائمة بجودة عالية' },
            { id: 4, name: 'علاج التسوس', price: 5000, duration: 30, description: 'حشوات تجميلية' },
            { id: 5, name: 'تنظيف الأسنان', price: 4000, duration: 45, description: 'تنظيف احترافي للأسنان' },
            { id: 6, name: 'طب أسنان الأطفال', price: 3000, duration: 30, description: 'رعاية خاصة للأطفال' }
        ];
    }
    
    saveAppointments() {
        localStorage.setItem('dental_appointments', JSON.stringify(this.appointments));
    }
    
    savePatients() {
        localStorage.setItem('dental_patients', JSON.stringify(this.patients));
    }
    
    saveServices() {
        localStorage.setItem('dental_services', JSON.stringify(this.services));
    }
    
    setupEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const section = item.dataset.section;
                this.showSection(section);
            });
        });
        
        // View all links
        document.querySelectorAll('.view-all').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.showSection(link.dataset.nav);
            });
        });
        
        // Sidebar toggle
        document.getElementById('menuToggle').addEventListener('click', () => {
            document.getElementById('sidebar').classList.add('open');
        });
        
        document.getElementById('sidebarToggle').addEventListener('click', () => {
            document.getElementById('sidebar').classList.remove('open');
        });
        
        // Modals
        document.querySelectorAll('[data-close]').forEach(btn => {
            btn.addEventListener('click', () => {
                this.closeModal(btn.dataset.close);
            });
        });
        
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('active');
                }
            });
        });
        
        // Add buttons
        document.getElementById('addAppointmentBtn').addEventListener('click', () => {
            this.openAppointmentModal();
        });
        
        document.getElementById('addPatientBtn').addEventListener('click', () => {
            this.openPatientModal();
        });
        
        document.getElementById('addServiceBtn').addEventListener('click', () => {
            this.openServiceModal();
        });
        
        // Forms
        document.getElementById('appointmentForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveAppointment();
        });
        
        document.getElementById('patientForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.savePatient();
        });
        
        document.getElementById('serviceForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveService();
        });
        
        // Filters
        document.getElementById('statusFilter').addEventListener('change', () => {
            this.currentPage = 1;
            this.renderAppointments();
        });
        
        document.getElementById('serviceFilter').addEventListener('change', () => {
            this.currentPage = 1;
            this.renderAppointments();
        });
        
        document.getElementById('dateFromFilter').addEventListener('change', () => {
            this.currentPage = 1;
            this.renderAppointments();
        });
        
        document.getElementById('dateToFilter').addEventListener('change', () => {
            this.currentPage = 1;
            this.renderAppointments();
        });
        
        document.getElementById('resetFilters').addEventListener('click', () => {
            document.getElementById('statusFilter').value = 'all';
            document.getElementById('serviceFilter').value = 'all';
            document.getElementById('dateFromFilter').value = '';
            document.getElementById('dateToFilter').value = '';
            this.currentPage = 1;
            this.renderAppointments();
        });
        
        // Global search
        document.getElementById('globalSearch').addEventListener('input', (e) => {
            this.handleGlobalSearch(e.target.value);
        });
        
        // Calendar navigation
        document.getElementById('prevMonth').addEventListener('click', () => {
            this.currentDate.setMonth(this.currentDate.getMonth() - 1);
            this.renderCalendar();
        });
        
        document.getElementById('nextMonth').addEventListener('click', () => {
            this.currentDate.setMonth(this.currentDate.getMonth() + 1);
            this.renderCalendar();
        });
        
        // Data management
        document.getElementById('exportData').addEventListener('click', () => this.exportData());
        document.getElementById('importData').addEventListener('click', () => this.importData());
        document.getElementById('clearData').addEventListener('click', () => this.clearData());
        
        // Settings forms
        document.getElementById('clinicSettingsForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.showToast('تم حفظ إعدادات العيادة بنجاح');
        });
        
        document.getElementById('workingHoursForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.showToast('تم حفظ ساعات العمل بنجاح');
        });
    }
    
    showSection(section) {
        this.currentSection = section;
        
        document.querySelectorAll('.content-section').forEach(s => s.classList.remove('active'));
        document.getElementById(section).classList.add('active');
        
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
            if (item.dataset.section === section) {
                item.classList.add('active');
            }
        });
        
        document.getElementById('sidebar').classList.remove('open');
        
        // Refresh data when section shown
        if (section === 'overview') this.renderOverview();
        if (section === 'appointments') this.renderAppointments();
        if (section === 'patients') this.renderPatients();
        if (section === 'calendar') this.renderCalendar();
        if (section === 'services') this.renderServices();
    }
    
    updateBadges() {
        document.getElementById('appointmentsBadge').textContent = this.appointments.filter(a => a.status === 'pending').length;
        document.getElementById('patientsBadge').textContent = this.patients.length;
    }
    
    renderOverview() {
        const total = this.appointments.length;
        const confirmed = this.appointments.filter(a => a.status === 'confirmed').length;
        const pending = this.appointments.filter(a => a.status === 'pending').length;
        const patients = this.patients.length;
        
        document.getElementById('totalAppointments').textContent = total;
        document.getElementById('confirmedAppointments').textContent = confirmed;
        document.getElementById('pendingAppointments').textContent = pending;
        document.getElementById('totalPatients').textContent = patients;
        
        // Recent appointments
        const recent = [...this.appointments]
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 5);
        
        const tbody = document.getElementById('recentAppointmentsTable');
        tbody.innerHTML = recent.map(apt => `
            <tr>
                <td>
                    <div class="patient-cell">
                        <div class="avatar-placeholder">${apt.name.charAt(0)}</div>
                        <div>
                            <strong>${apt.name}</strong>
                            <span>${apt.phone}</span>
                        </div>
                    </div>
                </td>
                <td>${this.serviceNames[apt.service]}</td>
                <td>${this.formatDate(apt.date)}</td>
                <td><span class="status-badge status-${apt.status}">${this.statusNames[apt.status]}</span></td>
                <td>
                    <div class="action-group">
                        <button class="action-btn-sm edit" onclick="app.openAppointmentModal(${apt.id})" title="تعديل"><i class="fas fa-edit"></i></button>
                        <button class="action-btn-sm delete" onclick="app.deleteAppointment(${apt.id})" title="حذف"><i class="fas fa-trash"></i></button>
                    </div>
                </td>
            </tr>
        `).join('');
        
        this.renderCharts();
    }
    
    renderCharts() {
        // Appointments by month
        const months = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];
        const monthlyData = new Array(12).fill(0);
        
        this.appointments.forEach(apt => {
            const month = new Date(apt.date).getMonth();
            monthlyData[month]++;
        });
        
        const appointmentsCtx = document.getElementById('appointmentsChart');
        if (appointmentsCtx) {
            new Chart(appointmentsCtx, {
                type: 'line',
                data: {
                    labels: months,
                    datasets: [{
                        label: 'الحجوزات',
                        data: monthlyData,
                        borderColor: '#0ea5e9',
                        backgroundColor: 'rgba(14, 165, 233, 0.1)',
                        borderWidth: 3,
                        fill: true,
                        tension: 0.4,
                        pointBackgroundColor: '#0ea5e9',
                        pointBorderColor: '#fff',
                        pointBorderWidth: 2,
                        pointRadius: 5
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { display: false }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: { stepSize: 1 }
                        }
                    }
                }
            });
        }
        
        // Services distribution
        const serviceCounts = {};
        this.appointments.forEach(apt => {
            serviceCounts[apt.service] = (serviceCounts[apt.service] || 0) + 1;
        });
        
        const servicesCtx = document.getElementById('servicesChart');
        if (servicesCtx) {
            new Chart(servicesCtx, {
                type: 'doughnut',
                data: {
                    labels: Object.keys(serviceCounts).map(s => this.serviceNames[s]),
                    datasets: [{
                        data: Object.values(serviceCounts),
                        backgroundColor: [
                            '#0ea5e9',
                            '#10b981',
                            '#f59e0b',
                            '#ef4444',
                            '#8b5cf6',
                            '#06b6d4'
                        ],
                        borderWidth: 0
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: {
                                font: { family: 'Cairo' },
                                padding: 15
                            }
                        }
                    }
                }
            });
        }
    }
    
    renderAppointments() {
        const statusFilter = document.getElementById('statusFilter').value;
        const serviceFilter = document.getElementById('serviceFilter').value;
        const dateFrom = document.getElementById('dateFromFilter').value;
        const dateTo = document.getElementById('dateToFilter').value;
        
        let filtered = this.appointments.filter(apt => {
            if (statusFilter !== 'all' && apt.status !== statusFilter) return false;
            if (serviceFilter !== 'all' && apt.service !== serviceFilter) return false;
            if (dateFrom && apt.date < dateFrom) return false;
            if (dateTo && apt.date > dateTo) return false;
            return true;
        });
        
        filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        const totalPages = Math.ceil(filtered.length / this.itemsPerPage);
        const start = (this.currentPage - 1) * this.itemsPerPage;
        const paginated = filtered.slice(start, start + this.itemsPerPage);
        
        const tbody = document.getElementById('appointmentsTable');
        
        if (paginated.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="8">
                        <div class="empty-state">
                            <i class="fas fa-calendar-times"></i>
                            <h3>لا توجد حجوزات</h3>
                            <p>لم يتم العثور على حجوزات مطابقة للفلاتر المحددة</p>
                        </div>
                    </td>
                </tr>
            `;
        } else {
            tbody.innerHTML = paginated.map(apt => `
                <tr>
                    <td><input type="checkbox" class="row-checkbox" value="${apt.id}"></td>
                    <td>
                        <div class="patient-cell">
                            <div class="avatar-placeholder">${apt.name.charAt(0)}</div>
                            <div>
                                <strong>${apt.name}</strong>
                            </div>
                        </div>
                    </td>
                    <td>${apt.phone}</td>
                    <td>${this.serviceNames[apt.service]}</td>
                    <td>${this.formatDate(apt.date)}<br><small>${apt.time}</small></td>
                    <td>${apt.notes || '-'}</td>
                    <td><span class="status-badge status-${apt.status}">${this.statusNames[apt.status]}</span></td>
                    <td>
                        <div class="action-group">
                            <button class="action-btn-sm view" onclick="app.viewAppointment(${apt.id})" title="عرض"><i class="fas fa-eye"></i></button>
                            <button class="action-btn-sm edit" onclick="app.openAppointmentModal(${apt.id})" title="تعديل"><i class="fas fa-edit"></i></button>
                            <button class="action-btn-sm delete" onclick="app.deleteAppointment(${apt.id})" title="حذف"><i class="fas fa-trash"></i></button>
                        </div>
                    </td>
                </tr>
            `).join('');
        }
        
        this.renderPagination(totalPages);
    }
    
    renderPagination(totalPages) {
        const container = document.getElementById('pageNumbers');
        let html = '';
        
        for (let i = 1; i <= totalPages; i++) {
            html += `<button class="page-number ${i === this.currentPage ? 'active' : ''}" onclick="app.goToPage(${i})">${i}</button>`;
        }
        
        container.innerHTML = html;
        
        document.getElementById('prevPage').disabled = this.currentPage === 1;
        document.getElementById('nextPage').disabled = this.currentPage === totalPages || totalPages === 0;
        
        document.getElementById('prevPage').onclick = () => {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.renderAppointments();
            }
        };
        
        document.getElementById('nextPage').onclick = () => {
            if (this.currentPage < totalPages) {
                this.currentPage++;
                this.renderAppointments();
            }
        };
    }
    
    goToPage(page) {
        this.currentPage = page;
        this.renderAppointments();
    }
    
    renderPatients() {
        const grid = document.getElementById('patientsGrid');
        
        if (this.patients.length === 0) {
            grid.innerHTML = `
                <div class="empty-state" style="grid-column: 1/-1;">
                    <i class="fas fa-users-slash"></i>
                    <h3>لا يوجد مرضى</h3>
                    <p>قم بإضافة مريض جديد للبدء</p>
                </div>
            `;
            return;
        }
        
        grid.innerHTML = this.patients.map(patient => {
            const patientAppointments = this.appointments.filter(a => a.phone === patient.phone);
            const lastVisit = patientAppointments.length > 0 
                ? this.formatDate(patientAppointments.sort((a, b) => new Date(b.date) - new Date(a.date))[0].date)
                : 'لا يوجد';
            
            return `
                <div class="patient-card">
                    <div class="actions" style="position: absolute; top: 16px; left: 16px;">
                        <button class="action-btn-sm edit" onclick="app.openPatientModal(${patient.id})" title="تعديل"><i class="fas fa-edit"></i></button>
                        <button class="action-btn-sm delete" onclick="app.deletePatient(${patient.id})" title="حذف"><i class="fas fa-trash"></i></button>
                    </div>
                    <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(patient.name)}&background=0ea5e9&color=fff&size=128" alt="${patient.name}">
                    <h3>${patient.name}</h3>
                    <p><i class="fas fa-phone"></i> ${patient.phone}</p>
                    <div class="patient-stats">
                        <div class="patient-stat">
                            <span>${patientAppointments.length}</span>
                            <small>الزيارات</small>
                        </div>
                        <div class="patient-stat">
                            <span>${this.calculateAge(patient.birthDate) || '-'}</span>
                            <small>العمر</small>
                        </div>
                        <div class="patient-stat">
                            <span style="font-size: 11px;">${lastVisit}</span>
                            <small>آخر زيارة</small>
                        </div>
                    </div>
                    <div class="actions">
                        <button class="btn btn-outline btn-sm" onclick="app.openAppointmentModal(null, ${patient.id})">
                            <i class="fas fa-calendar-plus"></i> حجز موعد
                        </button>
                    </div>
                </div>
            `;
        }).join('');
    }
    
    renderCalendar() {
        const year = this.currentDate.getFullYear();
        const month = this.currentDate.getMonth();
        
        const monthNames = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];
        document.getElementById('currentMonth').textContent = `${monthNames[month]} ${year}`;
        
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const daysInPrevMonth = new Date(year, month, 0).getDate();
        
        const dayNames = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
        
        let html = dayNames.map(day => `<div class="calendar-day-header">${day}</div>`).join('');
        
        // Previous month days
        for (let i = firstDay - 1; i >= 0; i--) {
            html += `<div class="calendar-day other-month"><span class="calendar-day-number">${daysInPrevMonth - i}</span></div>`;
        }
        
        // Current month days
        const today = new Date();
        for (let day = 1; day <= daysInMonth; day++) {
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const dayAppointments = this.appointments.filter(a => a.date === dateStr);
            const isToday = today.getFullYear() === year && today.getMonth() === month && today.getDate() === day;
            
            html += `
                <div class="calendar-day ${isToday ? 'today' : ''}">
                    <span class="calendar-day-number">${day}</span>
                    <div class="calendar-appointments">
                        ${dayAppointments.slice(0, 3).map(apt => `
                            <div class="calendar-appointment ${apt.status}">${apt.time} - ${apt.name}</div>
                        `).join('')}
                        ${dayAppointments.length > 3 ? `<div class="calendar-appointment">+${dayAppointments.length - 3} أخرى</div>` : ''}
                    </div>
                </div>
            `;
        }
        
        // Next month days
        const remainingCells = 42 - (firstDay + daysInMonth);
        for (let day = 1; day <= remainingCells; day++) {
            html += `<div class="calendar-day other-month"><span class="calendar-day-number">${day}</span></div>`;
        }
        
        document.getElementById('calendarGrid').innerHTML = html;
    }
    
    renderServices() {
        const list = document.getElementById('servicesList');
        
        list.innerHTML = this.services.map(service => `
            <div class="service-item">
                <div class="service-item-icon">
                    <i class="fas fa-tooth"></i>
                </div>
                <div class="service-item-info">
                    <h3>${service.name}</h3>
                    <p>${service.description}</p>
                    <div class="service-item-meta">
                        <span><i class="fas fa-tag"></i> ${service.price.toLocaleString()} د.ج</span>
                        <span><i class="fas fa-clock"></i> ${service.duration} دقيقة</span>
                    </div>
                </div>
                <div class="service-item-actions">
                    <button class="action-btn-sm edit" onclick="app.openServiceModal(${service.id})" title="تعديل"><i class="fas fa-edit"></i></button>
                    <button class="action-btn-sm delete" onclick="app.deleteService(${service.id})" title="حذف"><i class="fas fa-trash"></i></button>
                </div>
            </div>
        `).join('');
    }
    
    openAppointmentModal(id = null, patientId = null) {
        const modal = document.getElementById('appointmentModal');
        const title = document.getElementById('appointmentModalTitle');
        const form = document.getElementById('appointmentForm');
        
        form.reset();
        document.getElementById('appointmentId').value = '';
        
        if (id) {
            const apt = this.appointments.find(a => a.id === id);
            if (apt) {
                title.textContent = 'تعديل الحجز';
                document.getElementById('appointmentId').value = apt.id;
                document.getElementById('appointmentName').value = apt.name;
                document.getElementById('appointmentPhone').value = apt.phone;
                document.getElementById('appointmentService').value = apt.service;
                document.getElementById('appointmentDate').value = apt.date;
                document.getElementById('appointmentTime').value = apt.time;
                document.getElementById('appointmentStatus').value = apt.status;
                document.getElementById('appointmentNotes').value = apt.notes || '';
            }
        } else if (patientId) {
            const patient = this.patients.find(p => p.id === patientId);
            if (patient) {
                document.getElementById('appointmentName').value = patient.name;
                document.getElementById('appointmentPhone').value = patient.phone;
            }
            title.textContent = 'حجز جديد';
        } else {
            title.textContent = 'حجز جديد';
        }
        
        modal.classList.add('active');
    }
    
    saveAppointment() {
        const id = document.getElementById('appointmentId').value;
        const appointment = {
            id: id ? parseInt(id) : Date.now(),
            name: document.getElementById('appointmentName').value,
            phone: document.getElementById('appointmentPhone').value,
            service: document.getElementById('appointmentService').value,
            date: document.getElementById('appointmentDate').value,
            time: document.getElementById('appointmentTime').value,
            status: document.getElementById('appointmentStatus').value,
            notes: document.getElementById('appointmentNotes').value
        };
        
        if (id) {
            const index = this.appointments.findIndex(a => a.id === parseInt(id));
            if (index !== -1) {
                this.appointments[index] = appointment;
            }
        } else {
            this.appointments.push(appointment);
        }
        
        this.saveAppointments();
        this.closeModal('appointmentModal');
        this.renderAppointments();
        this.renderOverview();
        this.renderCalendar();
        this.updateBadges();
        this.showToast(id ? 'تم تحديث الحجز بنجاح' : 'تم إضافة الحجز بنجاح');
    }
    
    deleteAppointment(id) {
        if (confirm('هل أنت متأكد من حذف هذا الحجز؟')) {
            this.appointments = this.appointments.filter(a => a.id !== id);
            this.saveAppointments();
            this.renderAppointments();
            this.renderOverview();
            this.renderCalendar();
            this.updateBadges();
            this.showToast('تم حذف الحجز بنجاح');
        }
    }
    
    viewAppointment(id) {
        const apt = this.appointments.find(a => a.id === id);
        if (apt) {
            alert(`تفاصيل الحجز:\n\nالمريض: ${apt.name}\nالهاتف: ${apt.phone}\nالخدمة: ${this.serviceNames[apt.service]}\nالتاريخ: ${this.formatDate(apt.date)}\nالوقت: ${apt.time}\nالحالة: ${this.statusNames[apt.status]}\nملاحظات: ${apt.notes || 'لا يوجد'}`);
        }
    }
    
    openPatientModal(id = null) {
        const modal = document.getElementById('patientModal');
        const title = document.getElementById('patientModalTitle');
        const form = document.getElementById('patientForm');
        
        form.reset();
        document.getElementById('patientId').value = '';
        
        if (id) {
            const patient = this.patients.find(p => p.id === id);
            if (patient) {
                title.textContent = 'تعديل بيانات المريض';
                document.getElementById('patientId').value = patient.id;
                document.getElementById('patientName').value = patient.name;
                document.getElementById('patientPhone').value = patient.phone;
                document.getElementById('patientBirthDate').value = patient.birthDate || '';
                document.getElementById('patientGender').value = patient.gender || 'male';
                document.getElementById('patientAddress').value = patient.address || '';
                document.getElementById('patientNotes').value = patient.notes || '';
            }
        } else {
            title.textContent = 'مريض جديد';
        }
        
        modal.classList.add('active');
    }
    
    savePatient() {
        const id = document.getElementById('patientId').value;
        const patient = {
            id: id ? parseInt(id) : Date.now(),
            name: document.getElementById('patientName').value,
            phone: document.getElementById('patientPhone').value,
            birthDate: document.getElementById('patientBirthDate').value,
            gender: document.getElementById('patientGender').value,
            address: document.getElementById('patientAddress').value,
            notes: document.getElementById('patientNotes').value,
            createdAt: id ? this.patients.find(p => p.id === parseInt(id)).createdAt : new Date().toISOString().split('T')[0]
        };
        
        if (id) {
            const index = this.patients.findIndex(p => p.id === parseInt(id));
            if (index !== -1) {
                this.patients[index] = patient;
            }
        } else {
            this.patients.push(patient);
        }
        
        this.savePatients();
        this.closeModal('patientModal');
        this.renderPatients();
        this.renderOverview();
        this.updateBadges();
        this.showToast(id ? 'تم تحديث بيانات المريض بنجاح' : 'تم إضافة المريض بنجاح');
    }
    
    deletePatient(id) {
        if (confirm('هل أنت متأكد من حذف هذا المريض؟ سيتم حذف جميع حجوزاته أيضاً.')) {
            const patient = this.patients.find(p => p.id === id);
            if (patient) {
                this.appointments = this.appointments.filter(a => a.phone !== patient.phone);
                this.saveAppointments();
            }
            this.patients = this.patients.filter(p => p.id !== id);
            this.savePatients();
            this.renderPatients();
            this.renderAppointments();
            this.renderOverview();
            this.renderCalendar();
            this.updateBadges();
            this.showToast('تم حذف المريض بنجاح');
        }
    }
    
    openServiceModal(id = null) {
        const modal = document.getElementById('serviceModal');
        const title = document.getElementById('serviceModalTitle');
        const form = document.getElementById('serviceForm');
        
        form.reset();
        document.getElementById('serviceId').value = '';
        
        if (id) {
            const service = this.services.find(s => s.id === id);
            if (service) {
                title.textContent = 'تعديل الخدمة';
                document.getElementById('serviceId').value = service.id;
                document.getElementById('serviceName').value = service.name;
                document.getElementById('servicePrice').value = service.price;
                document.getElementById('serviceDuration').value = service.duration;
                document.getElementById('serviceDescription').value = service.description;
            }
        } else {
            title.textContent = 'خدمة جديدة';
        }
        
        modal.classList.add('active');
    }
    
    saveService() {
        const id = document.getElementById('serviceId').value;
        const service = {
            id: id ? parseInt(id) : Date.now(),
            name: document.getElementById('serviceName').value,
            price: parseInt(document.getElementById('servicePrice').value),
            duration: parseInt(document.getElementById('serviceDuration').value),
            description: document.getElementById('serviceDescription').value
        };
        
        if (id) {
            const index = this.services.findIndex(s => s.id === parseInt(id));
            if (index !== -1) {
                this.services[index] = service;
            }
        } else {
            this.services.push(service);
        }
        
        this.saveServices();
        this.closeModal('serviceModal');
        this.renderServices();
        this.showToast(id ? 'تم تحديث الخدمة بنجاح' : 'تم إضافة الخدمة بنجاح');
    }
    
    deleteService(id) {
        if (confirm('هل أنت متأكد من حذف هذه الخدمة؟')) {
            this.services = this.services.filter(s => s.id !== id);
            this.saveServices();
            this.renderServices();
            this.showToast('تم حذف الخدمة بنجاح');
        }
    }
    
    closeModal(modalId) {
        document.getElementById(modalId).classList.remove('active');
    }
    
    handleGlobalSearch(query) {
        if (!query) {
            this.renderAppointments();
            this.renderPatients();
            return;
        }
        
        query = query.toLowerCase();
        
        // Filter appointments
        const filteredAppointments = this.appointments.filter(apt => 
            apt.name.toLowerCase().includes(query) ||
            apt.phone.includes(query) ||
            this.serviceNames[apt.service].includes(query)
        );
        
        // Filter patients
        const filteredPatients = this.patients.filter(patient =>
            patient.name.toLowerCase().includes(query) ||
            patient.phone.includes(query) ||
            (patient.address && patient.address.toLowerCase().includes(query))
        );
        
        // Show patients section if searching
        if (query) {
            this.showSection('patients');
        }
        
        // Render filtered results
        this.renderFilteredPatients(filteredPatients);
    }
    
    renderFilteredPatients(patients) {
        const grid = document.getElementById('patientsGrid');
        
        if (patients.length === 0) {
            grid.innerHTML = `
                <div class="empty-state" style="grid-column: 1/-1;">
                    <i class="fas fa-search"></i>
                    <h3>لا توجد نتائج</h3>
                    <p>لم يتم العثور على مرضى مطابقين للبحث</p>
                </div>
            `;
            return;
        }
        
        grid.innerHTML = patients.map(patient => {
            const patientAppointments = this.appointments.filter(a => a.phone === patient.phone);
            const lastVisit = patientAppointments.length > 0 
                ? this.formatDate(patientAppointments.sort((a, b) => new Date(b.date) - new Date(a.date))[0].date)
                : 'لا يوجد';
            
            return `
                <div class="patient-card">
                    <div class="actions" style="position: absolute; top: 16px; left: 16px;">
                        <button class="action-btn-sm edit" onclick="app.openPatientModal(${patient.id})" title="تعديل"><i class="fas fa-edit"></i></button>
                        <button class="action-btn-sm delete" onclick="app.deletePatient(${patient.id})" title="حذف"><i class="fas fa-trash"></i></button>
                    </div>
                    <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(patient.name)}&background=0ea5e9&color=fff&size=128" alt="${patient.name}">
                    <h3>${patient.name}</h3>
                    <p><i class="fas fa-phone"></i> ${patient.phone}</p>
                    <div class="patient-stats">
                        <div class="patient-stat">
                            <span>${patientAppointments.length}</span>
                            <small>الزيارات</small>
                        </div>
                        <div class="patient-stat">
                            <span>${this.calculateAge(patient.birthDate) || '-'}</span>
                            <small>العمر</small>
                        </div>
                        <div class="patient-stat">
                            <span style="font-size: 11px;">${lastVisit}</span>
                            <small>آخر زيارة</small>
                        </div>
                    </div>
                    <div class="actions">
                        <button class="btn btn-outline btn-sm" onclick="app.openAppointmentModal(null, ${patient.id})">
                            <i class="fas fa-calendar-plus"></i> حجز موعد
                        </button>
                    </div>
                </div>
            `;
        }).join('');
    }
    
    exportData() {
        const data = {
            appointments: this.appointments,
            patients: this.patients,
            services: this.services,
            exportDate: new Date().toISOString()
        };
        
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `dental-data-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
        this.showToast('تم تصدير البيانات بنجاح');
    }
    
    importData() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    try {
                        const data = JSON.parse(event.target.result);
                        if (data.appointments) {
                            this.appointments = data.appointments;
                            this.saveAppointments();
                        }
                        if (data.patients) {
                            this.patients = data.patients;
                            this.savePatients();
                        }
                        if (data.services) {
                            this.services = data.services;
                            this.saveServices();
                        }
                        this.init();
                        this.showToast('تم استيراد البيانات بنجاح');
                    } catch (error) {
                        alert('خطأ في قراءة الملف');
                    }
                };
                reader.readAsText(file);
            }
        };
        input.click();
    }
    
    clearData() {
        if (confirm('هل أنت متأكد من مسح جميع البيانات؟ لا يمكن التراجع عن هذا الإجراء.')) {
            localStorage.removeItem('dental_appointments');
            localStorage.removeItem('dental_patients');
            localStorage.removeItem('dental_services');
            this.appointments = this.getSampleAppointments();
            this.patients = this.getSamplePatients();
            this.services = this.getSampleServices();
            this.saveAppointments();
            this.savePatients();
            this.saveServices();
            this.init();
            this.showToast('تم مسح جميع البيانات وإعادة التعيين');
        }
    }
    
    showToast(message) {
        const toast = document.getElementById('toast');
        document.getElementById('toastMessage').textContent = message;
        toast.classList.add('active');
        setTimeout(() => {
            toast.classList.remove('active');
        }, 3000);
    }
    
    formatDate(dateStr) {
        if (!dateStr) return '';
        const date = new Date(dateStr);
        return date.toLocaleDateString('ar-DZ', { year: 'numeric', month: 'short', day: 'numeric' });
    }
    
    calculateAge(birthDate) {
        if (!birthDate) return null;
        const today = new Date();
        const birth = new Date(birthDate);
        let age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
            age--;
        }
        return age;
    }
}

// Initialize app
const app = new DashboardApp();

// Add CSS for avatar placeholder
const style = document.createElement('style');
style.textContent = `
    .avatar-placeholder {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: linear-gradient(135deg, var(--primary), var(--primary-dark));
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 700;
        font-size: 14px;
    }
`;
document.head.appendChild(style);
