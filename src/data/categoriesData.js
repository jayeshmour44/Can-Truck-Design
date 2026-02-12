// File: src/data/categoriesData.js

export const categoriesData = [
  // 1. Automotive & Industrial
  {
    _id: "1",
    name: "Automotive Parts",
    slug: "automotive-parts",
    children: [
      {
        _id: "1-1",
        name: "Engine Components",
        slug: "engine-components",
        children: [
          {
            _id: "1-1-1",
            name: "Pistons & Rings",
            slug: "pistons-rings",
            children: [
                { _id: "1-1-1-1", name: "Forged Pistons", slug: "forged-pistons", children: [] },
                { _id: "1-1-1-2", name: "Cast Pistons", slug: "cast-pistons", children: [] }
            ]
          },
          {
            _id: "1-1-2",
            name: "Camshafts",
            slug: "camshafts",
            children: []
          }
        ]
      },
      {
        _id: "1-2",
        name: "Suspension",
        slug: "suspension",
        children: [
          { _id: "1-2-1", name: "Shock Absorbers", slug: "shock-absorbers", children: [] },
          { _id: "1-2-2", name: "Control Arms", slug: "control-arms", children: [] }
        ]
      },
      {
        _id: "1-3",
        name: "Braking System",
        slug: "braking-system",
        children: [
            { _id: "1-3-1", name: "Brake Pads", slug: "brake-pads", children: [] },
            { _id: "1-3-2", name: "Rotors", slug: "rotors", children: [] }
        ]
      }
    ]
  },

  // 2. Electronics
  {
    _id: "2",
    name: "Electronics",
    slug: "electronics",
    children: [
      {
        _id: "2-1",
        name: "Computers",
        slug: "computers",
        children: [
          {
            _id: "2-1-1",
            name: "Laptops",
            slug: "laptops",
            children: [
              { _id: "2-1-1-1", name: "Gaming Laptops", slug: "gaming-laptops", children: [] },
              { _id: "2-1-1-2", name: "Ultrabooks", slug: "ultrabooks", children: [] },
              { _id: "2-1-1-3", name: "2-in-1s", slug: "2-in-1s", children: [] }
            ]
          },
          {
            _id: "2-1-2",
            name: "Desktops",
            slug: "desktops",
            children: [
                 { _id: "2-1-2-1", name: "Workstations", slug: "workstations", children: [] }
            ]
          }
        ]
      },
      {
        _id: "2-2",
        name: "Smartphones",
        slug: "smartphones",
        children: [
          { 
              _id: "2-2-1", 
              name: "Android", 
              slug: "android", 
              children: [
                  { _id: "2-2-1-1", name: "Samsung", slug: "samsung", children: [] },
                  { _id: "2-2-1-2", name: "Pixel", slug: "pixel", children: [] }
              ] 
          },
          { 
              _id: "2-2-2", 
              name: "iOS", 
              slug: "ios", 
              children: [
                  { _id: "2-2-2-1", name: "iPhone 15", slug: "iphone-15", children: [] },
                  { _id: "2-2-2-2", name: "iPhone 14", slug: "iphone-14", children: [] }
              ] 
          }
        ]
      }
    ]
  },

  // 3. Fashion
  {
    _id: "3",
    name: "Men's Fashion",
    slug: "mens-fashion",
    children: [
      {
        _id: "3-1",
        name: "Clothing",
        slug: "clothing",
        children: [
          {
            _id: "3-1-1",
            name: "Shirts",
            slug: "shirts",
            children: [
              { _id: "3-1-1-1", name: "Casual Shirts", slug: "casual-shirts", children: [] },
              { _id: "3-1-1-2", name: "Formal Shirts", slug: "formal-shirts", children: [] }
            ]
          },
          {
            _id: "3-1-2",
            name: "Jeans",
            slug: "jeans",
            children: []
          }
        ]
      },
      {
        _id: "3-2",
        name: "Accessories",
        slug: "accessories",
        children: [
            { _id: "3-2-1", name: "Watches", slug: "watches", children: [] },
            { _id: "3-2-2", name: "Belts", slug: "belts", children: [] }
        ]
      }
    ]
  },

  // 4. Home & Kitchen
  {
    _id: "4",
    name: "Home & Kitchen",
    slug: "home-kitchen",
    children: [
      {
        _id: "4-1",
        name: "Appliances",
        slug: "appliances",
        children: [
          {
            _id: "4-1-1",
            name: "Kitchen",
            slug: "kitchen-appliances",
            children: [
              { _id: "4-1-1-1", name: "Blenders", slug: "blenders", children: [] },
              { _id: "4-1-1-2", name: "Microwaves", slug: "microwaves", children: [] },
              { _id: "4-1-1-3", name: "Coffee Makers", slug: "coffee-makers", children: [] }
            ]
          },
          { _id: "4-1-2", name: "Refrigerators", slug: "refrigerators", children: [] }
        ]
      },
      {
        _id: "4-2",
        name: "Furniture",
        slug: "furniture",
        children: [
             { _id: "4-2-1", name: "Sofas", slug: "sofas", children: [] },
             { _id: "4-2-2", name: "Beds", slug: "beds", children: [] }
        ]
      }
    ]
  },

  // 5. Heavy Machinery
  {
    _id: "5",
    name: "Heavy Machinery",
    slug: "heavy-machinery",
    children: [
      {
        _id: "5-1",
        name: "Construction",
        slug: "construction",
        children: [
          {
            _id: "5-1-1",
            name: "Excavators",
            slug: "excavators",
            children: [
                { _id: "5-1-1-1", name: "Mini Excavators", slug: "mini-excavators", children: [] },
                { _id: "5-1-1-2", name: "Large Excavators", slug: "large-excavators", children: [] }
            ]
          },
          { _id: "5-1-2", name: "Bulldozers", slug: "bulldozers", children: [] }
        ]
      },
      {
        _id: "5-2",
        name: "Agriculture",
        slug: "agriculture",
        children: [
            { _id: "5-2-1", name: "Tractors", slug: "tractors", children: [] },
            { _id: "5-2-2", name: "Harvesters", slug: "harvesters", children: [] }
        ]
      }
    ]
  },

  // 6. Beauty & Personal Care
  {
    _id: "6",
    name: "Beauty & Personal Care",
    slug: "beauty-personal-care",
    children: [
      {
        _id: "6-1",
        name: "Skincare",
        slug: "skincare",
        children: [
          {
            _id: "6-1-1",
            name: "Face",
            slug: "face-care",
            children: [
                { _id: "6-1-1-1", name: "Cleansers", slug: "cleansers", children: [] },
                { _id: "6-1-1-2", name: "Moisturizers", slug: "moisturizers", children: [] }
            ]
          },
          { _id: "6-1-2", name: "Body", slug: "body-care", children: [] }
        ]
      },
      {
        _id: "6-2",
        name: "Haircare",
        slug: "haircare",
        children: [
            { _id: "6-2-1", name: "Shampoo", slug: "shampoo", children: [] },
            { _id: "6-2-2", name: "Conditioner", slug: "conditioner", children: [] }
        ]
      }
    ]
  },

  // 7. Sports & Outdoors
  {
    _id: "7",
    name: "Sports & Outdoors",
    slug: "sports-outdoors",
    children: [
      {
        _id: "7-1",
        name: "Team Sports",
        slug: "team-sports",
        children: [
          {
            _id: "7-1-1",
            name: "Soccer",
            slug: "soccer",
            children: [
                { _id: "7-1-1-1", name: "Balls", slug: "soccer-balls", children: [] },
                { _id: "7-1-1-2", name: "Cleats", slug: "soccer-cleats", children: [] }
            ]
          },
          { _id: "7-1-2", name: "Basketball", slug: "basketball", children: [] }
        ]
      },
      {
        _id: "7-2",
        name: "Camping",
        slug: "camping",
        children: [
             { _id: "7-2-1", name: "Tents", slug: "tents", children: [] },
             { _id: "7-2-2", name: "Sleeping Bags", slug: "sleeping-bags", children: [] }
        ]
      }
    ]
  },

  // 8. Tools & Hardware
  {
    _id: "8",
    name: "Tools & Hardware",
    slug: "tools-hardware",
    children: [
      {
        _id: "8-1",
        name: "Power Tools",
        slug: "power-tools",
        children: [
          {
            _id: "8-1-1",
            name: "Drills",
            slug: "drills",
            children: [
                { _id: "8-1-1-1", name: "Cordless Drills", slug: "cordless-drills", children: [] },
                { _id: "8-1-1-2", name: "Hammer Drills", slug: "hammer-drills", children: [] }
            ]
          },
          { _id: "8-1-2", name: "Saws", slug: "saws", children: [] }
        ]
      },
      {
        _id: "8-2",
        name: "Hand Tools",
        slug: "hand-tools",
        children: [
            { _id: "8-2-1", name: "Screwdrivers", slug: "screwdrivers", children: [] },
            { _id: "8-2-2", name: "Wrenches", slug: "wrenches", children: [] }
        ]
      }
    ]
  },

  // 9. Toys & Games
  {
    _id: "9",
    name: "Toys & Games",
    slug: "toys-games",
    children: [
      {
        _id: "9-1",
        name: "Action Figures",
        slug: "action-figures",
        children: [
             { _id: "9-1-1", name: "Superheroes", slug: "superheroes", children: [] },
             { _id: "9-1-2", name: "Anime", slug: "anime", children: [] }
        ]
      },
      {
        _id: "9-2",
        name: "Board Games",
        slug: "board-games",
        children: [
            { _id: "9-2-1", name: "Strategy", slug: "strategy-games", children: [] },
            { _id: "9-2-2", name: "Family", slug: "family-games", children: [] }
        ]
      }
    ]
  },

  // 10. Books & Media
  {
    _id: "10",
    name: "Books",
    slug: "books",
    children: [
      {
        _id: "10-1",
        name: "Fiction",
        slug: "fiction",
        children: [
          {
            _id: "10-1-1",
            name: "Sci-Fi",
            slug: "sci-fi",
            children: [
                { _id: "10-1-1-1", name: "Dystopian", slug: "dystopian", children: [] },
                { _id: "10-1-1-2", name: "Space Opera", slug: "space-opera", children: [] }
            ]
          },
          { _id: "10-1-2", name: "Mystery", slug: "mystery", children: [] }
        ]
      },
      {
        _id: "10-2",
        name: "Non-Fiction",
        slug: "non-fiction",
        children: [
            { _id: "10-2-1", name: "Biographies", slug: "biographies", children: [] },
            { _id: "10-2-2", name: "Self-Help", slug: "self-help", children: [] }
        ]
      }
    ]
  },

  // 11. Health & Wellness
  {
    _id: "11",
    name: "Health & Wellness",
    slug: "health-wellness",
    children: [
      {
        _id: "11-1",
        name: "Vitamins",
        slug: "vitamins",
        children: [
             { _id: "11-1-1", name: "Multivitamins", slug: "multivitamins", children: [] },
             { _id: "11-1-2", name: "Immunity", slug: "immunity", children: [] }
        ]
      },
      {
        _id: "11-2",
        name: "Medical Supplies",
        slug: "medical-supplies",
        children: [
             { _id: "11-2-1", name: "First Aid", slug: "first-aid", children: [] }
        ]
      }
    ]
  },

  // 12. Office Supplies
  {
    _id: "12",
    name: "Office Supplies",
    slug: "office-supplies",
    children: [
      {
        _id: "12-1",
        name: "Stationery",
        slug: "stationery",
        children: [
            { _id: "12-1-1", name: "Pens", slug: "pens", children: [] },
            { _id: "12-1-2", name: "Notebooks", slug: "notebooks", children: [] }
        ]
      },
      {
        _id: "12-2",
        name: "Office Electronics",
        slug: "office-electronics",
        children: [
            { _id: "12-2-1", name: "Printers", slug: "printers", children: [] },
            { _id: "12-2-2", name: "Projectors", slug: "projectors", children: [] }
        ]
      }
    ]
  },

  // 13. Pet Supplies
  {
    _id: "13",
    name: "Pet Supplies",
    slug: "pet-supplies",
    children: [
      {
        _id: "13-1",
        name: "Dogs",
        slug: "dogs",
        children: [
          {
            _id: "13-1-1",
            name: "Food",
            slug: "dog-food",
            children: [
                { _id: "13-1-1-1", name: "Dry Food", slug: "dry-dog-food", children: [] },
                { _id: "13-1-1-2", name: "Wet Food", slug: "wet-dog-food", children: [] }
            ]
          },
          { _id: "13-1-2", name: "Toys", slug: "dog-toys", children: [] }
        ]
      },
      {
        _id: "13-2",
        name: "Cats",
        slug: "cats",
        children: []
      }
    ]
  },

  // 14. Garden & Outdoors
  {
    _id: "14",
    name: "Garden & Outdoors",
    slug: "garden-outdoors",
    children: [
      {
        _id: "14-1",
        name: "Gardening",
        slug: "gardening",
        children: [
             { _id: "14-1-1", name: "Plants", slug: "plants", children: [] },
             { _id: "14-1-2", name: "Tools", slug: "garden-tools", children: [] }
        ]
      },
      {
        _id: "14-2",
        name: "Outdoor Decor",
        slug: "outdoor-decor",
        children: []
      }
    ]
  },

  // 15. Baby & Kids
  {
    _id: "15",
    name: "Baby & Kids",
    slug: "baby-kids",
    children: [
      {
        _id: "15-1",
        name: "Gear",
        slug: "baby-gear",
        children: [
             { _id: "15-1-1", name: "Strollers", slug: "strollers", children: [] },
             { _id: "15-1-2", name: "Car Seats", slug: "car-seats", children: [] }
        ]
      },
      {
        _id: "15-2",
        name: "Clothing",
        slug: "baby-clothing",
        children: []
      }
    ]
  },

  // 16. Jewelry & Watches
  {
    _id: "16",
    name: "Jewelry",
    slug: "jewelry",
    children: [
      {
        _id: "16-1",
        name: "Fine Jewelry",
        slug: "fine-jewelry",
        children: [
             { _id: "16-1-1", name: "Gold", slug: "gold-jewelry", children: [] },
             { _id: "16-1-2", name: "Diamond", slug: "diamond-jewelry", children: [] }
        ]
      },
      {
        _id: "16-2",
        name: "Fashion Jewelry",
        slug: "fashion-jewelry",
        children: []
      }
    ]
  },

  // 17. Musical Instruments
  {
    _id: "17",
    name: "Musical Instruments",
    slug: "musical-instruments",
    children: [
      {
        _id: "17-1",
        name: "Guitars",
        slug: "guitars",
        children: [
             { _id: "17-1-1", name: "Acoustic", slug: "acoustic-guitars", children: [] },
             { _id: "17-1-2", name: "Electric", slug: "electric-guitars", children: [] }
        ]
      },
      {
        _id: "17-2",
        name: "Keyboards",
        slug: "keyboards",
        children: []
      }
    ]
  },

  // 18. Video Games
  {
    _id: "18",
    name: "Video Games",
    slug: "video-games",
    children: [
      {
        _id: "18-1",
        name: "PlayStation",
        slug: "playstation",
        children: [
             { _id: "18-1-1", name: "Consoles", slug: "ps5-consoles", children: [] },
             { _id: "18-1-2", name: "Games", slug: "ps5-games", children: [] }
        ]
      },
      {
        _id: "18-2",
        name: "Xbox",
        slug: "xbox",
        children: []
      }
    ]
  },

  // 19. Travel & Luggage
  {
    _id: "19",
    name: "Travel",
    slug: "travel",
    children: [
      {
        _id: "19-1",
        name: "Luggage",
        slug: "luggage",
        children: [
             { _id: "19-1-1", name: "Carry-ons", slug: "carry-ons", children: [] },
             { _id: "19-1-2", name: "Checked Bags", slug: "checked-bags", children: [] }
        ]
      },
      {
        _id: "19-2",
        name: "Accessories",
        slug: "travel-accessories",
        children: []
      }
    ]
  },

  // 20. Electrical Components
  {
    _id: "20",
    name: "Electrical",
    slug: "electrical-components",
    children: [
      {
        _id: "20-1",
        name: "Lighting",
        slug: "lighting-electrical",
        children: [
          {
            _id: "20-1-1",
            name: "LED Bulbs",
            slug: "led-bulbs",
            children: [
                { _id: "20-1-1-1", name: "Smart Bulbs", slug: "smart-bulbs", children: [] },
                { _id: "20-1-1-2", name: "Dimmable", slug: "dimmable-led", children: [] }
            ]
          },
          {
            _id: "20-1-2",
            name: "Fixtures",
            slug: "light-fixtures",
            children: []
          }
        ]
      },
      {
        _id: "20-2",
        name: "Wiring",
        slug: "wiring",
        children: [
             { _id: "20-2-1", name: "Cables", slug: "cables", children: [] },
             { _id: "20-2-2", name: "Switches", slug: "switches", children: [] }
        ]
      }
    ]
  },
   {
    _id: "21",
    name: "Electrical",
    slug: "electrical-components",
    children: [
      {
        _id: "21-1",
        name: "Lighting",
        slug: "lighting-electrical",
        children: [
          {
            _id: "21-1-1",
            name: "LED Bulbs",
            slug: "led-bulbs",
            children: [
                { _id: "21-1-1-1", name: "Smart Bulbs", slug: "smart-bulbs", children: [] },
                { _id: "21-1-1-2", name: "Dimmable", slug: "dimmable-led", children: [] }
            ]
          },
          {
            _id: "21-1-2",
            name: "Fixtures",
            slug: "light-fixtures",
            children: []
          }
        ]
      },
      {
        _id: "21-2",
        name: "Wiring",
        slug: "wiring",
        children: [
             { _id: "21-2-1", name: "Cables", slug: "cables", children: [] },
             { _id: "21-2-2", name: "Switches", slug: "switches", children: [] }
        ]
      }
    ]
  }
];