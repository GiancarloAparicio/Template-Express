import { Router } from 'express';
import WebController from '../app/controller/WebController';

const web = Router();

web.get('web/', WebController.index);
web.get('web/create', WebController.create);
web.post('web/', WebController.store);
web.get('web/:id', WebController.show);
web.get('web/:id/edit', WebController.edit);
web.put('web/:id', WebController.update);
web.delete('web/:id', WebController.destroy);

export default web;
