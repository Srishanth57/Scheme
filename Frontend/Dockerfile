#Base image 
FROM node:20-alpine 

# Working Directory 
WORKDIR /app 

#  Copy packages for optimization 
COPY package.json ./ 

RUN npm install --legacy-peer-deps

# Copy entire file structure 
COPY . . 

# Declare Public build arguments 
ARG NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
ARG NEXT_PUBLIC_ELEVENLABS_AGENT_ID

# Expose them to the build environment
ENV NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=$NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
ENV NEXT_PUBLIC_ELEVENLABS_AGENT_ID=$NEXT_PUBLIC_ELEVENLABS_AGENT_ID

RUN npm run build 

#PORT 
EXPOSE 3000 

# Start the Next.js production server
CMD ["npm", "start"]
