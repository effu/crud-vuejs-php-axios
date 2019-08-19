    var nums = []
    for (var i = 0; i <= 5000; i++) {
        nums.push(i)
    }

    var app = new Vue({
        el: '#vue_contacts',
        data: {
            formData: {
                name: '',
                email: '',
                city: '',
                state: '',
                zip: '',
                phone: '',
                id: 0,
                index: '',
                rating: 0,
            },
            nums: nums,
            asc: 'desc',
            search: '',
            orderBy: 'email',
            showDisabled: 0,
            labelDisabled: 'Show Disabled',
            contacts: [],
            isEditing: false,
            isModalOpen: false,
            modalTitle: 'Create Contact'
        },
        mounted: function() {
            console.log('Vue loading. Getting contacts.')
            let self = this;
            window.addEventListener('keyup', function(event) {
                // If  ESC key was pressed...
                if (event.keyCode === 27) {
                    // try close your dialog
                    self.isModalOpen = false;
                }
            });
            this.getContacts()
        },
        computed: {
            filteredContacts() {
                return this.sortContacts(this.orderBy).filter(contact => {
                    return contact.disabled === this.showDisabled &&
                        (this.toLower(contact.name).includes(this.search.toLowerCase()) ||
                            this.toLower(contact.email).includes(this.search.toLowerCase()) ||
                            this.toLower(contact.city).includes(this.search.toLowerCase()) ||
                            this.toLower(contact.state).includes(this.search.toLowerCase()) ||
                            this.toLower(contact.zip).includes(this.search.toLowerCase()) ||
                            this.toLower(contact.phone).includes(this.search.toLowerCase()))
                })
            }
        },
        methods: {
            sortContacts: function(field) {
                let sorted = this.contacts.slice().sort(function(a, b) {
                        return (a[field].toLowerCase() > b[field].toLowerCase()) ? 1 : -1
                 })
                 if (this.asc === 'desc') {
                    return sorted.reverse()
                 } else {
                     return sorted
                 }
            },
            setOrderBy: function(field) {
                this.asc = (this.asc === 'asc') ? 'desc' : 'asc'
                console.log(this.asc)
                this.orderBy = field
            },
            toLower: function(value) {
                const res = value === null ? '' : value.toLowerCase();
                return res;
            },
            getContacts: function() {
                axios.get('api/contacts.php')
                    .then(function(response) {
                        console.log(response.data);
                        app.contacts = response.data;
                    })
                    .catch(function(error) {
                        console.log(error);
                    });
            },
            openModal: function() {
                this.isModalOpen = true;
            },
            toggleDisabled: function() {
                this.showDisabled = (this.showDisabled === 1) ? 0 : 1;
                this.labelDisabled = (this.showDisabled === 1) ? 'Show Active' : 'Show Disabled';

            },
            openCreateModal: function() {
                this.resetForm();
                this.openModal();

            },
            closeModal: function() {
                this.isModalOpen = false;
            },
            createContact: function() {
                console.log("Create contact!")
                console.log(this.formData);
                this.openModal();
                let formData = new FormData();
                console.log("name:", this.formData.name, "email:", this.formData.email)
                formData.append('name', this.formData.name || '')
                formData.append('email', this.formData.email || '')
                formData.append('state', this.formData.state || '')
                formData.append('city', this.formData.city || '')
                formData.append('zip', this.formData.zip || '')
                formData.append('phone', this.formData.phone || '')
                formData.append('disabled', 0)
                formData.append('rating', this.formData.rating || 0)
                var contact = {};
                formData.forEach(function(value, key) {
                    contact[key] = value;
                });
                axios({
                        method: 'post',
                        url: 'api/contacts.php',
                        data: formData,
                        config: { headers: { 'Content-Type': 'multipart/form-data' } }
                    })
                    .then(function(response) {
                        //handle success
                        console.log(response)
                        app.filteredContacts.push(contact)
                        app.resetForm()

                    })
                    .catch(function(response) {
                        //handle error
                        console.log(response)
                    })
                // this.getContacts()
                // this.$forceUpdate()
            },
            editContact: function(contact, index) {
                this.formData = contact;
                this.isEditing = true;
                this.modalTitle = 'Edit Contact';
                this.openModal();
            },
            deleteContact: function(contact, index) {
                if (confirm("Are you sure you want to delete, " + contact.name + "?")) {
                    console.log("Deleting: " + contact.id + " Index: " + index);
                    let formData = new FormData();
                    formData.append('id', contact.id)
                    formData.append('action', 'delete')
                    axios({
                            method: 'post',
                            url: 'api/contacts.php',
                            data: formData,
                            config: { headers: { 'Content-Type': 'multipart/form-data' } }
                        })
                        .then(function(response) {
                            console.log(response)
                            // Vue.delete(app.filteredContacts, index)
                            contact.disabled = 1;
                            app.resetForm();
                        })
                        .catch(function(response) {
                            //handle error
                            console.log(response)
                        });
                }
            },
            changeContact: function() {
                console.log("Change contact!")

                let formData = new FormData();
                console.log("name:", this.formData.name, "id:", this.formData.id, " key:", this.formData.index)
                formData.append('id', this.formData.id)
                formData.append('name', this.formData.name || '')
                formData.append('email', this.formData.email || '')
                formData.append('state', this.formData.state || '')
                formData.append('city', this.formData.city || '')
                formData.append('zip', this.formData.zip || '')
                formData.append('phone', this.formData.phone || '')
                formData.append('rating', this.formData.rating || 0)
                var contact = {};
                formData.forEach(function(value, key) {
                    contact[key] = value;
                });

                axios({
                        method: 'post',
                        url: 'api/contacts.php',
                        data: formData,
                        config: { headers: { 'Content-Type': 'multipart/form-data' } }
                    })
                    .then(function(response) {
                        //handle success
                        console.log(response)
                        Vue.set(app.filteredContacts, app.index, contact)
                        app.resetForm();
                    })
                    .catch(function(response) {
                        //handle error
                        console.log(response)
                    });
            },
            resetForm: function() {
                this.formData = {};
                this.isEditing = false;
                this.closeModal();

            }
        }
    })