import * as api from './api.js';


//Make  paths for operations

//getAllIdeas
//createIdea
//getIdeaById
//deleteIdea

const paths = {
    'getAllIdeas': 'data/ideas?select=_id%2Ctitle%2Cimg&sortBy=_createdOn%20desc',
    'createIdea': 'data/ideas',
    'getIdeaById': 'data/ideas/',
    'deleteIdea': 'data/ideas/'
}

export async function getAllIdeas() {
    return api.get(paths.getAllIdeas);

}
export async function createIdea(idea) {
    return api.post(paths.createIdea, idea);
}

export async function getIdeaById(id) {
    return api.get(`${paths.getIdeaById}${id}`);
}

export async function deleteIdea(id) {
    return api.del(`${paths.deleteIdea}${id}`);
}

