// Import Example model
import Example from '../../models/example/example.js';
import ApiError from '../../util/ApiError.js';

// Create a new class called ExampleController
class ExampleController {
    // Create a new example object
    async create(example) {
        // Create a new example object
        await Example.create(example);

        /* 
        To save data to database

        1. Using create method

        await Example.create(example); // Automatically saves to database


        2. Using save method (usually used to return the saved object)

        const newExample = new Example(example); //Not saved to database
        await newExample.save(); // Save to database
        return newExample;
        */
    }

    // Get all example objects
    async getAll() {
        // Get all example objects
        return await Example.find();
    }

    // Update an example object
    async update(example) {
        // Check if the id is exists and update the example object

        // One type of defensive programming is to check if the object exists before updating it
        const exampleExists = await Example.findById(example._id);
        if (!exampleExists) {
            //Bad request
            //Let caller handle the error by throwing an error not by returning an error
            throw new ApiError(400, 'Example not found');
        }
        await Example.findByIdAndUpdate(example._id, example);
    }

    async delete(id) {
        // Check if the id is exists and delete the example object

        // One type of defensive programming is to check if the object exists before deleting it
        const example = await Example.findById(id);
        if (!example) {
            //Bad request
            throw new ApiError(400, 'Example not found');
        }
        await Example.findByIdAndDelete(id);
    }
}

// Export the ExampleController class
export default ExampleController;
