from flask import Flask, request, jsonify, abort
from models import Item, ItemStore  # Adjust the import based on your project structure
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

items = []

@app.route('/api/items', methods=['GET'])
def get_items():
    return jsonify([item.to_dict() for item in items])

@app.route('/api/items', methods=['POST'])
def create_item():
    data = request.get_json()
    
    if 'name' not in data or not data['name']:
        return jsonify({"error": "Name is required"}), 400
    if 'price' not in data or not isinstance(data['price'], (int, float)):
        return jsonify({"error": "Price is required"}), 400
    if data['price'] <= 0:
        return jsonify({"error": "Price must be a positive number"}), 400
    
    item = Item(name=data['name'], description=data.get('description', ''), price=data['price'])
    items.append(item)
    return jsonify(item.to_dict()), 201

@app.route('/api/items/<int:item_id>', methods=['GET'])
def get_item(item_id):
    item = next((i for i in items if i.id == item_id), None)
    if item is None:
        return jsonify({"error": "Item not found"}), 404
    return jsonify(item.to_dict())

@app.route('/api/items/<int:item_id>', methods=['PUT'])
def update_item(item_id):
    data = request.get_json()
    item = next((i for i in items if i.id == item_id), None)
    if item is None:
        return jsonify({"error": "Item not found"}), 404
    
    if 'name' in data:
        item.name = data['name']
    if 'description' in data:
        item.description = data['description']
    if 'price' in data:
        if not isinstance(data['price'], (int, float)) or data['price'] <= 0:
            return jsonify({"error": "Price must be a positive number"}), 400
        item.price = data['price']
    
    return jsonify(item.to_dict())

@app.route('/api/items/<int:item_id>', methods=['DELETE'])
def delete_item(item_id):
    global items
    items = [i for i in items if i.id != item_id]
    return '', 204

if __name__ == '__main__':
    app.run(debug=True)
