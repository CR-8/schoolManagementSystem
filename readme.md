# School Management API

A Node.js REST API for managing school data with location-based features. This API allows users to add schools and retrieve them sorted by proximity to a specified location.

## 🚀 Features

- **Add School**: Create new school entries with location data
- **List All Schools**: Retrieve all schools from the database
- **Find School by ID**: Get a specific school by its ID
- **List Schools by Proximity**: Get schools sorted by distance from user's location
- **Health Check**: API status monitoring

## 📋 Requirements

- Node.js (v14 or higher)
- MySQL Database
- npm package manager

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <https://github.com/CR-8/schoolManagementSystem.git>
   cd students
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Database Setup**
   
   Create a MySQL database and table:
   ```sql
   CREATE DATABASE schools;
   USE schools;
   
   CREATE TABLE schoolsTable (
       id INT AUTO_INCREMENT PRIMARY KEY,
       name VARCHAR(255) NOT NULL,
       address VARCHAR(255) NOT NULL,
       latitude FLOAT NOT NULL,
       longitude FLOAT NOT NULL,
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   ```

4. **Configure Database Connection**
   
   Create your own `.env` file and add the following details :
    ```
    PORT=your-port-of-choice
    DB_HOST=localhost
    DB_USER=your-username
    DB_PASS=your-password
    DB_NAME=your-database-name
    ```

5. **Start the server**
   ```bash
   npm start
   ```

The API will be available at `http://localhost:3000`

## 📚 API Endpoints

### 1. Add School
- **Endpoint**: `POST /schools/addSchool`
- **Description**: Add a new school to the database
- **Request Body**:
  ```json
  {
    "name": "New Public School",
    "address": "789 School Street, Delhi",
    "latitude": 28.6150,
    "longitude": 77.2100
  }
  ```
- **Response**:
  ```json
  {
    "message": "School added successfully",
    "schoolId": 1
  }
  ```

### 2. List Schools by Proximity
- **Endpoint**: `GET /schools/listSchool`
- **Description**: Get all schools sorted by distance from user location
- **Query Parameters**:
  - `latitude`: User's latitude (required)
  - `longitude`: User's longitude (required)
- **Example**: `GET /schools/listSchool?latitude=28.6150&longitude=77.2100`
- **Response**:
  ```json
  {
    "schools": [
      {
        "id": 1,
        "name": "ABC School",
        "address": "123 Main St",
        "latitude": 28.6000,
        "longitude": 77.2000,
        "distance": 2.34
      }
    ]
  }
  ```

### 3. List All Schools
- **Endpoint**: `GET /schools/listAllSchools`
- **Description**: Retrieve all schools without sorting
- **Response**:
  ```json
  {
    "schools": [
      {
        "id": 1,
        "name": "ABC School",
        "address": "123 Main St",
        "latitude": 28.6000,
        "longitude": 77.2000
      }
    ]
  }
  ```

### 4. Find School by ID
- **Endpoint**: `GET /schools/findSchool/:id`
- **Description**: Get a specific school by ID
- **Example**: `GET /schools/findSchool/1`
- **Response**:
  ```json
  {
    "schools": [
      {
        "id": 1,
        "name": "ABC School",
        "address": "123 Main St",
        "latitude": 28.6000,
        "longitude": 77.2000
      }
    ]
  }
  ```

### 5. Health Check
- **Endpoint**: `GET /health`
- **Description**: Check API status
- **Response**:
  ```json
  {
    "status": "OK",
    "timestamp": "2025-08-10T12:00:00.000Z",
    "database": "Connected"
  }
  ```

## 🧮 Distance Calculation

The API uses a simplified distance calculation formula:
```javascript
distance = Math.sqrt((lat2-lat1)² + (long2-long1)²) * 111
```
This provides approximate distances in kilometers.

## 📁 Project Structure

```
students/
├── controllers/
│   └── schools.js          # Business logic for school operations
├── routes/
│   └── schools.js          # Route definitions
├── node_modules/
├── index.js                # Main server file
├── package.json
└── README.md
```

## 🔧 Dependencies

- **express**: Web framework for Node.js
- **mysql2**: MySQL client for Node.js
- **cors**: Cross-Origin Resource Sharing middleware

## 🚨 Error Handling

The API includes comprehensive error handling for:
- Missing required fields
- Invalid data types
- Database connection errors
- Non-existent resources

## 🧪 Testing

### Using Postman

1. Import the provided Postman collection
2. Set base URL to `http://localhost:6278`
3. Test each endpoint with sample data

### Sample Test Data

```json
{
  "name": "Test School",
  "address": "123 Test Street, Mumbai",
  "latitude": 19.0760,
  "longitude": 72.8777
}
```

## 🔒 Validation

- All required fields are validated
- Latitude and longitude must be valid numbers

## 🐛 Known Issues

- Table name mismatch: Ensure your database table is named `schools`
- Route order: Specific routes must come before generic ones as `/schools`
