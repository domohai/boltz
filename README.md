# BoltZ  
An express management system. The website is hosted at http://fall2024c56g2.int3306.freeddns.org/ and is only available when needed due to limited resources.

## Features  
- User authentication and role-based access control.  
- Manage service points, collection hubs, and staff accounts.  
- Track shipments from sender to recipient with real-time status updates.  
- Generate statistical reports and visualizations for shipments and operations. 

## Prerequisites

### Clone the repository
```bash
git clone https://github.com/domohai/boltz.git
```
### Utitlities Dependencies
- Node.js v18.18.0 or later
- MySQL installed in local

### Packages dependencies
Run this command to install all the packages required
```bash
npm install
```

## Development
### Create your own `.env` file
```bash
# Database Configuration
DATABASE_HOST=<your_db_host>
DATABASE_USER=<your_db_user>
DATABASE_PASSWORD=<your_db_password>
DATABASE_NAME=<your_db_name>
# NextAuth Configuration
NEXTAUTH_URL=<http://localhost:3000> or <your_dns_if_on_production>
NEXTAUTH_SECRET=<your_secret_keys>
NEXTAUTH_DEBUG=<true or false>
# Other Configurations
```
Start developing
```bash
npm run dev
```
