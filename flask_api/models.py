class Item:
    """
    A class representing an item with a unique ID, name, description, and price.
    """
    id_counter = 1

    # Initialize a new item with a unique ID, name, description, and price
    def __init__(self, name, description, price):
        self.id = Item.id_counter
        Item.id_counter += 1
        self.name = name
        self.description = description
        self.price = price

    # Update the item attributes with new values from the data dictionary
    def update(self, data):
        if 'name' in data:
            self.name = data['name']
        if 'description' in data:
            self.description = data['description']
        if 'price' in data:
            self.price = data['price']

    # Convert the item attributes to a dictionary for easy JSON serialization
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'price': self.price,
        }

class ItemStore:
    """
    A class to store and manage items.
    """
    def __init__(self):
        self.items = {}

    def add_item(self, item):
        self.items[item.id] = item

    def get_item(self, item_id):
        return self.items.get(item_id)

    def get_all_items(self):
        return list(self.items.values())

    def update_item(self, item_id, data):
        item = self.get_item(item_id)
        if item:
            item.update(data)
            return item
        return None

    def delete_item(self, item_id):
        if item_id in self.items:
            del self.items[item_id]
