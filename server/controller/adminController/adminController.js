

class AdminController {
    getPageAdmin (request, response) {
        response.render('admin')
    }
}


export default new AdminController();