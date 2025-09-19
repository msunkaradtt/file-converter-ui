-----

# File Converter UI

This is the frontend for the CAD Converter API service, a modern, user-friendly web application built with React. It provides a seamless interface for users to upload 3D models, monitor their conversion progress in real-time, and download the converted `.glb` files.

## Features

  * **Drag-and-Drop File Upload**: An intuitive interface allowing users to drag and drop files directly into the browser.
  * **Multi-File Support**: Users can upload and convert up to three files simultaneously.
  * **File Validation**: The interface enforces a maximum file size of 20MB and only accepts supported file formats (`.stp`, `.step`, `.igs`, `.iges`, `.fbx`, `.stl`, `.obj`).
  * **Real-Time Progress Tracking**: For each file, the UI displays the current status (Uploading, Converting, Complete, Error) along with a visual progress bar.
  * **Asynchronous Operations**: Leverages the backend's asynchronous architecture to handle multiple conversions without freezing the UI.
  * **Individual & Batch Downloads**: Users can download each successfully converted file individually, or download all completed files at once as a single `.zip` archive.
  * **Responsive Design**: The layout is built with Tailwind CSS, ensuring a great experience on both desktop and mobile devices.
  * **Legal Pages**: Includes routes and components for standard pages like Privacy Policy and Data Privacy.

## Tech Stack

The frontend is built with a modern, efficient, and scalable technology stack:

  * **Framework**: **React** with **Vite** for a fast and optimized development experience.
  * **State Management**: **Zustand**, a lightweight and powerful state management library, is used to handle all application state, including the file list and conversion statuses. This ensures predictable and reliable state updates.
  * **Styling**: **Tailwind CSS**, a utility-first CSS framework for rapidly building custom designs.
  * **API Communication**: **Axios**, a promise-based HTTP client for making requests to the backend API.
  * **File Handling**:
      * **React-Dropzone**: For creating the accessible and easy-to-use drag-and-drop upload area.
      * **JSZip**: For creating a `.zip` archive of all converted files directly in the browser for the "Download All" feature.
  * **Routing**: **React Router** for managing navigation between the main application and the legal pages.

## Project Structure

The frontend source code is organized for clarity and maintainability.

```
file-converter-ui/
├── public/
├── src/
│   ├── components/
│   │   ├── FileUpload.jsx    # The drag-and-drop upload component
│   │   └── Layout.jsx        # The main layout with header and footer
│   ├── pages/
│   │   ├── DataPrivacy.jsx   # Data Privacy page content
│   │   └── PrivacyPolicy.jsx # Privacy Policy page content
│   ├── App.jsx               # Main application component, handles file list rendering
│   ├── index.css             # Tailwind CSS directives
│   ├── main.jsx              # Application entry point, sets up the router
│   └── store.js              # Zustand store for all state management logic
├── package.json
└── tailwind.config.js
```

## Setup and Installation

### Prerequisites

  * **Node.js and npm**: Make sure you have a recent version of Node.js and npm installed.
  * **Running Backend**: This frontend requires the `cad-converter-api` backend service to be running and accessible at `http://localhost:8000`.

### Running the Frontend

1.  **Clone the Repository and Navigate to the Directory**:

    ```bash
    git clone <your-repo-url>
    cd file-converter-ui
    ```

2.  **Install Dependencies**:

    ```bash
    npm install
    ```

3.  **Start the Development Server**:

    ```bash
    npm run dev
    ```

    The application will now be running and accessible at `http://localhost:5173` (or the URL provided in your terminal). The Vite development server provides Hot Module Replacement for a fast and efficient development workflow.