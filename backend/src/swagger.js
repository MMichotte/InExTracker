// eslint-disable-next-line no-undef
const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_output.json'
const endpointsFiles = ['./modules/users/user.routes.js']

swaggerAutogen(outputFile, endpointsFiles)