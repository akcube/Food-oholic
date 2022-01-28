# Food'oholic

Food'oholic was built using MERN stack as part of the DASS course at IIIT-H

## Installing

### Backend

Change directories to the cloned repo. Install modules required for running the backend API

```bash

cd backend/
npm install

```

Fill the following details in a .env file and place it in `backend/`

```bash

PORT=<PORT>
FOODOHOLIC_DB_URI=<DB_URI>
DENV=development
SECRET=<YOURSECRET>

```

Start server

```bash

nodemon server

```

### Frontend

Install required modules for frontend

```bash

cd frontend/
npm install

```

Run frontend and launch website

```bash

npm start

```
