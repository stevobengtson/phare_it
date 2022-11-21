const Library = require("../models/library.model")

/**
 * Create a Library
 * @param {Object} libraryBody
 * @returns {Promise<Library>}
 */
const createLibrary = async (libraryBody) => {
    return Library.create(libraryBody);
}

/**
 * Query for libraries
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryLibraries = async (filter, options) => {
    return await Library.paginate(filter, options);
}

module.exports = {
    createLibrary,
    queryLibraries,
};
