#Base image 
FROM node:20-alpine 

# Working Directory 
WORKDIR /app 

#  Copy packages for optimization 
COPY package.json ./ 

RUN npm install 

# Copy entire file structure 
COPY . . 

RUN npm run build 

#PORT 
EXPOSE 3000 

# Start the Next.js production server
CMD ["npm", "start"]
