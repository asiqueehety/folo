'use client'
const options = [
  "unknown",
  // Daily Use Items
  "Watch","Food","Drink","Person", "Clock", "Phone", "Wallet", "Keys", "Charger", "Remote", "Glasses", "Sunglasses", "Backpack",
  "Bag", "Shoes", "Slippers", "Socks", "Hat", "Cap", "Umbrella", "Pen", "Pencil", "Notebook", "Book",
  "Eraser", "Sharpener", "Highlighter", "Marker", "Scissors", "Tape", "Glue", "Stapler", "Folder",

  // Clothing & Accessories
  "Shirt", "T-shirt", "Jeans", "Pants", "Shorts", "Jacket", "Sweater", "Coat", "Scarf", "Gloves", "Belt",
  "Tie", "Dress", "Skirt", "Saree", "Kurta", "Shoelaces", "Hairbrush", "Comb", "Mirror", "Makeup kit",

  // Electronics
  "Laptop", "Tablet", "Smartphone", "Desktop", "TV", "Bluetooth speaker", "Headphones", "Earphones",
  "Mic", "Camera", "Drone", "Printer", "Scanner", "Game Console", "Hard Drive", "USB Drive", "Power Bank",

  // Furniture
  "Chair", "Table", "Desk", "Bed", "Sofa", "Couch", "Cupboard", "Bookshelf", "Drawer", "Mattress", "Pillow",
  "Blanket", "Curtains", "Rug", "Lamp", "Fan", "Mirror", "Clock", "Dustbin",

  // Kitchen Items
  "Plate", "Bowl", "Spoon", "Fork", "Knife", "Cup", "Glass", "Mug", "Frying pan", "Pot", "Kettle",
  "Microwave", "Oven", "Toaster", "Stove", "Blender", "Chopping board", "Bottle", "Tupperware",

  // Toiletries
  "Toothbrush", "Toothpaste", "Shampoo", "Soap", "Towel", "Hairdryer", "Razor", "Comb", "Toilet paper",
  "Deodorant", "Perfume", "Nail cutter", "Cotton buds", "Face wash",
  "Fruits",
  "Vegetables",
  // Stationery
  "Calculator", "Ruler", "Protractor", "Notebook", "Paper clips", "Sticky notes", "Clipboard",

  // Misc
  "Fan", "Bulb", "Switch", "Socket", "Adapter", "Extension cord", "Iron", "Sewing machine", "Thread",
  "Needle", "Glue gun", "Mask", "Helmet", "Torch", "Lighter", "Candle",

  // Transportation
  "Bicycle", "Scooter", "Motorbike", "Car", "Bus", "Train", "Truck", "Rickshaw", "Skateboard", "Rollerblades",
  "Airplane", "Boat", "Ship", "Subway",

  // Tools
  "Hammer", "Screwdriver", "Wrench", "Pliers", "Saw", "Drill", "Nails", "Screws", "Measuring tape",
  "Level", "Chisel", "Utility knife",

  // Food & Snacks
  "Bread", "Rice", "Pasta", "Noodles", "Egg", "Butter", "Cheese", "Milk", "Yogurt", "Juice", "Water bottle",
  "Chocolate", "Candy", "Chips", "Biscuits", "Cake", "Cookies", "Ice Cream",

  // Animals & Pets
  "Dog", "Cat", "Fish", "Bird", "Rabbit", "Turtle", "Hamster", "Leash", "Collar", "Pet food", "Cage",

  // Others
  "Ball", "Toy", "Puzzle", "Doll", "Board game", "Playing cards", "Battery", "Charger", "Controller"
];

import { useState } from 'react'
import { Combobox } from '@headlessui/react'

export default function SearchableDropdown({ onSelect }) {
  const [selected, setSelected] = useState('');
  const [query, setQuery] = useState('');

  const filteredOptions = options.filter(option =>
    option.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="relative w-full max-w-md m-2">
      <Combobox
        value={selected}
        onChange={(value) => {
          setSelected(value);
          onSelect(value);
        }}
      >
        <div className="relative mr-4">
          <Combobox.Input
            className="w-full rounded-xl border border-gray-300 bg-white/90 px-4 py-3 text-gray-800 shadow focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:bg-gray-200 transition-all"
            onChange={(event) => setQuery(event.target.value)}
            placeholder="What type of item was it?"
          />
          
          <Combobox.Options className="absolute top-full left-0 w-full bg-white rounded-xl mt-1 shadow-lg border border-gray-200 max-h-60 overflow-auto z-50">
            {filteredOptions.length === 0 && query !== '' ? (
              <div className="px-4 py-2 text-gray-500">No match</div>
            ) : (
              filteredOptions.map((option, idx) => (
                <Combobox.Option
                  key={idx}
                  value={option}
                  className={({ active }) =>
                    `px-4 py-2 cursor-pointer ${
                      active ? 'bg-blue-500 text-white' : 'text-gray-800'
                    }`
                  }
                >
                  {option}
                </Combobox.Option>
              ))
            )}
          </Combobox.Options>
        </div>
      </Combobox>
    </div>
  );
}
