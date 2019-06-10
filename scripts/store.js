'use strict';
/* global cuid, Item, render  */

// eslint-disable-next-line no-unused-vars
const store = (function() {
  let items = [
    { id: cuid(), name: 'apples', checked: false },
    { id: cuid(), name: 'oranges', checked: false },
    { id: cuid(), name: 'milk', checked: true },
    { id: cuid(), name: 'bread', checked: false }
  ];
  let hideCheckedItems = false;
  let searchTerm = '';

  const findById = function(id) {
    return store.items.find(items => items.id === id);
  };

  const addItem = function(name) {
    try {
      Item.validateName(name);
      this.items.push(Item.create(name));
      render();
    } catch(error) {
      console.log('Cannot add item' + error.message);
    }
  };

  const findAndToggleChecked = function(id) {
    const foundItem = findById(id);
    foundItem.checked = !foundItem.checked;
  };

  const findAndUpdateName = function(id, newName) {
    try{
      Item.validateName(newName);
      const foundItem = this.findById(id);
      foundItem.name = newName;
    } catch(error) {
      console.log('Cannot update name:' + error.message);
    }
  };

  const findAndDelete = function(id) {
    //console.log(store.items);
    const index = store.items.findIndex(item => item.id === id);
    store.items.splice(index, 1);
  };

  return {
    items,
    hideCheckedItems,
    searchTerm,
    findById,
    addItem,
    findAndToggleChecked,
    findAndUpdateName,
    findAndDelete
  };
}());