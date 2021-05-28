module.exports = {
    index(req, res) {
        return res.json({
            message: "Index"
        });
    },
    create(req, res) {
        return res.json({
            message: "Create"
        });
    },
    store(req, res) {
        return res.json({
            message: "Store"
        });
    },
    show(req, res) {
        return res.json({
            message: "Show"
        });
    },
    update(req, red) {
        return res.json({
            message: "Update"
        });
    },
    destroy(req, res) {
        return res.json({
            message: "Destroy"
        });
    },
}