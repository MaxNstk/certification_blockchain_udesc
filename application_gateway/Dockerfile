# Use the official MongoDB image from Docker Hub
FROM mongo:6.0

# Copy the initialization script to the container
COPY init-mongo.js /docker-entrypoint-initdb.d/

# Expose MongoDB port
EXPOSE 27017

# Use MongoDB's built-in entrypoint
ENTRYPOINT ["docker-entrypoint.sh"]

# Default command to run MongoDB
CMD ["mongod"]
