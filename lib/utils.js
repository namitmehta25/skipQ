// Sample menu items data
export const menuData = {
  1: { // Tasty Bites
    categories: [
      {
        name: "Starters",
        items: [
          {
            id: "1-1",
            name: "Bruschetta",
            description: "Grilled bread rubbed with garlic and topped with tomatoes, fresh basil, and olive oil",
            price: 8.99,
            image: "/api/placeholder/300/200",
            isVegetarian: true,
            isSpicy: false,
            allergens: ["gluten"]
          },
          {
            id: "1-2",
            name: "Calamari Fritti",
            description: "Crispy fried squid served with marinara sauce",
            price: 12.99,
            image: "/api/placeholder/300/200",
            isVegetarian: false,
            isSpicy: false,
            allergens: ["seafood", "gluten"]
          }
        ]
      },
      {
        name: "Main Course",
        items: [
          {
            id: "1-3",
            name: "Margherita Pizza",
            description: "Fresh tomatoes, mozzarella, basil, and olive oil",
            price: 16.99,
            image: "/api/placeholder/300/200",
            isVegetarian: true,
            isSpicy: false,
            allergens: ["dairy", "gluten"]
          },
          {
            id: "1-4",
            name: "Spaghetti Carbonara",
            description: "Pasta with eggs, cheese, pancetta, and black pepper",
            price: 18.99,
            image: "/api/placeholder/300/200",
            isVegetarian: false,
            isSpicy: false,
            allergens: ["eggs", "dairy", "gluten"]
          }
        ]
      }
    ]
  },
  2: { // Spice Paradise
    categories: [
      {
        name: "Appetizers",
        items: [
          {
            id: "2-1",
            name: "Samosa",
            description: "Crispy pastry filled with spiced potatoes and peas",
            price: 6.99,
            image: "/api/placeholder/300/200",
            isVegetarian: true,
            isSpicy: true,
            allergens: ["gluten"]
          },
          {
            id: "2-2",
            name: "Chicken Tikka",
            description: "Marinated and grilled chicken pieces",
            price: 10.99,
            image: "/api/placeholder/300/200",
            isVegetarian: false,
            isSpicy: true,
            allergens: ["dairy"]
          }
        ]
      },
      {
        name: "Curries",
        items: [
          {
            id: "2-3",
            name: "Butter Chicken",
            description: "Creamy tomato-based curry with tender chicken",
            price: 19.99,
            image: "/api/placeholder/300/200",
            isVegetarian: false,
            isSpicy: true,
            allergens: ["dairy"]
          },
          {
            id: "2-4",
            name: "Palak Paneer",
            description: "Spinach curry with fresh cottage cheese",
            price: 16.99,
            image: "/api/placeholder/300/200",
            isVegetarian: true,
            isSpicy: true,
            allergens: ["dairy"]
          }
        ]
      }
    ]
  }
  // Add more restaurant menus as needed
};

// Helper function to get menu by restaurant ID
export const getMenuById = (id) => {
  return menuData[id] || null;
};

// Sample restaurants data
export const restaurantsData = [
  {
    id: 1,
    name: "Tasty Bites",
    image: "/api/placeholder/400/300",
    cuisine: "Italian",
    rating: 4.7,
    reviewCount: 142,
    priceRange: 2,
    distance: 1.2,
    dineinAvailable: true,
    takeoutAvailable: true,
    openingHours: "11:00 AM - 10:00 PM",
    hasMenu: true
  },
  {
    id: 2,
    name: "Spice Paradise",
    image: "/api/placeholder/400/300",
    cuisine: "Indian",
    rating: 4.5,
    reviewCount: 98,
    priceRange: 2,
    distance: 0.8,
    dineinAvailable: true,
    takeoutAvailable: false,
    openingHours: "12:00 PM - 11:00 PM",
    hasMenu: true
  },
  {
    id: 3,
    name: "Burger Haven",
    image: "/api/placeholder/400/300",
    cuisine: "Fast Food",
    rating: 4.2,
    reviewCount: 256,
    priceRange: 1,
    distance: 0.5,
    dineinAvailable: true,
    takeoutAvailable: true,
    openingHours: "10:00 AM - 12:00 AM",
    hasMenu: false
  },
  {
    id: 4,
    name: "Sushi Master",
    image: "/api/placeholder/400/300",
    cuisine: "Japanese",
    rating: 4.8,
    reviewCount: 112,
    priceRange: 3,
    distance: 1.5,
    dineinAvailable: true,
    takeoutAvailable: true,
    openingHours: "12:00 PM - 10:00 PM",
    hasMenu: false
  },
  {
    id: 5,
    name: "Taco Express",
    image: "/api/placeholder/400/300",
    cuisine: "Mexican",
    rating: 4.3,
    reviewCount: 78,
    priceRange: 1,
    distance: 0.9,
    dineinAvailable: true,
    takeoutAvailable: true,
    openingHours: "11:00 AM - 9:00 PM",
    hasMenu: false
  },
  {
    id: 6,
    name: "Golden Dragon",
    image: "/api/placeholder/400/300",
    cuisine: "Chinese",
    rating: 4.6,
    reviewCount: 203,
    priceRange: 2,
    distance: 1.1,
    dineinAvailable: true,
    takeoutAvailable: true,
    openingHours: "11:30 AM - 10:30 PM",
    hasMenu: false
  }
];
