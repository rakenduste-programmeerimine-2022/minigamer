exports.handler = async (event, context) => {
    return {
        statusCode: 200,
        body: JSON.stringify({ message: "Hello World.." }),
    };
};

// Valid paths for endpoint named "helloWorld"
// netlify/functions/helloWorld.js
// netlify/functions/helloWorld/helloWorld.js
// netlify/functions/helloWorld/index.js
