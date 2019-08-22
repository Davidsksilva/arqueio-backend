import { Router } from 'express';
import multer from 'multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import ProjectController from './app/controllers/ProjectController';
import FileController from './app/controllers/FileController';
import PostController from './app/controllers/PostController';
import GalleryController from './app/controllers/GalleryController';
import TaskController from './app/controllers/TaskController';

import authMiddleware from './app/middleware/auth';
import multerConfig from './config/multer';

const routes = new Router();
const upload = multer(multerConfig('images'));
const uploadItalinea = multer(multerConfig('images_italinea'));

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

/**
 * Insecure endpoints
 */
routes.post('/posts', PostController.store);
routes.get('/gallery', GalleryController.index);
routes.post('/files', upload.single('file'), FileController.store);
routes.post(
  '/files-italinea',
  uploadItalinea.single('file'),
  FileController.store
);

routes.use(authMiddleware);

routes.post('/projects/:id/tasks', TaskController.store);
routes.get('/projects/:id/tasks', TaskController.index);
routes.post('/projects', ProjectController.store);
routes.get('/projects', ProjectController.index);

export default routes;
