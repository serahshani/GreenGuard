

# GreenGuard

GreenGuard is a comprehensive web application designed for managing and monitoring Farm products. Developed using modern web technologies, this application helps users see available products, view contacts of farmers and their locations, and farmers can also view location of where products are in shortage.

## Features

### 1. Produce Management
- **Add and Track Produce:** Keep a record of various produce, including categories.

### 2. Farmers & buyers Management
- **Adding farmers** 
- **Adding buyers**


## Future plans

### 1. User Accounts
- **User Registration and Authentication:** Create and manage user accounts to personalize plant care and track individual gardening activities.
- **Profile Management:** Update personal information and manage account settings.

### 2. Data Visualization
- **Growth Charts:** View interactive charts to monitor plant growth over time.
- **Care Logs:** Visualize historical data on plant care activities and their impact on plant health.

### 3. Responsive Design
- **Mobile-Friendly:** Fully responsive design to ensure a seamless experience on both desktop and mobile devices.

## Getting Started

### Prerequisites

- **Node.js:** v18 or later
- **npm or yarn:** Package manager for handling dependencies

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/serahshani/GreenGuard.git
   cd GreenGuard
   ```

2. **Install Dependencies**
   ```bash
   npm install
   # or if using yarn
   yarn install
   ```

3. **Configuration**
   - Create a `.env` file in the root directory and add the necessary environment variables:
     ```env
     VITE_API_URL=http://localhost:5000/api
     ```

4. **Run the Development Server**
   ```bash
   npm run dev
   # or if using yarn
   yarn dev
   ```

5. **Access the Application**
   Open your web browser and navigate to `http://localhost:3000` to view the application.

## Project Structure

- **`src/`**: Contains the source code for the application
  - **`components/`**: Reusable UI components
  - **`pages/`**: Components for different pages of the application
  - **`services/`**: API service functions for backend communication
  - **`store/`**: State management (e.g., Redux or context)
  - **`styles/`**: CSS and styling files
  - **`App.jsx`**: Main application component
  - **`main.jsx`**: Entry point of the React application

## Usage

1. **Development Mode:** Use `npm run dev` or `yarn dev` to start the development server and test the application locally.

2. **Building for Production:** To create an optimized production build, run:
   ```bash
   npm run build
   # or if using yarn
   yarn build
   ```

3. **Testing:** Execute tests with:
   ```bash
   npm test
   # or if using yarn
   yarn test
   ```

## Contributing

1. **Fork the Repository:** Create a fork of the repository on GitHub.
2. **Create a Branch:** Work on features or bug fixes on a new branch.
3. **Submit a Pull Request:** Open a pull request with a detailed description of your changes.

## Troubleshooting

- **Common Issues:**
  - **API Connection Errors:** Ensure the backend server is running and the `VITE_API_URL` is correctly set in the `.env` file.
  - **Build Errors:** Check that all dependencies are correctly installed and there are no syntax errors in the code.

- **Support:** For additional support, refer to the [FAQ](#faq) or open an issue on the [GitHub repository](https://github.com/serahshani/GreenGuard/issues).

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- **Libraries Used:** React, Vite, Axios (for API requests), Chart.js (for data visualization)
- **Special Thanks:** To the contributors and open-source community for their support.

## Contact

- **Email:** support@greenguardapp.com
- **GitHub Repository:** [github.com/serahshani/GreenGuard](https://github.com/serahshani/GreenGuard)

Thank you for using GreenGuard!.