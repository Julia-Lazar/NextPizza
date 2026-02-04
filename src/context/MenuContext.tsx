// MenuContext removed: file intentionally left blank after context removal.

// The following code has been removed:

// "use client";
// import React, {
//   createContext,
//   useContext,
//   useState,
//   useEffect,
//   ReactNode,
// } from "react";

// export interface MenuItem {
//   id: string;
//   name: string;
//   image: string;
//   ingredients: string[];
//   category: "pizza" | "sauces" | "drinks";
//   sizes: { size: number; price: number }[];
// }

// interface MenuContextType {
//   menuItems: MenuItem[];
//   addMenuItem: (item: Omit<MenuItem, "id">) => void;
//   updateMenuItem: (id: string, item: Omit<MenuItem, "id">) => void;
//   deleteMenuItem: (id: string) => void;
//   getMenuItemsByCategory: (category: MenuItem["category"]) => MenuItem[];
// }

// const MenuContext = createContext<MenuContextType | undefined>(undefined);

// const initialMenuItems: MenuItem[] = [
//   {
//     id: "1",
//     name: "Margherita",
//     image: "/images/margherita.jpg",
//     ingredients: ["Tomato sauce", "Mozzarella cheese", "Basil"],
//     category: "pizza",
//     sizes: [
//       { size: 30, price: 20 },
//       { size: 40, price: 30 },
//       { size: 50, price: 40 },
//     ],
//   },
//   // ... other menu items ...
// ];

// export const MenuProvider = ({ children }: { children: ReactNode }) => {
//   const [menuItems, setMenuItems] = useState<MenuItem[]>(initialMenuItems);
//   const [isHydrated, setIsHydrated] = useState(false);

//   useEffect(() => {
//     const savedMenu = localStorage.getItem("menuItems");
//     if (savedMenu) {
//       setMenuItems(JSON.parse(savedMenu));
//     }
//     setIsHydrated(true);
//   }, []);

//   useEffect(() => {
//     if (isHydrated) {
//       localStorage.setItem("menuItems", JSON.stringify(menuItems));
//     }
//   }, [menuItems, isHydrated]);

//   const addMenuItem = (item: Omit<MenuItem, "id">) => {
//     const newItem: MenuItem = {
//       ...item,
//       id: Date.now().toString(),
//     };
//     setMenuItems((prev) => [...prev, newItem]);
//   };

//   const updateMenuItem = (id: string, item: Omit<MenuItem, "id">) => {
//     setMenuItems((prev) =>
//       prev.map((menuItem) => (menuItem.id === id ? { ...item, id } : menuItem))
//     );
//   };

//   const deleteMenuItem = (id: string) => {
//     setMenuItems((prev) => prev.filter((item) => item.id !== id));
//   };

//   const getMenuItemsByCategory = (category: MenuItem["category"]) => {
//     return menuItems.filter((item) => item.category === category);
//   };

//   return (
//     <MenuContext.Provider
//       value={{
//         menuItems,
//         addMenuItem,
//         updateMenuItem,
//         deleteMenuItem,
//         getMenuItemsByCategory,
//       }}
//     >
//       {children}
//     </MenuContext.Provider>
//   );
// };

// export const useMenu = () => {
//   const context = useContext(MenuContext);
//   if (!context) {
//     throw new Error("useMenu must be used within a MenuProvider");
//   }
//   return context;
// };
'use client';
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

export interface MenuItem {
  id: string;
  name: string;
  image: string;
  ingredients: string[];
  category: 'pizza' | 'sauce' | 'drink';
  sizes: { size: number; price: number }[];
}

interface MenuContextType {
  menuItems: MenuItem[];
  addMenuItem: (item: Omit<MenuItem, 'id'>) => void;
  updateMenuItem: (id: string, item: Omit<MenuItem, 'id'>) => void;
  deleteMenuItem: (id: string) => void;
  getMenuItemsByCategory: (category: MenuItem['category']) => MenuItem[];
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

const initialMenuItems: MenuItem[] = [
  {
    id: '1',
    name: 'Margherita',
    image: '/images/margherita.jpg',
    ingredients: ['Tomato sauce', 'Mozzarella cheese', 'Basil'],
    category: 'pizza',
    sizes: [
      { size: 30, price: 20 },
      { size: 40, price: 30 },
      { size: 50, price: 40 },
    ],
  },
  {
    id: '2',
    name: 'Pepperoni',
    image: '/images/pepperoni.jpg',
    ingredients: ['Tomato sauce', 'Mozzarella cheese', 'Pepperoni'],
    category: 'pizza',
    sizes: [
      { size: 30, price: 25 },
      { size: 40, price: 35 },
      { size: 50, price: 45 },
    ],
  },
  {
    id: '3',
    name: 'Hawaiian',
    image: '/images/hawaii.jpg',
    ingredients: ['Tomato sauce', 'Mozzarella cheese', 'Ham', 'Pineapple'],
    category: 'pizza',
    sizes: [
      { size: 30, price: 26 },
      { size: 40, price: 36 },
      { size: 50, price: 46 },
    ],
  },
  {
    id: '4',
    name: 'Quattro Formaggi',
    image: '/images/4cheese.jpg',
    ingredients: [
      'Cream sauce',
      'Mozzarella',
      'Gorgonzola',
      'Parmesan',
      'Ricotta',
    ],
    category: 'pizza',
    sizes: [
      { size: 30, price: 28 },
      { size: 40, price: 38 },
      { size: 50, price: 48 },
    ],
  },
  {
    id: '5',
    name: 'Vegetarian',
    image: '/images/pepperoni.jpg',
    ingredients: [
      'Tomato sauce',
      'Mozzarella cheese',
      'Bell pepper',
      'Onion',
      'Mushrooms',
      'Olives',
    ],
    category: 'pizza',
    sizes: [
      { size: 30, price: 24 },
      { size: 40, price: 34 },
      { size: 50, price: 44 },
    ],
  },
  {
    id: '6',
    name: 'Garlic sauce',
    image: '/images/garlic-sauce-1.webp',
    ingredients: ['Sour cream', 'Garlic', 'Spices'],
    category: 'sauce',
    sizes: [{ size: 50, price: 3 }],
  },
  {
    id: '7',
    name: 'BBQ sauce',
    image: '/images/bbq.jpg',
    ingredients: ['Tomatoes', 'Paprika', 'Onion', 'Spices'],
    category: 'sauce',
    sizes: [{ size: 50, price: 3 }],
  },
  {
    id: '8',
    name: 'Spicy sauce',
    image: '/images/bbq.jpg',
    ingredients: ['Tomatoes', 'Chili', 'Paprika', 'Spices'],
    category: 'sauce',
    sizes: [{ size: 50, price: 3 }],
  },
  {
    id: '9',
    name: 'Coca-Cola',
    image: '/images/cola.jpg',
    ingredients: ['Carbonated drink'],
    category: 'drink',
    sizes: [
      { size: 250, price: 7 },
      { size: 800, price: 9 },
    ],
  },
  {
    id: '10',
    name: 'Sprite',
    image: '/images/cola.jpg',
    ingredients: ['Lemon-lime carbonated drink'],
    category: 'drink',
    sizes: [
      { size: 250, price: 7 },
      { size: 800, price: 9 },
    ],
  },
  {
    id: '11',
    name: 'Orange juice',
    image: '/images/cola.jpg',
    ingredients: ['100% orange juice'],
    category: 'drink',
    sizes: [
      { size: 250, price: 7 },
      { size: 800, price: 9 },
    ],
  },
  {
    id: '12',
    name: 'Mineral water',
    image: '/images/cola.jpg',
    ingredients: ['Sparkling spring water'],
    category: 'drink',
    sizes: [
      { size: 250, price: 7 },
      { size: 800, price: 9 },
    ],
  },
];

export const MenuProvider = ({ children }: { children: ReactNode }) => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialMenuItems);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const savedMenu = localStorage.getItem('menuItems');
    if (savedMenu) {
      setMenuItems(JSON.parse(savedMenu));
    }
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem('menuItems', JSON.stringify(menuItems));
    }
  }, [menuItems, isHydrated]);

  const addMenuItem = (item: Omit<MenuItem, 'id'>) => {
    const newItem: MenuItem = {
      ...item,
      id: Date.now().toString(),
    };
    setMenuItems((prev) => [...prev, newItem]);
  };

  const updateMenuItem = (id: string, item: Omit<MenuItem, 'id'>) => {
    setMenuItems((prev) =>
      prev.map((menuItem) => (menuItem.id === id ? { ...item, id } : menuItem)),
    );
  };

  const deleteMenuItem = (id: string) => {
    setMenuItems((prev) => prev.filter((item) => item.id !== id));
  };

  const getMenuItemsByCategory = (category: MenuItem['category']) => {
    return menuItems.filter((item) => item.category === category);
  };

  return (
    <MenuContext.Provider
      value={{
        menuItems,
        addMenuItem,
        updateMenuItem,
        deleteMenuItem,
        getMenuItemsByCategory,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error('useMenu must be used within a MenuProvider');
  }
  return context;
};
