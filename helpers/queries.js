const PS = require('pg-promise').PreparedStatement;
let queries = {
    general: {
        newUser: new PS('new-user', "INSERT INTO USERS (users_username, users_password, users_name, type_users_id) VALUES ($1, $2, $3, 2)"),
        getUser: new PS('get-user', "SELECT * FROM USERS WHERE users_username = $1"),
        newProject: new PS('new-project', "INSERT INTO PROJECTS (users_id, project_name, project_description, status_id) VALUES ($1, $2, $3, 3)"),
        editProject: new PS('edit-project', "UPDATE PROJECTS SET project_name = $1, project_description = $2 WHERE project_id = $3 AND users_id = $4"),
        deleteProject: new PS('delete-projet', "DELETE PROJECTS WHERE project_id = $1 AND users_id = $2"),
        getListProject: new PS('get-project', "SELECT * FROM PROJECTS WHERE users_id = $1"),
        newItem: new PS('new-item', "INSERT INTO PROJECT_ITEM (project_item_name, project_item_description, status_id, project_id) VALUES ($1, $2, 3, $3)"),
        getListItem: new PS('get-item', "SELECT * FROM PROJECT_ITEM WHERE project_id = $1 ORDER BY project_item_id"),
        addData: new PS('add-data', "INSERT INTO ITEM_CONTENT (project_item_id, item_content_url, item_content_description) VALUES ($1, $2, $3)"),
        getData: new PS('get-data', "SELECT * FROM ITEM_CONTENT WHERE project_item_id = $1 ORDER BY item_content_id"),
        deleteData: new PS('delete-data', "DELETE FROM ITEM_CONTENT WHERE item_content_id = $1"),
        updateData: new PS('update-data', "UPDATE ITEM_CONTENT SET item_content_description = $1 WHERE item_content_id = $2"),
        setProjectStatus: new PS('set-project-status', "UPDATE PROJECTS SET status_id = $1 WHERE project_id = $2"),
        setItemStatus: new PS('set-item-status', "UPDATE PROJECT_ITEM SET status_id = $1 WHERE project_item_id = $2"),
        editItemData: new PS('edit-item', "UPDATE PROJECT_ITEM SET project_item_name = $1, project_item_description = $2 WHERE project_item_id = $3"),
        getProjectId: new PS('get-proj-id', "SELECT project_id FROM PROJECT_ITEM WHERE project_item_id = $1")
    },
    user: {
        actions: {
            projects: {
                updateProject: new PS('update-project', "UPDATE PROJECTS SET project_name = $1, project_description = $2, status_id = $3 WHERE project_id = $4 AND users_id = $5"),
                deleteProject: new PS('delete-project', "DELETE FROM PROJECTS WHERE project_id = $1 AND users_id = $2")
            },
            items: {
                updateItem: new PS('update-item', "UPDATE PROJECT_ITEM SET project_item_name = $1, project_item_description = $2, status_id = $3 WHERE project_id = (SELECT project_id FROM PROJECTS WHERE project_id = $4 AND users_id = $5)"),
                deleteItem: new PS('delete-item', "DELETE FROM PROJECT_ITEM WHERE project_item_id= $1 AND project_id = (SELECT project_id FROM PROJECTS WHERE project_id = $2 AND users_id = $3)")
            }
        }
    },
    admin: {
        actions: {
            projects: {
                updateProject: new PS('update-project-x', "UPDATE PROJECTS SET project_name = $1, project_description = $2, status_id = $3 WHERE project_id = $4"),
                deleteProject: new PS('delete-project-x', "DELETE FROM PROJECTS WHERE project_id = $1"),
                giveProject: new PS('give-project-x', "UPDATE PROJECTS SET users_id = (SELECT users_id FROM USERS WHERE users_username = $1) WHERE project_id = $2 AND users_id = $3")
            },
            items: {
                updateItem: new PS('update-item-x', "UPDATE PROJECT_ITEM SET project_item_name = $1, project_item_description = $2, status_id = $3 WHERE project_id = $4"),
                deleteItem: new PS('delete-item-x', "DELETE FROM PROJECT_ITEM WHERE project_item_id = $1 AND project_id = $2")
            },
            search: {
                searchUsernames: new PS('search-usernames', "SELECT users_id, users_username FROM USERS WHERE users_username LIKE $1"),
                searchProjects: new PS('search-projects', "SELECT * FROM PROJECTS WHERE project_name LIKE $1")
            }
        }
    }
}

module.exports = queries;