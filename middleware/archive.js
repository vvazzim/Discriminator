const archiveMiddleware = function (schema) {
    schema.pre('deleteOne', async function (next) {
        const doc = await this.model.findOne(this.getQuery());
        if (doc) {
            doc.archived = true;
            await doc.save();
            next();
        } else {
            next(new Error('Document not found.'));
        }
    });
};

module.exports = archiveMiddleware;
