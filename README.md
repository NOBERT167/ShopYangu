# Product and Shop Management System 

## Description

ShopYangu is a web application built with **React** and **Next.js** that allows users to manage products and shops. The system features a product listing, a form for adding and editing products, and displays the associated shop for each product. The app utilizes **Axios** for API requests and **React Toastify** for notifications. Users can also add new shops, delete products, and update product details, all with real-time data from the server.

## Key Features

- **Product Management**: Add, edit, delete, and view product details.
- **Shop Management**: Display shop names associated with products with all crud operations to add, delete and edit shops.
- **Responsive Design**: Optimized for both desktop and mobile views.
- **Modern Ui/UX Design**: A clean modern UI/UX with light and darkmode.
- **Currency Formatting**: Product prices are formatted with commas for better readability (e.g., `10,000`).
- **Toast Notifications**: Real-time notifications for success and error messages.
- **API Integration**: Fetches data from a Mock API(json server) for products and shops using **Axios**.

## Technologies Used

- **Frontend**: React, Next.js, Tailwind CSS, Shadcn UI
- **Backend**: Mock API using JSON Server
- **Styling**: Tailwind CSS for responsive, utility-first design
- **State Management**: React’s `useState`, `useEffect` hooks
- **Notifications**: React Toastify

## Getting Started

### Prerequisites

- Node.js
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/product-shop-management.git
2. Navigate to the project directory:
  ```bash
  cd shopyangu
  ```
3. Install the dependencies:
  ```bash
  npm install
  ```
  or if you are using Yarn:
  ```bash
  yarn install
  ```
### Running the Application
1. Run the development client:
```bash
npm run dev
```
2. Run the development server
  ```bash
json-server --watch db.json --port 5000
```
Open the application in your browser:
```bash
http://localhost:3000
```


