/**
 * This component operates as a "Controller-View".  It listens for changes in
 * the CMStore and passes the new data to its children.
 */

var React = require('react');
var Navbar = require('./Navbar.react');
var ContactModal = require('./ContactModal.react');
var EditContactModal = require('./EditContactModal.react');
var ContactList = require('./ContactList.react');
var CMStore = require('../stores/CMStore');
var CMActions = require('../actions/CMActions');

/**
 * Retrieve the current Contacts data from the CMStore
 */
function getContactsState() {
  return {
    allContacts: CMStore.getAll(),
    editContact: CMStore.getEditContact()
  };
}

var CMApp = React.createClass({
	getInitialState: function() {
    // loading existing data
		this._initializeContacts();
    return getContactsState();
  },
  componentDidMount: function() {
		CMStore.addChangeListener(this._onChange);
	},
	componentWillUnmount: function() {
		CMStore.removeChangeListener(this._onChange);
	},
	render: function() {
    // request to edit a specific contact from store
    var editId = this.state.editContact.id;
    var editContact = this.state.editContact;
    if (editId !== undefined) {
      $('#edit_contact_modal').openModal();
      // filling with data
      $('#edit_contact_form').find('#contact_id').val(editContact.id);
      $('#edit_contact_form').find('#contact_name').val(editContact.name);
      $('#edit_contact_form').find('#contact_phone').val(editContact.phone);
      $('#edit_contact_form').find('#contact_email').val(editContact.email);
      $('#edit_contact_form').find('#contact_avatar').val(editContact.avatar);
    }
    // main block
		return(
			<ul className="collection">
			  <Navbar/>
			  <ContactList data={this.state.allContacts}/>
			  <ContactModal />
        <EditContactModal editContact={this.state.editContact} />
			</ul>

		);
	},
	/**
	* Event handler for 'change' events coming from the CMStore
	*/
	_onChange: function() {
		this.setState(getContactsState());

	},
	_initializeContacts: function() {
		// loading imaginary contacts
		// can also be loaded from a remote server
		var contacts = [
            {
              id: 1,
              name : 'Terrence S. Hatfield',
              phone: '651-603-1723',
              email: 'TerrenceSHatfield@rhyta.com'
            },
            {
              id: 2,
              name : 'Chris M. Manning',
              phone: '513-307-5859',
              email: 'ChrisMManning@dayrep.com'
            },
            {
              id: 3,
              name : 'Ricky M. Digiacomo',
              phone: '918-774-0199',
              email: 'RickyMDigiacomo@teleworm.us'
            },
            {
              id: 4,
              name : 'Michael K. Bayne',
              phone: '702-989-5145',
              email: 'MichaelKBayne@rhyta.com'
            },
            {
              id: 5,
              name : 'John I. Wilson',
              phone: '318-292-6700',
              email: 'JohnIWilson@dayrep.com'
            },
            {
              id: 6,
              name : 'Rodolfo P. Robinett',
              phone: '803-557-9815',
              email: 'RodolfoPRobinett@jourrapide.com'
            }
          ];

        // looping through loaded contacts to create them individually
        // sending action
        contacts.forEach(function(obj) {
        	CMActions.create(obj);
        });
	}

});

module.exports = CMApp;