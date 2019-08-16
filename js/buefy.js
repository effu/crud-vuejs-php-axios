

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
	          },
	        search: '',
	        showDisabled: 0,
	        labelDisabled: 'Show Disabled',
            contacts: [],
            isEditing: false,
            isModalOpen: false,
            modalTitle: 'Create Contact'
        },
        mounted: function() {
            console.log('Vue loading. Getting contacts.')
            this.getContacts()
        },
        computed: {
		  filteredContacts() {
		    return this.contacts.filter(contact => {
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
            	this.labelDisabled = (this.showDisabled === 1) ? 'Hide Disabled' : 'Show Disabled';
            	this.showDisabled = (this.showDisabled === 1) ? 0 : 1;
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
                        app.contacts.push(contact)
                        app.resetForm();
                    })
                    .catch(function(response) {
                        //handle error
                        console.log(response)
                    });
            },
            editContact: function(contact, index) {
	            	this.formData = contact;
	            	this.isEditing = true;
                    this.modalTitle = 'Edit Contact';
	            	this.openModal();
            },
            deleteContact: function(contact, index) {
	            	if (confirm("Are you sure you want to delete, " + contact.name + "?")){
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
				            		Vue.delete(app.contacts, index)
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
                formData.append('name', this.formData.name)
                formData.append('email', this.formData.email)
                formData.append('state', this.formData.state)
                formData.append('city', this.formData.city)
                formData.append('zip', this.formData.zip)
                formData.append('phone', this.formData.phone)

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
                        // /* find the index of object from array that needs to be updated */
                        // const objIndex = app.contacts.findIndex(obj => obj.id === contact.id)
                        // /* make a new object with the updated object */
                        // const updatedObj = {...app.contacts[objIndex], contact}
                        // const updatedContacts = [
                        // 	...app.contacts.slice(0,objIndex),
                        // 	updatedObj,
                        // 	...app.contacts.slice(objIndex+1),
                        // ]
                        Vue.set(app.contacts, app.index, contact)
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